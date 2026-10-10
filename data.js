export const launchAt = '2026-11-01T09:00:00+00:00';

const I=(id,title,progress,status='todo',owner='James',note='',weight=1,children=[],later=false)=>({
  id,title,progress,status,owner,note,weight,children,later,submissions:[]
});

const C=(id,title,progress,status='todo',note='')=>I(id,title,progress,status,'',note,1,[],false);

export const team = [
  {id:'james',name:'James',role:'CEO / Launch Lead',type:'Internal'},
  {id:'kasia',name:'Kasia',role:'CFO / Operations',type:'Internal'},
  {id:'richard',name:'Richard Wall',role:'Accountant',type:'External'},
  {id:'jocelyn',name:'Jocelyn Dela Cruz',role:'GoHighLevel / Content / Social Media',type:'Internal'},
  {id:'abdal',name:'Abdal Bashir',role:'App & Web App Developer — IK Development',type:'External'}
];

export const areas = [
  {
    id:'website',name:'Website',owner:'James',
    summary:'Finish the customer-facing pages and then do one final launch check.',
    blocker:'Programme landing pages and cookbook pages still need building.',
    items:[
      I('web-home','Homepage',100,'done','James','Complete.',12),
      I('web-nufi','NUFI landing page',80,'inprogress','James','Mostly complete; final polish still needed.',10),
      I('web-programmes','Programme landing pages',0,'todo','James','Build the launch programme pages first.',15,[C('web-prog-build','Build landing page',0,'todo'),C('web-prog-strength','Strength landing page',0,'todo'),C('web-prog-fit','Fit landing page',0,'todo'),C('web-prog-run','Run landing page',0,'todo'),C('web-prog-cycle','Cycle landing page',0,'todo'),C('web-prog-swim','Swim landing page',0,'todo')]),
      I('web-finder','Programme Finder / lead capture',70,'inprogress','James','Finish the quiz / freebie email-capture journey.',10),
      I('web-recipes','Recipe & meal-planning web experience',100,'done','James','Complete.',10),
      I('web-shop','Shop',100,'done','James','Complete.',10),
      I('web-cookbooks','Cookbook landing / sales pages',0,'todo','James','Launch pages first; the rest can follow.',8,[C('web-book-hpk','High Protein Kitchen page',0,'todo'),C('web-book-blend','Blend & Go page',0,'todo'),C('web-book-night','Big Night In page',0,'todo'),C('web-book-rest','Other cookbook pages',0,'todo')]),
      I('web-membership','Membership / subscription pricing page',100,'done','James','£19.99 monthly / £199 annual.',7),
      I('web-checkout','Checkout + account / login',100,'done','James','Complete.',8),
      I('web-trust','About + contact + legal pages',100,'done','James','Complete.',5),
      I('web-final','Final website launch checks',0,'todo','James','Mobile QA, broken links, forms, analytics and final SEO checks once the site is ready.',5)
    ]
  },
  {
    id:'app',name:'App',owner:'Abdal Bashir',
    summary:'The build is essentially complete. The remaining work is store release and proper testing.',
    blocker:'Apple account / payment issue is holding up App Store submission.',
    items:[
      I('app-android','Android build',100,'done','Abdal Bashir','Developer reports build complete.',25),
      I('app-google','Google Play submission',90,'inprogress','Abdal Bashir','Believed to be submitted; confirm approved/live status.',10),
      I('app-apple-build','Apple build',100,'done','Abdal Bashir','Developer reports build complete.',25),
      I('app-apple-account','Apple Developer account',40,'blocked','James','Waiting on Apple / payment issue.',5),
      I('app-apple-submit','Apple App Store submission',0,'blocked','Abdal Bashir','Cannot complete until Apple account is available.',5),
      I('app-functional','Functional testing',0,'todo','James','Formal testing has not started.',10),
      I('app-uat','User acceptance testing',0,'todo','James','UAT has not started.',10),
      I('app-device','Real-device testing',0,'todo','James','Test on representative iPhone and Android devices.',5),
      I('app-final','Final production checks',0,'todo','Abdal Bashir','Login, onboarding, access, notifications and account basics.',5)
    ]
  },
  {
    id:'products',name:'Products',owner:'Kasia',
    summary:'Range and suppliers are agreed. Finish artwork, pricing and place the stock order.',
    blocker:'Final pricing/margins and purchase order are still outstanding.',
    items:[
      I('prod-range','Launch product range',100,'done','James','Launch range agreed.',15),
      I('prod-art','Final packaging artwork',70,'inprogress','James','Concepts are complete; final print-ready artwork still needed.',20),
      I('prod-maker','Manufacturer',100,'done','Kasia','Raw Creation agreed.',15),
      I('prod-fulfil','Fulfilment route',100,'done','Kasia','Raw Creation fulfilment route agreed.',10),
      I('prod-margin','Pricing & margins',10,'inprogress','Kasia','NUFI pricing is set; physical product pricing and margins still need final supplier costs.',15),
      I('prod-order','Purchase stock',0,'todo','Kasia','Order still needs to be placed with Raw Creation.',15),
      I('prod-images','Product images',100,'done','James','Complete.',5),
      I('prod-social','First product social assets',100,'done','Jocelyn Dela Cruz','Complete.',5)
    ]
  },
  {
    id:'programmes',name:'Programmes',owner:'James',
    summary:'Build, Strength and Fit are the launch programmes. Run, Cycle and Swim move after launch.',
    blocker:'Build, Strength and Fit need to be launch-ready; the others must not distract the launch.',
    items:[
      I('prog-build','Build',50,'inprogress','James','Foundation complete; Stage 2 appears complete. Finish the launch-ready content.',20),
      I('prog-strength','Strength',50,'inprogress','James','Foundation complete; Stage 2 appears complete. Finish the launch-ready content.',20),
      I('prog-fit','Fit',25,'inprogress','James','Foundation complete; finish the content needed for launch.',20),
      I('prog-run','Run',0,'todo','James','No content yet. After launch.',10),
      I('prog-cycle','Cycle',0,'todo','James','No content yet. After launch.',10),
      I('prog-swim','Swim',0,'todo','James','No content yet. After launch.',10),
      I('prog-price','Individual programme pricing',0,'todo','Kasia','Membership includes all programmes; individual purchase pricing still needs setting.',5),
      I('prog-access','Programme access & purchase testing',50,'inprogress','Abdal Bashir','Membership gets all; individual purchase gets one. Needs final implementation/testing.',5)
    ]
  },
  {
    id:'courses',name:'Courses',owner:'James',
    summary:'Educational courses are about 80% complete. They are important, but they do not block go-live.',
    blocker:'Branding, naming and final presentation are the main remaining jobs.',
    items:[
      I('edu-nutrition','Nutrition',80,'inprogress','James','Content largely complete; final Nutrition.Fitness branding/presentation needed.',1),
      I('edu-fatloss','Fat Loss',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-habits','Habits',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-sleep','Sleep',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-stress','Stress Management',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-emotional','Overcoming Emotional Eating',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-sports','Sports Nutrition',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-longevity','Longevity',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-yoga','Yoga',80,'inprogress','James','Content largely complete; final branding/presentation needed.',1),
      I('edu-branding','Course branding system',20,'inprogress','James','Agree the customer-facing names, covers/cards and consistent visual treatment.',2),
      I('edu-final','Final course presentation check',0,'todo','James','Check all courses look consistent and polished before promoting them.',1)
    ]
  },
  {
    id:'recipes',name:'Recipes & Meal Planning',owner:'James',
    summary:'Built and working. The remaining job is confirmation and proper testing.',
    blocker:'Testing/UAT is only around 20% complete.',
    items:[
      I('recipe-content','Recipes',100,'done','James','All launch recipes complete.',20),
      I('recipe-planner','Meal planner',100,'done','Abdal Bashir','Working.',20),
      I('recipe-shopping','Shopping list',80,'inprogress','Abdal Bashir','Needs final confirmation with the developer that the delivered version is correct.',15),
      I('recipe-personal','Personalisation',100,'done','Abdal Bashir','Calorie targets, portions, preferences and exclusions supported.',10),
      I('recipe-access','Access rules',100,'done','James','Access can be assigned by membership / product.',10),
      I('recipe-test','Full testing / UAT',20,'inprogress','James','Only lightly tested so far.',25)
    ]
  },
  {
    id:'cookbooks',name:'Cookbooks',owner:'James',
    summary:'High Protein Kitchen and Blend & Go are needed for launch. Big Night In is important. The rest move after launch.',
    blocker:'Finish Blend & Go. Big Night In is important but does not block launch.',
    items:[
      I('book-hpk','The High Protein Kitchen',100,'done','James','Complete.',1,[
        C('hpk-recipes','Recipes',100,'done'),C('hpk-images','Recipe images',100,'done'),C('hpk-front','Front cover',100,'done'),
        C('hpk-back','Back cover',100,'done'),C('hpk-intro','Introduction / welcome',100,'done'),C('hpk-contents','Contents page',100,'done'),
        C('hpk-dividers','Divider pages',100,'done'),C('hpk-support','Supporting pages',100,'done'),C('hpk-layout','Final layout',100,'done'),
        C('hpk-proof','Proofreading',100,'done'),C('hpk-print','Print / digital ready',100,'done')
      ]),
      I('book-blend','Blend & Go',50,'inprogress','James','Recipes, images, front cover, contents and layout are done; back cover is concept-only.',1,[
        C('blend-recipes','Recipes',100,'done'),C('blend-images','Recipe images',100,'done'),C('blend-front','Front cover',100,'done'),
        C('blend-back','Back cover',70,'inprogress','Concept complete; final version needed.'),C('blend-intro','Introduction / welcome',0,'todo'),
        C('blend-contents','Contents page',100,'done'),C('blend-dividers','Divider pages',50,'inprogress','Needs checking.'),
        C('blend-support','Supporting pages',0,'todo'),C('blend-layout','Final layout',100,'done'),C('blend-proof','Proofreading',0,'todo'),
        C('blend-print','Print / digital ready',0,'todo')
      ]),
      ...['Breakfast, Sorted','Proper Everyday Food','The Big Night In','Air Fryer Favourites','Snack Happy','More Plants, Please'].map((name,n)=>I(
        'book-'+['breakfast','everyday','night','airfryer','snack','plants'][n],name,27,'inprogress','James',
        'Recipes, recipe images and contents are complete. The rest of the book still needs finishing.',1,[
          C('b'+n+'-recipes','Recipes',100,'done'),C('b'+n+'-images','Recipe images',100,'done'),C('b'+n+'-front','Front cover',0,'todo'),
          C('b'+n+'-back','Back cover',0,'todo'),C('b'+n+'-intro','Introduction / welcome',0,'todo'),C('b'+n+'-contents','Contents page',100,'done'),
          C('b'+n+'-dividers','Divider pages',0,'todo'),C('b'+n+'-support','Supporting pages',0,'todo'),C('b'+n+'-layout','Final layout',0,'todo'),
          C('b'+n+'-proof','Proofreading',0,'todo'),C('b'+n+'-print','Print / digital ready',0,'todo')
        ]
      ))
    ]
  },
  {
    id:'marketing',name:'Marketing & Growth',owner:'Jocelyn Dela Cruz',
    summary:'This is the least-developed active area and needs building from the ground up.',
    blocker:'No paid campaigns, email, funnels or tracking are set up yet.',
    items:[
      I('mkt-social','Social media',13,'inprogress','Jocelyn Dela Cruz','Facebook is partly set up; the other launch channels are not.',30,[
        C('social-instagram','Instagram',0,'todo','Nothing set up yet.'),
        C('social-tiktok','TikTok',0,'todo','Nothing set up yet.'),
        C('social-facebook','Facebook',50,'inprogress','Page exists and banner has been started; profile icon/content still needed.'),
        C('social-youtube','YouTube',0,'todo','Nothing set up yet.'),
        {...C('social-pinterest','Pinterest',0,'todo','Not set up.'),later:true},
        {...C('social-linkedin','LinkedIn',0,'todo','Not set up.'),later:true}
      ]),
      I('mkt-ads','Paid advertising',0,'todo','Jocelyn Dela Cruz','Nothing set up yet. Launch budget: £1,000. Meta is the first priority.',20),
      I('mkt-ghl','GoHighLevel / CRM',20,'inprogress','Jocelyn Dela Cruz','Sub-account and basic business details exist. Forms, fields, pipelines, automations and testing still need doing.',20),
      I('mkt-email','Email / SMS',0,'todo','Jocelyn Dela Cruz','No email or SMS journeys have been set up yet.',15),
      I('mkt-funnels','Funnels & tracking',0,'todo','Jocelyn Dela Cruz','No funnels, pixels or conversion tracking are set up yet.',15)
    ]
  },
  {
    id:'operations',name:'Business Operations',owner:'Kasia',
    summary:'Finance, people and general admin only — kept deliberately simple.',
    blocker:'Bank account completion is holding up Stripe; insurance and customer-support setup are also outstanding.',
    items:[
      I('ops-finance','Finance',37,'inprogress','Kasia','Banking must finish before Stripe; QuickBooks and full pricing/margins still need work.',40,[
        C('fin-bank','Business bank',60,'inprogress','ID requirements are done; complete the bank setup.'),
        C('fin-quickbooks','QuickBooks',0,'todo','Not set up yet.'),
        C('fin-stripe','Stripe / payments / subscriptions',0,'blocked','Blocked until the business bank is live.'),
        C('fin-margin','Pricing & margins',10,'inprogress','Starter forecast created; actual Raw Creation costs and final retail prices still needed.'),
        C('fin-forecast','Forecast / P&L',50,'inprogress','Starter pricing and 12-month forecast exists; convert to full P&L once real costs are known.'),
        C('fin-accounting','Accountant / company filings',100,'done','Richard Wall handles accounting; company filings are complete.')
      ]),
      I('ops-staff','Staff & responsibilities',100,'done','James','Core team identified and roles recorded.',25,[
        C('staff-james','James — CEO / Launch Lead',100,'done'),
        C('staff-kasia','Kasia — CFO / Operations',100,'done'),
        C('staff-richard','Richard Wall — Accountant',100,'done'),
        C('staff-jocelyn','Jocelyn Dela Cruz — GHL / Content / Social',100,'done'),
        C('staff-abdal','Abdal Bashir — App & Web App Developer / IK Development',100,'done')
      ]),
      I('ops-admin','General admin',56,'inprogress','Kasia','Insurance, supplier paperwork, support email and AI customer-service voice still need doing.',35,[
        C('admin-bankid','Business bank ID requirements',100,'done'),
        C('admin-insurance','Insurance',0,'todo','Not set up yet.'),
        C('admin-filings','Company filings',100,'done'),
        C('admin-supplier','Supplier paperwork',0,'todo','Nothing done yet.'),
        C('admin-support','Customer support email',0,'todo','Needs setting up.'),
        C('admin-ai','AI customer-service voice',0,'todo','Needs setting up.'),
        C('admin-access','System access / passwords / handover',100,'done','Access is in place; Apple is tracked under App.'),
        C('admin-revenue','Revenue Monkey',100,'done','Set up and access held.'),
        C('admin-devaccess','Developer access',100,'done','Developers have the access they need.')
      ])
    ]
  },
  {
    id:'launch',name:'Launch & Final Checks',owner:'James',
    summary:'Leave this quiet until the other areas are nearly ready. Then use it as the final sign-off list.',
    blocker:'Not started — intentionally.',
    items:[
      I('launch-stores','App Store / Google Play confirmed',0,'todo','James','Confirm both stores are ready.',1),
      I('launch-web','Website final checks complete',0,'todo','James','Run final website checks.',1),
      I('launch-uat','Full UAT / testing complete',0,'todo','James','Run the full customer journey.',1),
      I('launch-payments','Payments / subscriptions tested',0,'todo','Kasia','Test real payment flows once Stripe is live.',1),
      I('launch-stock','Product stock / order confirmed',0,'todo','Kasia','Confirm stock order and delivery.',1),
      I('launch-support','Customer support ready',0,'todo','Kasia','Support email and AI voice ready.',1),
      I('launch-go','Final go / no-go check',0,'todo','James','Final sign-off before launch.',1)
    ]
  }
];


export const priorityNames = {critical:'GO LIVE',important:'IMPORTANT',later:'AFTER LAUNCH'};

const priorityMap = {
  // Website
  'web-home':'critical','web-nufi':'critical','web-programmes':'critical','web-prog-build':'critical','web-prog-strength':'critical','web-prog-fit':'critical',
  'web-prog-run':'later','web-prog-cycle':'later','web-prog-swim':'later','web-finder':'critical','web-recipes':'critical','web-shop':'critical',
  'web-cookbooks':'critical','web-book-hpk':'critical','web-book-blend':'critical','web-book-night':'important','web-book-rest':'later',
  'web-membership':'critical','web-checkout':'critical','web-trust':'critical','web-final':'critical',

  // App
  'app-android':'critical','app-google':'critical','app-apple-build':'critical','app-apple-account':'critical','app-apple-submit':'critical',
  'app-functional':'critical','app-uat':'critical','app-device':'critical','app-final':'critical',

  // Products
  'prod-range':'critical','prod-art':'critical','prod-maker':'critical','prod-fulfil':'critical','prod-margin':'critical','prod-order':'critical',
  'prod-images':'critical','prod-social':'important',

  // Programmes
  'prog-build':'critical','prog-strength':'critical','prog-fit':'critical','prog-run':'later','prog-cycle':'later','prog-swim':'later',
  'prog-price':'critical','prog-access':'critical',

  // Recipes
  'recipe-content':'critical','recipe-planner':'critical','recipe-shopping':'critical','recipe-personal':'critical','recipe-access':'critical','recipe-test':'critical',

  // Cookbooks
  'book-hpk':'critical','book-blend':'critical','book-night':'important','book-breakfast':'later','book-everyday':'later','book-airfryer':'later','book-snack':'later','book-plants':'later',

  // Educational courses
  'edu-nutrition':'important','edu-fatloss':'important','edu-habits':'important','edu-sleep':'important','edu-stress':'important',
  'edu-emotional':'important','edu-sports':'important','edu-longevity':'important','edu-yoga':'important','edu-branding':'important','edu-final':'important',

  // Marketing
  'mkt-social':'critical','social-instagram':'critical','social-tiktok':'critical','social-facebook':'critical','social-youtube':'important',
  'social-pinterest':'later','social-linkedin':'later','mkt-ads':'important','mkt-ghl':'critical','mkt-email':'critical','mkt-funnels':'critical',

  // Operations
  'ops-finance':'critical','fin-bank':'critical','fin-quickbooks':'important','fin-stripe':'critical','fin-margin':'critical','fin-forecast':'important','fin-accounting':'critical',
  'ops-staff':'important','ops-admin':'critical','admin-bankid':'critical','admin-insurance':'critical','admin-filings':'critical','admin-supplier':'critical',
  'admin-support':'critical','admin-ai':'later','admin-access':'critical','admin-revenue':'important','admin-devaccess':'critical',

  // Launch
  'launch-stores':'critical','launch-web':'critical','launch-uat':'critical','launch-payments':'critical','launch-stock':'critical','launch-support':'critical','launch-go':'critical'
};

function applyPriority(items,inherited='important'){
  for(const item of items||[]){
    item.priority=priorityMap[item.id]||inherited;
    item.later=item.priority==='later';
    if(item.children?.length)applyPriority(item.children,item.priority);
  }
}
for(const area of areas) applyPriority(area.items);


/*
  Readiness scoring is effort-weighted, not task-count weighted.
  A small admin blocker can still be critical without pretending it represents
  the same amount of completed work as building the app, recipe system or website.
*/
export const areaScoreWeights = {
  website:20,
  app:20,
  products:10,
  programmes:13,
  courses:8,
  recipes:15,
  cookbooks:7,
  marketing:3,
  operations:2,
  launch:2
};

export const taskScoreWeights = {
  // Website — most of the work is already in the core site and customer journey.
  'web-home':25,'web-nufi':15,'web-programmes':7,'web-finder':4,'web-recipes':15,'web-shop':12,
  'web-cookbooks':3,'web-membership':5,'web-checkout':10,'web-trust':3,'web-final':1,

  // App — the two production builds represent the largest body of work.
  'app-android':35,'app-google':5,'app-apple-build':35,'app-apple-account':2,'app-apple-submit':3,
  'app-functional':7,'app-uat':7,'app-device':3,'app-final':3,

  // Products.
  'prod-range':10,'prod-art':20,'prod-maker':15,'prod-fulfil':15,'prod-margin':10,'prod-order':10,
  'prod-images':15,'prod-social':5,

  // Programmes.
  'prog-build':30,'prog-strength':30,'prog-fit':25,'prog-run':5,'prog-cycle':5,'prog-swim':5,
  'prog-price':2,'prog-access':8,

  // Educational courses — the nine finished bodies of content carry almost all the work.
  'edu-nutrition':10,'edu-fatloss':10,'edu-habits':10,'edu-sleep':10,'edu-stress':10,
  'edu-emotional':10,'edu-sports':10,'edu-longevity':10,'edu-yoga':10,'edu-branding':0.5,'edu-final':0.5,

  // Recipes / meal planning.
  'recipe-content':25,'recipe-planner':25,'recipe-shopping':15,'recipe-personal':10,'recipe-access':5,'recipe-test':20,

  // Cookbooks — launch books are the largest share of the work.
  'book-hpk':25,'book-blend':20,'book-night':15,'book-breakfast':8,'book-everyday':8,'book-airfryer':8,'book-snack':8,'book-plants':8,

  // Marketing.
  'mkt-social':20,'mkt-ads':10,'mkt-ghl':25,'mkt-email':20,'mkt-funnels':25,

  // Business operations. Small admin items do not distort overall completion.
  'ops-finance':45,'ops-staff':15,'ops-admin':40,
  'fin-bank':5,'fin-quickbooks':5,'fin-stripe':15,'fin-margin':10,'fin-forecast':5,'fin-accounting':5,
  'admin-bankid':2,'admin-insurance':8,'admin-filings':3,'admin-supplier':8,'admin-support':8,
  'admin-ai':3,'admin-access':3,'admin-revenue':2,'admin-devaccess':3,

  // Final checks are important gates, but relatively small amounts of work.
  'launch-stores':1,'launch-web':1,'launch-uat':1,'launch-payments':1,'launch-stock':1,'launch-support':1,'launch-go':1
};
