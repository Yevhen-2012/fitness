const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
const motion=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-program]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('input[name="program"]').forEach(input=>input.checked=input.value===button.dataset.program);document.querySelector('#start').scrollIntoView({behavior:motion.matches?'instant':'smooth'});}));
document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const status=document.querySelector('#form-status');status.textContent='Demo complete. Your selected format is '+new FormData(event.currentTarget).get('program')+'. No information was sent or saved.';status.classList.add('success');});
const dialog=document.querySelector('#media-dialog');const content=document.querySelector('#viewer-content');const caption=document.querySelector('#viewer-caption');const previous=document.querySelector('#previous-photo');const next=document.querySelector('#next-photo');const photos=[...document.querySelectorAll('[data-photo]')];let photoIndex=0;let opener;
function showPhoto(index){photoIndex=(index+photos.length)%photos.length;const photo=photos[photoIndex];const image=document.createElement('img');image.src=photo.dataset.photo;image.alt=photo.dataset.caption;content.replaceChildren(image);caption.textContent=photo.dataset.caption+' · '+(photoIndex+1)+' / '+photos.length;}
function openViewer(source){opener=source;dialog.showModal();document.querySelector('#close-viewer').focus();}
photos.forEach((photo,index)=>photo.addEventListener('click',()=>{previous.hidden=false;next.hidden=false;showPhoto(index);openViewer(photo);}));
previous.addEventListener('click',()=>showPhoto(photoIndex-1));next.addEventListener('click',()=>showPhoto(photoIndex+1));
document.querySelector('#close-viewer').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('keydown',event=>{if(content.querySelector('img')&&['ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();showPhoto(photoIndex+(event.key==='ArrowRight'?1:-1));}});
dialog.addEventListener('close',()=>{const video=content.querySelector('video');if(video)video.pause();content.replaceChildren();opener?.focus({preventScroll:true});});
document.querySelector('#watch-video').addEventListener('click',event=>{const video=document.createElement('video');video.controls=true;video.playsInline=true;video.src='assets/running-under-bridg-transcode.mp4';video.poster='assets/running-under-bridg-poster-00001.jpg';content.replaceChildren(video);previous.hidden=true;next.hidden=true;caption.textContent='A moment in motion · Original Fitness footage';openViewer(event.currentTarget);video.play().catch(()=>{});});
const links=[...navigation.querySelectorAll('a[href^="#"]')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-20% 0px -60% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
