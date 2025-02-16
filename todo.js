
// Todo list bookmarklet
(() => {
  const script = document.createElement('script');
  script.src = 'https://YOUR-GITHUB-PAGES-URL/core.js';
  script.onload = () => {
    createBaseWindow({
      title: 'Todo List',
      width: 350,
      height: 500,
      content: (container, config) => {
        const list = document.createElement('ul');
        list.style.cssText = 'list-style:none;padding:0;margin:0 0 16px 0;';
        
        const input = document.createElement('input');
        input.placeholder = 'Add new task...';
        input.style.cssText = 'width:100%;padding:8px;margin-bottom:8px;background:none;border:1px solid ' + config.design.borderColor + ';color:' + config.design.textColor + ';';
        
        const addTask = () => {
          if (input.value.trim()) {
            const li = document.createElement('li');
            li.style.cssText = 'display:flex;gap:8px;margin-bottom:4px;align-items:center;';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            
            const text = document.createElement('span');
            text.textContent = input.value;
            text.style.color = config.design.textColor;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.style.cssText = 'background:none;border:none;color:' + config.design.accentColor + ';cursor:pointer;margin-left:auto;';
            deleteBtn.onclick = () => li.remove();
            
            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteBtn);
            list.appendChild(li);
            input.value = '';
          }
        };
        
        input.onkeypress = (e) => {
          if (e.key === 'Enter') addTask();
        };
        
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save as JSON';
        saveBtn.style.cssText = 'padding:8px 16px;background:' + config.design.accentColor + ';color:#fff;border:none;border-radius:4px;cursor:pointer;';
        saveBtn.onclick = () => {
          const tasks = Array.from(list.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('input[type="checkbox"]').checked
          }));
          const blob = new Blob([JSON.stringify(tasks, null, 2)], {
            type: 'application/json'
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'tasks.json';
          a.click();
        };
        
        container.appendChild(input);
        container.appendChild(list);
        container.appendChild(saveBtn);
      }
    });
  };
  document.head.appendChild(script);
})();
