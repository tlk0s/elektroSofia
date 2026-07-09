export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const response = await fetch(request)
    const newResponse = new Response(response.body, response)

    // Link headers for AI agent discovery (RFC 8288)
    newResponse.headers.set(
      'Link',
      '</llms.txt>; rel="describedby", </sitemap.xml>; rel="sitemap"'
    )

    // Cache static assets for 1 year
    const isStaticAsset = /\.(js|css|png|webp|jpg|jpeg|gif|svg|woff2|woff|ico)$/.test(url.pathname)
    if (isStaticAsset) {
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    } else {
      newResponse.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    }

    return newResponse
  }
}
