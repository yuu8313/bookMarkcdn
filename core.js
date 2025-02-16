
// Base window creation functionality
const createBaseWindow = ({ title, width, height, content }) => {
  const CONFIG = {
    window: {
      title: title,
      width: width,
      height: height,
      minWidth: 200,
      minHeight: 100,
      position: { x: 20, y: 20 }
    },
    design: {
      backgroundColor: "#1a1f2c",
      headerColor: "#2a2f3c",
      accentColor: "#9b87f5",
      textColor: "#ffffff",
      mutedTextColor: "#8E9196",
      borderColor: "#2a2f3c"
    }
  };

  const createWindow = () => {
    const container = document.createElement('div');
    container.setAttribute('data-window-container', '');
    container.style.cssText = `position:fixed;z-index:9999;top:${CONFIG.window.position.y}px;left:${CONFIG.window.position.x}px;`;
    
    const window = document.createElement('div');
    window.style.cssText = `background:${CONFIG.design.backgroundColor};border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.2);width:${CONFIG.window.width}px;border:1px solid ${CONFIG.design.borderColor};`;
    
    const header = document.createElement('div');
    header.style.cssText = `background:${CONFIG.design.headerColor};padding:8px;display:flex;justify-content:space-between;align-items:center;border-top-left-radius:8px;border-top-right-radius:8px;cursor:move;`;
    
    const title = document.createElement('div');
    title.textContent = CONFIG.window.title;
    title.style.cssText = `color:${CONFIG.design.textColor};font-weight:500;`;
    
    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:8px;';
    
    ['minimize', 'maximize', 'close'].forEach(action => {
      const button = document.createElement('button');
      button.innerHTML = action === 'minimize' ? '−' : action === 'maximize' ? '□' : '×';
      button.style.cssText = `background:none;border:none;color:${CONFIG.design.accentColor};cursor:pointer;`;
      button.onclick = () => {
        if (action === 'close') container.remove();
        else if (action === 'minimize') container.style.display = 'none';
        // Add maximize functionality if needed
      };
      controls.appendChild(button);
    });
    
    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = `padding:16px;height:${CONFIG.window.height}px;overflow:auto;color:${CONFIG.design.textColor};`;
    
    // Make window draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    
    header.onmousedown = (e) => {
      isDragging = true;
      initialX = e.clientX - container.offsetLeft;
      initialY = e.clientY - container.offsetTop;
    };
    
    document.onmousemove = (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        container.style.left = currentX + "px";
        container.style.top = currentY + "px";
      }
    };
    
    document.onmouseup = () => {
      isDragging = false;
    };
    
    header.appendChild(title);
    header.appendChild(controls);
    window.appendChild(header);
    window.appendChild(contentContainer);
    container.appendChild(window);
    document.body.appendChild(container);
    
    return { container, contentContainer };
  };
  
  const { contentContainer } = createWindow();
  content(contentContainer, CONFIG);
};
