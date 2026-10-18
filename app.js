(function(){
const SITE_URL='mxhoaib.github.io/roastmyprofile'; // configurable watermark/share URL
const BASE='https://'+SITE_URL+'/';
const MAX_HASH_BIO=2000;
Viral.init({slug:'roastmyprofile',name:'RoastMyProfile',url:BASE,emoji:'🔥',c1:'#ff6a1a',c2:'#ff2d55'});
const $=s=>document.querySelector(s);let type='linkedin',heat='mild',size='4x5',last=null,lastText='',seed=Date.now()>>>0;
const SAMPLES={linkedin:"Passionate, results-driven thought leader and growth hacking guru. I leverage synergy to disrupt ecosystems. Serial entrepreneur. Team player and self-starter. I believe in a growth mindset. I am obsessed with innovation. #leadership #hustle #innovation",
instagram:"✨🌸 living my best life 🌸✨ | coffee ☕ | wanderlust ✈️🌍 | good vibes only 💫 #blessed #travel #foodie #lifestyle",
dating:"I love to travel, fluent in sarcasm, looking for my partner in crime. Foodie, dog lover, Netflix and pizza. Work hard play hard. No drama please. 🍕🐶✈️"};
const ORDER=['linkedin','instagram','dating'];let sIdx=0;
const SIZES={'4x5':[1080,1350],'9x16':[1080,1920],'1x1':[1080,1080],'wide':[1200,630]};
function seg(sel,attr,val){document.querySelectorAll(sel).forEach(b=>{const on=b.dataset[attr]===val;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)})}
function setType(t){type=t;seg('.types button','type',t)}
document.querySelectorAll('.types button').forEach(b=>b.onclick=()=>setType(b.dataset.type));
document.querySelectorAll('[data-heat]').forEach(b=>b.onclick=()=>{heat=b.dataset.heat;seg('[data-heat]','heat',heat);if(last)run(true)});
document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{size=b.dataset.size;seg('[data-size]','size',size);if(last)draw()});
$('#friend').onchange=e=>{const f=e.target.checked;$('#friendnote').hidden=!f;$('.urllbl').firstChild.textContent=f?"Your friend's public profile link ":'Public profile link ';$('#go').textContent=f?'🔥 Roast my friend':'🔥 Roast me'};
const txt=$('#txt');const upd=()=>$('#count').textContent=txt.value.length.toLocaleString('en')+' characters';txt.oninput=upd;
$('#sample').onclick=()=>{const t=ORDER[sIdx++%3];setType(t);txt.value=SAMPLES[t];upd()};
function toast(m){$('#toast').textContent=m}
/* base64url helpers (UTF-8 safe) */
const b64e=s=>{const b=new TextEncoder().encode(s);let bin='';b.forEach(c=>bin+=String.fromCharCode(c));return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const b64d=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const bin=atob(s);return new TextDecoder().decode(Uint8Array.from(bin,c=>c.charCodeAt(0)))};
function link(){const p={t:type,h:heat,s:seed,b:lastText.slice(0,MAX_HASH_BIO)};if(lastUrl)p.u=lastUrl;if($('#friend').checked)p.f=1;return BASE+'#r='+b64e(JSON.stringify(p))}
function localLink(){return location.href.split('#')[0]+link().slice(BASE.length)}
const PLAT=[[/(^|\.)instagram\.com$/,'Instagram','instagram'],[/(^|\.)linkedin\.com$/,'LinkedIn','linkedin'],[/(^|\.)(x|twitter)\.com$/,'X','instagram'],[/(^|\.)tiktok\.com$/,'TikTok','instagram'],[/(^|\.)fiverr\.com$/,'Fiverr','linkedin'],[/(^|\.)upwork\.com$/,'Upwork','linkedin'],[/(^|\.)facebook\.com$/,'Facebook','instagram'],[/(^|\.)youtube\.com$/,'YouTube','instagram'],[/(^|\.)github\.com$/,'GitHub','linkedin'],[/(^|\.)(tinder|bumble|hinge)\.(com|co)$/,'Dating app','dating']];
function parseUrl(raw){raw=(raw||'').trim();if(!raw)return null;if(!/^https?:\/\//i.test(raw))raw='https://'+raw;let u;try{u=new URL(raw)}catch(e){return{bad:true}}if(!/^https?:$/.test(u.protocol)||!u.hostname.includes('.'))return{bad:true};
 const h=u.hostname.toLowerCase().replace(/^www\./,''),m=PLAT.find(p=>p[0].test(h));const seg=u.pathname.split('/').filter(Boolean).filter(x=>!/^(in|company|user|profile|people)$/i.test(x));
 const handle=(seg[0]||'').replace(/^@/,'').slice(0,40);return{url:u.href.slice(0,300),platform:m?m[1]:h,type:m?m[2]:null,handle}}
const PL={Instagram:'An Instagram link: a carefully curated museum of brunches.',LinkedIn:'A LinkedIn URL: the only social network where people humble-brag in bullet points.',X:'An X profile: hot takes served at room temperature.',TikTok:'A TikTok account: your attention span called; it left after 7 seconds.',Fiverr:'A Fiverr gig: "I will do anything for $5", including this roast.',Upwork:'Upwork: where "quick task" means three revisions and a call.',GitHub:'A GitHub profile: green squares are not a personality, but nice try.',Facebook:'A Facebook profile in 2026? Bold. Vintage, even.',YouTube:'A YouTube channel: please like, subscribe and hit the roast bell.'};
function handleLine(p,r){const h=p.handle;if(!h)return null;const L=[`"@${h}": a handle that clearly lost a fight with "already taken".`,`"@${h}" sounds like a Wi-Fi network nobody trusts.`,`"@${h}": the username you pick at 2am and keep out of stubbornness.`];if(/\d{3,}/.test(h))return `"@${h}": the numbers in your handle are telling us how many people got there first.`;if(/[._]{2,}|_$/.test(h))return `"@${h}": that many underscores is a cry for help.`;return L[r%L.length]}
function collect(p){const ep=(window.RMP_CONFIG&&window.RMP_CONFIG.COLLECT_ENDPOINT||'').trim();if(!ep||!p||p.bad)return;
 const data={link:p.url,platform:p.platform,timestamp:new Date().toISOString(),page:location.origin+location.pathname};
 try{const body=new URLSearchParams(data);fetch(ep,{method:'POST',mode:'no-cors',body,keepalive:true}).catch(()=>{})}catch(e){}}
let lastUrl=null;
function run(keepSeed){const P=parseUrl($('#purl').value);if(P&&P.bad){$('#purl').setAttribute('aria-invalid','true');$('#purl').focus();toast('That link doesn\'t look right. Try something like https://instagram.com/yourhandle');return}$('#purl').removeAttribute('aria-invalid');
 if(P&&P.type&&!keepSeed)setType(P.type);let v=txt.value.trim();if(v.length<3&&P)v=(P.handle||P.platform)+' on '+P.platform;
 if(v.length<3){txt.focus();txt.setAttribute('aria-invalid','true');txt.placeholder='Paste a bio first. Even one line works! (or tap “Try a sample”)';$('#count').textContent='👆 Paste a bio first, or try a sample';return}
 txt.removeAttribute('aria-invalid');if(!keepSeed)seed=((seed*1103515245+12345)^Date.now())>>>0;lastText=txt.value.trim()||v;last=RoastEngine.roast(v,type,seed,heat==='spicy');
 if(P){const extra=[handleLine(P,seed),PL[P.platform]||`A ${P.platform} profile: even the URL is trying too hard.`].filter(Boolean);last.lines=extra.concat(last.lines).slice(0,6);if(!keepSeed&&(!lastUrl||lastUrl!==P.url)){collect(P);lastUrl=P.url}}render()}
let rendering=false;function render(){const o=$('#out');o.hidden=false;$('#score').textContent=savage();$('#verdict').textContent='Savagery score · '+heatLabel();
 const ol=$('#lines');ol.innerHTML='';last.lines.forEach((l,i)=>{const li=document.createElement('li');li.textContent=l;li.style.animationDelay=i*120+'ms';ol.appendChild(li)});
 $('#tip').textContent=last.tip;toast('');draw();
 const msg=`My ${type} bio scored ${savage()}/10 on the Savagery scale 🔥 "${last.lines[0]}"`;
 const L=encodeURIComponent(link());$('#x').href='https://twitter.com/intent/tweet?text='+encodeURIComponent(msg)+'&url='+L;$('#fb').href='https://www.facebook.com/sharer/sharer.php?u='+L;$('#li').href='https://www.linkedin.com/sharing/share-offsite/?url='+L;$('#rd').href='https://www.reddit.com/submit?url='+L+'&title='+encodeURIComponent(msg);
 if(!rendering){bump('roasts');best.add({s:savage(),type,heat,friend:$('#friend').checked});pay.show()}
 o.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
const heatLabel=()=>{const s=savage();return s>=8?'Burnt to a crisp 🔥':s>=6?'Well done':s>=4?'Medium':'Lightly toasted'};
const savage=()=>Math.round((11-last.score)*10)/10; // low profile score = high savagery
$('#go').onclick=()=>run();$('#again').onclick=()=>run();
function wrap(ctx,text,x,y,maxW,lh,maxLines){const w=text.split(/\s+/);let line='',n=1;for(let i=0;i<w.length;i++){let word=w[i];while(ctx.measureText(word).width>maxW)word=word.slice(0,-1);const t=line+word+' ';if(ctx.measureText(t).width>maxW&&line){if(n>=maxLines){ctx.fillText(line.trim()+'…',x,y);return y+lh}ctx.fillText(line.trim(),x,y);y+=lh;n++;line=word+' '}else line=t}ctx.fillText(line.trim(),x,y);return y+lh}
function flame(ctx,x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const p=new Path2D("M12 1c2 6 9 9 9 18a9 9 0 0 1-18 0c0-5 3-7 4-11 1 3 2 4 3 4 0-4 0-7 2-11z");const g=ctx.createLinearGradient(0,0,0,30);g.addColorStop(0,'#ffc23d');g.addColorStop(1,'#ff2d55');ctx.fillStyle=g;ctx.shadowColor='#ff6a1a';ctx.shadowBlur=30;ctx.fill(p);ctx.restore()}
function draw(){const c=$('#card');const [W,H]=SIZES[size];c.width=W;c.height=H;c.className='s'+size;
 if(size==='wide'){Viral.drawCard(c,W,H,{kicker:'My '+({linkedin:'LinkedIn',instagram:'Instagram',dating:'dating profile'})[type]+' got roasted',big:savage()+'/10',line:'“'+last.lines[0]+'”',sub:heatLabel(),cta:$('#friend').checked?'Roast them back':'Roast a friend'});return}const x=c.getContext('2d');const F='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
 let g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#2a0c06');g.addColorStop(.5,'#120808');g.addColorStop(1,'#0a0a0c');x.fillStyle=g;x.fillRect(0,0,W,H);
 let rg=x.createRadialGradient(W*.85,0,0,W*.85,0,900);rg.addColorStop(0,'#ff6a1a55');rg.addColorStop(1,'#ff6a1a00');x.fillStyle=rg;x.fillRect(0,0,W,H);
 const tall=size==='9x16',sq=size==='1x1';let y=tall?200:90;
 flame(x,80,y-55,2.6);x.fillStyle='#f5f5f7';x.font='800 44px '+F;x.fillText('My '+({linkedin:'LinkedIn',instagram:'Instagram',dating:'dating profile'})[type]+' got roasted',160,y);
 y+=tall?120:70;x.fillStyle='#ffffff99';x.font='700 30px '+F;x.fillText('SAVAGERY SCORE'+(heat==='spicy'?' · 🌶️ SPICY':''),80,y);
 y+=(sq?170:210);let sg=x.createLinearGradient(0,y-200,0,y);sg.addColorStop(0,'#ffc23d');sg.addColorStop(1,'#ff2d55');x.fillStyle=sg;x.font='800 '+(sq?180:220)+'px '+F;const sv=String(savage());x.fillText(sv,80,y);const sw=x.measureText(sv).width;
 x.font='700 72px '+F;x.fillText('/10',100+sw,y);x.fillStyle='#f5f5f7';x.font='700 44px '+F;x.fillText(heatLabel(),100+sw,y-100);
 y+=tall?140:90;x.fillStyle='#f5f5f7';x.font='800 '+(tall?60:sq?44:50)+'px '+F;y=wrap(x,'“'+last.lines[0]+'”',80,y,920,tall?76:sq?56:64,tall?5:3)+ (tall?40:20);
 x.font='500 '+(tall?38:34)+'px '+F;const more=last.lines.slice(1,tall?4:sq?2:3);
 for(const l of more){x.fillStyle='#ff6a1a';x.fillText('•',80,y);x.fillStyle='#d4d4d8';y=wrap(x,l,125,y,875,tall?50:44,2)+16}
 const ty=Math.min(y+10,H-(sq?230:260));x.fillStyle='#ffc23d22';x.beginPath();x.roundRect(80,ty,920,140,28);x.fill();x.fillStyle='#ffc23d';x.font='700 28px '+F;x.fillText('ONE REAL TIP',115,ty+48);x.fillStyle='#f5f5f7';x.font='500 30px '+F;wrap(x,last.tip,115,ty+92,860,38,2);
 x.fillStyle='#ffffff88';x.font='700 32px '+F;x.textAlign='center';x.fillText('🔥 '+SITE_URL,W/2,H-60);x.textAlign='left'}
const text=()=>`🔥 My ${type} profile got roasted. Savagery ${savage()}/10 (${heatLabel()})\n\n${last.lines.map(l=>'• '+l).join('\n')}\n\nTip: ${last.tip}\n— ${SITE_URL}`;
async function clip(s,ok){try{await navigator.clipboard.writeText(s);toast(ok)}catch(e){const t=document.createElement('textarea');t.value=s;document.body.appendChild(t);t.select();try{document.execCommand('copy');toast(ok)}catch(_){toast('Copy not available here')}t.remove()}}
function download(name){return new Promise(res=>$('#card').toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);res()},'image/png'))}
$('#dl').onclick=async()=>{await download(`roastmyprofile-${size}.png`);toast('Card downloaded ✓');bump('shares')};
$('#copy').onclick=()=>clip(text(),'Roast copied ✓');
$('#link').onclick=()=>{bump('shares');clip(link(),$('#friend').checked?'Friend link copied ✓ Send it to them!':'Link copied ✓')};
['#x','#fb','#li','#rd'].forEach(s=>$(s).addEventListener('click',()=>bump('shares')));
async function story(app){const prev=size;size='9x16';seg('[data-size]','size',size);draw();await download(`roastmyprofile-story-${app.toLowerCase().replace(/\s/g,'')}.png`);
 toast(`9:16 card saved ✓ Open ${app}, start a new Story${app==='TikTok'?'/post':''}, pick the image from your gallery, and add the link sticker: ${SITE_URL}`)}
$('#tt').onclick=()=>story('TikTok');$('#ig').onclick=()=>story('Instagram');
$('#share').onclick=async()=>{try{const b=await new Promise(r=>$('#card').toBlob(r,'image/png'));const f=new File([b],'roastmyprofile.png',{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text:text(),url:link()});bump('shares');return}
 if(navigator.share){await navigator.share({text:text(),url:link()});bump('shares');return}}catch(e){if(e&&e.name==='AbortError')return}clip(text()+'\n'+link(),'Sharing isn\'t supported here, so the roast and link were copied ✓')};
/* Open a friend link */
function fromHash(){const m=location.hash.match(/^#r=([A-Za-z0-9_-]{1,4000})$/);if(!m)return;try{const p=JSON.parse(b64d(m[1]));if(!ORDER.includes(p.t)||typeof p.b!=='string')throw 0;
 setType(p.t);heat=p.h==='spicy'?'spicy':'mild';seg('[data-heat]','heat',heat);seed=(p.s>>>0)||1;txt.value=p.b.slice(0,MAX_HASH_BIO);upd();
 if(typeof p.u==='string'&&/^https?:\/\//.test(p.u))$('#purl').value=p.u.slice(0,300);
 const prev=$('#friendbanner');if(prev)prev.remove();const bn=document.createElement('div');bn.id='friendbanner';const hd=p.u?(parseUrl(p.u)||{}).handle:'';
 bn.textContent=p.f?`👀 Someone roasted ${hd?'@'+hd:'your profile'}! Your roast is below. Roast them back?`:'👀 A friend sent you their roast. Think yours is better? Roast your own next!';
 const cb=document.createElement('button');cb.className='cta';cb.style.marginLeft='10px';cb.dataset.ev='challenge-accept';cb.textContent=p.f?'🔥 Roast them back':'🔥 Roast mine';cb.onclick=()=>{txt.value='';$('#purl').value='';upd();$('#friend').checked=!!p.f;$('#friend').onchange({target:$('#friend')});$('#purl').focus();$('#app').scrollIntoView({behavior:'smooth'})};bn.append(cb);$('#app').prepend(bn);
 Viral.count('challenge-open','Opened roast link');rendering=true;lastUrl=null;run(true);rendering=false}catch(e){toast('That roast link looks broken. Paste a bio to start fresh.')}}
fromHash();window.addEventListener('hashchange',fromHash);
/* Local streak + share counter (this device only) */
function stats(){try{return JSON.parse(localStorage.getItem('rmp-stats')||'{}')}catch(e){return{}}}
function bump(k){const s=stats(),today=new Date().toISOString().slice(0,10);s[k]=(s[k]||0)+1;
 if(k==='roasts'&&s.day!==today){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);s.streak=s.day===y?(s.streak||0)+1:1;s.day=today}
 try{localStorage.setItem('rmp-stats',JSON.stringify(s))}catch(e){}showStats()}
function showStats(){const s=stats();if(!s.roasts)return;const el=$('#stats');el.hidden=false;el.textContent=`🔥 Your streak: ${s.streak||1} day${(s.streak||1)>1?'s':''} · ${s.roasts} roast${s.roasts>1?'s':''} · ${s.shares||0} share${s.shares===1?'':'s'} (on this device)`}
showStats();
const pay=Viral.payBar({item:'fix5',label:'Want a better profile?',cta:'✨ Fix it',price:5});
const best=Viral.board('roasts',$('#board'),e=>`${e.s}/10 savagery · ${e.friend?'friend’s ':''}${e.type}${e.heat==='spicy'?' 🌶️':''} · ${new Date(e.t).toLocaleDateString('en',{dateStyle:'medium'})}`);
/* Roast a friend: paste their link, get a roast link */
$('#froast').onclick=()=>{const v=$('#furl').value.trim();const P=parseUrl(v);if(!P||P.bad){toast('Paste your friend\'s public profile link first (e.g. https://www.linkedin.com/in/name).');$('#furl').focus();return}
 $('#friend').checked=true;$('#friend').onchange({target:$('#friend')});$('#purl').value=P.url;txt.value='';upd();lastText='';run();$('#furl').value='';toast('Friend roasted 🔥 Tap “Copy roast link” or Share to send it to them.')};
/* Optional score submission via the existing COLLECT_ENDPOINT (no public leaderboard) */
const nick=$('#nick');try{nick.value=localStorage.getItem('rmp-nick')||''}catch(e){}
$('#submit').onclick=()=>{if(!last){toast('Roast a profile first.');return}const ep=(window.RMP_CONFIG&&window.RMP_CONFIG.COLLECT_ENDPOINT||'').trim();if(!ep){toast('Score submission is switched off.');return}
 const n=nick.value.replace(/[<>\u0000-\u001f]/g,'').trim().slice(0,24);try{localStorage.setItem('rmp-nick',n)}catch(e){}
 const data={kind:'score',name:n||'anonymous',score:String(savage()),type,heat,link:lastUrl||(location.origin+location.pathname),platform:'score:'+type,timestamp:new Date().toISOString(),page:location.origin+location.pathname};
 try{fetch(ep,{method:'POST',mode:'no-cors',body:new URLSearchParams(data),keepalive:true}).catch(()=>{})}catch(e){}$('#submit').disabled=true;toast('Score sent to the site owner ✓ Thanks!')};
window.__rmp={link,localLink,b64e,b64d};
})();
