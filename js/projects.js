  (() => {
    const cache = new Map(); // url -> html

    function parseRepo(rawUrl){
      const m = rawUrl.match(/^https:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\//i);
      if(!m) return null;
      return { owner:m[1], repo:m[2], ref:m[3] };
    }

    function rewriteRelatives(html, rawUrl){
      const meta = parseRepo(rawUrl); if(!meta) return html;
      const baseRaw = `https://raw.githubusercontent.com/${meta.owner}/${meta.repo}/${meta.ref}/`;
      const baseWeb = `https://github.com/${meta.owner}/${meta.repo}/`;
      const wrap = document.createElement('div'); wrap.innerHTML = html;

      wrap.querySelectorAll('img').forEach(img=>{
        const src = img.getAttribute('src') || '';
        if (!/^https?:\/\//i.test(src) && !src.startsWith('data:')) {
          img.src = new URL(src, baseRaw).href;
        }
        img.loading = 'lazy';
        img.style.maxWidth = '100%';
        img.referrerPolicy = 'no-referrer';
      });

      wrap.querySelectorAll('a').forEach(a=>{
        const href = a.getAttribute('href') || '';
        if (!/^https?:\/\//i.test(href) && !href.startsWith('#') && href!=='') {
          a.href = new URL(href, baseWeb).href;
        }
        a.target = '_blank'; a.rel = 'noopener';
      });

      return wrap.innerHTML;
    }

    async function getReadmeHTML(rawUrl){
      if (cache.has(rawUrl)) return cache.get(rawUrl);
      const r = await fetch(rawUrl, { credentials: 'omit' });
      if (!r.ok) throw new Error('README fetch failed');
      const md = await r.text();
      const html = DOMPurify.sanitize(marked.parse(md, { mangle:false, headerIds:true }));
      const fixed = rewriteRelatives(html, rawUrl);
      cache.set(rawUrl, fixed);
      return fixed;
    }

    function makeCard(){
      const d = document.createElement('div');
      d.className = 'hovercard';
      d.innerHTML = `<div class="body">Carregando…</div>`;
      return d;
    }

    function placeCard(card, anchor){
      const rect = anchor.getBoundingClientRect();

      // calcula posição para cima
      const top = window.scrollY + rect.top - card.offsetHeight - 8; // 8px acima do pin
      const left = window.scrollX + rect.left + rect.width/2 - card.offsetWidth/2;

      // Garante que não ultrapasse a viewport
      const maxLeft = window.scrollX + document.documentElement.clientWidth - card.offsetWidth - 8;
      const safeLeft = Math.max(window.scrollX + 8, Math.min(left, maxLeft));

      card.style.top = `${top}px`;
      card.style.left = `${safeLeft}px`;
    }



    function bind(){
      document.querySelectorAll('.project-pin[data-readme]').forEach(anchor=>{
        let card=null, tId=null, inside=false;
        const open = async () => {
          if (!card){ card = makeCard(); document.body.appendChild(card); placeCard(card, anchor); }
          try{
            const html = await getReadmeHTML(anchor.dataset.readme);
            card.querySelector('.body').innerHTML = html;
            placeCard(card, anchor);
          }catch{
            card.querySelector('.body').innerHTML = `<p style="color:var(--muted)">Prévia indisponível.</p>`;
          }
        };
        const close = () => { if(card && !inside){ card.remove(); card=null; } };

        anchor.addEventListener('mouseenter', ()=>{ clearTimeout(tId); tId=setTimeout(open, 150); });
        anchor.addEventListener('mouseleave', ()=>{ clearTimeout(tId); setTimeout(close, 120); });

        document.addEventListener('mousemove', (e)=>{
          if(!card) return;
          inside = card.contains(e.target);
          if(!inside && e.target!==anchor && !anchor.contains(e.target)){
            setTimeout(()=>{ if(!inside) close(); }, 100);
          }
        });

        ['scroll','resize'].forEach(evt=>window.addEventListener(evt, ()=>{ if(card) placeCard(card, anchor); }));
      });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
    else bind();
  })();
