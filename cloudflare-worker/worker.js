addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function extractMarkdown(response) {
  const chunks = []

  await new HTMLRewriter()
    .on('script, style, nav, footer, [aria-hidden="true"]', {
      element(el) { el.remove() }
    })
    .on('h1', { element(el) { el.before('# ', { html: false }) } })
    .on('h2', { element(el) { el.before('## ', { html: false }) } })
    .on('h3', { element(el) { el.before('### ', { html: false }) } })
    .on('p, li, dt, dd', { element(el) { el.after('\n', { html: false }) } })
    .on('br', { element(el) { el.replace('\n', { html: false }) } })
    .on('*', {
      text(node) {
        const t = node.text.trim()
        if (t) chunks.push(t + (node.lastInTextNode ? '\n' : ' '))
      }
    })
    .transform(response)
    .text()

  return chunks.join('').replace(/\n{3,}/g, '\n\n').trim()
}

async function handleRequest(request) {
  const url = new URL(request.url)
  const isStaticAsset = /\.(js|css|png|webp|jpg|jpeg|gif|svg|woff2|woff|ico)$/.test(url.pathname)
  const isHtml = !isStaticAsset && !url.pathname.includes('.')
  const wantsMarkdown = (request.headers.get('Accept') || '').includes('text/markdown')

  const response = await fetch(request)

  // Markdown content negotiation — serve text/markdown when requested
  if (wantsMarkdown && isHtml && response.headers.get('content-type')?.includes('text/html')) {
    const markdown = await extractMarkdown(response.clone())
    const tokenEstimate = Math.ceil(markdown.length / 4)
    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokenEstimate),
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Vary': 'Accept',
      },
    })
  }

  // For HTML pages — inline the critical CSS
  if (isHtml && response.headers.get('content-type')?.includes('text/html')) {
    const rewriter = new HTMLRewriter()
      .on('link[rel="stylesheet"]', {
        async element(el) {
          const href = el.getAttribute('href')
          if (!href) return
          try {
            const cssUrl = new URL(href, url.origin)
            // SSRF prevention: only fetch same-origin stylesheets
            if (cssUrl.origin !== url.origin) return
            const cssRes = await fetch(cssUrl.toString())
            if (!cssRes.ok) return
            const ct = cssRes.headers.get('content-type') || ''
            if (!ct.startsWith('text/css')) return
            const css = await cssRes.text()
            // XSS prevention: escape </style closing tag in fetched CSS
            const safeCss = css.replace(/<\/style/gi, '<\\/style')
            el.replace(`<style>${safeCss}</style>`, { html: true })
          } catch {}
        }
      })

    const transformed = rewriter.transform(response)
    const newResponse = new Response(transformed.body, transformed)

    newResponse.headers.set('Link', '</llms.txt>; rel="describedby", </sitemap.xml>; rel="sitemap"')
    newResponse.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    newResponse.headers.set('Vary', 'Accept')
    newResponse.headers.delete('x-email-obfuscation')
    return newResponse
  }

  const newResponse = new Response(response.body, response)

  newResponse.headers.set('Link', '</llms.txt>; rel="describedby", </sitemap.xml>; rel="sitemap"')

  if (isStaticAsset) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    newResponse.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
  }

  return newResponse
}
