const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
document.querySelectorAll('[data-service]').forEach(a=>{const url=new URL(a.href);url.searchParams.set('service',a.dataset.service);a.href=url.href});
const form=document.querySelector('#inquiry');
if(form){const selected=new URLSearchParams(location.search).get('service'),select=document.querySelector('#kind');if([...select.options].some(o=>o.value===selected))select.value=selected;form.addEventListener('submit',e=>{e.preventDefault();const message=document.querySelector('#message').value.trim();if(!message){document.querySelector('#message').focus();return}location.href='mailto:jrepka@outlook.com?subject='+encodeURIComponent('Website enquiry: '+select.value)+'&body='+encodeURIComponent('Hello,\n\nI would like help with: '+select.value+'\n\n'+message+'\n\n');document.querySelector('#status').textContent='If your email app did not open, use the email address shown on this page.'})}
const detail=document.querySelector('#detail');if(detail){if(location.hash==='#detail')detail.open=true;document.querySelectorAll('a[href="#detail"]').forEach(a=>a.addEventListener('click',()=>{detail.open=true}))}

// Subtle reveal effects, disabled when reduced motion is requested.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll('.home-work, .home-services, .home-about, .skills-section, .legacy-project, .process, .faq, .mini-cta');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08 });
  targets.forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
}
