# MTX Intelligent Document Processing

Interactive enterprise\-product prototype for AI\-assisted document processing in banking, financial services, and insurance.

## Product concept

The page presents MTX Intelligent Document Processing as a configurable, platform\-neutral solution layer. It includes reusable document intake, preparation, classification, extraction, validation, review, traceability, analytics, governance, and integration patterns.

The prototype leads with the product. Implementation, managed, and advisory services are described separately as support for adoption and operation.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Validate and build

```bash
npm run check
npm run preview
```

The production build is written to `dist`.

## Content assumptions and safeguards

* Product views, records, names, identifiers, measures, and charts use fictional data.
* Analytics are labeled as illustrative and are not presented as MTX or customer results.
* The prototype does not provide autonomous credit, coverage, suitability, claims, compliance, or enforcement decisions.
* Consequential actions remain subject to configured policy and authorized professional review.
* Architecture descriptions keep cloud providers, models, OCR engines, content systems, and workflow products configurable.
* Connection categories do not represent existing production integrations.
* The demonstration form does not send, retain, or transmit entered information.
* The application has no backend, database, authentication, credentials, external API calls, or downloaded assets.

## GitHub Pages

Vite uses `/MTXIntelligenceDocumentProcessing/` as its base path, matching the repository name. The deployment workflow builds and publishes `dist` through GitHub Pages.

After this branch is merged:

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Run **Deploy prototype to GitHub Pages** if the merge did not trigger it.

The expected site address is:

`https://g4gaurang.github.io/MTXIntelligenceDocumentProcessing/`

The application is a single page and does not use client\-side routes, so browser refreshes under the repository subpath do not need a fallback.

## Technology

* React and TypeScript
* Vite
* Lucide React icons
* Recharts for selected operational visualizations
* Local CSS and SVG artwork
