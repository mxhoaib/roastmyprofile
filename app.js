(function(){
const SITE_URL='mxhoaib.github.io/roastmyprofile'; // configurable watermark/share URL
const BASE='https://'+SITE_URL+'/';
const MAX_HASH_BIO=2000;
const $=s=>document.querySelector(s);let type='linkedin',heat='mild',size='4x5',last=null,lastText='',seed=Date.now()>>>0;
const SAMPLES={linkedin:"Passionate, results-driven thought leader and growth hacking guru. I leverage synergy to disrupt ecosystems. Serial entrepreneur. Team player and self-starter. I believe in a growth mindset. I am obsessed with innovation. #leadership #hustle #innovation",
instagram:"✨🌸 living my best life 🌸✨ | coffee ☕ | wanderlust ✈️🌍 | good vibes only 💫 #blessed #travel #foodie #lifestyle",
dating:"I love to travel, fluent in sarcasm, looking for my partner in crime. Foodie, dog lover, Netflix and pizza. Work hard play hard. No drama please. 🍕🐶✈️"};
const ORDER=['linkedin','instagram','dating'];let sIdx=0;
const SIZES={'4x5':[1080,1350],'9x16':[1080,1920],'1x1':[1080,1080]};
function seg(sel,attr,val){document.querySelectorAll(sel).forEach(b=>{const on=b.dataset[attr]===val;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)})}
function setType(t){type=t;seg('.types button','type',t)}
document.querySelectorAll('.types button').forEach(b=>b.onclick=()=>setType(b.dataset.type));
document.querySelectorAll('[data-heat]').forEach(b=>b.onclick=()=>{heat=b.dataset.heat;seg('[data-heat]','heat',heat);if(last)run(true)});
document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{size=b.dataset.size;seg('[data-size]','size',size);if(last)draw()});
$('#friend').onchange=e=>{$('#friendnote').hidden=!e.target.checked};
const txt=$('#txt');const upd=()=>$('#count').textContent=txt.value.length.toLocaleString('en')+' characters';txt.oninput=upd;
$('#sample').onclick=()=>{const t=ORDER[sIdx++%3];setType(t);txt.value=SAMPLES[t];upd()};
function toast(m){$('#toast').textContent=m}
/* base64url helpers (UTF-8 safe) */
const b64e=s=>{const b=new TextEncoder().encode(s);let bin='';b.forEach(c=>bin+=String.fromCharCode(c));return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const b64d=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const bin=atob(s);return new TextDecoder().decode(Uint8Array.from(bin,c=>c.charCodeAt(0)))};
function link(){const p={t:type,h:heat,s:seed,b:lastText.slice(0,MAX_HASH_BIO)};return BASE+'#r='+b64e(JSON.stringify(p))}
function localLink(){return location.href.split('#')[0]+link().slice(BASE.length)}
function run(keepSeed){const v=txt.value.trim();if(v.length<3){txt.focus();txt.setAttribute('aria-invalid','true');txt.placeholder='Paste a bio first. Even one line works! (or tap “Try a sample”)';$('#count').textContent='👆 Paste a bio first, or try a sample';return}
 txt.removeAttribute('aria-invalid');if(!keepSeed)seed=((seed*1103515245+12345)^Date.now())>>>0;lastText=v;last=RoastEngine.roast(v,type,seed,heat==='spicy');render()}
function render(){const o=$('#out');o.hidden=false;$('#score').textContent=savage();$('#verdict').textContent='Savagery score · '+heatLabel();
 const ol=$('#lines');ol.innerHTML='';last.lines.forEach((l,i)=>{const li=document.createElement('li');li.textContent=l;li.style.animationDelay=i*120+'ms';ol.appendChild(li)});
 $('#tip').textContent=last.tip;toast('');draw();
 const msg=`My ${type} bio scored ${savage()}/10 on the Savagery scale 🔥 "${last.lines[0]}"`;
 $('#wa').href='https://wa.me/?text='+encodeURIComponent(msg+' '+link());
 $('#x').href='https://twitter.com/intent/tweet?text='+encodeURIComponent(msg)+'&url='+encodeURIComponent(link());
 o.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
const heatLabel=()=>{const s=savage();return s>=8?'Burnt to a crisp 🔥':s>=6?'Well done':s>=4?'Medium':'Lightly toasted'};
const savage=()=>Math.round((11-last.score)*10)/10; // low profile score = high savagery
$('#go').onclick=()=>run();$('#again').onclick=()=>run();
function wrap(ctx,text,x,y,maxW,lh,maxLines){const w=text.split(/\s+/);let line='',n=1;for(let i=0;i<w.length;i++){let word=w[i];while(ctx.measureText(word).width>maxW)word=word.slice(0,-1);const t=line+word+' ';if(ctx.measureText(t).width>maxW&&line){if(n>=maxLines){ctx.fillText(line.trim()+'…',x,y);return y+lh}ctx.fillText(line.trim(),x,y);y+=lh;n++;line=word+' '}else line=t}ctx.fillText(line.trim(),x,y);return y+lh}
function flame(ctx,x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const p=new Path2D("M12 1c2 6 9 9 9 18a9 9 0 0 1-18 0c0-5 3-7 4-11 1 3 2 4 3 4 0-4 0-7 2-11z");const g=ctx.createLinearGradient(0,0,0,30);g.addColorStop(0,'#ffc23d');g.addColorStop(1,'#ff2d55');ctx.fillStyle=g;ctx.shadowColor='#ff6a1a';ctx.shadowBlur=30;ctx.fill(p);ctx.restore()}
function draw(){const c=$('#card');const [W,H]=SIZES[size];c.width=W;c.height=H;c.className='s'+size;const x=c.getContext('2d');const F='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
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
$('#dl').onclick=async()=>{await download(`roastmyprofile-${size}.png`);toast('Card downloaded ✓')};
$('#copy').onclick=()=>clip(text(),'Roast copied ✓');
$('#link').onclick=()=>clip(link(),$('#friend').checked?'Friend link copied ✓ Send it to them!':'Link copied ✓');
async function story(app){const prev=size;size='9x16';seg('[data-size]','size',size);draw();await download(`roastmyprofile-story-${app.toLowerCase().replace(/\s/g,'')}.png`);
 toast(`9:16 card saved ✓ Open ${app}, start a new Story${app==='TikTok'?'/post':''}, pick the image from your gallery, and add the link sticker: ${SITE_URL}`)}
$('#tt').onclick=()=>story('TikTok');$('#ig').onclick=()=>story('Instagram');
$('#share').onclick=async()=>{try{const b=await new Promise(r=>$('#card').toBlob(r,'image/png'));const f=new File([b],'roastmyprofile.png',{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text:text(),url:link()});return}
 if(navigator.share){await navigator.share({text:text(),url:link()});return}}catch(e){if(e&&e.name==='AbortError')return}clip(text()+'\n'+link(),'Sharing isn\'t supported here, so the roast and link were copied ✓')};
/* Open a friend link */
function fromHash(){const m=location.hash.match(/^#r=([A-Za-z0-9_-]{1,4000})$/);if(!m)return;try{const p=JSON.parse(b64d(m[1]));if(!ORDER.includes(p.t)||typeof p.b!=='string')throw 0;
 setType(p.t);heat=p.h==='spicy'?'spicy':'mild';seg('[data-heat]','heat',heat);seed=(p.s>>>0)||1;txt.value=p.b.slice(0,MAX_HASH_BIO);upd();
 const bn=document.createElement('div');bn.id='friendbanner';bn.textContent='👀 A friend sent you a roast of this bio. Roast your own next!';$('#app').prepend(bn);run(true)}catch(e){toast('That roast link looks broken. Paste a bio to start fresh.')}}
fromHash();window.addEventListener('hashchange',fromHash);
window.__rmp={link,localLink,b64e,b64d};
})();
