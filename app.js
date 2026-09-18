import {launchAt as seedLaunchAt,workstreams,phases,seedTasks,seedPeople,seedDecisions} from './data.js';

const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=s=>s?new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short'}).format(new Date(`${s}T12:00:00`)):'—';
const today=()=>new Date().toISOString().slice(0,10);
const statuses={todo:'To do',inprogress:'In progress',blocked:'Blocked',submitted:'Submitted',needschanges:'Needs changes',done:'Done'};
const priorities=['P0','P1','P2'];
const priorityNames={P0:'Must do',P1:'Should do',P2:'Later'};

const state={
  config:{},backend:false,supabase:null,user:null,profile:null,
  tasks:[],people:[],decisions:[],view:'dashboard',filters:{q:'',priority:'all',workstream:'all',status:'all'},selectedTask:null
};

async function getConfig(){
  try{const r=await fetch('/api/config',{cache:'no-store'});if(!r.ok)throw 0;return await r.json();}catch{return {supabaseUrl:'',supabaseAnonKey:'',launchAt:seedLaunchAt,appName:'Nutrition.Fitness Go Live Control'};}
}
async function initBackend(){
  state.config=await getConfig();
  state.backend=Boolean(state.config.supabaseUrl&&state.config.supabaseAnonKey);
  if(!state.backend)return;
  const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2');
  state.supabase=createClient(state.config.supabaseUrl,state.config.supabaseAnonKey);
  const {data:{session}}=await state.supabase.auth.getSession();
  state.user=session?.user||null;
  state.supabase.auth.onAuthStateChange((_e,s)=>{state.user=s?.user||null;boot();});
}

function localLoad(){
  const seedVersion='simple-v2';if(localStorage.getItem('lc_seed_version')!==seedVersion){localStorage.removeItem('lc_tasks');localStorage.removeItem('lc_people');localStorage.removeItem('lc_decisions');localStorage.setItem('lc_seed_version',seedVersion);}state.tasks=JSON.parse(localStorage.getItem('lc_tasks')||'null')||structuredClone(seedTasks);
  state.people=JSON.parse(localStorage.getItem('lc_people')||'null')||structuredClone(seedPeople);
  state.decisions=JSON.parse(localStorage.getItem('lc_decisions')||'null')||structuredClone(seedDecisions);
}
function localSave(){
  localStorage.setItem('lc_tasks',JSON.stringify(state.tasks));localStorage.setItem('lc_people',JSON.stringify(state.people));localStorage.setItem('lc_decisions',JSON.stringify(state.decisions));
}

async function backendLoad(){
  const sb=state.supabase;
  const [{data:profile},{data:tasks},{data:people},{data:decisions},{data:subs},{data:notes}]=await Promise.all([
    sb.from('profiles').select('*').eq('id',state.user.id).maybeSingle(),
    sb.from('tasks').select('*').order('task_code'),
    sb.from('team_members').select('*').order('name'),
    sb.from('decisions').select('*').order('decision_code'),
    sb.from('submissions').select('*').order('created_at',{ascending:false}),
    sb.from('task_notes').select('*').order('created_at',{ascending:false})
  ]);
  state.profile=profile||null;
  if((tasks||[]).length===0 && ['admin','manager'].includes(profile?.role)) await seedBackend();
  else{
    state.people=(people||[]).map(p=>({id:p.id,name:p.name,role:p.role||''}));
    state.decisions=(decisions||[]).map(d=>({id:d.decision_code,date:d.decision_date,title:d.title,decision:d.decision,owner:d.owner,status:d.status}));
    state.tasks=(tasks||[]).map(t=>({id:t.task_code,dbId:t.id,workstream:t.workstream,phase:t.phase,title:t.title,priority:t.priority,due:t.due_date,instructions:t.instructions,doneMeans:t.done_means,dependencies:t.dependencies||[],owner:t.owner_name||'Unassigned',ownerId:t.owner_id,status:t.status,submissions:(subs||[]).filter(s=>s.task_id===t.id).map(s=>({title:s.title,note:s.note,url:s.url,createdAt:s.created_at,by:s.submitted_by_name})),notes:(notes||[]).filter(n=>n.task_id===t.id).map(n=>({text:n.note,createdAt:n.created_at,by:n.author_name}))}));
  }
}
async function seedBackend(){
  const sb=state.supabase;
  const {data:people}=await sb.from('team_members').insert(seedPeople.map(p=>({name:p.name,role:p.role}))).select();
  const personMap=Object.fromEntries((people||[]).map(p=>[p.name,p.id]));
  await sb.from('tasks').insert(seedTasks.map(t=>({task_code:t.id,workstream:t.workstream,phase:t.phase,title:t.title,priority:t.priority,due_date:t.due,instructions:t.instructions,done_means:t.doneMeans,dependencies:t.dependencies,owner_name:t.owner,owner_id:personMap[t.owner]||null,status:t.status})));
  await sb.from('decisions').insert(seedDecisions.map(d=>({decision_code:d.id,decision_date:d.date,title:d.title,decision:d.decision,owner:d.owner,status:d.status})));
  await backendLoad();
}
async function loadData(){if(state.backend)await backendLoad();else localLoad();}

function countdown(){const target=new Date(state.config.launchAt||seedLaunchAt);const ms=target-Date.now();return Math.max(0,Math.ceil(ms/86400000));}
function isOverdue(t){return t.status!=='done'&&t.due&&t.due<today();}
function pct(){return state.tasks.length?Math.round(state.tasks.filter(t=>t.status==='done').length/state.tasks.length*100):0;}
function taskById(id){return state.tasks.find(t=>t.id===id)}
function statusPill(s){return `<span class="pill ${s}">${esc(statuses[s]||s)}</span>`}
function priorityPill(p){return `<span class="pill ${p.toLowerCase()}">${priorityNames[p]||p}</span>`}
function wsName(id){return workstreams.find(w=>w.id===id)?.name||id}
function phaseName(id){return phases.find(p=>p.id===id)?.name||id}

async function boot(){
  if(state.backend&&!state.user){renderLogin();return;}
  await loadData();render();
}

function layout(content,title='Launch Control'){
  const nav=[['dashboard','Dashboard'],['plan','All Jobs'],['mywork','My Work'],['timeline','Timeline'],['decisions','Decisions'],['team','Team']];
  const who=state.backend?(state.profile?.full_name||state.user?.email||'Signed in'):'Review mode';
  $('#app').innerHTML=`<div class="shell"><aside class="sidebar"><div class="brand">nutrition.fitness®<small>GO LIVE CONTROL</small></div><div class="launch-chip"><strong>${countdown()}</strong><span>days to 1 November</span></div><nav class="nav">${nav.map(([id,label])=>`<button data-view="${id}" class="${state.view===id?'active':''}">${label}</button>`).join('')}</nav><div class="sidebar-foot">${esc(who)}<br>${state.backend?'Shared Supabase workspace':'Local review workspace'}<br><br>Standalone project — not connected to the public website codebase.</div></aside><main class="main"><header class="topbar"><h1>${esc(title)}</h1><div class="top-actions"><button class="btn secondary" data-export>Export CSV</button>${state.backend?`<button class="btn secondary" data-signout>Sign out</button>`:''}<button class="btn primary" data-new-task>+ New task</button></div></header><div class="page">${content}</div></main></div>`;
  bindCommon();
}
function bindCommon(){
  $$('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;render()});
  $('[data-export]')?.addEventListener('click',exportCsv);$('[data-new-task]')?.addEventListener('click',()=>openTaskModal(null));
  $('[data-signout]')?.addEventListener('click',()=>state.supabase.auth.signOut());
}

function render(){
  if(state.view==='plan')return renderPlan();if(state.view==='mywork')return renderMyWork();if(state.view==='timeline')return renderTimeline();if(state.view==='decisions')return renderDecisions();if(state.view==='team')return renderTeam();return renderDashboard();
}
function renderDashboard(){
  const p0=state.tasks.filter(t=>t.priority==='P0'&&t.status!=='done');const overdue=state.tasks.filter(isOverdue);const submitted=state.tasks.filter(t=>t.status==='submitted');const done=state.tasks.filter(t=>t.status==='done');
  const blockers=[...p0].sort((a,b)=>a.due.localeCompare(b.due)).slice(0,3);
  layout(`<section class="hero"><div><p class="eyebrow">1 November 2026</p><h2>Keep launch simple. Do the next important thing.</h2><p>You do not need to think about the whole launch at once. Start with the three jobs below. Everything else can wait.</p></div><div class="pill ${state.backend?'done':'p1'}">${state.backend?'Shared workspace live':'Review mode — backend not connected'}</div></section>
  <section class="status-banner"><div><div class="big">${countdown()} days to go live</div><div class="progress" style="margin-top:12px;background:rgba(255,255,255,.14)"><span style="width:${pct()}%;background:#fff"></span></div><span style="font-size:12px;color:#cbd5e1">${pct()}% of master plan complete</span></div><div class="metric"><strong>${p0.length}</strong><span>Must do</span></div><div class="metric"><strong>${overdue.length}</strong><span>Overdue</span></div><div class="metric"><strong>${submitted.length}</strong><span>Awaiting review</span></div><div class="metric"><strong>${done.length}</strong><span>Completed</span></div></section>
  <div class="grid two"><section class="card"><div class="card-head"><h3>Do these next</h3><button class="btn secondary" data-view="plan">See all jobs</button></div><div class="blocker-list">${blockers.length?blockers.map(t=>`<div class="blocker" data-task="${t.id}"><span class="dot"></span><div><strong>${esc(t.title)}</strong><br><small>${t.id} · ${esc(wsName(t.workstream))} · due ${fmtDate(t.due)}</small></div>${priorityPill(t.priority)}</div>`).join(''):'<div class="empty">Nothing urgent is waiting.</div>'}</div></section>
  <section class="card"><h3>Current phase</h3>${currentPhaseCard()}</section></div>
  <section class="card" style="margin-top:18px"><div class="card-head"><h3>${workstreams.length} simple areas</h3><span class="muted">Click to filter the master plan</span></div><div class="workstream-grid">${workstreams.map(w=>{const ts=state.tasks.filter(t=>t.workstream===w.id);const open=ts.filter(t=>t.status!=='done').length;return `<button class="workstream" data-ws="${w.id}"><span class="count">${open} open</span><h4>${esc(w.name)}</h4><p>${esc(w.description)}</p></button>`}).join('')}</div></section>`, 'Dashboard');
  $$('[data-task]').forEach(x=>x.onclick=()=>openTaskModal(taskById(x.dataset.task)));$$('[data-ws]').forEach(x=>x.onclick=()=>{state.filters.workstream=x.dataset.ws;state.view='plan';render()});
}
function currentPhaseCard(){const d=today();const p=phases.find(x=>x.start<=d&&x.end>=d)||phases.find(x=>x.start>d)||phases.at(-1);const ts=state.tasks.filter(t=>t.phase===p.id);return `<p class="eyebrow">${fmtDate(p.start)} – ${fmtDate(p.end)}</p><h2 style="margin:0 0 8px">${esc(p.name)}</h2><p class="muted">${esc(p.tone)}</p><div class="progress"><span style="width:${ts.length?Math.round(ts.filter(t=>t.status==='done').length/ts.length*100):0}%"></span></div><p class="muted" style="font-size:12px">${ts.filter(t=>t.status==='done').length} of ${ts.length} phase tasks complete</p>`}

function filteredTasks(){return state.tasks.filter(t=>(state.filters.priority==='all'||t.priority===state.filters.priority)&&(state.filters.workstream==='all'||t.workstream===state.filters.workstream)&&(state.filters.status==='all'||t.status===state.filters.status)&&(!state.filters.q||(`${t.id} ${t.title} ${t.owner} ${t.instructions}`).toLowerCase().includes(state.filters.q.toLowerCase())))}
function renderPlan(){
  const rows=filteredTasks();layout(`<section class="hero"><div><p class="eyebrow">Master launch tracker</p><h2>${rows.length} tasks in view</h2><p>Keep this list deliberately short. Must do = needed for launch. Should do = useful if time allows. Later = do not let it distract the launch.</p></div></section>${filtersHtml()}${taskTable(rows)}`,'All Jobs');bindFilters();bindTaskRows();
}
function filtersHtml(){return `<div class="filters"><input data-filter="q" value="${esc(state.filters.q)}" placeholder="Search tasks, owner, instruction…"><select data-filter="priority"><option value="all">All priorities</option>${priorities.map(p=>`<option value="${p}" ${state.filters.priority===p?'selected':''}>${priorityNames[p]}</option>`).join('')}</select><select data-filter="workstream"><option value="all">All workstreams</option>${workstreams.map(w=>`<option value="${w.id}" ${state.filters.workstream===w.id?'selected':''}>${esc(w.short)}</option>`).join('')}</select><select data-filter="status"><option value="all">All statuses</option>${Object.entries(statuses).map(([k,v])=>`<option value="${k}" ${state.filters.status===k?'selected':''}>${v}</option>`).join('')}</select><button class="btn secondary" data-clear>Clear</button></div>`}
function taskTable(tasks){return `<div class="table-wrap"><table><thead><tr><th>Task</th><th>Importance</th><th>Workstream</th><th>Phase</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>${tasks.map(t=>`<tr class="task-row" data-task="${t.id}"><td><div class="task-id">${t.id}</div><div class="task-title">${esc(t.title)}</div></td><td>${priorityPill(t.priority)}</td><td>${esc(wsName(t.workstream))}</td><td>${esc(phaseName(t.phase))}</td><td>${esc(t.owner)}</td><td class="${isOverdue(t)?'overdue':''}">${fmtDate(t.due)}</td><td>${statusPill(t.status)}</td></tr>`).join('')}</tbody></table></div>`}
function bindFilters(){ $$('[data-filter]').forEach(x=>x.onchange=()=>{state.filters[x.dataset.filter]=x.value;renderPlan()});$('[data-filter="q"]')?.addEventListener('input',e=>{state.filters.q=e.target.value});$('[data-filter="q"]')?.addEventListener('keydown',e=>{if(e.key==='Enter')renderPlan()});$('[data-clear]')?.addEventListener('click',()=>{state.filters={q:'',priority:'all',workstream:'all',status:'all'};renderPlan()})}
function bindTaskRows(){ $$('[data-task]').forEach(x=>x.onclick=()=>openTaskModal(taskById(x.dataset.task)))}

function renderMyWork(){
  const me=state.profile?.full_name||'James';let tasks=state.tasks.filter(t=>t.owner===me||(!state.backend&&t.owner==='James'));if(!tasks.length)tasks=state.tasks.filter(t=>t.status==='submitted'||isOverdue(t));
  layout(`<section class="hero"><div><p class="eyebrow">Personal queue</p><h2>${esc(me)} — ${tasks.filter(t=>t.status!=='done').length} open</h2><p>Prioritised view of assigned work. If no assignments match your account yet, the queue shows review/attention items.</p></div></section>${taskTable(tasks.sort((a,b)=>a.priority.localeCompare(b.priority)||a.due.localeCompare(b.due)))}`,'My Work');bindTaskRows();
}
function renderTimeline(){
  layout(`<section class="hero"><div><p class="eyebrow">Simple launch path</p><h2>Decide → build → connect → test → launch</h2><p>Each stage has only a few big jobs. Finish what matters before opening up more work.</p></div></section><div class="timeline">${phases.map(p=>{const ts=state.tasks.filter(t=>t.phase===p.id);const active=p.start<=today()&&p.end>=today();return `<div class="phase ${active?'active':''}"><div class="dates">${fmtDate(p.start)} – ${fmtDate(p.end)}</div><h4>${esc(p.name)}</h4><p>${esc(p.tone)}</p><strong>${ts.length}</strong><span class="muted" style="font-size:11px">tasks · ${ts.filter(t=>t.status==='done').length} done</span></div>`}).join('')}</div><section class="card" style="margin-top:18px"><h3>Tasks by phase</h3>${taskTable(state.tasks.slice().sort((a,b)=>a.due.localeCompare(b.due)))}</section>`,'Timeline');bindTaskRows();
}
function renderDecisions(){
  layout(`<section class="hero"><div><p class="eyebrow">Decision register</p><h2>Stop reopening settled questions.</h2><p>Record important commercial, product and launch decisions here so the team works from one version of the truth.</p></div><button class="btn primary" data-new-decision>+ Decision</button></section><section class="card">${state.decisions.map(d=>`<div class="decision"><div class="decision-meta">${esc(d.id)} · ${fmtDate(d.date)} · ${esc(d.owner)} · ${esc(d.status)}</div><h4>${esc(d.title)}</h4><p>${esc(d.decision)}</p></div>`).join('')}</section>`,'Decisions');$('[data-new-decision]')?.addEventListener('click',openDecisionModal);
}
function renderTeam(){
  const people=state.people;layout(`<section class="hero"><div><p class="eyebrow">Accountability</p><h2>One owner per task.</h2><p>Team members should see a small, clear queue. Add named owners here, then assign work from any task.</p></div><button class="btn primary" data-new-person>+ Add person</button></section><div class="grid three">${people.map(p=>{const ts=state.tasks.filter(t=>t.owner===p.name);return `<div class="owner-card"><div><h4>${esc(p.name)}</h4><p>${esc(p.role)}</p></div><div class="owner-stats"><strong>${ts.filter(t=>t.status!=='done').length}</strong>open<br><span class="${ts.some(isOverdue)?'overdue':'muted'}">${ts.filter(isOverdue).length} overdue</span></div></div>`}).join('')}</div>`,'Team');$('[data-new-person]')?.addEventListener('click',openPersonModal);
}

function openTaskModal(task){
  const isNew=!task;task=task?structuredClone(task):{id:'',title:'',priority:'P1',workstream:'decide',phase:'decide',owner:'Unassigned',due:today(),status:'todo',instructions:'',doneMeans:'',dependencies:[],submissions:[],notes:[]};
  const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal"><div class="modal-head"><div><div class="task-id">${isNew?'NEW TASK':esc(task.id)}</div><h3>${esc(task.title||'Create task')}</h3></div><button class="icon-btn" data-close>×</button></div><div class="modal-body"><div class="modal-grid">
  <div class="field"><label>Task ID</label><input name="id" value="${esc(task.id)}" ${!isNew?'readonly':''}></div><div class="field"><label>Title</label><input name="title" value="${esc(task.title)}"></div>
  <div class="field"><label>Importance</label><select name="priority">${priorities.map(p=>`<option value="${p}" ${task.priority===p?'selected':''}>${priorityNames[p]}</option>`).join('')}</select></div><div class="field"><label>Status</label><select name="status">${Object.entries(statuses).map(([k,v])=>`<option value="${k}" ${task.status===k?'selected':''}>${v}</option>`).join('')}</select></div>
  <div class="field"><label>Workstream</label><select name="workstream">${workstreams.map(w=>`<option value="${w.id}" ${task.workstream===w.id?'selected':''}>${esc(w.name)}</option>`).join('')}</select></div><div class="field"><label>Phase</label><select name="phase">${phases.map(p=>`<option value="${p.id}" ${task.phase===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div>
  <div class="field"><label>Owner</label><select name="owner"><option>Unassigned</option>${state.people.map(p=>`<option ${task.owner===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label>Due</label><input type="date" name="due" value="${esc(task.due)}"></div>
  <div class="field wide"><label>Instructions</label><textarea name="instructions">${esc(task.instructions)}</textarea></div><div class="field wide"><label>Done means</label><textarea name="doneMeans">${esc(task.doneMeans)}</textarea></div><div class="field wide"><label>Dependencies (task IDs, comma separated)</label><input name="dependencies" value="${esc((task.dependencies||[]).join(', '))}"></div>
  ${!isNew?`<div class="wide instruction"><strong>Work submissions</strong><div class="submission-list">${(task.submissions||[]).length?task.submissions.map(s=>`<div class="submission"><strong>${esc(s.title||'Submission')}</strong> ${s.url?`· <a href="${esc(s.url)}" target="_blank" rel="noreferrer">open link</a>`:''}<br>${esc(s.note||'')}<br><span class="muted">${s.createdAt?new Date(s.createdAt).toLocaleString('en-GB'):''}${s.by?` · ${esc(s.by)}`:''}</span></div>`).join(''):'<span class="muted">No work submitted yet.</span>'}</div><button class="btn secondary" style="margin-top:10px" data-submit-work>Submit work / update</button></div>`:''}
  </div><div class="modal-actions"><button class="btn secondary" data-close>Cancel</button><button class="btn primary" data-save-task>${isNew?'Create task':'Save changes'}</button></div></div></div>`;document.body.append(wrap);
  $$('[data-close]',wrap).forEach(b=>b.onclick=()=>wrap.remove());wrap.onclick=e=>{if(e.target===wrap)wrap.remove()};
  $('[data-save-task]',wrap).onclick=async()=>{const val=n=>$(`[name="${n}"]`,wrap).value.trim();const next={...task,id:val('id'),title:val('title'),priority:val('priority'),status:val('status'),workstream:val('workstream'),phase:val('phase'),owner:val('owner'),due:val('due'),instructions:val('instructions'),doneMeans:val('doneMeans'),dependencies:val('dependencies').split(',').map(x=>x.trim()).filter(Boolean),updatedAt:new Date().toISOString()};if(!next.id||!next.title)return alert('Task ID and title are required.');await saveTask(next,isNew);wrap.remove();render()};
  $('[data-submit-work]',wrap)?.addEventListener('click',()=>openSubmissionModal(task,wrap));
}
async function saveTask(task,isNew){
  if(state.backend){const owner=state.people.find(p=>p.name===task.owner);const payload={task_code:task.id,title:task.title,priority:task.priority,status:task.status,workstream:task.workstream,phase:task.phase,owner_name:task.owner,owner_id:owner?.id||null,due_date:task.due,instructions:task.instructions,done_means:task.doneMeans,dependencies:task.dependencies,updated_at:new Date().toISOString()};if(isNew)await state.supabase.from('tasks').insert(payload);else await state.supabase.from('tasks').update(payload).eq('id',task.dbId);await backendLoad();}
  else{const i=state.tasks.findIndex(t=>t.id===task.id);if(isNew||i<0)state.tasks.push(task);else state.tasks[i]={...state.tasks[i],...task};localSave();}
}
function openSubmissionModal(task,parent){
  const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.style.zIndex=60;wrap.innerHTML=`<div class="modal" style="max-width:620px"><div class="modal-head"><div><div class="task-id">${task.id}</div><h3>Submit work / update</h3></div><button class="icon-btn" data-close>×</button></div><div class="modal-body"><div class="field"><label>Title</label><input name="stitle" placeholder="e.g. Final packaging artwork v2"></div><div class="field" style="margin-top:12px"><label>Link</label><input name="surl" placeholder="Google Drive, Canva, GitHub, file link…"></div><div class="field" style="margin-top:12px"><label>Notes</label><textarea name="snote" placeholder="What was completed, what needs review, any caveats…"></textarea></div><div class="modal-actions"><button class="btn secondary" data-close>Cancel</button><button class="btn primary" data-send>Submit for review</button></div></div></div>`;document.body.append(wrap);$$('[data-close]',wrap).forEach(b=>b.onclick=()=>wrap.remove());$('[data-send]',wrap).onclick=async()=>{const title=$('[name="stitle"]',wrap).value.trim()||'Work submission';const url=$('[name="surl"]',wrap).value.trim();const note=$('[name="snote"]',wrap).value.trim();if(state.backend){await state.supabase.from('submissions').insert({task_id:task.dbId,title,url:url||null,note,submitted_by:state.user.id,submitted_by_name:state.profile?.full_name||state.user.email});await state.supabase.from('tasks').update({status:'submitted',updated_at:new Date().toISOString()}).eq('id',task.dbId);await backendLoad();}else{const live=taskById(task.id);live.submissions=live.submissions||[];live.submissions.unshift({title,url,note,createdAt:new Date().toISOString(),by:'Review mode'});live.status='submitted';localSave();}wrap.remove();parent.remove();render();};
}
function openPersonModal(){simpleModal('Add person',`<div class="field"><label>Name</label><input name="name"></div><div class="field" style="margin-top:12px"><label>Role</label><input name="role"></div>`,async(root)=>{const name=$('[name="name"]',root).value.trim(),role=$('[name="role"]',root).value.trim();if(!name)return false;if(state.backend){await state.supabase.from('team_members').insert({name,role});await backendLoad();}else{state.people.push({id:`p-${Date.now()}`,name,role});localSave();}render();return true})}
function openDecisionModal(){simpleModal('Record decision',`<div class="field"><label>Decision ID</label><input name="id" value="DEC-${String(state.decisions.length+1).padStart(3,'0')}"></div><div class="field" style="margin-top:12px"><label>Title</label><input name="title"></div><div class="field" style="margin-top:12px"><label>Decision</label><textarea name="decision"></textarea></div><div class="field" style="margin-top:12px"><label>Owner</label><input name="owner" value="James"></div>`,async(root)=>{const d={id:$('[name="id"]',root).value.trim(),date:today(),title:$('[name="title"]',root).value.trim(),decision:$('[name="decision"]',root).value.trim(),owner:$('[name="owner"]',root).value.trim(),status:'locked'};if(!d.title||!d.decision)return false;if(state.backend){await state.supabase.from('decisions').insert({decision_code:d.id,decision_date:d.date,title:d.title,decision:d.decision,owner:d.owner,status:d.status});await backendLoad();}else{state.decisions.push(d);localSave();}render();return true})}
function simpleModal(title,body,onSave){const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal" style="max-width:620px"><div class="modal-head"><h3>${esc(title)}</h3><button class="icon-btn" data-close>×</button></div><div class="modal-body">${body}<div class="modal-actions"><button class="btn secondary" data-close>Cancel</button><button class="btn primary" data-save>Save</button></div></div></div>`;document.body.append(wrap);$$('[data-close]',wrap).forEach(b=>b.onclick=()=>wrap.remove());$('[data-save]',wrap).onclick=async()=>{if(await onSave(wrap)!==false)wrap.remove()}}

function exportCsv(){const cols=['ID','Title','Priority','Workstream','Phase','Owner','Due','Status','Instructions','Done Means','Dependencies'];const q=x=>`"${String(x??'').replaceAll('"','""')}"`;const rows=state.tasks.map(t=>[t.id,t.title,t.priority,wsName(t.workstream),phaseName(t.phase),t.owner,t.due,statuses[t.status],t.instructions,t.doneMeans,(t.dependencies||[]).join('; ')]);const csv=[cols,...rows].map(r=>r.map(q).join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=`nutrition-go-live-${today()}.csv`;a.click();URL.revokeObjectURL(a.href)}

function renderLogin(){
  $('#app').innerHTML=`<div class="login-shell"><div class="login-card"><div class="brand" style="color:var(--navy)">nutrition.fitness®<small style="color:var(--plum)">GO LIVE CONTROL</small></div><h1 style="margin-top:24px">Team sign in</h1><p>This is the separate internal launch application. It does not use the public website's database or authentication.</p><div class="field"><label>Email</label><input type="email" name="email"></div><div class="field"><label>Password</label><input type="password" name="password"></div><div class="mode-note">First user can create an account. The database trigger makes the first registered profile the administrator.</div><div style="display:flex;gap:8px"><button class="btn primary" data-login>Sign in</button><button class="btn secondary" data-signup>Create account</button></div><p data-auth-msg></p></div></div>`;
  const act=async(type)=>{const email=$('[name="email"]').value.trim(),password=$('[name="password"]').value;if(!email||password.length<6)return $('[data-auth-msg]').textContent='Enter an email and password of at least 6 characters.';const fn=type==='signup'?state.supabase.auth.signUp({email,password}):state.supabase.auth.signInWithPassword({email,password});const {error}=await fn;$('[data-auth-msg]').textContent=error?error.message:(type==='signup'?'Account created. Check your email if confirmation is enabled.':'Signing in…')};$('[data-login]').onclick=()=>act('login');$('[data-signup]').onclick=()=>act('signup');
}

await initBackend();await boot();
