export const launchAt = '2026-11-01T09:00:00+00:00';

export const workstreams = [
  {id:'decide',name:'Decide',short:'Decide',description:'Make the few decisions that everything else depends on.'},
  {id:'build',name:'Build',short:'Build',description:'Finish the app, website, programmes, recipes and physical products.'},
  {id:'sell',name:'Sell',short:'Sell',description:'Make buying, payment, emails, support and fulfilment work properly.'},
  {id:'launch',name:'Launch',short:'Launch',description:'Test with real people, fix blockers and go live.'}
];

export const phases = [
  {id:'decide',name:'DECIDE',start:'2026-09-18',end:'2026-09-20',tone:'Lock the offer, prices and owners.'},
  {id:'build',name:'BUILD',start:'2026-09-21',end:'2026-10-04',tone:'Finish the things customers will actually use and buy.'},
  {id:'connect',name:'CONNECT',start:'2026-10-05',end:'2026-10-11',tone:'Connect payments, CRM, email and fulfilment.'},
  {id:'test',name:'TEST',start:'2026-10-12',end:'2026-10-25',tone:'Run the complete journey with real people.'},
  {id:'ready',name:'GET READY',start:'2026-10-26',end:'2026-10-31',tone:'Fix blockers only. No new ideas.'},
  {id:'live',name:'GO LIVE',start:'2026-11-01',end:'2026-11-01',tone:'Launch to the warm audience first, then scale.'}
];

const T=(id,workstream,phase,title,priority,due,instructions,doneMeans,dependencies=[],owner='Unassigned',status='todo')=>({
  id,workstream,phase,title,priority,due,instructions,doneMeans,dependencies,owner,status,submissions:[],notes:[],updatedAt:null
});

export const seedTasks = [
  T('GO-01','decide','decide','Decide exactly what we are launching','P0','2026-09-18',
    'Write one short launch list. Include only what will genuinely be available on 1 November: NUFI, programmes, supplements, books and any bundles. Anything else goes on the Later list.',
    'There is one agreed launch list that the whole team can understand in under two minutes.'),
  T('GO-02','decide','decide','Set the prices','P0','2026-09-19',
    'Put one price next to every launch item. Include monthly or annual subscription prices where relevant. Do not build complicated discount rules yet.',
    'Every launch item has one approved price and nobody needs to ask what it costs.',['GO-01']),
  T('GO-03','decide','decide','Give every big job an owner','P0','2026-09-20',
    'Assign one person to each of the remaining jobs in this app. One owner means one person is responsible for getting it over the line, even if other people help.',
    'No launch job is unassigned.'),

  T('GO-04','build','build','Finish the customer-facing app','P0','2026-09-27',
    'Only finish the essentials: sign up, login, onboarding, programme access, workouts, meal plans, recipes, progress and account basics. Ignore nice-to-have features until after launch.',
    'A new customer can sign up and use the core app without help.'),
  T('GO-05','build','build','Finish the launch programmes and food content','P0','2026-10-01',
    'Complete only the programmes, workouts, exercises, recipes and meal plans that are actually on the launch list. Remove placeholders and unfinished items.',
    'Everything advertised for launch contains real, complete content.',['GO-01']),
  T('GO-06','build','build','Finish the website and shop','P0','2026-10-03',
    'Make sure a stranger can understand what Nutrition.Fitness is, choose the right option, see the price and buy it. Finish the key sales pages, quiz, shop and checkout journey.',
    'A new visitor can understand, choose and reach checkout without explanation.',['GO-01','GO-02']),
  T('GO-07','build','build','Get the physical products ready','P0','2026-10-04',
    'For each launch product confirm supplier, final product, packaging, cost, order quantity, delivery date and how it will be packed and sent. Clothing is Later unless already ready.',
    'Every physical launch product has a confirmed route from supplier to customer.',['GO-01','GO-02']),

  T('GO-08','sell','connect','Make payments and subscriptions work','P0','2026-10-07',
    'Test one-off payments and subscriptions from start to finish. Check confirmation, failed payment, cancellation and the customer getting the correct access.',
    'A real test payment works and the customer receives exactly what they bought.',['GO-02','GO-04','GO-06']),
  T('GO-09','sell','connect','Set up the customer follow-up','P0','2026-10-09',
    'Keep this small: lead welcome, purchase confirmation, app getting-started email, abandoned checkout follow-up and support contact. Use GoHighLevel for the shared customer journey.',
    'A test lead and a test customer receive the correct messages in the correct order.',['GO-06','GO-08']),
  T('GO-10','sell','connect','Prepare launch marketing','P1','2026-10-11',
    'Prepare the first launch campaign only: warm email list, social posts, core ad creative and the landing pages they point to. Do not build months of campaigns.',
    'Everything needed for the first week of launch can be switched on without creating new material.',['GO-06','GO-09']),
  T('GO-11','sell','connect','Make support and admin ready','P0','2026-10-11',
    'Confirm the support email, who answers it, refunds/returns basics, shipping information, privacy/terms and how sales/refunds are recorded in accounts.',
    'A customer problem, refund or support question has a clear owner and process.'),

  T('GO-12','launch','test','Test the whole journey yourself','P0','2026-10-16',
    'Pretend you are a brand-new customer. Find the site, take the quiz, buy, create an account, open the app, start a workout, use a meal plan and check every email. Repeat for a supplement order.',
    'The complete journey works from first visit to product/app use with no major blocker.',['GO-04','GO-05','GO-06','GO-07','GO-08','GO-09']),
  T('GO-13','launch','test','Give it to real people and watch what goes wrong','P0','2026-10-24',
    'Give the finished journey to a small group who did not build it. Do not guide them. Record where they get stuck, what they misunderstand and what breaks.',
    'There is one short ranked list of real problems to fix before launch.',['GO-12']),
  T('GO-14','launch','ready','Fix launch blockers and go live','P0','2026-11-01',
    'From 26 October onward, do not add new features. Fix only things that stop people understanding, buying, accessing, using or receiving what they bought. On 31 October run one final check, then launch warm traffic on 1 November.',
    'No known launch blocker remains and the warm launch is live and being monitored.',['GO-13'])
];

export const seedPeople = [
  {id:'p-james',name:'James',role:'Launch lead'},
  {id:'p-tech',name:'Technology',role:'App / website'},
  {id:'p-content',name:'Content',role:'Programmes / nutrition'},
  {id:'p-product',name:'Products',role:'Supplements / supply'},
  {id:'p-marketing',name:'Marketing',role:'CRM / campaigns'},
  {id:'p-ops',name:'Operations',role:'Finance / support / fulfilment'}
];

export const seedDecisions = [
  {id:'DEC-001',date:'2026-09-16',title:'Launch date',decision:'Go live on 1 November 2026.',owner:'James',status:'locked'},
  {id:'DEC-002',date:'2026-09-17',title:'Keep Launch Control separate',decision:'Nutrition Go Live is a standalone internal app and must not share runtime code or a database with the public Nutrition.Fitness website.',owner:'James',status:'locked'},
  {id:'DEC-003',date:'2026-09-18',title:'Keep the plan simple',decision:'The launch plan uses a small number of big jobs. Detailed checklists live inside those jobs instead of becoming dozens of separate tasks.',owner:'James',status:'locked'}
];
