
// Calculator bookmarklet
(() => {
  const script = document.createElement('script');
  script.src = 'https://YOUR-GITHUB-PAGES-URL/core.js';
  script.onload = () => {
    createBaseWindow({
      title: 'Calculator',
      width: 300,
      height: 400,
      content: (container, config) => {
        container.style.cssText += 'display:grid;gap:16px;';
        
        const display = document.createElement('input');
        display.type = 'text';
        display.readOnly = true;
        display.style.cssText = 'width:100%;background:' + config.design.headerColor + ';border:1px solid ' + config.design.borderColor + ';color:' + config.design.textColor + ';padding:8px;text-align:right;font-size:24px;';
        
        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:8px;';
        
        const buttons = [
          '7', '8', '9', '/',
          '4', '5', '6', '*',
          '1', '2', '3', '-',
          '0', '.', '=', '+'
        ];
        
        buttons.forEach(btn => {
          const button = document.createElement('button');
          button.textContent = btn;
          button.style.cssText = 'padding:12px;background:' + config.design.headerColor + ';border:1px solid ' + config.design.borderColor + ';color:' + config.design.textColor + ';cursor:pointer;';
          button.onclick = () => {
            if (btn === '=') {
              try {
                display.value = eval(display.value);
              } catch {
                display.value = 'Error';
              }
            } else {
              display.value += btn;
            }
          };
          grid.appendChild(button);
        });
        
        container.appendChild(display);
        container.appendChild(grid);
      }
    });
  };
  document.head.appendChild(script);
})();
