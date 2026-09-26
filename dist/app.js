'use strict';
const toggle=document.getElementById('menu-toggle');
const navigation=document.getElementById('navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
navigation.addEventListener('click',event=>{if(event.target.closest('a')){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open')}});
const player=document.getElementById('audio-player');
const trackList=document.getElementById('track-list');
const title=document.getElementById('playing-title');
const version=document.getElementById('playing-version');
const audioMessage=document.getElementById('audio-message');
const lyricsTitle=document.getElementById('lyrics-title');
const songLyrics=document.getElementById('song-lyrics');
let selectedTrack=0;
function chooseTrack(index,play){const track=window.campaignMedia.tracks[index];selectedTrack=index;player.src=track.src;title.textContent=track.title;version.textContent=track.version;audioMessage.textContent='';lyricsTitle.textContent=track.title;songLyrics.replaceChildren();const lyrics=window.campaignLyrics[track.title];lyrics.split('\n\n').forEach(stanza=>{const paragraph=document.createElement('p');paragraph.textContent=stanza;songLyrics.append(paragraph)});songLyrics.scrollTop=0;document.querySelectorAll('.track').forEach((row,i)=>{row.classList.toggle('active',i===index);row.querySelector('button').setAttribute('aria-pressed',String(i===index))});if(play){document.getElementById('campaign-video').pause();player.play().catch(()=>{audioMessage.textContent='Pulsa reproducir en el reproductor para iniciar la canción.'})}}
window.campaignMedia.tracks.forEach((track,index)=>{const row=document.createElement('div');row.className='track';const number=document.createElement('span');number.className='track-number';number.textContent=String(index+1).padStart(2,'0');const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`Escuchar ${track.title}, ${track.version}`);const label=document.createElement('span');label.textContent=track.title;const small=document.createElement('small');small.textContent=track.version;label.append(small);const icon=document.createElement('span');icon.className='play-icon';icon.textContent='▶';icon.setAttribute('aria-hidden','true');button.append(label,icon);button.addEventListener('click',()=>chooseTrack(index,true));const download=document.createElement('a');download.href=track.src;download.download='';download.className='track-download';download.textContent='↓';download.setAttribute('aria-label',`Descargar ${track.title}, ${track.version}`);row.append(number,button,download);trackList.append(row)});
document.getElementById('track-count').textContent=`${window.campaignMedia.tracks.length} grabaciones`;
chooseTrack(0,false);
player.addEventListener('ended',()=>{if(selectedTrack+1<window.campaignMedia.tracks.length)chooseTrack(selectedTrack+1,true)});
player.addEventListener('error',()=>{audioMessage.textContent='No se ha podido cargar este audio. Prueba a descargarlo o elige otra versión.'});
const video=document.getElementById('campaign-video');
const videoSelect=document.getElementById('video-select');
const videoMessage=document.getElementById('video-message');
window.campaignMedia.videos.forEach((item,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=`${String(index+1).padStart(2,'0')} · ${item.title}`;videoSelect.append(option)});
function chooseVideo(){const item=window.campaignMedia.videos[Number(videoSelect.value)];video.pause();video.src=item.src;videoMessage.textContent='';document.getElementById('video-download').href=item.src;video.setAttribute('aria-label',`Vídeo de campaña: ${item.title}`)}
videoSelect.addEventListener('change',chooseVideo);chooseVideo();
video.addEventListener('play',()=>player.pause());
video.addEventListener('error',()=>{videoMessage.textContent='No se ha podido cargar el vídeo. Puedes descargarlo con el enlace inferior.'});
