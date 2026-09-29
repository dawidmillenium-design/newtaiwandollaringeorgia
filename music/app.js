'use strict';
const titles=["Batumi éjszakák","Batumi éjszakák","לילות בבאטומי","לילות בבאטומי","Batum Geceleri","Batum Geceleri","Rue des Ombres","Rue des Ombres","Batumi Scam","Batumi Scam","Noci v Batumi","Noci v Batumi","巴统的夜","巴统的夜","Batumi, Paris qiymətləri","Batumi, Paris qiymətləri","Τιμές Παρισιού","Τιμές Παρισιού","Eroe dell'ascensore","Eroe dell'ascensore","Noites em Batumi","Noites em Batumi","Héroe del Ascensor","Héroe del Ascensor","Batumi-Nächte","Batumi-Nächte","Rue des Ombres","Rue des Ombres","Dirty Diana","Dirty Diana","Alashvili's Lament","Elevator Hero","Elevator Hero","Elevator Hero","Elevator Hero","Dirty Diana","Dirty Diana","Dirty DaNNa (Next Episode)"];
const list=document.getElementById('track-list'),filter=document.getElementById('filter'),count=document.getElementById('track-count'),title=document.getElementById('track-title'),number=document.getElementById('track-number'),lyrics=document.getElementById('lyrics'),status=document.getElementById('status'),player=document.getElementById('player'),disc=document.getElementById('disc'),note=document.getElementById('version-note');
let data,selected=0;
function selectTrack(i,writeHistory=true){
  selected=(i+titles.length)%titles.length;
  const id=data.ids[selected];title.textContent=titles[selected];number.textContent=`TRACK ${String(selected+1).padStart(2,'0')} / ${titles.length}`;
  note.textContent=`Version ${titles.slice(0,selected+1).filter(n=>n===titles[selected]).length} · Lyrics from the public song page`;
  lyrics.textContent=data.lyrics[data.index[selected]]||'';status.textContent=lyrics.textContent?'':'Lyrics unavailable for this track.';
  player.src=`https://suno.com/embed/${id}`;player.title=`Play ${titles[selected]} on Suno`;disc.classList.remove('playing');
  [...list.querySelectorAll('button')].forEach((b,n)=>{b.classList.toggle('active',n===selected);if(n===selected)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
  if(writeHistory)history.replaceState(null,'',`#track-${id}`);
}
function render(){
  titles.forEach((name,i)=>{const li=document.createElement('li'),button=document.createElement('button'),n=document.createElement('span'),label=document.createElement('span');button.type='button';n.className='num';n.textContent=String(i+1).padStart(2,'0');label.className='name';label.textContent=name;button.append(n,label);button.addEventListener('click',()=>selectTrack(i));li.append(button);list.append(li)});
  count.textContent=`${titles.length} tracks in the crate`;
  const initial=data.ids.indexOf(location.hash.replace(/^#track-/,''));
  selectTrack(initial<0?0:initial,false);
}
filter.addEventListener('input',()=>{const q=filter.value.trim().toLocaleLowerCase();let matches=0;[...list.children].forEach((li,i)=>{li.hidden=!titles[i].toLocaleLowerCase().includes(q);if(!li.hidden)matches++});count.textContent=`${matches} of ${titles.length} tracks`});
document.getElementById('previous').addEventListener('click',()=>selectTrack(selected-1));
document.getElementById('next').addEventListener('click',()=>selectTrack(selected+1));
document.getElementById('random').addEventListener('click',()=>selectTrack((selected+1+Math.floor(Math.random()*(titles.length-1)))%titles.length));
window.addEventListener('hashchange',()=>{const i=data?.ids.indexOf(location.hash.replace(/^#track-/,''));if(i>=0)selectTrack(i,false)});
fetch('lyrics.json').then(r=>{if(!r.ok)throw Error(`HTTP ${r.status}`);return r.json()}).then(payload=>{if(payload.ids.length!==titles.length||payload.index.length!==titles.length)throw Error('Track data mismatch');data=payload;render()}).catch(()=>{status.textContent='Lyrics could not load. Refresh the page to try again.';count.textContent='Track list unavailable.'});
