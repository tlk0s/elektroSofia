# auth.md

This is the agent registration and authentication document for **Николов инжинеринг** (`https://elektrouslugisofia.bg`).

## About This Site

This is a public informational website for a licensed electrical contractor in Sofia, Bulgaria. No authentication is required to access content.

## Agent Access

All content on this site is publicly accessible. AI agents may:

- Read all pages without credentials
- Access discovery documents under `/.well-known/`
- Use contact information to initiate communication on behalf of users

## No Protected APIs

This site does not operate protected APIs or an OAuth authorization server. There are no scopes, tokens, or registration endpoints.

## Contact

For agent-assisted inquiries:

- **Email:** elmaistor1@gmail.com
- **Phone:** +359 899887752
- **Services:** Ремонт на електроинсталация, монтаж на осветление, смяна на ел. табло, авариен електротехник 24/7
- **Area served:** София, България

## Discovery Documents

| Document | URL |
|----------|-----|
| Agent Card | `/.well-known/agent-card.json` |
| API Catalog | `/.well-known/api-catalog` |
| MCP Server Card | `/.well-known/mcp/server-card.json` |
| Agent Skills | `/.well-known/agent-skills/index.json` |
| OAuth Protected Resource | `/.well-known/oauth-protected-resource` |
