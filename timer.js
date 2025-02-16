
// Timer bookmarklet
(() => {
  const script = document.createElement('script');
  script.src = 'https://YOUR-GITHUB-PAGES-URL/core.js';
  script.onload = () => {
    createBaseWindow({
      title: 'Timer',
      width: 300,
      height: 200,
      content: (container, config) => {
        container.style.cssText += 'text-align:center;';
        
        const display = document.createElement('div');
        display.style.cssText = 'font-size:2em;margin-bottom:16px;';
        display.textContent = '00:00:00';
        
        let time = 0;
        let interval = null;
        
        const startBtn = document.createElement('button');
        startBtn.textContent = 'Start';
        startBtn.style.cssText = 'margin:0 8px;padding:8px 16px;background:' + config.design.accentColor + ';color:#fff;border:none;border-radius:4px;cursor:pointer;';
        
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.style.cssText = startBtn.style.cssText;
        
        startBtn.onclick = () => {
          if (!interval) {
            interval = setInterval(() => {
              time++;
              const hours = Math.floor(time / 3600);
              const minutes = Math.floor((time % 3600) / 60);
              const seconds = time % 60;
              display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
            startBtn.textContent = 'Stop';
          } else {
            clearInterval(interval);
            interval = null;
            startBtn.textContent = 'Start';
          }
        };
        
        resetBtn.onclick = () => {
          time = 0;
          display.textContent = '00:00:00';
          if (interval) {
            clearInterval(interval);
            interval = null;
            startBtn.textContent = 'Start';
          }
        };
        
        container.appendChild(display);
        container.appendChild(startBtn);
        container.appendChild(resetBtn);
      }
    });
  };
  document.head.appendChild(script);
})();
