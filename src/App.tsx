import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, BookOpenCheck, Boxes, Check, CheckCircle2,
  ChevronDown, ChevronRight, CircleGauge, Database, FileCheck2, FileSearch, FileStack,
  Fingerprint, GitCompareArrows, History, Layers3, LockKeyhole, Menu, Network, Pencil,
  Route, Settings2, ShieldCheck, SlidersHorizontal, Sparkles, UserCheck, Users,
  X, type LucideIcon,
} from 'lucide-react'
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { architecture, capabilities, challenges, industries, lifecycle, packages, personas, roadmap, type Package } from './data'

const nav = [
  ['Product', 'product'], ['Industry Challenges', 'challenges'], ['How It Works', 'lifecycle'],
  ['Use Cases', 'use-cases'], ['Capabilities', 'capabilities'], ['Governance', 'governance'],
  ['Architecture', 'architecture'], ['Adoption', 'adoption'],
]

function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'quiet'; onClick?: () => void; type?: 'button' | 'submit'; className?: string
}) {
  return <button type={type} className={`button ${variant} ${className}`} onClick={onClick}>{children}</button>
}

function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return <div className={`section-heading ${align}`}>
    <p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}
  </div>
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'attention' | 'positive' | 'cyan' }) {
  return <span className={`pill ${tone}`}>{children}</span>
}

function TabList({ items, selected, onSelect, label }: { items: string[]; selected: string; onSelect: (item: string) => void; label: string }) {
  return <div className="tab-list" role="tablist" aria-label={label}>
    {items.map(item => <button key={item} role="tab" aria-selected={selected === item} className={selected === item ? 'active' : ''} onClick={() => onSelect(item)}>{item}</button>)}
  </div>
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const modal = document.querySelector<HTMLElement>('.modal-card')
        const focusable = modal?.querySelectorAll<HTMLElement>('button,input,select,textarea')
        if (!focusable?.length) return
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.classList.add('modal-open')
    document.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('modal-open'); document.removeEventListener('keydown', onKey) }
  }, [open, onClose])
  if (!open) return null
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true) }
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button ref={closeRef} className="icon-button modal-close" aria-label="Close request form" onClick={onClose}><X /></button>
      {sent ? <div className="modal-success">
        <span className="icon-orb"><CheckCircle2 /></span>
        <p className="eyebrow">Prototype confirmation</p><h2 id={titleId}>Your request was simulated.</h2>
        <p>No information was sent, retained, or transmitted. In a production experience, the organization would connect this form to an approved request process.</p>
        <Button onClick={() => { setSent(false); onClose() }}>Return to the product</Button>
      </div> : <>
        <p className="eyebrow">Product demonstration</p><h2 id={titleId}>Tell us about your document process.</h2>
        <p className="form-note"><LockKeyhole size={16} /> Prototype only. This form does not send, retain, or transmit information.</p>
        <form onSubmit={submit}>
          <div className="form-grid">
            <label>Name<input required autoComplete="name" /></label>
            <label>Organization<input required autoComplete="organization" /></label>
            <label>Work email<input required type="email" autoComplete="email" /></label>
            <label>Role<input required autoComplete="organization-title" /></label>
            <label>Industry<select required defaultValue=""><option value="" disabled>Select industry</option>{Object.keys(industries).map(x => <option key={x}>{x}</option>)}</select></label>
            <label>Approximate monthly document volume<select required defaultValue=""><option value="" disabled>Select range</option><option>Under 1,000</option><option>1,000–10,000</option><option>10,001–100,000</option><option>Over 100,000</option><option>Not yet known</option></select></label>
            <label className="wide">Primary document process<input required placeholder="e.g., customer onboarding" /></label>
            <label className="wide">Current processing method<input required placeholder="e.g., shared inbox and manual review" /></label>
            <label className="wide">Optional message<textarea rows={3} /></label>
          </div>
          <Button type="submit">Simulate request <ArrowRight size={17} /></Button>
        </form>
      </>}
    </section>
  </div>
}

function HeroWorkspace() {
  return <div className="hero-workspace" aria-label="Illustrative document processing workspace">
    <div className="workspace-bar"><span><i></i><i></i><i></i></span><span>Package ID · DEMO-2048</span><Pill tone="attention">Review required</Pill></div>
    <div className="hero-grid">
      <div className="package-rail">
        <small>INCOMING PACKAGE</small>
        {['Application.pdf', 'Statement.pdf', 'Schedule.pdf'].map((x, i) => <div className={`doc-row ${i === 0 ? 'selected' : ''}`} key={x}><FileCheck2 /><span>{x}<small>{[4, 8, 2][i]} pages</small></span>{i === 2 && <AlertTriangle />}</div>)}
      </div>
      <div className="document-preview" aria-label="Fictional application preview">
        <div className="fake-doc-title"></div><div className="fake-doc-subtitle"></div>
        {[78, 91, 66, 84, 58].map((w, i) => <div key={i} className={`fake-field field-${i}`} style={{ width: `${w}%` }}><span></span>{i === 2 && <b>Business address</b>}</div>)}
      </div>
      <div className="extract-panel">
        <div className="panel-title"><span>Extracted fields</span><CircleGauge size={16} /></div>
        {[['Applicant', 'Northstar Bicycle Works', '97'], ['Address', '142 Cedar Avenue', '82'], ['Requested', '$240,000', '94']].map(([a, b, c]) => <div className="extract-row" key={a}><span>{a}<strong>{b}</strong></span><Pill tone={Number(c) < 85 ? 'attention' : 'cyan'}>{c}%</Pill></div>)}
        <div className="validation-note"><AlertTriangle /><span><strong>Source conflict</strong>Address differs across documents</span></div>
        <small>Assigned queue</small><strong>Lending Operations · Tier 2</strong>
      </div>
    </div>
    <div className="demo-label">Illustrative product view using fictional data.</div>
  </div>
}

function Challenges() {
  const [active, setActive] = useState(0)
  const item = challenges[active]
  return <section id="challenges" className="section">
    <div className="container"><SectionHeading eyebrow="Industry challenges" title="Document-intensive work creates operational friction and hidden risk." copy="Select a challenge to see the operating impact and a configurable product response." />
      <div className="challenge-layout">
        <div className="challenge-list" role="tablist" aria-label="Industry challenges">{challenges.map((x, i) => <button role="tab" aria-selected={active === i} className={active === i ? 'active' : ''} key={x.title} onClick={() => setActive(i)}><span>0{i + 1}</span>{x.title}<ChevronRight /></button>)}</div>
        <article className="detail-panel" role="tabpanel"><Pill tone="cyan">Challenge 0{active + 1}</Pill><h3>{item.title}</h3><p className="large">{item.summary}</p>
          <div className="detail-grid"><div><small>WHO EXPERIENCES IT</small><p>{item.audience}</p></div><div><small>OPERATIONAL CONSEQUENCE</small><p>{item.consequence}</p></div></div>
          <div className="response-box"><Sparkles /><div><small>MTX PRODUCT RESPONSE</small><p>{item.response}</p></div></div>
          <small>SUGGESTED MEASURES</small><div className="pill-row">{item.measures?.map(x => <Pill key={x}>{x}</Pill>)}</div>
        </article>
      </div>
    </div>
  </section>
}

function Lifecycle() {
  const [active, setActive] = useState(0), item = lifecycle[active]
  return <section id="lifecycle" className="section dark-section">
    <div className="container"><SectionHeading eyebrow="Processing lifecycle" title="From incoming content to an authorized action." copy="Each stage adds product services, controls, and defined human involvement." />
      <div className="stepper" role="tablist" aria-label="Document processing lifecycle">{lifecycle.map((x, i) => <button key={x.title} role="tab" aria-selected={active === i} className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span>{i + 1}</span><b>{x.title}</b></button>)}</div>
      <article className="lifecycle-panel" role="tabpanel"><div><Pill tone="cyan">Stage {active + 1}</Pill><h3>{item.title}</h3><p className="large">{item.summary}</p></div>
        <div className="lifecycle-details">
          <InfoBlock icon={Settings2} title="Product capabilities" items={item.capabilities} />
          <InfoBlock icon={UserCheck} title="Human involvement" text={item.human} />
          <InfoBlock icon={ShieldCheck} title="Data and controls" text={item.controls} />
          <InfoBlock icon={BarChart3} title="Suggested measures" items={item.measures} />
        </div>
      </article>
    </div>
  </section>
}

function InfoBlock({ icon: Icon, title, text, items }: { icon: LucideIcon; title: string; text?: string; items?: string[] }) {
  return <div className="info-block"><Icon /><div><small>{title}</small>{text && <p>{text}</p>}{items && <ul>{items.map(x => <li key={x}>{x}</li>)}</ul>}</div></div>
}

function SelectorSections() {
  const [industry, setIndustry] = useState('Banking')
  const [persona, setPersona] = useState('Operations Staff')
  const [capability, setCapability] = useState('Document Intake and Preparation')
  return <>
    <section id="use-cases" className="section tint-section"><div className="container">
      <SectionHeading eyebrow="Industry workflows" title="One governed foundation. Configured for different document work." copy="The product organizes and supplies information; authorized professionals retain legal, credit, suitability, coverage, compliance, and claims decisions." />
      <TabList items={Object.keys(industries)} selected={industry} onSelect={setIndustry} label="Select industry" />
      <div className="industry-panel"><div className="industry-icon"><LandmarkIcon name={industry} /></div><div><p className="eyebrow">{industry}</p><h3>Example document workflows</h3><div className="workflow-grid">{industries[industry as keyof typeof industries].map(x => <div key={x}><FileSearch />{x}</div>)}</div></div></div>
      <div className="subsection"><SectionHeading eyebrow="Role-based experiences" title="Focused views for each participant." />
        <div className="persona-layout"><div className="persona-cards" role="tablist" aria-label="User roles">{Object.keys(personas).map(x => <button role="tab" aria-selected={persona === x} onClick={() => setPersona(x)} className={persona === x ? 'active' : ''} key={x}>{x}</button>)}</div>
          <article className="persona-detail" role="tabpanel"><Users /><p className="eyebrow">Designed task view</p><h3>{persona}</h3><p>{personas[persona]}</p><div className="mini-flow"><span>Relevant work</span><ArrowRight /><span>Source context</span><ArrowRight /><span>Recorded action</span></div></article>
        </div>
      </div>
    </div></section>
    <section id="capabilities" className="section"><div className="container">
      <SectionHeading eyebrow="Product capability families" title="Reusable document services, controls, and experiences." copy="Select a family to inspect capabilities that can be configured for a specific process." />
      <div className="capability-layout"><div className="capability-tabs" role="tablist" aria-label="Capability families">{Object.keys(capabilities).map((x, i) => <button role="tab" aria-selected={capability === x} className={capability === x ? 'active' : ''} onClick={() => setCapability(x)} key={x}><span>0{i + 1}</span>{x}<ChevronRight /></button>)}</div>
        <div className="capability-detail" role="tabpanel"><div className="capability-head"><span className="icon-orb"><Boxes /></span><div><p className="eyebrow">Capability family</p><h3>{capability}</h3></div></div><div className="check-grid">{capabilities[capability].map(x => <div key={x}><Check />{x}</div>)}</div></div>
      </div>
    </div></section>
  </>
}

function LandmarkIcon({ name }: { name: string }) {
  if (name === 'Insurance') return <ShieldCheck />
  if (name === 'Financial Services') return <BarChart3 />
  return <Layers3 />
}

function Workspace() {
  const [packageIndex, setPackageIndex] = useState(0)
  const [docIndex, setDocIndex] = useState(0)
  const [fieldIndex, setFieldIndex] = useState(0)
  const [audit, setAudit] = useState(false)
  const [exceptionState, setExceptionState] = useState('Open')
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(packages[0].fields[0].value)
  const pkg: Package = packages[packageIndex], field = pkg.fields[fieldIndex]
  const choosePackage = (i: number) => { setPackageIndex(i); setDocIndex(0); setFieldIndex(0); setValue(packages[i].fields[0].value); setExceptionState('Open'); setEdit(false) }
  const chooseField = (i: number) => { setFieldIndex(i); setValue(pkg.fields[i].value); setEdit(false) }
  return <section id="workspace" className="section workspace-section"><div className="container wide">
    <SectionHeading eyebrow="Interactive product view" title="Inspect the source. Review the proposed data. Record the action." copy="Choose a fictional package and explore a document-to-data review experience." />
    <div className="notice"><Fingerprint />This demonstration uses fictional data. Extracted information requires review according to the organization’s configured policies.</div>
    <TabList items={packages.map(x => x.name)} selected={pkg.name} onSelect={x => choosePackage(packages.findIndex(y => y.name === x))} label="Fictional document packages" />
    <div className="product-shell">
      <header className="product-header"><div><FileStack /><span><small>DOCUMENT PACKAGE</small><strong>{pkg.name}</strong></span></div><div><Pill tone="attention">{pkg.status}</Pill><Button variant="quiet" onClick={() => setAudit(!audit)}><History size={17} /> Audit history</Button></div></header>
      <div className="product-body">
        <aside className="documents-pane"><div className="pane-title"><span>Documents received</span><Pill>{pkg.documents.length}</Pill></div>{pkg.documents.map((doc, i) => <button className={docIndex === i ? 'active' : ''} key={doc.name} onClick={() => setDocIndex(i)}><FileCheck2 /><span>{doc.name}<small>{doc.pages} pages · {doc.state}</small></span></button>)}
          <div className="missing-card"><AlertTriangle /><div><small>MISSING DOCUMENT</small><strong>{pkg.missing}</strong></div></div>
        </aside>
        <div className="source-pane"><div className="pane-title"><span>{pkg.documents[docIndex].name}</span><span>Page 1 / {pkg.documents[docIndex].pages}</span></div>
          <div className="source-document"><span className="fictional-stamp">FICTIONAL</span><div className="doc-brand">NORTHSTAR <small>DOCUMENT SERVICES</small></div><div className="doc-rule"></div><h4>{pkg.documents[docIndex].name}</h4>{[88, 65, 92, 73, 84, 56, 94, 77, 68].map((w, i) => <div key={i} className="document-line" style={{ width: `${w}%` }}></div>)}{docIndex === 0 && <div className="source-highlight" style={{ left: `${field.box[0]}%`, top: `${field.box[1]}%`, width: `${field.box[2]}%`, height: `${field.box[3]}%` }}><span>{field.label}</span></div>}</div>
        </div>
        <aside className="review-pane">
          {audit ? <AuditPanel onClose={() => setAudit(false)} /> : <>
            <div className="pane-title"><span>Extracted fields</span><span>{pkg.fields.length} fields</span></div>
            <div className="field-list">{pkg.fields.map((x, i) => <button key={x.label} className={fieldIndex === i ? 'active' : ''} onClick={() => chooseField(i)}><span><small>{x.label}</small><strong>{x.value}</strong><em>{x.source}</em></span><Pill tone={x.confidence < 85 ? 'attention' : 'cyan'}>{x.confidence}%</Pill></button>)}</div>
            <div className="field-actions">{edit ? <><label>Correct fictional value<input value={value} onChange={e => setValue(e.target.value)} /></label><Button onClick={() => setEdit(false)}><Check size={16} /> Record correction</Button></> : <Button variant="secondary" onClick={() => setEdit(true)}><Pencil size={15} /> Correct value</Button>}</div>
            <div className="checks"><small>VALIDATION CHECKS</small>{pkg.checks.map((x, i) => <p key={x}>{i === pkg.checks.length - 1 ? <AlertTriangle /> : <CheckCircle2 />}{x}</p>)}</div>
          </>}
        </aside>
      </div>
      <footer className="product-footer"><div><small>OPEN EXCEPTION</small><strong><AlertTriangle />{pkg.exception}</strong><span>Reviewer note: {pkg.note}</span></div><div><Pill tone={exceptionState === 'Open' ? 'attention' : 'cyan'}>{exceptionState}</Pill>{exceptionState === 'Open' ? <><Button variant="secondary" onClick={() => setExceptionState('Escalated')}>Escalate</Button><Button onClick={() => setExceptionState('Resolved by reviewer')}>Resolve exception</Button></> : <Button variant="secondary" onClick={() => setExceptionState('Open')}>Reset demo</Button>}</div></footer>
      <div className="next-action"><Route /><span><small>NEXT AUTHORIZED ACTION</small>{pkg.next}</span></div>
    </div>
  </div></section>
}

function AuditPanel({ onClose }: { onClose: () => void }) {
  return <div className="audit-panel"><div className="pane-title"><span>Processing history</span><button className="icon-button" aria-label="Close audit history" onClick={onClose}><X /></button></div>
    {[['14:18', 'Package received', 'Secure portal'], ['14:19', 'Documents classified', 'Classification service v3.2'], ['14:20', 'Fields proposed', 'Extraction schema v7'], ['14:20', 'Rules evaluated', 'Validation ruleset v12'], ['14:21', 'Review task created', 'Lending Operations · Tier 2']].map(([time, title, by]) => <div className="audit-row" key={title}><span>{time}</span><i></i><div><strong>{title}</strong><small>{by}</small></div></div>)}
    <p className="audit-note">Proposed values, model and rule versions, source references, and reviewer actions remain associated with this fictional processing record.</p>
  </div>
}

function ComparisonAndAI() {
  const rows = [
    ['Applicant name', 'Northstar Bicycle Works LLC', 'Northstar Bicycle Works LLC', 'Confirmed'],
    ['Business address', '142 Cedar Avenue', '142 Cedar Ave., Suite 4', 'Source conflict'],
    ['Reported income', '$684,000', '$684,000', 'Confirmed'],
    ['Statement period', 'Jan–Jun 2026', 'Jan–May 2026', 'Review recommended'],
    ['Requested amount', '$240,000', '—', 'Missing'],
  ]
  return <>
    <section className="section tint-section"><div className="container">
      <SectionHeading eyebrow="Cross-document comparison" title="Bring related values into one neutral exception view." copy="Differences are presented for review; a discrepancy does not by itself indicate fraud or determine a business outcome." />
      <div className="comparison-card"><div className="comparison-head"><div><GitCompareArrows /><span><strong>Commercial loan package</strong><small>Fictional comparison set</small></span></div><Pill tone="attention">2 items need review</Pill></div>
        <div className="comparison-table" role="table" aria-label="Fictional cross-document comparison">
          <div role="row" className="comparison-row table-head"><span>FIELD</span><span>APPLICATION</span><span>FINANCIAL STATEMENT</span><span>STATUS</span></div>
          {rows.map(row => <div role="row" className="comparison-row" key={row[0]}>{row.slice(0, 3).map((x, i) => <span key={i} data-label={['Field', 'Application', 'Financial statement'][i]}>{x}</span>)}<span data-label="Status"><Pill tone={row[3] === 'Confirmed' ? 'positive' : 'attention'}>{row[3]}</Pill></span></div>)}
        </div>
      </div>
    </div></section>
    <section className="section ai-section"><div className="container">
      <SectionHeading eyebrow="Agentic orchestration" title="AI assistance within a controlled processing workflow." copy="Specialized agents may perform bounded tasks using assigned permissions, approved data boundaries, configured tools, and defined escalation rules." />
      <div className="agent-flow" aria-label="Controlled AI-assisted workflow">{['Document received', 'Bounded AI task', 'Configured validation', 'Human review when required', 'Approved system update', 'Recorded processing history'].map((x, i) => <div key={x}><span className={i === 3 ? 'human-node' : ''}>{i === 3 ? <UserCheck /> : i === 1 ? <Sparkles /> : <CheckCircle2 />}{x}</span>{i < 5 && <ArrowRight />}</div>)}</div>
      <div className="agent-grid">{['Organize a package', 'Propose classifications', 'Extract requested information', 'Compare related documents', 'Check package completeness', 'Prepare a summary', 'Create a review task', 'Route an exception', 'Draft a processing note'].map(x => <div key={x}><Sparkles />{x}</div>)}</div>
      <p className="boundary-note"><ShieldCheck />This is not a free-running autonomous agent. Approved system updates follow configured validation, human-review, and authorization policies.</p>
    </div></section>
  </>
}

function Governance() {
  const controls = ['Source traceability', 'Human review', 'Model and prompt versioning', 'Role-based permissions', 'Data minimization', 'Retention policies', 'Encryption', 'Redaction', 'Confidence thresholds', 'Override capture', 'Accuracy monitoring', 'Drift monitoring', 'Approved model selection', 'Environment separation', 'Audit history']
  return <section id="governance" className="section governance-section"><div className="container">
    <div className="authority-card"><div className="authority-copy"><Pill tone="cyan">Decision authority</Pill><h2>Keep consequential decisions with authorized professionals.</h2><p>MTX supplies information and workflow support. It does not replace authorized credit, coverage, compliance, suitability, or claims decisions.</p><Button variant="secondary" onClick={() => document.getElementById('workspace')?.scrollIntoView()}>Explore the review experience <ArrowRight size={16} /></Button></div>
      <div className="authority-points">{['Configure thresholds by document type, confidence, risk, and process.', 'Inspect source material alongside proposed values.', 'Record corrections, override reasons, and reviewer actions.', 'Route low-confidence or conflicting information for review.', 'Apply the organization’s approval policies to downstream actions.'].map(x => <div key={x}><UserCheck />{x}</div>)}</div>
    </div>
    <div className="governance-copy"><SectionHeading eyebrow="Responsible AI and governance" title="Controls designed into the processing record." copy="Configuration supports governance activities; it does not by itself create compliance with a law, regulation, or industry framework." />
      <div className="control-grid">{controls.map((x, i) => <div key={x}><span>{i % 3 === 0 ? <Fingerprint /> : i % 3 === 1 ? <LockKeyhole /> : <ShieldCheck />}</span>{x}</div>)}</div>
    </div>
  </div></section>
}

const volumeData = [{ name: 'Onboarding', value: 342 }, { name: 'Lending', value: 278 }, { name: 'Claims', value: 226 }, { name: 'Finance', value: 154 }]
const statusData = [{ name: 'Processing', value: 36 }, { name: 'Review', value: 24 }, { name: 'Ready for handoff', value: 28 }, { name: 'Exception', value: 12 }]
const chartColors = ['#29d3c2', '#4b80ff', '#9baac0', '#f4b65d']

function Analytics() {
  const [period, setPeriod] = useState('Today')
  const metrics = [
    ['Documents received', '1,284', 'Incoming files recorded'],
    ['Pages processed', '4,912', 'Pages entering preparation'],
    ['Classification confidence', '91%', 'Median confidence, not an accuracy rate'],
    ['Extraction confidence', '88%', 'Median proposed field confidence'],
    ['Fields requiring correction', '73', 'Fields changed by reviewers'],
    ['Package-completeness rate', '84%', 'Packages meeting configured checklist'],
    ['Average handling time', '12m', 'Fictional active reviewer time'],
    ['Integration failures', '4', 'Downstream delivery attempts needing attention'],
  ]
  return <section id="analytics" className="section analytics-section"><div className="container wide">
    <div className="analytics-heading"><SectionHeading eyebrow="Operational analytics" title="See quality, workload, and processing conditions." /><TabList items={['Today', '7 days', '30 days']} selected={period} onSelect={setPeriod} label="Analytics period" /></div>
    <div className="analytics-label">Illustrative analytics — not MTX or customer results. <span>{period}</span></div>
    <div className="metric-grid">{metrics.map(([label, value, tip]) => <div className="metric-card" key={label} title={tip} tabIndex={0}><small>{label} <CircleGauge size={14} aria-label={`Definition: ${tip}`} /></small><strong>{value}</strong><span>{tip}</span></div>)}</div>
    <div className="chart-grid">
      <figure className="chart-card"><figcaption><strong>Processing volume by workflow</strong><span>Fictional packages</span></figcaption><ResponsiveContainer width="100%" height={240}><BarChart data={volumeData} margin={{ left: -20 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d9e1e9" /><XAxis dataKey="name" tick={{ fill: '#607085', fontSize: 12 }} /><YAxis tick={{ fill: '#607085', fontSize: 12 }} /><Tooltip /><Bar dataKey="value" fill="#20ad9f" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer><p className="sr-summary">Bar chart: Onboarding 342, Lending 278, Claims 226, Finance 154 fictional packages.</p></figure>
      <figure className="chart-card"><figcaption><strong>Packages by status</strong><span>Fictional distribution</span></figcaption><div className="donut-wrap"><ResponsiveContainer width="55%" height={240}><PieChart><Pie data={statusData} dataKey="value" innerRadius={62} outerRadius={91} paddingAngle={2}>{statusData.map((_, i) => <Cell key={i} fill={chartColors[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="chart-legend">{statusData.map((x, i) => <span key={x.name}><i style={{ background: chartColors[i] }}></i>{x.name}<strong>{x.value}%</strong></span>)}</div></div><p className="sr-summary">Donut chart: Processing 36%, Review 24%, Ready for handoff 28%, Exception 12%.</p></figure>
      <div className="chart-card queue-card"><div><strong>Queue aging and workload</strong><span>Fictional reviewer queues</span></div>{[['Intake review', 72, '18 items'], ['Lending · Tier 2', 48, '12 items'], ['Claims examination', 36, '9 items'], ['Quality control', 20, '5 items']].map(([x, w, v]) => <div className="queue-row" key={x}><span>{x}<b>{v}</b></span><i><em style={{ width: `${w}%` }}></em></i></div>)}</div>
      <div className="chart-card exception-card"><div><strong>Exceptions by category</strong><span>Fictional processing conditions</span></div>{[['Missing package item', '31'], ['Source conflict', '18'], ['Low confidence', '15'], ['Reference check', '9']].map(([x, v]) => <div key={x}><span>{x}</span><strong>{v}</strong></div>)}<div className="candidate-note"><Activity /><span><small>STRAIGHT-THROUGH PROCESSING CANDIDATES</small><strong>126 packages</strong><em>Candidates still follow configured policy and monitoring.</em></span></div></div>
    </div>
  </div></section>
}

function Architecture() {
  const [layer, setLayer] = useState('Document Intelligence')
  return <section id="architecture" className="section architecture-section"><div className="container">
    <SectionHeading eyebrow="Platform-neutral architecture" title="Fit document intelligence into the institution’s approved environment." copy="Actual components depend on customer architecture, security requirements, data sensitivity, and approved technology standards." />
    <div className="architecture-shell"><div className="architecture-map">{Object.entries(architecture).map(([name, items], i) => <button onClick={() => setLayer(name)} className={layer === name ? 'active' : ''} key={name}><span>{i === 0 ? <FileStack /> : i === 1 ? <Sparkles /> : i === 2 ? <Route /> : i === 3 ? <UserCheck /> : i === 4 ? <Network /> : i === 5 ? <ShieldCheck /> : <Database />}</span><div><strong>{name}</strong><small>{items.slice(0, 3).join(' · ')}</small></div><ChevronRight /></button>)}</div>
      <aside className="architecture-detail"><Pill tone="cyan">Selected layer</Pill><h3>{layer}</h3><div className="architecture-items">{architecture[layer].map(x => <span key={x}>{x}</span>)}</div><p>Components are selected and configured according to the institution’s approved standards.</p></aside>
    </div>
    <div className="integration-panel"><div><p className="eyebrow">Integration ecosystem</p><h3>Connect through approved enterprise patterns.</h3><p>Integration categories describe connection targets, not prebuilt production connections.</p></div><div className="connection-patterns">{['REST APIs', 'Events', 'Webhooks', 'Secure file exchange', 'Message queues', 'Approved middleware', 'Batch processing'].map(x => <Pill key={x} tone="cyan">{x}</Pill>)}</div>
      <div className="integration-grid">{['Core banking systems', 'Loan-origination platforms', 'Policy-administration systems', 'Claims-management systems', 'Customer and relationship platforms', 'Enterprise content repositories', 'Financial and ERP systems', 'Identity-verification services', 'Credit and risk-data providers', 'Payment services', 'Data warehouses and lakehouses', 'Workflow and case-management platforms', 'Communication services', 'Reporting and analytics tools'].map(x => <span key={x}><Network />{x}</span>)}</div>
    </div>
  </div></section>
}

function Configuration() {
  const fields = [{ name: 'Applicant name', score: 97 }, { name: 'Business address', score: 82 }, { name: 'Requested amount', score: 94 }, { name: 'Ownership share', score: 76 }, { name: 'Statement period', score: 88 }]
  const [threshold, setThreshold] = useState(85)
  const review = fields.filter(x => x.score < threshold)
  return <section className="section config-section"><div className="container">
    <SectionHeading eyebrow="Configuration studio" title="Adapt document rules without rebuilding the foundation." copy="Document types, schemas, checklists, roles, mappings, policies, and dashboard measures can be configured for an approved workflow." />
    <div className="config-shell"><aside><p className="eyebrow">Workflow configuration</p><h3>Commercial lending intake</h3>{['Document types', 'Extraction schema', 'Package checklist', 'Validation rules', 'Review requirements', 'Queue assignments', 'Downstream mappings', 'Retention settings'].map((x, i) => <button className={i === 3 ? 'active' : ''} key={x}><span>{i + 1}</span>{x}{i === 3 && <Pill tone="cyan">Editing</Pill>}</button>)}</aside>
      <div className="rule-builder"><div className="rule-title"><SlidersHorizontal /><div><small>CONFIDENCE RULE</small><h3>Route fields below threshold</h3></div><Pill tone="attention">{review.length} in review</Pill></div>
        <label htmlFor="threshold">Review threshold <strong>{threshold}%</strong></label><input id="threshold" type="range" min="70" max="99" value={threshold} onChange={e => setThreshold(Number(e.target.value))} /><div className="range-labels"><span>70%</span><span>99%</span></div>
        <div className="threshold-fields">{fields.map(x => <div key={x.name} className={x.score < threshold ? 'review' : ''}><span>{x.name}<small>{x.score < threshold ? 'Review queue' : 'No confidence review triggered'}</small></span><strong>{x.score}%</strong></div>)}</div>
        {review.length === 0 && <div className="empty-state"><CheckCircle2 />No fictional fields fall below this threshold.</div>}
        <p className="demo-disclaimer">Interactive rules demonstration only. It does not execute a real model or change a production workflow.</p>
      </div>
    </div>
  </div></section>
}

function Adoption() {
  const [phase, setPhase] = useState(Object.keys(roadmap)[0])
  const model = {
    Product: 'Reusable intake, classification, extraction, validation, review, audit, administration, analytics, and integration capabilities.',
    'Implementation Services': 'Process discovery, document analysis, configuration, model selection, integration, testing, security preparation, training, and deployment.',
    'Managed Services': 'Production monitoring, incident support, model and rule updates, quality review, release management, reporting support, and workflow optimization.',
    'Advisory Services': 'Document-process inventory, automation opportunity assessment, value analysis, governance planning, and implementation roadmap.',
  }
  const differences = {
    'Reusable document-intelligence services': 'Share intake, extraction, validation, and review patterns across configured workflows.',
    'Configurable industry workflows': 'Shape document types, rules, queues, and controls around an institution’s operating model.',
    'Platform and model flexibility': 'Use approved commercial, open-source, or frontier models within the preferred deployment environment.',
    'Source-level traceability': 'Keep proposed values connected to source locations, processing results, and reviewer actions.',
    'Human-controlled exception handling': 'Direct uncertain or conflicting information to authorized staff under configured policies.',
    'Phased enterprise adoption': 'Start with a focused process and reuse the governed foundation for related workflows.',
  }
  return <section id="adoption" className="section adoption-section"><div className="container">
    <SectionHeading eyebrow="Modular adoption" title="Begin with a focused workflow, then reuse what fits." copy="This illustrative roadmap should be adjusted to the customer’s operating environment." />
    <div className="roadmap-tabs" role="tablist" aria-label="Adoption phases">{Object.keys(roadmap).map(x => <button key={x} role="tab" aria-selected={phase === x} className={phase === x ? 'active' : ''} onClick={() => setPhase(x)}><span>{x.split(' — ')[0]}</span>{x.split(' — ')[1]}</button>)}</div>
    <div className="roadmap-detail" role="tabpanel"><div><p className="eyebrow">Current phase</p><h3>{phase}</h3></div><div>{roadmap[phase].map(x => <span key={x}><Check />{x}</span>)}</div></div>
    <div className="subsection"><SectionHeading eyebrow="Product and delivery model" title="The product leads. Services support adoption and operation." /><div className="delivery-grid">{Object.entries(model).map(([x, text], i) => <div className={i === 0 ? 'featured' : ''} key={x}><span>{i === 0 ? <Boxes /> : i === 1 ? <Settings2 /> : i === 2 ? <Activity /> : <BookOpenCheck />}</span><h3>{x}</h3><p>{text}</p>{i === 0 && <Pill tone="cyan">Core product</Pill>}</div>)}</div></div>
    <div className="subsection"><SectionHeading eyebrow="Why MTX Intelligent Document Processing" title="A reusable solution layer for document-intensive work." /><div className="differentiator-grid">{Object.entries(differences).map(([x, text], i) => <div key={x}><span>0{i + 1}</span><h3>{x}</h3><p>{text}</p></div>)}</div></div>
  </div></section>
}

function Footer({ onDemo }: { onDemo: () => void }) {
  return <><section className="final-cta"><div className="container"><div><p className="eyebrow">A practical starting point</p><h2>Start with one document process. Build a reusable enterprise capability.</h2><p>Explore how MTX Intelligent Document Processing can organize incoming documents, extract relevant information, direct exceptions to reviewers, and connect approved data with your existing systems.</p><div className="hero-actions"><Button onClick={onDemo}>Request a Product Demonstration <ArrowRight size={17} /></Button><Button variant="secondary" onClick={onDemo}>Discuss a Document Automation Roadmap</Button></div></div><div className="cta-mark"><FileStack /><span>Source</span><ArrowRight /><Database /><span>Governed information</span></div></div></section>
    <footer><div className="container footer-grid"><div><a href="#top" className="wordmark" aria-label="MTX home"><span>MTX</span></a><p>AI-assisted document processing for banking, financial services, and insurance.</p></div><div><strong>Explore</strong><a href="#product">Product</a><a href="#lifecycle">How it works</a><a href="#workspace">Product view</a></div><div><strong>Principles</strong><a href="#governance">Human review</a><a href="#architecture">Platform-neutral architecture</a><a href="#analytics">Illustrative analytics</a></div><div><strong>Prototype notice</strong><p>This concept uses local fictional data. No form information is transmitted.</p></div></div><div className="container footer-bottom"><span>© 2026 MTX Group Inc. Prototype experience.</span><span>Fictional data · No external API calls</span></div></footer></>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return <div id="top">
    <a className="skip-link" href="#main">Skip to main content</a>
    <header className="site-header"><a href="#top" className="wordmark" aria-label="MTX home"><span>MTX</span><small>Intelligent Document Processing</small></a>
      <button className="menu-button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}<span>Menu</span></button>
      <nav id="primary-nav" className={menuOpen ? 'open' : ''} aria-label="Primary navigation">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<Button onClick={() => { setModalOpen(true); setMenuOpen(false) }}>Request a Demo</Button></nav>
    </header>
    <main id="main">
      <section id="product" className="hero"><div className="container hero-layout"><div className="hero-copy"><p className="eyebrow">MTX Financial Services</p><h1>Turn complex documents into <span>governed, usable information.</span></h1><p className="hero-lede">MTX Intelligent Document Processing classifies incoming documents, extracts relevant information, applies configurable validations, and directs exceptions to authorized reviewers—while preserving traceability to the source.</p><div className="hero-actions"><Button onClick={() => setModalOpen(true)}>Request a Product Demonstration <ArrowRight size={17} /></Button><Button variant="secondary" onClick={() => document.getElementById('lifecycle')?.scrollIntoView()}>Explore the Processing Lifecycle <ChevronDown size={17} /></Button></div><div className="hero-trust"><span><ShieldCheck />Human-controlled review</span><span><Network />Platform-neutral design</span><span><History />Source traceability</span></div></div><HeroWorkspace /></div></section>
      <section className="outcome-strip" aria-label="Product objectives"><div className="container">{[['Structured data from complex documents', FileSearch], ['Traceability to the source', Fingerprint], ['Human-controlled exception handling', UserCheck], ['Reusable enterprise capabilities', Layers3]].map(([x, Icon]) => { const ObjectiveIcon = Icon as LucideIcon; return <div key={x as string}><ObjectiveIcon /><span>{x as string}</span></div> })}</div></section>
      <Challenges /><Lifecycle /><SelectorSections /><Workspace /><ComparisonAndAI /><Governance /><Analytics /><Architecture /><Configuration /><Adoption />
    </main>
    <Footer onDemo={() => setModalOpen(true)} />
    <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} />
  </div>
}
