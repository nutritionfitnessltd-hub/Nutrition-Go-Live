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
      I('web-programmes','Programme landing pages',0,'todo','James','One landing page is needed for each programme.',15),
      I('web-finder','Programme Finder / lead capture',70,'inprogress','James','Finish the quiz / freebie email-capture journey.',10),
      I('web-recipes','Recipe & meal-planning web experience',100,'done','James','Complete.',10),
      I('web-shop','Shop',100,'done','James','Complete.',10),
      I('web-cookbooks','Cookbook landing / sales pages',0,'todo','James','Pages still need to be created.',8),
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
    id:'courses',name:'Courses',owner:'James',
    summary:'Six course families, four stages each. Content is the main unfinished area.',
    blocker:'Run, Cycle and Swim have no course content yet.',
    items:[
      I('course-build','Build',50,'inprogress','James','Foundation complete; Stage 2 appears complete; Stages 3–4 still needed.',10),
      I('course-strength','Strength',50,'inprogress','James','Foundation complete; Stage 2 appears complete; Stages 3–4 still needed.',10),
      I('course-fit','Fit',25,'inprogress','James','Foundation complete; Stages 2–4 still needed.',10),
      I('course-run','Run',0,'todo','James','No content yet.',10),
      I('course-cycle','Cycle',0,'todo','James','No content yet.',10),
      I('course-swim','Swim',0,'todo','James','No content yet.',10),
      I('course-pages','Course landing / sales pages',0,'todo','James','No landing pages or sales funnels yet.',15),
      I('course-price','Individual course pricing',0,'todo','Kasia','Membership includes all courses; individual course price still needs setting.',10),
      I('course-access','Access & purchase testing',50,'inprogress','Abdal Bashir','Access model agreed in principle: membership gets all; individual purchase gets one. Needs implementation/testing.',15)
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
    summary:'Recipes and images are largely done. Most remaining work is covers, editorial pages, proofing and print-ready output.',
    blocker:'Six books still need the non-recipe book work completed.',
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
