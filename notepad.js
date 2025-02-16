
// Notepad bookmarklet
(() => {
  const script = document.createElement('script');
  script.src = 'https://YOUR-GITHUB-PAGES-URL/core.js';
  script.onload = () => {
    createBaseWindow({
      title: 'Notepad',
      width: 400,
      height: 300,
      content: (container, config) => {
        const textarea = document.createElement('textarea');
        textarea.style.cssText = 'width:100%;height:calc(100% - 40px);resize:none;background:none;border:1px solid ' + config.design.borderColor + ';color:' + config.design.textColor + ';padding:8px;';
        
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save as JSON';
        saveButton.style.cssText = 'margin-top:8px;padding:8px 16px;background:' + config.design.accentColor + ';color:#fff;border:none;border-radius:4px;cursor:pointer;';
        saveButton.onclick = () => {
          const data = {
            text: textarea.value,
            timestamp: new Date().toISOString()
          };
          const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'note.json';
          a.click();
        };
        
        container.appendChild(textarea);
        container.appendChild(saveButton);
      }
    });
  };
  document.head.appendChild(script);
})();
