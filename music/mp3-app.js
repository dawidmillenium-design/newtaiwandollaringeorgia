'use strict';
const titles=["Batumi éjszakák","Batumi éjszakák","לילות בבאטומי","לילות בבאטומי","Batum Geceleri","Batum Geceleri","Rue des Ombres","Rue des Ombres","Batumi Scam","Batumi Scam","Noci v Batumi","Noci v Batumi","巴统的夜","巴统的夜","Batumi, Paris qiymətləri","Batumi, Paris qiymətləri","Τιμές Παρισιού","Τιμές Παρισιού","Eroe dell'ascensore","Eroe dell'ascensore","Noites em Batumi","Noites em Batumi","Héroe del Ascensor","Héroe del Ascensor","Batumi-Nächte","Batumi-Nächte","Rue des Ombres","Rue des Ombres","Dirty Diana","Dirty Diana","Alashvili's Lament","Elevator Hero","Elevator Hero","Elevator Hero","Elevator Hero","Dirty Diana","Dirty Diana"];
const flags=["🇭🇺", "🇭🇺", "🇮🇱", "🇮🇱", "🇹🇷", "🇹🇷", "🇫🇷", "🇫🇷", "🇬🇧", "🇬🇧", "🇨🇿", "🇨🇿", "🇨🇳", "🇨🇳", "🇦🇿", "🇦🇿", "🇬🇷", "🇬🇷", "🇮🇹", "🇮🇹", "🇵🇹", "🇵🇹", "🇪🇸", "🇪🇸", "🇩🇪", "🇩🇪", "🇫🇷", "🇫🇷", "🇬🇧", "🇬🇧", "🇬🇧", "🇬🇧", "🇬🇧", "🇬🇧", "🇬🇧", "🇬🇧", "🇬🇧"];
const languages=["Hungarian", "Hungarian", "Hebrew", "Hebrew", "Turkish", "Turkish", "French", "French", "English", "English", "Czech", "Czech", "Chinese", "Chinese", "Azerbaijani", "Azerbaijani", "Greek", "Greek", "Italian", "Italian", "Portuguese", "Portuguese", "Spanish", "Spanish", "German", "German", "French", "French", "English", "English", "English", "English", "English", "English", "English", "English", "English"];
const displayTitle=i=>`${titles[i]} ${flags[i]}`;
const list=document.getElementById('track-list'),filter=document.getElementById('filter'),count=document.getElementById('track-count'),title=document.getElementById('track-title'),number=document.getElementById('track-number'),lyrics=document.getElementById('lyrics'),status=document.getElementById('status'),player=document.getElementById('player'),disc=document.getElementById('disc'),note=document.getElementById('version-note');
const songIds=["9dd1c4e6-032e-4a62-9672-d55292dbfa1c","7591cefc-4419-4fb7-b6ba-9d39a85c3bf2","84b6e434-ec95-4651-ad05-da5711b4d247","8a9c2b11-e6ce-4f5f-9d48-a85d54b28859","69c8b4ce-f9a5-4175-b0ee-083f6a438081","41bd7bbf-fdb9-4d5c-82d9-f5b313bda334","359cfa0e-824a-49a9-996d-77494c10b813","8811f065-0e3c-47c5-ab7f-cdb03445b7a5","d78d4b50-abe4-4652-ba1b-dbf37408792a","f87f4277-6ab4-4a55-9102-f22f7c1e3f71","643347d1-7b92-4956-b3d8-21428aa1086f","33b1488e-e286-4bf3-803a-1eb0f833f06f","45d4577f-c3c3-4cfe-a67c-1febbbf9269f","45de1cfb-3efe-412d-9070-7786bce798ad","edd99279-2999-40dd-9919-bff8932c4b7f","87d7f714-e663-412b-916f-435bebf6f0c7","179a739a-f5ec-49fa-b8c3-2da00df9b13d","0c910a5a-e0b1-4e39-9aaf-f1f24a9d99e8","92112dfc-7f89-4c5c-ae73-63b282b38a50","ea9ab984-fafa-49b8-b76e-fec22876a466","d2fb5a96-dc8d-4d64-b4d8-df84a6131d14","d40f8ba1-7034-4820-a04b-db9660c2acc2","b821b9ce-ab04-46cb-97c2-a5eacd5ed7a7","d872f984-303b-4c25-8afb-e5dfcd4a56b9","c2e61d47-f3a9-4a63-94e4-54b542249baa","5e0d510f-5da5-4fd8-8de8-d1bf08a7d4a4","25391a3a-1414-495e-b363-0ab0e51d8b3c","eaae4db0-3483-4de8-b5ef-8f643678866c","f2dfb06f-fa02-4de4-b4d9-afef2f8702f3","efe038e7-77c3-4569-8e8c-85b784115892","d4a50654-3837-434d-bff7-27ee79e7cc10","d7435b70-0891-41db-899d-db77b3cd2306","ebc952cf-8fcf-45cd-8069-618cb9ecc36c","470f5e88-48fb-4856-9ab3-ef325bf980fe","9ca36b83-0109-44d0-ae2b-919e586b6d04","040b5ae0-8269-4c28-9276-c330c541a5d2","f3f4ab9b-8d3e-4613-b089-001fb1598b55"];
let data={ids:songIds,lyrics:[],index:songIds.map(()=>-1)},selected=0;
function selectTrack(i,writeHistory=true){
  selected=(i+titles.length)%titles.length;
  const id=data.ids[selected];title.textContent=displayTitle(selected);number.textContent=`TRACK ${String(selected+1).padStart(2,'0')} / ${titles.length}`;
  note.textContent=`Version ${titles.slice(0,selected+1).filter(n=>n===titles[selected]).length} · Listen in the player below`;
  lyrics.textContent=data.lyrics[data.index[selected]]||'';status.textContent=lyrics.textContent?'':'Lyrics unavailable for this track.';
  const wasPlaying=!player.paused;
  const source=new URL(`audio/${id}.mp3`,location.href).href;
  if(player.src!==source){player.pause();player.src=source;player.load();if(wasPlaying)player.play().catch(()=>{});}
  player.setAttribute('aria-label',`Play ${titles[selected]} (${languages[selected]})`);
  document.getElementById('audio-status').textContent='Audio hosted with this website.';
  disc.classList.remove('playing');
  [...list.querySelectorAll('button')].forEach((b,n)=>{b.classList.toggle('active',n===selected);if(n===selected)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
  if(writeHistory)history.replaceState(null,'',`#track-${id}`);
}
function render(){
  titles.forEach((name,i)=>{const li=document.createElement('li'),button=document.createElement('button'),n=document.createElement('span'),label=document.createElement('span');button.type='button';n.className='num';n.textContent=String(i+1).padStart(2,'0');label.className='name';label.textContent=displayTitle(i);button.setAttribute('aria-label',`${name}, ${languages[i]}, track ${i+1}`);button.append(n,label);button.addEventListener('click',()=>selectTrack(i));li.append(button);list.append(li)});
  count.textContent=`${titles.length} tracks in the crate`;
  const initial=data.ids.indexOf(location.hash.replace(/^#track-/,''));
  selectTrack(initial<0?0:initial,false);
}
filter.addEventListener('input',()=>{const q=filter.value.trim().toLocaleLowerCase();let matches=0;[...list.children].forEach((li,i)=>{li.hidden=!titles[i].toLocaleLowerCase().includes(q);if(!li.hidden)matches++});count.textContent=`${matches} of ${titles.length} tracks`});
document.getElementById('previous').addEventListener('click',()=>selectTrack(selected-1));
document.getElementById('next').addEventListener('click',()=>selectTrack(selected+1));
document.getElementById('random').addEventListener('click',()=>selectTrack((selected+1+Math.floor(Math.random()*(titles.length-1)))%titles.length));
render();
window.addEventListener('hashchange',()=>{const i=data?.ids.indexOf(location.hash.replace(/^#track-/,''));if(i>=0)selectTrack(i,false)});
fetch('lyrics.json').then(r=>{if(!r.ok)throw Error(`HTTP ${r.status}`);return r.json()}).then(payload=>{if(payload.ids.length!==titles.length||payload.index.length!==titles.length)throw Error('Track data mismatch');data=payload;selectTrack(selected,false)}).catch(()=>{status.textContent='Lyrics unavailable for this track.'});

player.addEventListener('play',()=>disc.classList.add('playing'));
player.addEventListener('pause',()=>disc.classList.remove('playing'));
player.addEventListener('error',()=>{document.getElementById('audio-status').textContent='This MP3 is not available yet.';disc.classList.remove('playing');});
player.addEventListener('ended',()=>{selectTrack(selected+1);player.play().catch(()=>{});});
