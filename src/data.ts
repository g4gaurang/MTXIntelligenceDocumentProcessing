export type DetailItem = {
  title: string
  summary: string
  audience?: string
  consequence?: string
  response?: string
  measures?: string[]
  capabilities?: string[]
  human?: string
  controls?: string
}

export const challenges: DetailItem[] = [
  {
    title: 'Information arrives in inconsistent formats',
    summary: 'Scans, digital files, email attachments, images, spreadsheets, and packages arrive with varying layouts and quality.',
    audience: 'Intake teams, processors, and document operations',
    consequence: 'Preparation and interpretation take time, while unreadable content can enter active queues.',
    response: 'Configurable intake, separation, classification, OCR, and extraction services convert incoming content into proposed structured information.',
    measures: ['Documents received', 'Classification confidence', 'Extraction confidence', 'Unreadable-document rate'],
  },
  {
    title: 'Employees repeatedly enter the same information',
    summary: 'Operations teams transfer information from documents into lending, policy, claims, compliance, or servicing systems.',
    audience: 'Processors, examiners, analysts, and quality teams',
    consequence: 'Repeated entry adds manual touchpoints and creates correction work.',
    response: 'Extract proposed values, validate them, and present them for review before approved data moves downstream.',
    measures: ['Fields reviewed', 'Corrections required', 'Processing time', 'Manual touchpoints'],
  },
  {
    title: 'Missing information is identified late',
    summary: 'Incomplete packages can remain in processing queues before required information or signatures are found to be missing.',
    audience: 'Intake staff, processors, underwriters, and examiners',
    consequence: 'Work pauses, queues age, and additional information may need to be requested.',
    response: 'Apply configurable package checklists and validation rules as documents enter the workflow.',
    measures: ['Package completeness', 'Missing-document rate', 'Exception age', 'Resubmission volume'],
  },
  {
    title: 'Related documents contain conflicting information',
    summary: 'Names, addresses, income, dates, coverage details, and other values may differ across a package.',
    audience: 'Reviewers, underwriters, examiners, and quality teams',
    consequence: 'Material differences require research before the process can continue.',
    response: 'Compare extracted values across related documents and direct material discrepancies to an authorized reviewer.',
    measures: ['Cross-document discrepancies', 'Unresolved exceptions', 'Reviewer corrections', 'Validation outcomes'],
  },
  {
    title: 'Review decisions are difficult to reconstruct',
    summary: 'Quality and audit teams may struggle to determine which source supported a value, which rule ran, or who resolved an exception.',
    audience: 'Quality control, audit, risk, and supervisors',
    consequence: 'Evidence gathering becomes a separate manual activity.',
    response: 'Maintain source references, processing history, validation results, reviewer actions, model versions, and decision records.',
    measures: ['Records with source traceability', 'Overrides', 'Exception resolution', 'Audit-request turnaround'],
  },
  {
    title: 'Departments build duplicate automation',
    summary: 'Lending, insurance, compliance, and finance teams may purchase or build isolated document-processing tools.',
    audience: 'Operations, technology, architecture, and shared services',
    consequence: 'Teams maintain overlapping capabilities and disconnected controls.',
    response: 'Offer shared intake, extraction, validation, review, governance, and monitoring capabilities configurable by workflow.',
    measures: ['Processes using shared services', 'Reusable components', 'Connected systems', 'Retired manual handoffs'],
  },
]

export const lifecycle: DetailItem[] = [
  { title: 'Receive', summary: 'Accept documents from portals, email, scanning operations, repositories, APIs, secure files, and business systems.', capabilities: ['Channel adapters', 'Batch intake', 'Receipt tracking'], human: 'Staff can monitor intake and address rejected files.', controls: 'Channel authorization, encryption, file limits, and intake records.', measures: ['Volume by channel', 'Rejected files', 'Intake latency'] },
  { title: 'Prepare', summary: 'Check file integrity, separate packages, improve image quality, detect duplicate pages, and apply approved security scans.', capabilities: ['Package separation', 'Image processing', 'Duplicate indicators'], human: 'Staff review unreadable or uncertain document boundaries.', controls: 'Original-file preservation and preparation history.', measures: ['Unreadable rate', 'Duplicates detected', 'Pages prepared'] },
  { title: 'Classify', summary: 'Determine document type, assign it to a business process, and route uncertain classifications for review.', capabilities: ['Type classification', 'Process assignment', 'Confidence scoring'], human: 'Reviewers confirm or correct uncertain classifications.', controls: 'Thresholds, model version records, and correction capture.', measures: ['Confidence distribution', 'Corrections', 'Unclassified documents'] },
  { title: 'Extract', summary: 'Identify relevant fields, tables, checkboxes, signatures, dates, and document relationships.', capabilities: ['Configurable schemas', 'Field extraction', 'Source highlighting'], human: 'Reviewers verify fields based on confidence and policy.', controls: 'Field provenance, schema versions, and data minimization.', measures: ['Fields proposed', 'Field confidence', 'Correction rate'] },
  { title: 'Validate', summary: 'Apply format checks, business rules, cross-document comparisons, reference-data checks, and package-completeness checks.', capabilities: ['Rule engine', 'Reference checks', 'Package checklist'], human: 'Specialists assess conflicts and policy exceptions.', controls: 'Rule versions, result history, and materiality thresholds.', measures: ['Validation outcomes', 'Missing items', 'Source conflicts'] },
  { title: 'Review', summary: 'Present low-confidence values, discrepancies, and policy exceptions to authorized staff with source context.', capabilities: ['Role queues', 'Side-by-side review', 'Escalation'], human: 'Authorized staff correct, resolve, escalate, or approve workflow actions.', controls: 'Role permissions, override reasons, and segregation of duties.', measures: ['Queue age', 'Reviewer workload', 'Resolution outcomes'] },
  { title: 'Deliver and Monitor', summary: 'Send approved information downstream, preserve the processing record, and monitor quality and workload.', capabilities: ['API and event delivery', 'Audit history', 'Operations dashboards'], human: 'Operators monitor failures and supervisors manage workload.', controls: 'Approval policy, delivery receipts, retention, and access controls.', measures: ['Delivery status', 'Handling time', 'Integration failures'] },
]

export const industries = {
  Banking: ['Account-opening documentation', 'Customer and business onboarding', 'Lending document packages', 'Financial statements', 'Transaction-supporting documents', 'Servicing correspondence', 'Compliance documentation'],
  'Financial Services': ['Investment account documentation', 'Fund and subscription packages', 'Client onboarding records', 'Suitability and disclosure documents', 'Financial statements', 'Payment and reconciliation records', 'Regulatory correspondence'],
  Insurance: ['Insurance applications', 'Policy and endorsement documents', 'Claims submissions', 'Medical and supporting records', 'Estimates and invoices', 'Proof-of-loss documents', 'Adjuster and claimant correspondence'],
}

export const personas: Record<string, string> = {
  'Operations Staff': 'Review organized packages, verify extracted information, resolve missing items, and move completed work forward.',
  'Underwriters and Examiners': 'Access relevant documents, extracted facts, validation results, and exceptions without searching disconnected files.',
  'Compliance Reviewers': 'Inspect source evidence, validation history, reviewer activity, and records supporting a controlled process.',
  'Quality-Control Teams': 'Sample completed work, compare corrections, inspect overrides, and identify recurring quality patterns.',
  Supervisors: 'Monitor incoming volume, queue age, workload, exception trends, and processing quality.',
  'Audit and Risk Teams': 'Trace a proposed value to its source, review processing history, and export supporting records.',
  Administrators: 'Configure document types, rules, queues, roles, thresholds, mappings, and retention settings.',
  'Technology and Data Teams': 'Manage approved integrations, deployment choices, models, monitoring, and data boundaries.',
}

export const capabilities: Record<string, string[]> = {
  'Document Intake and Preparation': ['Portal uploads', 'Email and repository intake', 'API and secure-file intake', 'Batch ingestion', 'Document separation', 'Image-quality processing', 'Duplicate detection', 'Package organization'],
  'Classification and Extraction': ['Document-type classification', 'OCR and handwriting recognition where supported', 'Key-value extraction', 'Table extraction', 'Checkbox and signature detection', 'Page and section identification', 'Configurable extraction schemas', 'Confidence indicators'],
  'Validation and Reconciliation': ['Required-field checks', 'Format validation', 'Cross-document comparison', 'Reference-data validation', 'Duplicate-record indicators', 'Package-completeness rules', 'Configurable thresholds', 'Exception creation'],
  'Review and Workflow': ['Role-based review queues', 'Side-by-side document and data review', 'Source highlighting', 'Correction capture', 'Assignment and escalation', 'Approval routing', 'Service-level monitoring', 'Business-process handoff'],
  'Governance and Security': ['Role-based access', 'Data minimization', 'Redaction support', 'Encryption controls', 'Retention configuration', 'Processing history', 'Model and rule version records', 'Human override capture', 'Audit exports'],
  'Analytics and Administration': ['Processing-volume dashboards', 'Queue and aging views', 'Confidence analysis', 'Correction trends', 'Exception analysis', 'Rule management', 'Model monitoring', 'Integration monitoring', 'Configuration management'],
}

export type Package = {
  name: string
  type: string
  status: string
  documents: { name: string; pages: number; state: string }[]
  fields: { label: string; value: string; confidence: number; source: string; box: [number, number, number, number] }[]
  checks: string[]
  exception: string
  missing: string
  note: string
  next: string
}

export const packages: Package[] = [
  {
    name: 'Commercial loan application package',
    type: 'Banking',
    status: 'Reviewer attention',
    documents: [{ name: 'Business application', pages: 4, state: 'Classified' }, { name: 'Financial statement', pages: 8, state: 'Classified' }, { name: 'Bank statement', pages: 6, state: 'Classified' }],
    fields: [{ label: 'Applicant', value: 'Northstar Bicycle Works LLC', confidence: 97, source: 'Business application · p1', box: [13, 24, 68, 7] }, { label: 'Business address', value: '142 Cedar Avenue, Fairhaven', confidence: 82, source: 'Business application · p1', box: [13, 37, 73, 8] }, { label: 'Requested amount', value: '$240,000', confidence: 94, source: 'Business application · p2', box: [13, 63, 38, 8] }, { label: 'Deposit account', value: 'Account ending in •••• 1842', confidence: 89, source: 'Bank statement · p1', box: [13, 49, 61, 7] }],
    checks: ['Required fields present', 'Statement period confirmed', 'Address comparison needs review'],
    exception: 'Business address differs on the financial statement.',
    missing: 'Ownership schedule',
    note: 'Confirm suite designation before workflow handoff.',
    next: 'Resolve address exception or escalate to lending operations',
  },
  {
    name: 'Customer onboarding package',
    type: 'Financial Services',
    status: 'Field review',
    documents: [{ name: 'Onboarding form', pages: 5, state: 'Classified' }, { name: 'Identity document', pages: 2, state: 'Restricted' }, { name: 'Tax form', pages: 2, state: 'Classified' }],
    fields: [{ label: 'Customer', value: 'Avery Rowan', confidence: 96, source: 'Onboarding form · p1', box: [12, 22, 52, 7] }, { label: 'Mailing address', value: '88 Harbor Street, Lakeview', confidence: 91, source: 'Onboarding form · p2', box: [12, 45, 70, 8] }, { label: 'Account type', value: 'Individual brokerage', confidence: 87, source: 'Onboarding form · p1', box: [12, 60, 55, 7] }, { label: 'Tax identifier', value: '•••-••-4721', confidence: 78, source: 'Tax form · p1', box: [12, 34, 43, 7] }],
    checks: ['Identity evidence received', 'Tax form requires field review', 'Required disclosures present'],
    exception: 'Tax identifier confidence is below the configured threshold.',
    missing: 'None identified',
    note: 'Restricted source remains masked outside the assigned queue.',
    next: 'Review the masked tax field with authorized access',
  },
  {
    name: 'Property insurance claim package',
    type: 'Insurance',
    status: 'Package incomplete',
    documents: [{ name: 'Claim submission', pages: 3, state: 'Classified' }, { name: 'Repair estimate', pages: 4, state: 'Classified' }, { name: 'Property images', pages: 7, state: 'Organized' }],
    fields: [{ label: 'Claimant', value: 'Jordan Ellis', confidence: 95, source: 'Claim submission · p1', box: [14, 23, 48, 7] }, { label: 'Policy number', value: 'HOM-•••-4918', confidence: 93, source: 'Claim submission · p1', box: [14, 37, 43, 7] }, { label: 'Claim date', value: '08 Sep 2026', confidence: 86, source: 'Claim submission · p2', box: [14, 52, 42, 7] }, { label: 'Estimate total', value: '$18,420.00', confidence: 92, source: 'Repair estimate · p4', box: [14, 70, 38, 7] }],
    checks: ['Policy reference format confirmed', 'Estimate total reconciled', 'Proof-of-loss checklist incomplete'],
    exception: 'Claim date needs comparison with supporting correspondence.',
    missing: 'Signed proof-of-loss document',
    note: 'No coverage or claim determination is produced by this workflow.',
    next: 'Request missing document or route to the assigned examiner',
  },
]

export const architecture: Record<string, string[]> = {
  'Input Channels': ['Portals', 'Email', 'Scanners', 'Repositories', 'APIs', 'Secure files', 'Business applications'],
  'Document Intelligence': ['Preparation', 'Classification', 'OCR', 'Extraction', 'Table recognition', 'Package organization'],
  'Validation and Orchestration': ['Business rules', 'Reference checks', 'Cross-document comparison', 'Confidence thresholds', 'Workflow routing'],
  'Human Review': ['Review queues', 'Source inspection', 'Correction', 'Approval', 'Escalation', 'Exception resolution'],
  'Enterprise Integration': ['Core banking', 'Loan origination', 'Policy administration', 'Claims', 'CRM', 'ERP', 'Content management', 'Data platforms'],
  'Governance and Operations': ['Identity', 'Access', 'Encryption', 'Redaction', 'Audit history', 'Monitoring', 'Retention', 'Model governance'],
  'Deployment Foundation': ['Private or public cloud', 'Hybrid infrastructure', 'Institution-hosted', 'Approved managed environment', 'Commercial models', 'Open-source models', 'Frontier models'],
}

export const roadmap: Record<string, string[]> = {
  '1 — Select and Baseline': ['Select a document-intensive workflow', 'Define document types and volumes', 'Establish quality measures', 'Document existing review controls', 'Confirm architecture and security constraints'],
  '2 — Configure and Validate': ['Configure intake and document schemas', 'Develop extraction and validation rules', 'Establish review queues', 'Test with representative documents', 'Measure quality against the agreed baseline'],
  '3 — Integrate and Deploy': ['Connect approved source and target systems', 'Complete security and operational readiness', 'Train reviewers and administrators', 'Introduce production volumes through controlled rollout', 'Monitor exceptions and corrections'],
  '4 — Reuse and Expand': ['Refine models and rules', 'Add related document types', 'Extend shared services to another workflow', 'Expand analytics', 'Continue governance and performance monitoring'],
}
