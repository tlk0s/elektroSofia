addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const isStaticAsset = /\.(js|css|png|webp|jpg|jpeg|gif|svg|woff2|woff|ico)$/.test(url.pathname)
  const isHtml = !isStaticAsset && !url.pathname.includes('.')

  const response = await fetch(request)

  // For HTML pages — inline the critical CSS
  if (isHtml && response.headers.get('content-type')?.includes('text/html')) {
    const rewriter = new HTMLRewriter()
      .on('link[rel="stylesheet"]', {
        async element(el) {
          const href = el.getAttribute('href')
          if (!href) return
          try {
            const cssUrl = new URL(href, url.origin).toString()
            const cssRes = await fetch(cssUrl)
            if (cssRes.ok) {
              const css = await cssRes.text()
              el.replace(`<style>${css}</style>`, { html: true })
            }
          } catch {}
        }
      })

    const transformed = rewriter.transform(response)
    const newResponse = new Response(transformed.body, transformed)

    newResponse.headers.set('Link', '</llms.txt>; rel="describedby", </sitemap.xml>; rel="sitemap"')
    newResponse.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
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
