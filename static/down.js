(function(){
  const downloadLink = document.getElementById('downloadLink');
  const copyBtn = document.getElementById('copyBtn');
  const openBtn = document.getElementById('openBtn');
  const progress = document.getElementById('progress');
  const progressBar = progress && progress.querySelector('.progress-bar');
  const filesizeEl = document.getElementById('filesize');

  function toast(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#fff;padding:8px 12px;border-radius:8px;z-index:9999;backdrop-filter:blur(4px)';
    document.body.appendChild(el);
    setTimeout(()=>el.style.opacity='0.0',1800);
    setTimeout(()=>el.remove(),2200);
  }


  if(copyBtn){
    copyBtn.addEventListener('click', async function(){
      const url = downloadLink ? downloadLink.href : null;
      if(!url){ toast('error'); return; }
      try{
        await navigator.clipboard.writeText(url);
        toast('link is copy');
      }catch(e){

        const tmp = document.createElement('textarea'); tmp.value = url; document.body.appendChild(tmp); tmp.select();
        try{ document.execCommand('copy'); toast('done copy'); }catch(err){ toast('error'); }
        tmp.remove();
      }
    });
  }


  (function tryFetchHead(){
    const url = downloadLink ? downloadLink.href : null;
    if(!url || !filesizeEl) return;
    try{
      fetch(url, { method: 'HEAD' })
        .then(r => {
          const len = r.headers.get('Content-Length');
          if(len){
            const n = parseInt(len,10);
            const sizes = ['بايت','KB','MB','GB'];
            let i=0; let val=n;
            while(val>1024 && i < sizes.length-1){ val = val/1024; i++; }
            filesizeEl.textContent = val.toFixed(2)+ ' ' + sizes[i];
          }
        })
        .catch(()=>{});
    }catch(e){}
  })();

  if(downloadLink){
    downloadLink.addEventListener('click', async function(e){


      /*
      e.preventDefault();
      const url = this.href;
      try{
        progress.setAttribute('aria-hidden','false');
        const res = await fetch(url);
        if(!res.ok) throw new Error('network');
        const len = res.headers.get('Content-Length');
        const total = len ? parseInt(len,10) : null;
        const reader = res.body.getReader();
        let received = 0; const chunks = [];
        while(true){
          const {done,value} = await reader.read();
          if(done) break;
          chunks.push(value); received += value.length;
          if(total && progressBar){ progressBar.style.width = Math.round((received/total)*100)+'%'; }
        }
        // تحويل إلى blob وحفظ
        const blob = new Blob(chunks);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = downloadLink.getAttribute('download') || 'video.mp4';
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(a.href);
        toast('اكتمل التحميل');
      }catch(err){
        toast('تعذر تنزيل الملف عبر المتصفح، سيتم محاولة التحميل التقليدي');
        setTimeout(()=>{ window.open(url, '_blank'); }, 800);
      } finally{ if(progressBar) progressBar.style.width='0%'; progress.setAttribute('aria-hidden','true'); }
      */
    });
  }

})();