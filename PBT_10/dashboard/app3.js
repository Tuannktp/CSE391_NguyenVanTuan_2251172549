const refreshBtn = document.getElementById('refreshBtn');
const timeInfo = document.getElementById('timeInfo');
const globalLoading = document.getElementById('globalLoading');

const widgets = [
  {id:0, name:'users', url: 'https://jsonplaceholder.typicode.com/users'},
  {id:1, name:'randomUsers', url: 'https://randomuser.me/api/?results=5'},
  {id:2, name:'dogs', url: 'https://dog.ceo/api/breeds/image/random/6'}
];

function setWidgetLoading(i, on){
  const status = document.getElementById(`status-${i}`);
  const body = document.getElementById(`body-${i}`);
  if(on){ status.textContent = 'Loading...'; body.innerHTML = ''; }
  else { status.textContent = ''; }
}

function renderWidget(index, data){
  const body = document.getElementById(`body-${index}`);
  const status = document.getElementById(`status-${index}`);
  status.textContent = 'Loaded';

  if(index===0){ // JSONPlaceholder users
    const ul = document.createElement('div');
    data.forEach(u=>{
      const div = document.createElement('div'); div.className='user-card';
      const avatar = document.createElement('img'); avatar.src = `https://i.pravatar.cc/80?u=${u.email}`;
      const info = document.createElement('div'); info.innerHTML = `<strong>${u.name}</strong><br/><small>${u.email}</small>`;
      div.append(avatar, info); ul.appendChild(div);
    });
    body.appendChild(ul);
  }

  if(index===1){ // Randomuser
    const wrap = document.createElement('div');
    data.results.forEach(p=>{
      const div = document.createElement('div'); div.className='user-card';
      const avatar = document.createElement('img'); avatar.src = p.picture.thumbnail;
      const info = document.createElement('div'); info.innerHTML = `<strong>${p.name.first} ${p.name.last}</strong><br/><small>${p.email}</small>`;
      div.append(avatar, info); wrap.appendChild(div);
    });
    body.appendChild(wrap);
  }

  if(index===2){ // Dog images
    const wrap = document.createElement('div'); wrap.className='dog-list';
    const images = data.message || data; // dog API returns {message: [urls]}
    images.forEach(src=>{ const img = document.createElement('img'); img.src = src; wrap.appendChild(img); });
    body.appendChild(wrap);
  }
}

function renderWidgetError(index, message){
  const body = document.getElementById(`body-${index}`);
  const status = document.getElementById(`status-${index}`);
  status.textContent = 'Error';
  body.innerHTML = `<div style="color:#b91c1c">${message}</div>`;
}

async function loadDashboard(){
  const start = Date.now();
  globalLoading.style.display = 'block';
  timeInfo.textContent = '';

  widgets.forEach(w=> setWidgetLoading(w.id, true));

  const promises = widgets.map(w=>fetch(w.url).then(r=>{ if(!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); }));

  const results = await Promise.allSettled(promises);

  results.forEach((res, i)=>{
    if(res.status==='fulfilled'){
      renderWidget(i, res.value);
    } else {
      renderWidgetError(i, res.reason.message || 'Request failed');
    }
  });

  const elapsed = Date.now() - start;
  timeInfo.textContent = `Data loaded in ${elapsed} ms`;
  globalLoading.style.display = 'none';
}

refreshBtn.addEventListener('click', loadDashboard);

// initial load
loadDashboard();