function createRipple(event, element) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
            
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
            
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size/2}px`;
    ripple.style.top = `${event.clientY - rect.top - size/2}px`;
            
    element.appendChild(ripple);
            
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
        
