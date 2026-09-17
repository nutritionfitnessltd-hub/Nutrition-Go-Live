export const launchAt = '2026-11-01T09:00:00+00:00';

export const workstreams = [
  {id:'offer',name:'Offer & Commercial Model',short:'Offer',description:'Lock exactly what is sold, to whom, for how much, and what happens next.'},
  {id:'tech',name:'NUFI Platform & Technology',short:'Technology',description:'Production readiness, release, authentication, subscriptions and end-to-end technical reliability.'},
  {id:'content',name:'Programmes, Courses & Content',short:'Content',description:'Build the workouts, programmes, courses, recipes and customer education customers actually consume.'},
  {id:'product',name:'Products & Supply Chain',short:'Products',description:'Finalise physical products, packaging, suppliers, stock, fulfilment and unit economics.'},
  {id:'website',name:'Website, Shop & Customer Journey',short:'Website',description:'Make the public buying journey coherent from first visit to purchase and account access.'},
  {id:'marketing',name:'Marketing & Sales Engine',short:'Marketing',description:'Build acquisition, conversion, CRM and lifecycle journeys that support launch sales.'},
  {id:'ops',name:'Business, Finance & Operations',short:'Operations',description:'Make finance, compliance, team ownership and day-to-day operations launch-ready.'},
  {id:'launch',name:'Launch Readiness & Support',short:'Launch',description:'Test the whole business as one system, run beta, freeze scope and execute launch.'}
];

export const phases = [
  {id:'lock',name:'LOCK THE BUSINESS',start:'2026-09-17',end:'2026-09-20',tone:'Lock decisions and stop foundation churn.'},
  {id:'core',name:'BUILD THE CORE',start:'2026-09-21',end:'2026-09-27',tone:'Build the essential product, platform and content structure.'},
  {id:'sellable',name:'MAKE IT SELLABLE',start:'2026-09-28',end:'2026-10-04',tone:'Payments, products, packaging, shop and customer accounts.'},
  {id:'sales',name:'CONNECT THE SALES MACHINE',start:'2026-10-05',end:'2026-10-11',tone:'CRM, funnels, email and acquisition assets.'},
  {id:'uat',name:'FULL UAT',start:'2026-10-12',end:'2026-10-18',tone:'Test complete customer journeys and failure cases.'},
  {id:'beta',name:'REAL-WORLD BETA',start:'2026-10-19',end:'2026-10-25',tone:'Put the finished experience in front of real users.'},
  {id:'freeze',name:'LAUNCH FREEZE',start:'2026-10-26',end:'2026-10-30',tone:'No new features. Fix only launch blockers and quality issues.'},
  {id:'gng',name:'GO / NO-GO',start:'2026-10-31',end:'2026-10-31',tone:'Final launch gate and sign-off.'},
  {id:'live',name:'GO LIVE',start:'2026-11-01',end:'2026-11-01',tone:'Warm launch first, then scale traffic.'}
];

const T=(id,workstream,phase,title,priority,due,instructions,doneMeans,dependencies=[],owner='Unassigned',status='todo')=>({
  id,workstream,phase,title,priority,due,instructions,doneMeans,dependencies,owner,status,submissions:[],notes:[],updatedAt:null
});

export const seedTasks = [
  T('NF-001','offer','lock','Approve launch offer architecture','P0','2026-09-18','Create one definitive offer map covering NUFI, programmes, meal planning, courses, supplements, books, bundles and subscriptions. Remove conflicting versions.','A signed-off one-page offer table exists showing product, customer, outcome, inclusions, duration, price, recurrence and next-step/upgrade.'),
  T('NF-002','offer','lock','Approve launch programme catalogue','P0','2026-09-18','Decide which base programmes and bolt-ons are genuinely available at launch. Defer anything without complete delivery capacity.','Every launch programme has a name, customer, outcome, level, duration, frequency and commercial status.',['NF-001']),
  T('NF-003','offer','lock','Approve launch supplement range','P0','2026-09-19','Lock the minimum viable supplement range, pack sizes, flavours and whether each item is one-off, subscription or both.','A final launch SKU list is approved and no packaging or website work is waiting on product-range decisions.',['NF-001']),
  T('NF-004','offer','lock','Approve pricing and subscription rules','P0','2026-09-19','Set RRP, subscription price, annual/monthly NUFI pricing, bundle discounts, renewal, cancellation and pause rules.','All launch offers have approved prices and rules that can be implemented in Stripe without interpretation.',['NF-001','NF-003']),
  T('NF-005','offer','lock','Approve launch bundles','P1','2026-09-20','Define only bundles that simplify buying rather than create complexity. State exact components, saving and eligibility.','Each launch bundle has an exact SKU composition, customer outcome and approved price.',['NF-002','NF-003','NF-004']),
  T('NF-006','offer','lock','Define upgrade and retention path','P1','2026-09-20','Map what happens after the first purchase: next programme, ongoing NUFI, supplement repeat, course or renewal.','A customer lifecycle map exists from first purchase through renewal, repeat purchase and next programme.',['NF-001']),

  T('NF-010','tech','core','Confirm production architecture','P0','2026-09-22','Document production hosting, app/API/database locations, domains/subdomains, storage, backups, monitoring and responsible owner.','One current architecture diagram and environment register exists with production/staging clearly separated.'),
  T('NF-011','tech','core','Complete authentication flows','P0','2026-09-24','Test registration, verification, login, logout, password reset, expired links and account deletion.','All authentication flows pass on desktop and mobile without developer intervention.',['NF-010']),
  T('NF-012','tech','core','Complete onboarding and preferences','P0','2026-09-25','Finish onboarding screens, preferences, goals and PAR-Q/fitness readiness capture where required.','A new user can complete onboarding end-to-end and lands in the correct app state.',['NF-011']),
  T('NF-013','tech','core','Complete programme entitlement logic','P0','2026-09-26','Ensure purchases and subscriptions unlock the correct programmes/content and remove access correctly when entitlement ends.','Test purchases create the exact expected access state for every launch offer.',['NF-004','NF-012']),
  T('NF-014','tech','sellable','Complete Stripe subscription implementation','P0','2026-10-01','Implement recurring billing, trials if used, failed-payment handling, cancellation and renewal status.','Test customers can start, renew, fail, recover and cancel subscriptions with the correct entitlements.',['NF-004','NF-013']),
  T('NF-015','tech','sellable','Implement production monitoring and error logging','P1','2026-10-03','Enable visibility of application errors, failed requests and critical integration failures.','Named owners can see production errors and know how to escalate them.',['NF-010']),
  T('NF-016','tech','sales','Prepare iOS release','P0','2026-10-07','Finalise production build, screenshots, descriptions, privacy disclosures and App Store submission.','Release candidate is submitted to Apple and all required metadata is complete.',['NF-012','NF-013']),
  T('NF-017','tech','sales','Prepare Android release','P0','2026-10-07','Finalise production build, screenshots, descriptions, data safety and Play Store submission.','Release candidate is submitted to Google Play and all required metadata is complete.',['NF-012','NF-013']),
  T('NF-018','tech','uat','Cross-device technical test','P0','2026-10-16','Run a defined matrix across current/older iPhone, Android, tablet, desktop and mobile browser.','Critical flows pass on the agreed device/browser matrix and defects are logged with severity.',['NF-014']),

  T('NF-020','content','lock','Lock programme content specification','P0','2026-09-20','Define the standard required for every programme: structure, progression, sessions, equipment, coaching notes, alternatives and safety.','A reusable programme template exists and is used for all launch programmes.',['NF-002']),
  T('NF-021','content','core','Populate launch programmes','P0','2026-09-27','Build every session for each launch programme including progression and alternatives.','No launch programme contains placeholder sessions or missing weeks.',['NF-020']),
  T('NF-022','content','core','Complete exercise library for launch programmes','P0','2026-09-27','For every required exercise add name, instructions, coaching cues, common mistakes, regressions/progressions and media.','Every exercise referenced by a launch programme resolves to a complete exercise record.',['NF-021']),
  T('NF-023','content','sellable','Complete launch recipe catalogue','P0','2026-10-02','Load the agreed recipe set with portions, calories/macros, ingredients, method, allergens/dietary tags and believable real photography.','All launch recipes display complete nutrition and preparation information with no placeholder imagery.'),
  T('NF-024','content','sellable','Complete launch meal plans','P0','2026-10-04','Build meal plans that use the final recipe catalogue and support the agreed customer goals/preferences.','A test user can open each launch meal plan, view meals and generate a coherent shopping list.',['NF-023']),
  T('NF-025','content','sales','Complete launch course library','P1','2026-10-10','Launch with a focused set of useful courses rather than an oversized unfinished library.','Every advertised course has complete lessons/modules and clear access rules.'),
  T('NF-026','content','sales','Build first 30 days of customer education','P1','2026-10-10','Create onboarding and behaviour-support content for day 0, first week and first month.','A new customer has a planned sequence of useful guidance with no dead gaps.',['NF-021','NF-024']),

  T('NF-030','product','lock','Confirm supplier, MOQ and lead times','P0','2026-09-19','Get written confirmation of supplier capability, MOQ, split options, production lead time and delivery timing for every launch physical product.','Every launch SKU has a named supplier, MOQ, cost, lead time and order-by date.',['NF-003']),
  T('NF-031','product','core','Approve final product specifications','P0','2026-09-23','Approve formulas/specs, pack size, flavour, serving information and sample/taste sign-off where relevant.','The supplier can manufacture each launch SKU without unanswered specification questions.',['NF-030']),
  T('NF-032','product','core','Create master SKU register','P0','2026-09-23','Create a single product code system used consistently by supplier, shop, Stripe, stock and fulfilment.','Every physical and digital product has one unique SKU/code and no duplicates exist.',['NF-003']),
  T('NF-033','product','sellable','Approve compliant packaging artwork','P0','2026-10-01','Finalise packaging artwork including ingredients, nutrition, allergens, storage, batch/best-before fields and required claims/wording.','Print-ready artwork is approved for every launch SKU and compliance review is complete.',['NF-031','NF-032']),
  T('NF-034','product','sellable','Place production orders','P0','2026-10-02','Place manufacturing/printing orders early enough to receive, inspect and correct before launch.','Purchase orders are acknowledged with confirmed delivery dates inside the launch window.',['NF-030','NF-033']),
  T('NF-035','product','sellable','Complete unit economics and contribution margin','P0','2026-10-03','Calculate net revenue less VAT, manufacturing, packaging, fulfilment, postage subsidy, Stripe, discounts and channel allowance.','Every launch SKU/bundle has an approved contribution margin and no offer is knowingly loss-making.',['NF-004','NF-030']),
  T('NF-036','product','uat','Run fulfilment rehearsal','P0','2026-10-17','Create real test orders, pick/pack them, generate dispatch information and verify tracking/customer notifications.','A complete physical order can move from paid to dispatched with a recorded process and timing.',['NF-034']),
  T('NF-037','product','freeze','Final stock and packaging count','P0','2026-10-29','Count saleable stock, packaging components and shipping materials; quarantine damaged or incomplete items.','Launch stock figures are recorded and reconcile to the sellable inventory position.',['NF-034']),

  T('NF-040','website','lock','Approve website customer journey and sitemap','P0','2026-09-20','Lock the page structure around explain → diagnose → recommend → sell → support.','A final sitemap and customer-journey diagram exists with one owner for each missing page.',['NF-001']),
  T('NF-041','website','core','Complete programme and NUFI sales pages','P0','2026-09-27','Ensure each launch offer has a clear page explaining who it is for, outcome, what is included, how it works and next action.','Every launch programme and NUFI offer has publishable sales copy and working CTA.',['NF-002','NF-040']),
  T('NF-042','website','sellable','Complete shop and product pages','P0','2026-10-03','Create product pages with correct variants, pricing, imagery, subscriptions and fulfilment expectations.','Every launch SKU can be found, understood and added to basket with correct commercial data.',['NF-003','NF-004','NF-032']),
  T('NF-043','website','sellable','Complete checkout and customer account journey','P0','2026-10-04','Test basket, checkout, payment, confirmation, customer account, order history and subscription management.','A brand-new customer can buy and manage an order/account without staff intervention.',['NF-014','NF-042']),
  T('NF-044','website','sales','Complete programme finder / quiz journey','P0','2026-10-09','Connect quiz answers to a clear recommendation, relevant bolt-ons and a direct next step.','A test user can complete the quiz and receive a sensible, purchasable recommendation every time.',['NF-002','NF-041']),
  T('NF-045','website','sales','Complete SEO technical launch checklist','P1','2026-10-10','Verify titles, descriptions, canonicals, sitemap, robots, schema, internal links, alt text and Core Web Vitals.','Priority launch pages pass the technical SEO checklist and are indexable as intended.',['NF-040']),
  T('NF-046','website','sales','Complete analytics and conversion tracking','P0','2026-10-10','Track visits, quiz starts/completions, checkout starts, purchases, AOV, subscriptions and key app activation events.','Named dashboard/events show the full funnel from acquisition to purchase/activation.',['NF-043','NF-044']),

  T('NF-050','marketing','lock','Approve launch marketing strategy','P0','2026-09-20','Define target audiences, core problems, offers, channels, launch sequence, budget and measurement.','One launch marketing plan is approved with no competing channel/offer assumptions.',['NF-001']),
  T('NF-051','marketing','core','Configure CRM data model','P0','2026-09-27','Set up contact fields, tags, lifecycle stages, source attribution and ownership needed for prospects and customers.','A contact can move from lead to customer with source, offer and lifecycle state intact.',['NF-050']),
  T('NF-052','marketing','sales','Build prospect nurture sequence','P1','2026-10-08','Create a short sales-led sequence addressing cost, problems, comparison, proof and next action.','A new lead receives the intended sequence with correct links, suppression and CTA.',['NF-051']),
  T('NF-053','marketing','sales','Build customer onboarding sequence','P0','2026-10-08','Create post-purchase communications for order confirmation, app activation, programme start, nutrition and support.','Test customers receive the correct sequence for their actual purchase.',['NF-043','NF-051']),
  T('NF-054','marketing','sales','Build abandoned quiz and checkout recovery','P1','2026-10-09','Create respectful follow-up for unfinished quiz and checkout journeys.','Test abandonments trigger the correct recovery path without duplicate or inappropriate messages.',['NF-044','NF-051']),
  T('NF-055','marketing','sales','Publish priority Knowledge Centre sales articles','P1','2026-10-10','Publish the articles sales emails and prospects need most: cost, problems, comparisons, reviews/best options and common objections.','Priority nurture/sales emails have strong educational pages to link to.'),
  T('NF-056','marketing','sales','Prepare launch creative and campaign builds','P1','2026-10-11','Produce channel-ready creative, copy, audiences, landing links and tracking for warm and paid launch waves.','Campaigns can be activated without creating new assets after UAT begins.',['NF-046','NF-050']),
  T('NF-057','marketing','freeze','Schedule warm launch communications','P0','2026-10-29','Prepare exact send/post timing for existing list, customers, social and community before scaling paid acquisition.','Warm launch content is scheduled, QA-checked and points to final production URLs.',['NF-053','NF-056']),

  T('NF-060','ops','lock','Assign owners and decision rights','P0','2026-09-18','For every launch workstream assign accountable owner, backup and approver. Clarify who can make scope, spend and go-live decisions.','Every P0 task has one accountable owner and no critical area is ownerless.'),
  T('NF-061','ops','core','Complete launch P&L and cash-flow forecast','P0','2026-09-25','Model stock cash out, platform/marketing costs, expected sales, gross margin and working-capital requirement.','A dated cash-flow and launch P&L exists with assumptions visible and approved.',['NF-035']),
  T('NF-062','ops','sellable','Configure finance reconciliation','P1','2026-10-03','Confirm Stripe settlement, bank feeds, QuickBooks categories, VAT handling and order/refund reconciliation.','A test sale, fee, refund and payout can be reconciled correctly.'),
  T('NF-063','ops','sellable','Complete legal and policy pack','P0','2026-10-04','Finalise privacy, cookies, terms, subscription terms, returns/refunds, shipping and required fitness/health/product disclosures.','Final policies are approved, published and linked at the correct customer touchpoints.',['NF-004','NF-033']),
  T('NF-064','ops','sales','Define customer support operating model','P0','2026-10-08','Set support channel, hours, owner, response targets, refund authority and escalation paths for technical/product/health questions.','The team knows who answers each type of issue and the customer knows how to contact support.'),
  T('NF-065','ops','sales','Create support knowledge base','P1','2026-10-11','Write answers and procedures for the most likely launch questions, failures and cancellations.','The top 30 expected launch questions have current internal answers and customer-facing wording where needed.',['NF-064']),
  T('NF-066','ops','freeze','Confirm launch-day staffing and escalation rota','P0','2026-10-29','Name who watches sales, app, website, fulfilment, support and marketing during launch windows.','A launch-day rota exists with contact route and escalation owner for each critical area.',['NF-064']),

  T('NF-070','launch','uat','Create UAT script and test accounts','P0','2026-10-12','Define realistic journeys including first purchase, NUFI-only, supplements-only, bundle, failed card, abandoned checkout, cancellation, forgotten password and refund.','A repeatable UAT pack exists with expected results and test data.'),
  T('NF-071','launch','uat','Run end-to-end customer UAT','P0','2026-10-15','Execute complete journeys across website, payment, app, email, CRM and fulfilment.','All P0 journeys pass or have a documented blocker/fix owner before beta.',['NF-070']),
  T('NF-072','launch','uat','Triage and close launch-blocking defects','P0','2026-10-18','Classify defects by severity. Fix P0 blockers before beta; defer cosmetic/nice-to-have changes.','No known severity-1 launch blocker remains open at the end of UAT.',['NF-071']),
  T('NF-073','launch','beta','Recruit and brief real-world beta group','P0','2026-10-19','Use people who did not build the system. Give them realistic tasks, not a guided demo.','Beta participants are active and have a simple feedback path plus defined tasks.'),
  T('NF-074','launch','beta','Run real-world beta','P0','2026-10-23','Observe completion, confusion, bugs, drop-off, support questions and physical delivery experience.','Beta produces a ranked issue list with evidence and owners.',['NF-073']),
  T('NF-075','launch','beta','Close beta blockers and freeze scope','P0','2026-10-25','Fix only issues that materially affect understanding, purchase, access, use, fulfilment or trust.','Scope is formally frozen and all remaining open P0 issues have an explicit go/no-go decision.',['NF-074']),
  T('NF-076','launch','freeze','Run production smoke test','P0','2026-10-28','On the real production environment test key pages, payments, account creation, app access, email delivery and analytics.','Production smoke checklist passes using final URLs and live configuration.',['NF-075']),
  T('NF-077','launch','freeze','Complete launch data and backup check','P0','2026-10-29','Verify backups, exports, admin access, restore route and that no test data can confuse launch reporting.','Backup/restore responsibility is documented and launch dashboards start from a clean baseline.'),
  T('NF-078','launch','gng','Run formal go/no-go meeting','P0','2026-10-31','Review every P0 task, known defect, stock position, app availability, payments, support and legal readiness.','A recorded GO decision exists, or launch is held with named blocker and recovery plan.',['NF-076','NF-077','NF-037','NF-066','NF-057']),
  T('NF-079','launch','live','Execute staged launch','P0','2026-11-01','Launch to warm audience first, observe transactions/support/errors, then increase traffic only when stable.','Warm launch is stable, critical metrics are visible and paid traffic is scaled deliberately.',['NF-078'])
];

export const seedPeople = [
  {id:'p-james',name:'James',role:'Admin / Launch Lead'},
  {id:'p-tech',name:'Technology Lead',role:'NUFI / Development'},
  {id:'p-content',name:'Content Lead',role:'Programmes / Nutrition'},
  {id:'p-product',name:'Product Lead',role:'Supplements / Supply Chain'},
  {id:'p-marketing',name:'Marketing Lead',role:'CRM / Campaigns'},
  {id:'p-finance',name:'Finance / Operations',role:'Finance / Compliance'}
];

export const seedDecisions = [
  {id:'DEC-001',date:'2026-09-16',title:'Launch date',decision:'Public go-live target is 1 November 2026.',owner:'James',status:'locked'},
  {id:'DEC-002',date:'2026-09-16',title:'Launch Control separation',decision:'Go Live Control is a standalone internal app with its own repository, deployment and database. It must not share runtime code with the public Nutrition.Fitness website.',owner:'James',status:'locked'},
  {id:'DEC-003',date:'2026-09-16',title:'Visual content rule',decision:'Jeff and Steff may be illustrated; product, recipe, workout and lifestyle imagery should otherwise use believable real photography.',owner:'James',status:'locked'},
  {id:'DEC-004',date:'2026-09-16',title:'Priority rule',decision:'P0 means launch blocker, P1 means important launch enhancement, P2 means post-launch unless explicitly promoted.',owner:'James',status:'locked'}
];
