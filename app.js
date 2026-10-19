import {launchAt,areas,team,areaScoreWeights,taskScoreWeights} from './data.js';
const origin='https://james-control-centre.james615845.chatgpt.site';
const destination=origin+'/?view=Projects&project=nutrition-fitness-go-live';
let target=null;
function exportedPlan(){
 const saved=localStorage.getItem('go_live_areas');
 const stored=saved===null?areas:JSON.parse(saved);
 if(!Array.isArray(stored))throw Error('The saved plan is not a task array. Keep this browser open and contact James before changing its data.');
 return {launchAt,areas:stored,team,areaScoreWeights,taskScoreWeights};
}
const root=document.querySelector('#app');
root.innerHTML='<main style="max-width:780px;margin:60px auto;padding:30px;font-family:system-ui;line-height:1.8"><p>NUTRITION.FITNESS · LAUNCH CONTROL</p><h1>Your project has moved to James HQ.</h1><p>This old dashboard is now read-only. Your saved browser data has been preserved; nothing has been cleared or overwritten.</p><h2>Bring your saved task edits with you</h2><p>Use this browser, where you used the old dashboard. Open HQ, sign in if needed, then review and approve the import. HQ keeps a previous-version snapshot. Your existing task IDs and human owners are retained.</p><p><button id="transfer" style="padding:12px 18px;cursor:pointer">Transfer saved plan to HQ</button> <button id="download" style="padding:12px 18px;cursor:pointer">Download saved plan</button></p><p><a id="destination">Open Nutrition.Fitness in HQ</a></p><p id="status" role="status"></p><p style="font-size:12px;color:#666">The public nutrition.fitness website and NUFI app are separate and are unaffected. This page does not send task data anywhere until you choose Transfer. The original project source remains in Git history for recovery.</p></main>';
document.querySelector('#destination').href=destination;
const status=document.querySelector('#status');
document.querySelector('#transfer').onclick=()=>{try{exportedPlan();target=window.open(destination,'james-hq-launch-transfer');status.textContent=target?'In HQ, review and approve your saved-plan import. If no import prompt appears, use Download saved plan and HQ’s Import saved edits button.':'Allow the HQ window to open, or download the saved plan and import it in HQ.'}catch(e){status.textContent=e.message}};
window.addEventListener('message',e=>{if(e.origin!==origin||e.source!==target||e.data?.type!=='JAMES_HQ_READY_FOR_LAUNCH_EXPORT')return;try{target.postMessage({type:'JAMES_HQ_LAUNCH_EXPORT',plan:exportedPlan()},origin);status.textContent='Saved plan sent to your HQ window for review. Approve the import there; your browser copy is still preserved.'}catch(err){status.textContent=err.message}});
document.querySelector('#download').onclick=()=>{try{const url=URL.createObjectURL(new Blob([JSON.stringify(exportedPlan(),null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='nutrition-go-live-browser-export.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Export downloaded. In HQ, open Projects → Nutrition.Fitness Go Live → Import saved edits.'}catch(e){status.textContent=e.message}};
