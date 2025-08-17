const message = `Ти — моє сонце і спокій.

Коли ти посміхаєшся, світ стає теплішим.

Твоя доброта робить мене кращим щодня.

Ти сильна, талановита і прекрасна в усьому, що робиш.

Я вірю в тебе. Навіть коли важко — я поруч.

Дякую за твоє світло. Люблю тебе безмежно. 💖`;

const app = document.getElementById('app');
const heart = document.getElementById('heart');
const apology = document.getElementById('apology');
// const again = document.getElementById('again');
const closeBtn = document.getElementById('close');
const confetti = document.getElementById('confetti');
const floaters = document.getElementById('floaters');
const MOBILE = matchMedia('(max-width: 520px)').matches;
const FLOAT_COUNT = MOBILE ? 14 : 24;

function seedFloaters(){
  const count = FLOAT_COUNT;
  for(let i=0;i<count;i++){
    const sp = document.createElement('span');
    sp.textContent = Math.random()>.5 ? '❤' : '💖';
    const size = (Math.random()*28+14)|0;
    const x = (Math.random()*100).toFixed(2)+'%';
    const dur = (Math.random()*12+10).toFixed(2)+'s';
    const delay = (Math.random()*6).toFixed(2)+'s';
    sp.style.setProperty('--x', x);
    sp.style.setProperty('--size', size+'px');
    sp.style.setProperty('--dur', dur);
    sp.style.setProperty('--delay', delay);
    floaters.appendChild(sp);
    sp.addEventListener('animationend', ()=> sp.remove());
  }
}
seedFloaters();
setInterval(seedFloaters, 5000);

function burst(x, y){
  for(let i=0;i<(MOBILE?18:26);i++){
    const el = document.createElement('span');
    el.textContent = i%3===0 ? '💘' : (i%2===0 ? '💞' : '❤');
    const ang = (Math.random()*360)|0;
    const dist = 80 + Math.random()*200;
    const tx = Math.cos(ang*Math.PI/180)*dist + 'px';
    const ty = Math.sin(ang*Math.PI/180)*dist + 'px';
    const rot = (Math.random()*120-60).toFixed(1)+'deg';
    const size = (Math.random()*24+14).toFixed(0)+'px';
    const dur = (Math.random()*900+900)|0 + 'ms';
    el.style.setProperty('--x', x+'px');
    el.style.setProperty('--y', y+'px');
    el.style.setProperty('--tx', tx);
    el.style.setProperty('--ty', ty);
    el.style.setProperty('--rot', rot);
    el.style.setProperty('--size', size);
    el.style.setProperty('--dur', dur);
    confetti.appendChild(el);
    el.addEventListener('animationend', ()=> el.remove());
  }
}

function typeMessage(text){
  apology.innerHTML = '';
  const lines = text.split('\n');
  let idx = 0;
  function addLine(){
    if(idx>=lines.length) return;
    const line = lines[idx];
    if(line.trim()===''){
      apology.appendChild(document.createElement('br'));
      idx++; addLine(); return;
    }
    let delay = 0;
    const words = line.split(' ');
    words.forEach((word, i)=>{
      if(word){
        const span = document.createElement('span');
        span.className = 'typew';
        span.textContent = word;
        span.style.setProperty('--d', (delay)+'s');
        delay += 0.08;
        apology.appendChild(span);
      }
      if(i < words.length - 1){ apology.appendChild(document.createTextNode(' ')); }
    });
    apology.appendChild(document.createElement('br'));
    idx++;
    setTimeout(addLine, 600); // збільшуємо затримку між рядками
  }
  addLine();
}

function openCard(evt){
  app.classList.add('open');
  const rect = heart.getBoundingClientRect();
  const x = evt ? evt.clientX : rect.left + rect.width/2;
  const y = evt ? evt.clientY : rect.top + rect.height/2;
  if (window.navigator && window.navigator.vibrate) { window.navigator.vibrate([12, 40, 12]); }
  burst(x,y);
  setTimeout(()=> typeMessage(message), 250);
}

function resetCard(){
  app.classList.remove('open');
  apology.classList.remove('type');
  apology.innerHTML = '';
}

heart.addEventListener('click', openCard);
// again.addEventListener('click', ()=>{ apology.innerHTML=''; typeMessage(message) });
closeBtn.addEventListener('click', resetCard);
heart.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openCard(); } });