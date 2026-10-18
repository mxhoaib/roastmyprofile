/* RoastMyProfile template engine: fully client-side, no network. */
(function(){
const pick=(a,r)=>a[Math.floor(r()*a.length)];
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return((s>>>0)%100000)/100000}}
const BUZZ=['passionate','synergy','guru','ninja','rockstar','thought leader','visionary','disrupt','innovative','results-driven','dynamic','leverage','game changer','game-changer','hustle','growth mindset','self-starter','team player','go-getter','evangelist','storyteller','wizard','serial entrepreneur','ceo of my life','value-add','strategic','ecosystem','10x','obsessed','driven'];
const CLICHE=['love to travel','fluent in sarcasm','partner in crime','work hard play hard','work hard, play hard','looking for my','dog lover','foodie','netflix','adventure','coffee','pizza','good vibes','living my best life','wanderlust','just ask','6ft','not here for hookups','live laugh love','entrepreneur','beach','gym','hiking','swipe left','no drama','sapiosexual','wine'];
const L={
 open:{linkedin:["Your LinkedIn reads like a cover letter that drank three espressos.","Recruiters open this and immediately need a nap and a whiteboard.","This About section has more corporate energy than a quarterly all-hands.","Congratulations, you've written a TED talk nobody asked to attend."],
 instagram:["This bio is giving 'aesthetic', just not a specific one.","Your Instagram bio has the vibe of a scented candle with no label.","The algorithm read this and politely scrolled past.","This bio is 40% vibes, 60% guessing what you actually do."],
 dating:["This profile is a job interview where the job is 'having fun'.","Your bio has the energy of a polite handshake at a wedding.","Swiping on this feels like reading the terms and conditions of romance.","This bio is a mystery novel where the mystery is: who are you?"]},
 buzz:["You said '{w}' so confidently that a LinkedIn influencer felt a disturbance in the force.","'{w}'? Bold of you to use the word every HR slide deck uses.","Using '{w}' in a bio is like adding glitter to a spreadsheet: technically allowed.","I counted '{w}' and my inner middle manager stood up and clapped."],
 manybuzz:["{n} buzzwords. This isn't a bio, it's corporate bingo and somebody just won.","With {n} buzzwords, you could power a mid-sized consulting firm's PowerPoint for a year."],
 cliche:["'{w}' — groundbreaking. Truly nobody else has ever enjoyed that.","Ah, '{w}'. You and roughly 87 million other profiles.","'{w}' is not a personality trait, it's a default setting.","'{w}'! A rare and exotic preference, like oxygen."],
 emoji:["{n} emojis. Your bio isn't written, it's decorated.","With {n} emojis, this bio needs subtitles for the over-30s.","The emoji-to-word ratio here suggests hieroglyphics are making a comeback."],
 hashtag:["{n} hashtags. Who are these for? The bio police?","#{h} — the hashtag that's been hashtagging since 2014.","Hashtags in a bio are like business cards at a funeral: technically networking."],
 short:["This bio is so short it ends before my roast begins.","Minimalism is great, but this is just a shrug in text form.","Short bio, big mystery. Too big. Like, give us a clue."],
 long:["This bio has chapters. I needed a bookmark.","I started reading this in summer and now it's autumn.","Scrolling this felt like a workout. Thanks for the cardio."],
 caps:["The CAPS LOCK is doing a lot of shouting for someone this friendly.","Why are we yelling? Is the bio okay?"],
 noaction:{linkedin:["There's no clear answer to 'what do you actually do?' — just vibes in a blazer."],instagram:["No link, no call to action. Followers want to follow you somewhere!"],dating:["There's no conversation starter. You've left your matches holding a blank 'hey'."]},
 iam:["{n} sentences start with 'I'. It's a bio, not an autobiography... okay, it kinda is."],
 closer:["Still, you clearly have potential — let's polish it.","Underneath the clichés, there's someone interesting. Let them out.","Honestly? A few edits and this goes from 'meh' to 'hire/follow/date me'.","You're not bad at this. You're just one rewrite away from great."]};
const SPICY={
 open:{linkedin:["Your LinkedIn has the personality of an out-of-office reply.","This About section was clearly written in a meeting that could've been an email.","Reading this, I can hear a ring light humming.","This bio has been 'circling back' since 2017 and still hasn't landed."],
 instagram:["Your bio is a Pinterest board that gained sentience and still has nothing to say.","This is less a bio and more a mood ring with Wi-Fi.","Even the algorithm asked, 'but what do you POST?'","Your bio is giving 'influencer', the followers are giving 'my aunt and two bots'."],
 dating:["This profile is so generic the app's autofill is asking for royalties.","I've seen more personality in a Wi-Fi password.","Your bio reads like it was assembled from the 'most popular' dropdown.","Swiping right on this would be agreeing to a very polite hostage situation."]},
 closer:["Spicy, yes, but the fix is easy. You've got this.","Roasted to a crisp. Now go rise from the ashes.","Harsh? Sure. Fixable? Totally."]};
/* Blocklist: protected traits, appearance, slurs. Checked on every output line, including echoes of user input. Extend BLOCK as needed. */
const BLOCK=/\b(ugly|fat|fatty|obese|skinny|chubby|bald|short(?:y|ie)|race|racial|black|white|asian|arab|indian|african|latino|jew\w*|muslim\w*|christian\w*|hindu\w*|islam\w*|gay|lesbian|trans\w*|tranny|queer|female|male|woman|women|girl|boy|disab\w*|retard\w*|cripple\w*|autis\w*|nigg\w*|fag\w*|whore|slut|bitch\w*|kill|die|suicid\w*|nazi\w*|terroris\w*|religio\w*|god|allah|jesus|pray\w*)\b/i;
const safe=l=>!BLOCK.test(l);
const TIPS={linkedin:["Replace adjectives with one number: 'grew revenue 32%' beats 'results-driven'.","Open with what you help people do, in one plain sentence.","Cut every buzzword and add one specific project you're proud of.","End with how to reach you or what you're looking for next."],
 instagram:["Line 1: who you are. Line 2: what you post. Line 3: a link or call to action.","Pick one niche and say it plainly — 'Dubai street food reels' beats 'vibes'.","Keep emojis to 2–3 as bullet points, not decoration.","Drop the hashtags from your bio and put them in captions instead."],
 dating:["Swap 'love to travel' for one specific story: 'still chasing the best kunafa I had in Istanbul'.","Add one easy question at the end so matches have a reply ready.","Show, don't tell: a concrete weekend plan beats 'adventurous'.","Say what you ARE looking for, not a list of what you're not."]};
const VERD=[[3,"Medium rare 🔥"],[5,"Lightly toasted"],[7,"Pretty well done"],[9,"Chef's kiss"],[11,"Fireproof"]];
function analyse(text){
 const t=text.slice(0,20000),low=t.toLowerCase();
 const words=(low.match(/[a-z']+/g)||[]);
 const buzz0=BUZZ.filter(b=>low.includes(b)),cl=CLICHE.filter(c=>low.includes(c));
 const buzz=buzz0.filter(b=>!buzz0.some(o=>o!==b&&o.includes(b)));
 const emojis=(t.match(/\p{Extended_Pictographic}/gu)||[]).length;
 const tags=(t.match(/#[\p{L}\d_]+/gu)||[]).filter(h=>safe(h.slice(1).replace(/_/g,' ')));
 const caps=(t.match(/\b[A-Z]{4,}\b/g)||[]).length;
 const iam=(t.match(/(^|[.!?]\s+)I\b/g)||[]).length;
 const hasAction=/(dm|contact|link|email|reach|message|ask me|hire|book|let's|say hi|looking for|open to)/i.test(t);
 const hasNumber=/\d/.test(t);
 return {chars:t.length,words:words.length,buzz,cl,emojis,tags,caps,iam,hasAction,hasNumber};
}
function roast(text,type,seed,spicy){
 const OP=spicy?SPICY.open:L.open,CL=spicy?SPICY.closer:L.closer;
 const a=analyse(text),r=rng(seed),f=(s,o)=>s.replace(/\{(\w)\}/g,(_,k)=>o[k]);
 const c=[];
 if(a.buzz.length>=3)c.push(f(pick(L.manybuzz,r),{n:a.buzz.length}));
 if(a.buzz.length)c.push(f(pick(L.buzz,r),{w:pick(a.buzz,r)}));
 if(a.cl.length)c.push(f(pick(L.cliche,r),{w:pick(a.cl,r)}));
 if(a.cl.length>1){const pool=L.cliche.filter(x=>!c.some(y=>y.startsWith(x.split('{')[0])));c.push(f(pick(pool.length?pool:L.cliche,r),{w:a.cl.filter(x=>!c.join().includes(x))[0]||a.cl[1]}))}
 if(a.emojis>=4)c.push(f(pick(L.emoji,r),{n:a.emojis}));
 if(a.tags.length>=2)c.push(f(pick(L.hashtag,r),{n:a.tags.length,h:pick(a.tags,r).slice(1).slice(0,24)}));
 if(a.words<15)c.push(pick(L.short,r));
 if(a.words>220)c.push(pick(L.long,r));
 if(a.caps>=2)c.push(pick(L.caps,r));
 if(!a.hasAction)c.push(pick(L.noaction[type],r));
 if(a.iam>=4)c.push(f(L.iam[0],{n:a.iam}));
 for(let i=c.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]]}
 const uniq=[...new Set(c)].filter(safe).slice(0,3);
 const lines=[pick(OP[type],r),...uniq];
 if(lines.length<3)lines.push(pick(L.short,r));
 lines.push(pick(CL,r));
 let s=8-a.buzz.length*0.7-a.cl.length*0.6-Math.max(0,a.emojis-3)*0.3-Math.max(0,a.tags.length-1)*0.4-(a.words<15?2:0)-(a.words>220?1:0)-(a.hasAction?0:1)+(a.hasNumber?0.8:0);
 s=Math.max(2,Math.min(9.5,Math.round(s*2)/2));
 const tip=pick(TIPS[type],r);
 return {lines:lines.filter(safe).slice(0,5),score:s,verdict:VERD.find(v=>s<v[0])[1],tip,stats:a};
}
window.RoastEngine={roast,analyse,safe,BLOCK};
})();
