export const INITIAL_LEADS = [
  {
    id: "lead-1",
    name: "Sarah Jenkins",
    company: "Acme Corp",
    email: "sjenkins@acme.com",
    value: 12500,
    stage: "Won",
    source: "LinkedIn",
    createdAt: "2026-06-01T10:00:00.000Z",
    owner: "Alex Rivera",
    notes: "Primary point of contact for Acme Enterprise expansion. Interested in our pro tier for 100 seats.",
    history: [
      { id: "h-1-1", date: "2026-06-01T10:00:00.000Z", type: "Created", message: "Lead created from LinkedIn outbound campaign." },
      { id: "h-1-2", date: "2026-06-03T14:30:00.000Z", type: "Contacted", message: "Introductory call completed. Shared product deck." },
      { id: "h-1-3", date: "2026-06-08T09:15:00.000Z", type: "Proposal", message: "Custom enterprise proposal sent: $12.5k annual contract." },
      { id: "h-1-4", date: "2026-06-12T16:00:00.000Z", type: "Won", message: "Contract signed! Onboarding scheduled for next week." }
    ]
  },
  {
    id: "lead-2",
    name: "David Chen",
    company: "Stripe Flow",
    email: "dchen@stripeflow.io",
    value: 8200,
    stage: "Proposal",
    source: "Product Sign-up",
    createdAt: "2026-06-05T09:30:00.000Z",
    owner: "Alex Rivera",
    notes: "CTO of Stripe Flow. Evaluating API latency and data residency requirements.",
    history: [
      { id: "h-2-1", date: "2026-06-05T09:30:00.000Z", type: "Created", message: "Created via self-serve developer portal signup." },
      { id: "h-2-2", date: "2026-06-06T11:00:00.000Z", type: "Contacted", message: "Technical Q&A call hosted by Alex and engineering lead." },
      { id: "h-2-3", date: "2026-06-14T15:20:00.000Z", type: "Proposal", message: "Shared draft Service Level Agreement (SLA) & security packet." }
    ]
  },
  {
    id: "lead-3",
    name: "Elena Rostova",
    company: "Nordic Tech",
    email: "elena.r@nordictech.se",
    value: 24000,
    stage: "Qualified",
    source: "Referral",
    createdAt: "2026-06-10T14:00:00.000Z",
    owner: "Sophia Martinez",
    notes: "Referred by our advisor. Large Nordic developer agency looking to standardise CRM operations.",
    history: [
      { id: "h-3-1", date: "2026-06-10T14:00:00.000Z", type: "Created", message: "Lead created via partner referral." },
      { id: "h-3-2", date: "2026-06-12T10:30:00.000Z", type: "Contacted", message: "Exploratory call done. Confirmed budget alignment ($20k+)." }
    ]
  },
  {
    id: "lead-4",
    name: "Marcus Aurelius",
    company: "Stoic Labs",
    email: "marcus@stoiclabs.com",
    value: 4500,
    stage: "New",
    source: "Cold Email",
    createdAt: "2026-06-17T08:00:00.000Z",
    owner: "Sophia Martinez",
    notes: "Sent cold sequence. Opened email 5 times, clicked landing page link.",
    history: [
      { id: "h-4-1", date: "2026-06-17T08:00:00.000Z", type: "Created", message: "Imported from Outbound Outplay campaign." }
    ]
  },
  {
    id: "lead-5",
    name: "Amanda Hugg",
    company: "Apex Media",
    email: "amanda@apexmedia.net",
    value: 6000,
    stage: "Contacted",
    source: "Inbound",
    createdAt: "2026-06-14T11:45:00.000Z",
    owner: "Marcus Vance",
    notes: "Submitted contact form. Needs custom dashboard branding capabilities.",
    history: [
      { id: "h-5-1", date: "2026-06-14T11:45:00.000Z", type: "Created", message: "Form submission: 'I need a custom CRM dashboard white-labeling solution...'" },
      { id: "h-5-2", date: "2026-06-16T15:00:00.000Z", type: "Contacted", message: "Sent introductory response email. Left voicemail." }
    ]
  },
  {
    id: "lead-6",
    name: "Thomas Anderson",
    company: "Matrix Solutions",
    email: "neo@matrix.io",
    value: 15000,
    stage: "Lost",
    source: "LinkedIn",
    createdAt: "2026-05-20T16:20:00.000Z",
    owner: "Sophia Martinez",
    notes: "Decided to build an internal dashboard solution instead. Keep in touch next year.",
    history: [
      { id: "h-6-1", date: "2026-05-20T16:20:00.000Z", type: "Created", message: "Lead added via LinkedIn import." },
      { id: "h-6-2", date: "2026-05-22T10:00:00.000Z", type: "Contacted", message: "Demo call completed. Technical requirements match." },
      { id: "h-6-3", date: "2026-06-05T14:00:00.000Z", type: "Lost", message: "Lost to internal build. Mark as closed/lost." }
    ]
  },
  {
    id: "lead-7",
    name: "Diana Prince",
    company: "Themyscira Global",
    email: "diana@themyscira.co",
    value: 30000,
    stage: "Qualified",
    source: "Inbound",
    createdAt: "2026-06-08T09:00:00.000Z",
    owner: "Marcus Vance",
    notes: "Non-profit global coalition. High value lead. Needs strong data access controls and enterprise logging.",
    history: [
      { id: "h-7-1", date: "2026-06-08T09:00:00.000Z", type: "Created", message: "Inbound demo request received." },
      { id: "h-7-2", date: "2026-06-11T13:00:00.000Z", type: "Contacted", message: "Initial qualification call. Fits enterprise tier profile perfectly." }
    ]
  },
  {
    id: "lead-8",
    name: "Bruce Wayne",
    company: "Wayne Enterprises",
    email: "bwayne@wayne.com",
    value: 50000,
    stage: "Proposal",
    source: "Referral",
    createdAt: "2026-05-25T11:00:00.000Z",
    owner: "Alex Rivera",
    notes: "Huge potential account. Looking at global logistics workspace tracking.",
    history: [
      { id: "h-8-1", date: "2026-05-25T11:00:00.000Z", type: "Created", message: "Referral from board member." },
      { id: "h-8-2", date: "2026-06-01T14:00:00.000Z", type: "Contacted", message: "NDAs signed. Discovery workshop hosted with 5 stakeholders." },
      { id: "h-8-3", date: "2026-06-15T09:00:00.000Z", type: "Proposal", message: "Full bespoke SLA and enterprise quotation sent." }
    ]
  },
  {
    id: "lead-9",
    name: "Tony Stark",
    company: "Stark Industries",
    email: "tony@stark.com",
    value: 45000,
    stage: "Won",
    source: "Product Sign-up",
    createdAt: "2026-06-02T15:00:00.000Z",
    owner: "Marcus Vance",
    notes: "Self-serve signup. Upgraded to scale tier directly. High usage of analytical suite.",
    history: [
      { id: "h-9-1", date: "2026-06-02T15:00:00.000Z", type: "Created", message: "Signed up via website." },
      { id: "h-9-2", date: "2026-06-05T10:00:00.000Z", type: "Won", message: "Self-upgraded using credit card to Scale Annual ($45k contract)." }
    ]
  },
  {
    id: "lead-10",
    name: "Peter Parker",
    company: "Daily Bugle",
    email: "pparker@dailybugle.net",
    value: 3500,
    stage: "Contacted",
    source: "Cold Email",
    createdAt: "2026-06-16T14:30:00.000Z",
    owner: "Sophia Martinez",
    notes: "Local photography agency looking for a quick pipeline tracker. Small budget.",
    history: [
      { id: "h-10-1", date: "2026-06-16T14:30:00.000Z", type: "Created", message: "Imported via local business scrape." },
      { id: "h-10-2", date: "2026-06-18T11:00:00.000Z", type: "Contacted", message: "Spoke on phone. Scheduling demo for tomorrow." }
    ]
  },
  {
    id: "lead-11",
    name: "Arthur Dent",
    company: "Magrathea Ltd",
    email: "arthur@magrathea.co.uk",
    value: 9500,
    stage: "New",
    source: "LinkedIn",
    createdAt: "2026-06-18T16:00:00.000Z",
    owner: "Alex Rivera",
    notes: "SaaS consulting firm. Evaluating lead capture webhooks.",
    history: [
      { id: "h-11-1", date: "2026-06-18T16:00:00.000Z", type: "Created", message: "Added via LinkedIn Sales Navigator." }
    ]
  },
  {
    id: "lead-12",
    name: "Selina Kyle",
    company: "Cat Burglar Alarm Systems",
    email: "selina@cbas.io",
    value: 12000,
    stage: "Qualified",
    source: "LinkedIn",
    createdAt: "2026-06-11T13:45:00.000Z",
    owner: "Marcus Vance",
    notes: "Fast-growing security agency. Needs automated reminders and mobile alerts integration.",
    history: [
      { id: "h-12-1", date: "2026-06-11T13:45:00.000Z", type: "Created", message: "Outreach response accepted." },
      { id: "h-12-2", date: "2026-06-15T15:00:00.000Z", type: "Contacted", message: "Had a 20min intro call. Qualified budget and timeline (Immediate)." }
    ]
  },
  {
    id: "lead-13",
    name: "Clark Kent",
    company: "Daily Planet",
    email: "ckent@dailyplanet.com",
    value: 7500,
    stage: "Lost",
    source: "Inbound",
    createdAt: "2026-05-10T10:00:00.000Z",
    owner: "Sophia Martinez",
    notes: "Requires print layout integrations that we do not support. Left friendly door open.",
    history: [
      { id: "h-13-1", date: "2026-05-10T10:00:00.000Z", type: "Created", message: "Inbound form request." },
      { id: "h-13-2", date: "2026-05-15T11:00:00.000Z", type: "Contacted", message: "Requirement check failed: missing print layouts." },
      { id: "h-13-3", date: "2026-05-20T17:00:00.000Z", type: "Lost", message: "Closed as unqualified/lost due to missing print templates features." }
    ]
  },
  {
    id: "lead-14",
    name: "Carol Danvers",
    company: "Alpha Flight Tech",
    email: "cdanvers@alphaflight.org",
    value: 28000,
    stage: "New",
    source: "Referral",
    createdAt: "2026-06-19T08:15:00.000Z",
    owner: "Alex Rivera",
    notes: "Aerospace SaaS start-up. Fast growing. High urgency. Wants demo this week.",
    history: [
      { id: "h-14-1", date: "2026-06-19T08:15:00.000Z", type: "Created", message: "Referral from existing customer." }
    ]
  },
  {
    id: "lead-15",
    name: "Barry Allen",
    company: "Central City Courier",
    email: "flash@centralcity.net",
    value: 5800,
    stage: "Won",
    source: "Product Sign-up",
    createdAt: "2026-06-07T09:00:00.000Z",
    owner: "Sophia Martinez",
    notes: "Fast delivery service. Standard plan self-serve upgrade.",
    history: [
      { id: "h-15-1", date: "2026-06-07T09:00:00.000Z", type: "Created", message: "Account created." },
      { id: "h-15-2", date: "2026-06-10T12:00:00.000Z", type: "Won", message: "Purchased Growth Standard tier ($5.8k billing cycle)." }
    ]
  }
];

export const INITIAL_TASKS = [
  { id: "task-1", text: "Call David Chen regarding SLA security comments", done: false, date: "Today", leadId: "lead-2" },
  { id: "task-2", text: "Draft Wayne Enterprises logistics workflow customization details", done: false, date: "Today", leadId: "lead-8" },
  { id: "task-3", text: "Send onboarding materials to Sarah Jenkins (Acme Corp)", done: true, date: "Yesterday", leadId: "lead-1" },
  { id: "task-4", text: "Follow up with Marcus Aurelius regarding Stoic Labs cold sequence response", done: false, date: "Tomorrow", leadId: "lead-4" },
  { id: "task-5", text: "Book demo call with Carol Danvers from Alpha Flight Tech", done: false, date: "Tomorrow", leadId: "lead-14" },
  { id: "task-6", text: "Check Stripe Flow security document signed status", done: false, date: "Next Week", leadId: "lead-2" }
];
