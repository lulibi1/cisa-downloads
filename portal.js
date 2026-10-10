'use strict';
const feld=document.getElementById('portal'), ziel=document.getElementById('ziel'), fehler=document.getElementById('fehler');
function adresse(value) {
  let u;
  try {u=new URL(value);} catch {throw new Error('Bitte die vollständige HTTPS-Portaladresse aus Ihrer Einladung eingeben.');}
  if(u.protocol!=='https:' || u.username || u.password || u.port || u.pathname!=='/' || u.search || u.hash || !/^[a-z0-9][a-z0-9.-]+\.[a-z]{2,63}$/.test(u.hostname) || /\.(local|localhost|trycloudflare\.com)$/.test(u.hostname)) throw new Error('Bitte die feste HTTPS-Portaladresse aus Ihrer Einladung eingeben.');
  return u.origin;
}
try { feld.value=localStorage.getItem('cisa-portal') || ''; } catch {}
try { const p=new URLSearchParams(location.hash.slice(1)).get('portal'); if(p) feld.value=adresse(p); } catch {}
function zeige() { try { ziel.textContent='Anmeldung bei '+new URL(adresse(feld.value)).hostname; fehler.textContent=''; } catch { ziel.textContent=''; } }
feld.addEventListener('input',zeige);
document.getElementById('anmelden').onclick=()=> { try { const p=adresse(feld.value); try {localStorage.setItem('cisa-portal',p);} catch {} location.assign(p+'/'); } catch(e){fehler.textContent=e.message || 'Bitte die vollständige HTTPS-Portaladresse eingeben.';} };
document.getElementById('vergessen').onclick=()=> {try{localStorage.removeItem('cisa-portal');}catch{} feld.value=''; ziel.textContent='Unternehmen auf diesem Gerät entfernt.'; history.replaceState(null,'',location.pathname);};
zeige();
