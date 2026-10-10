import {launchAt,areas as seedAreas,team} from './data.js';

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const clamp=n=>Math.max(0,Math.min(100,Number(n)||0));
const statusNames={done:'Done',inprogress:'In progress',todo:'To do',blocked:'Blocked',later:'Later'};
const state={areas:[],view:'dashboard',selectedArea:null};

function load(){
  const version='nine-areas-v1';
  if(localStorage.getItem('go_live_version')!==version){
    localStorage.removeItem('go_live_areas');
    localStorage.setItem('go_live_version',version);
  }
  state.areas=JSON.parse(localStorage.getItem('go_live_areas')||'null')||structuredClone(seedAreas);
}
function save(){localStorage.setItem('go_live_areas',JSON.stringify(state.areas));}

function countdown(){
  const ms=new Date(launchAt)-Date.now();
  return Math.max(0,Math.ceil(ms/86400000));
}
function itemProgress(item){
  const kids=(item.children||[]).filter(x=>!x.later);
  if(!kids.length)return clamp(item.progress);
  const total=kids.reduce((s,x)=>s+(x.weight||1),0)||1;
  return Math.round(kids.reduce((s,x)=>s+itemProgress(x)*(x.weight||1),0)/total);
}
function areaProgress(area){
  const items=(area.items||[]).filter(x=>!x.later);
  const total=items.reduce((s,x)=>s+(x.weight||1),0)||1;
  return Math.round(items.reduce((s,x)=>s+itemProgress(x)*(x.weight||1),0)/total);
}
function flatten(items,out=[]){
  for(const item of items||[]){
    if(item.children?.length)flatten(item.children,out);
    else out.push(item);
  }
  return out;
}
function nextActions(area){
  return flatten(area.items).filter(x=>!x.later&&itemProgress(x)<100).slice(0,3);
}
function findItem(id){
  for(const area of state.areas){
    const stack=[...(area.items||[])];
    while(stack.length){
      const item=stack.shift();
      if(item.id===id)return {area,item};
      if(item.children?.length)stack.unshift(...item.children);
    }
  }
  return null;
}
function overallProgress(){
  if(!state.areas.length)return 0;
  return Math.round(state.areas.reduce((s,a)=>s+areaProgress(a),0)/state.areas.length);
}
function tone(p){
  if(p>=100)return 'done';
  if(p>=70)return 'good';
  if(p>=35)return 'mid';
  return 'low';
}
function statusFor(item){
  if(item.later)return 'later';
  if(item.status==='blocked')return 'blocked';
  const p=itemProgress(item);
  if(p>=100)return 'done';
  if(p>0)return 'inprogress';
  return item.status||'todo';
}
function progressBar(p){return `<div class="progress"><span style="width:${p}%"></span></div>`;}

function layout(content,title='Launch Control'){
  const nav=[['dashboard','Dashboard'],['areas','Areas'],['team','Team']];
  $('#app').innerHTML=`
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">nutrition.fitness®<small>GO LIVE</small></div>
        <div class="launch-chip"><strong>${countdown()}</strong><span>days to 1 November</span></div>
        <nav class="nav">${nav.map(([id,label])=>`<button data-view="${id}" class="${state.view===id?'active':''}">${label}</button>`).join('')}</nav>
        <div class="sidebar-foot">Simple launch board<br>Only the things that matter.</div>
      </aside>
      <main class="main">
        <header class="topbar">
          <h1>${esc(title)}</h1>
          <div class="overall-mini"><strong>${overallProgress()}%</strong><span>overall</span></div>
        </header>
        <div class="page">${content}</div>
      </main>
    </div>`;
  $$('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;state.selectedArea=null;render();});
}

function render(){
  if(state.view==='area'&&state.selectedArea)return renderArea(state.selectedArea);
  if(state.view==='areas')return renderAreas();
  if(state.view==='team')return renderTeam();
  return renderDashboard();
}

function areaCard(area){
  const p=areaProgress(area);
  const next=nextActions(area);
  return `
    <button class="area-card" data-area="${area.id}">
      <div class="area-head">
        <div><span class="owner">${esc(area.owner)}</span><h3>${esc(area.name)}</h3></div>
        <strong class="score ${tone(p)}">${p}%</strong>
      </div>
      ${progressBar(p)}
      <p class="summary">${esc(area.summary)}</p>
      <div class="blocker-note"><span>Current issue</span>${esc(area.blocker)}</div>
      <div class="next-list">
        <span>Next</span>
        ${next.length?next.map(x=>`<div>• ${esc(x.title)}</div>`).join(''):'<div>✓ Nothing outstanding</div>'}
      </div>
    </button>`;
}

function bindAreaCards(){
  $$('[data-area]').forEach(b=>b.onclick=()=>{state.selectedArea=b.dataset.area;state.view='area';render();});
}
function renderDashboard(){
  const sorted=state.areas;
  layout(`
    <section class="hero">
      <div>
        <p class="eyebrow">Launch Control</p>
        <h2>Nine areas. That’s it.</h2>
        <p>Open an area, see what is done, what is blocking it and the next few things to finish.</p>
      </div>
      <div class="launch-summary"><strong>${countdown()}</strong><span>days left</span></div>
    </section>
    <section class="area-grid">${sorted.map(areaCard).join('')}</section>
  `,'Dashboard');
  bindAreaCards();
}
function renderAreas(){
  layout(`
    <section class="hero compact">
      <div><p class="eyebrow">All areas</p><h2>The whole launch on one screen.</h2></div>
    </section>
    <section class="area-list">${state.areas.map(a=>{
      const p=areaProgress(a);
      return `<button class="area-row" data-area="${a.id}">
        <div><strong>${esc(a.name)}</strong><small>${esc(a.owner)} · ${esc(a.blocker)}</small></div>
        <div class="row-progress">${progressBar(p)}<b>${p}%</b></div>
      </button>`;
    }).join('')}</section>
  `,'Areas');
  bindAreaCards();
}

function leafRow(item,depth=0){
  const p=itemProgress(item),s=statusFor(item);
  return `<button class="check-row depth-${depth}" data-item="${item.id}">
    <span class="check-icon ${s}">${s==='done'?'✓':s==='blocked'?'!':s==='later'?'→':'•'}</span>
    <span class="check-main">
      <strong>${esc(item.title)}</strong>
      ${item.note?`<small>${esc(item.note)}</small>`:''}
      ${item.owner?`<em>${esc(item.owner)}</em>`:''}
    </span>
    <span class="check-pct">${p}%</span>
  </button>`;
}
function groupBlock(item){
  const p=itemProgress(item);
  return `
    <details class="group-block">
      <summary>
        <div><strong>${esc(item.title)}</strong><small>${esc(item.note||'')}</small></div>
        <div class="group-score">${p}%</div>
      </summary>
      <div class="group-body">${(item.children||[]).map(x=>leafRow(x,1)).join('')}</div>
    </details>`;
}
function renderArea(id){
  const area=state.areas.find(a=>a.id===id);
  if(!area){state.view='dashboard';return renderDashboard();}
  const p=areaProgress(area),next=nextActions(area);
  layout(`
    <button class="back" data-back>← Dashboard</button>
    <section class="area-hero">
      <div>
        <p class="eyebrow">${esc(area.owner)}</p>
        <h2>${esc(area.name)}</h2>
        <p>${esc(area.summary)}</p>
      </div>
      <div class="big-score ${tone(p)}">${p}%<span>complete</span></div>
    </section>
    <section class="focus-card">
      <div><span>Current issue</span><strong>${esc(area.blocker)}</strong></div>
      <div><span>Next three</span>${next.length?next.map(x=>`<p>• ${esc(x.title)}</p>`).join(''):'<p>✓ Nothing outstanding</p>'}</div>
    </section>
    <section class="checklist">
      ${area.items.map(item=>item.children?.length?groupBlock(item):leafRow(item)).join('')}
    </section>
  `,area.name);
  $('[data-back]').onclick=()=>{state.view='dashboard';state.selectedArea=null;render();};
  $$('[data-item]').forEach(b=>b.onclick=()=>openItem(b.dataset.item));
}

function renderTeam(){
  layout(`
    <section class="hero compact"><div><p class="eyebrow">People</p><h2>Who owns what.</h2><p>No organisation chart. Just the people involved in getting this live.</p></div></section>
    <section class="team-list">
      ${team.map(p=>`<div class="person"><div><strong>${esc(p.name)}</strong><p>${esc(p.role)}</p></div><span>${esc(p.type)}</span></div>`).join('')}
    </section>
  `,'Team');
}

function openItem(id){
  const found=findItem(id);if(!found)return;
  const {item}=found;
  const wrap=document.createElement('div');wrap.className='modal-backdrop';
  const ownerOptions=['Unassigned',...team.map(x=>x.name)];
  wrap.innerHTML=`
    <div class="modal">
      <div class="modal-head"><div><p class="eyebrow">Update</p><h3>${esc(item.title)}</h3></div><button class="icon-btn" data-close>×</button></div>
      <div class="modal-body">
        <div class="form-grid">
          <label>Progress
            <div class="progress-input"><input type="range" min="0" max="100" step="5" name="progress" value="${itemProgress(item)}"><input type="number" min="0" max="100" name="progressNumber" value="${itemProgress(item)}">%</div>
          </label>
          <label>Status
            <select name="status">
              ${Object.entries(statusNames).map(([k,v])=>`<option value="${k}" ${statusFor(item)===k?'selected':''}>${v}</option>`).join('')}
            </select>
          </label>
          <label>Owner
            <select name="owner">${ownerOptions.map(x=>`<option ${item.owner===x?'selected':''}>${esc(x)}</option>`).join('')}</select>
          </label>
          <label class="wide">Note
            <textarea name="note">${esc(item.note||'')}</textarea>
          </label>
          <div class="wide submission-box">
            <strong>Submit / attach work</strong>
            <label>Link<input name="url" placeholder="Drive, Canva, GitHub or another link"></label>
            <label>Submission note<textarea name="submissionNote" placeholder="What is ready for review?"></textarea></label>
            ${(item.submissions||[]).length?`<div class="past-submissions">${item.submissions.map(s=>`<p><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.url)}</a><br><small>${esc(s.note||'')}</small></p>`).join('')}</div>`:''}
          </div>
        </div>
        <div class="modal-actions"><button class="btn secondary" data-close>Cancel</button><button class="btn primary" data-save>Save</button></div>
      </div>
    </div>`;
  document.body.append(wrap);
  const range=$('[name="progress"]',wrap),num=$('[name="progressNumber"]',wrap);
  range.oninput=()=>num.value=range.value;num.oninput=()=>range.value=clamp(num.value);
  $$('[data-close]',wrap).forEach(b=>b.onclick=()=>wrap.remove());
  wrap.onclick=e=>{if(e.target===wrap)wrap.remove();};
  $('[data-save]',wrap).onclick=()=>{
    item.progress=clamp(num.value);
    item.status=$('[name="status"]',wrap).value;
    item.later=item.status==='later';
    item.owner=$('[name="owner"]',wrap).value;
    item.note=$('[name="note"]',wrap).value.trim();
    const url=$('[name="url"]',wrap).value.trim();
    const note=$('[name="submissionNote"]',wrap).value.trim();
    if(url){item.submissions=item.submissions||[];item.submissions.unshift({url,note,createdAt:new Date().toISOString()});}
    if(item.progress>=100){item.progress=100;item.status='done';}
    save();wrap.remove();render();
  };
}

load();render();
