// shortcut: placeholder inbox, replace before launch; the contact form opens a mail draft to it.
export const contactEmail = 'hello@krsi.in'

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#insights' },
  { label: 'Contact', href: '#contact' },
]

export const rail = [
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'systems', label: 'Core System' },
  { id: 'features', label: 'Features' },
  { id: 'insights', label: 'Blogs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export const layers = [
  { title: 'Asset Origination Layer', points: ['KYC/AML Check.', 'Title Verification.', 'Custodian.', 'Documentation.'] },
  { title: 'Tokenization Layer', points: ['Verified receipts become digital records.', 'Each lot keeps a unique identity.', 'Rights stay mapped to the legal receipt.'] },
  { title: 'Oracle & Data Layer', points: ['Pricing, quality and weather feeds.', 'IoT readings from the warehouse.', 'AI risk signals on every lot.'] },
  { title: 'Credit Layer', points: ['Collateral-backed lending.', 'Lender-set limits and haircuts.', 'Repayment releases the lot.'] },
  { title: 'Liquidation Layer', points: ['Lender-approved enforcement only.', 'Transparent sale of pledged stock.', 'Proceeds settle against the loan.'] },
  { title: 'Settlement Layer', points: ['Payment and release on one record.', 'Bank rails for every rupee.', 'Full audit trail.'] },
  { title: 'Governance & Treasury Layer', points: ['Policies for onboarding and release.', 'Segregated roles and approvals.', 'Reporting for partners.'] },
]

export const workflow = ['Register & Verify', 'Store Commodities', 'Issue Digital Warehouse Receipt', 'Finance or Trade']

export const pillars = [
  { title: 'Digital Onboarding', detail: 'Secure onboarding for farmers, cooperatives, warehouses, traders, exporters, and financial institutions.' },
  { title: 'Warehouse Infrastructure', detail: 'Manage storage, inventory, quality inspection, IoT monitoring, and warehouse operations from one platform.' },
  { title: 'Embedded Finance', detail: 'Unlock working capital through trusted digital warehouse receipts and integrated lending partners.' },
  { title: 'Intelligence & Compliance', detail: 'Monitor commodity movement, market insights, warehouse performance, and compliance with real-time analytics.' },
]

export const capabilities = [
  { title: 'Originate', detail: 'Verify farmers, warehouses, and title before a lot enters the system.' },
  { title: 'Tokenize', detail: 'Turn verified warehouse receipts into programmable digital records.' },
  { title: 'Finance', detail: 'Lend against stored produce with clear collateral and limits.' },
  { title: 'Trade', detail: 'Sell to verified buyers with settlement on the same record.' },
]

export const systems = [
  { code: '001', title: 'Store', image: '/assets/store.webp', detail: 'Store your produce in verified warehouse, convert it into digital warehouse receipts, and unlock finance and better prices.' },
  { code: '002', title: 'Finance', image: '/assets/finance.webp', detail: 'Leverage your stored produce as collateral to access flexible credit, with transparent and faster approval using blockchain and AI.' },
  { code: '003', title: 'Trade', image: '/assets/trade.webp', detail: 'Buy, sell and trade agricultural commodities with verified partners with full visibility, speed and trust.' },
]

export const loanCopy = 'Enjoy the ease of securing a loan without a guarantor, offering you quicker access to funds with fewer requirements.'

export const integrationGroups = [
  {
    name: 'Identity & KYC',
    tools: [
      { name: 'DigiLocker', detail: 'Aadhaar-based e-KYC' },
      { name: 'Phone OTP', detail: 'Verified sign-in for every user' },
      { name: 'Business KYC', detail: 'Warehouses, traders and lenders' },
      { name: 'Sanctions', detail: 'Screening before onboarding' },
      { name: 'Roles', detail: 'Farmer, operator and lender access' },
      { name: 'Audit log', detail: 'Who verified what, and when' },
    ],
  },
  {
    name: 'Warehouse',
    tools: [
      { name: 'Bookings', detail: 'Capacity, slots and commodities' },
      { name: 'Intake', detail: 'Weight, grade and moisture' },
      { name: 'IoT sensors', detail: 'Temperature and humidity' },
      { name: 'Inspection', detail: 'Assayer certificates on file' },
      { name: 'Documents', detail: 'Receipts and photos per lot' },
      { name: 'Release', detail: 'Approved outward movement' },
    ],
  },
  {
    name: 'Finance',
    tools: [
      { name: 'Lenders', detail: 'Banks and NBFC partners' },
      { name: 'Collateral', detail: 'Pledged lots and limits' },
      { name: 'Invoices', detail: 'Storage and service billing' },
      { name: 'Repayments', detail: 'Release on settlement' },
      { name: 'Insurance', detail: 'Cover on stored produce' },
      { name: 'Reporting', detail: 'Portfolio views for lenders' },
    ],
  },
  {
    name: 'Communication',
    tools: [
      { name: 'WhatsApp', detail: 'Updates where farmers already are' },
      { name: 'SMS', detail: 'Alerts without a smartphone' },
      { name: 'Email', detail: 'Statements and invoices' },
      { name: 'Languages', detail: 'Local-language interfaces' },
      { name: 'Dashboards', detail: 'Operator and lender views' },
      { name: 'Webhooks', detail: 'Events for partner systems' },
    ],
  },
]

export const integrationTraits = ['Bidirectional', 'Secured by default', 'Context-aware']

export const notes = [
  {
    title: 'Revolutionizing warehouse receipts finance with AI, Blockchain & DePin',
    tag: 'Medium',
    date: 'Jun 11, 2025',
    image: '/assets/blog/introducing-krsi.webp',
    href: 'https://medium.com/krsi-xyz/introducing-krsi-revolutionizing-warehouse-receipts-finance-with-ai-blockchain-depin-f51ad7c5d250',
  },
  {
    title: 'What Is a Warehouse Receipt?',
    tag: 'Medium',
    date: 'Jun 18, 2025',
    image: '/assets/blog/what-is-a-warehouse-receipt.webp',
    href: 'https://medium.com/krsi-xyz/what-is-a-warehouse-receipt-its-key-features-and-functions-7654081d28aa',
  },
  {
    title: 'Why Farmers Are Forced to Distress Sell and How to Stop It',
    tag: 'Medium',
    date: 'Jun 24, 2025',
    image: '/assets/blog/distress-selling.webp',
    href: 'https://medium.com/krsi-xyz/why-farmers-are-forced-to-distress-sell-and-how-to-stop-it-3a558ede9f14',
  },
]

export const faqs = [
  {
    q: 'What is a digital warehouse receipt?',
    a: 'A digital record of a specific lot in a verified warehouse: commodity, quantity, grade and owner. It is what lenders and buyers check before they act.',
  },
  {
    q: 'Who can use Krsi?',
    a: 'Farmers, farmer producer organizations, cooperatives, warehouses, traders, exporters and financial institutions. Each gets a view built for their role.',
  },
  {
    q: 'How do I get finance against my produce?',
    a: 'Store the lot in a verified warehouse, complete KYC, and request finance against the receipt. The lending partner makes the credit decision and sets the terms.',
  },
  {
    q: 'Does Krsi lend money itself?',
    a: 'No. Krsi is the infrastructure. Credit decisions and disbursement stay with our regulated lending partners.',
  },
  {
    q: 'How is my data protected?',
    a: 'Identity data stays off-chain in access-controlled storage. Only the minimum needed to verify a lot is shared with the partners you choose.',
  },
  {
    q: 'Which commodities are supported?',
    a: 'We start with staples such as wheat, rice, millet and coffee, and add commodities as warehouse and grading partners come on board.',
  },
]

export const footerPages = [
  { label: 'Homepage', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#systems' },
  { label: 'Blog', href: '#insights' },
  { label: 'Contact', href: '#contact' },
]

// shortcut: add real profile URLs here; the Social column renders only when this has entries.
export const socials: { label: string; href: string }[] = []

export const incubators = [
  { name: 'NITI Aayog', logo: '' },
  { name: 'Atal Innovation Mission', logo: '/assets/incubators/aim.webp' },
  { name: 'Coffee Board', logo: '/assets/incubators/coffee-board.webp' },
  { name: 'AIC CCRI CED', logo: '/assets/incubators/aic-ccri.webp' },
]
