
// JSON viewer bookmarklet
(() => {
  const script = document.createElement('script');
  script.src = 'https://YOUR-GITHUB-PAGES-URL/core.js';
  script.onload = () => {
    createBaseWindow({
      title: 'JSON Viewer',
      width: 400,
      height: 600,
      content: (container, config) => {
        const textarea = document.createElement('textarea');
        textarea.style.cssText = 'width:100%;height:60%;resize:none;margin-bottom:8px;background:none;border:1px solid ' + config.design.borderColor + ';color:' + config.design.textColor + ';padding:8px;';
        textarea.placeholder = 'Paste JSON here...';
        
        const output = document.createElement('pre');
        output.style.cssText = 'width:100%;height:40%;overflow:auto;background:' + config.design.headerColor + ';padding:8px;border-radius:4px;margin-top:8px;';
        
        const formatBtn = document.createElement('button');
        formatBtn.textContent = 'Format JSON';
        formatBtn.style.cssText = 'padding:8px 16px;background:' + config.design.accentColor + ';color:#fff;border:none;border-radius:4px;cursor:pointer;';
        formatBtn.onclick = () => {
          try {
            const parsed = JSON.parse(textarea.value);
            output.textContent = JSON.stringify(parsed, null, 2);
          } catch (err) {
            output.textContent = 'Invalid JSON: ' + err.message;
          }
        };
        
        container.appendChild(textarea);
        container.appendChild(formatBtn);
        container.appendChild(output);
      }
    });
  };
  document.head.appendChild(script);
})();
