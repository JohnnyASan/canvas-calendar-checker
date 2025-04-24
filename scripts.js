const strikethrough_class = 'calendar__event--completed';

const observer = new MutationObserver((mutations) => {
    if (document.querySelector('.agenda-event__item')) { // Check if element exists
        console.log("First agenda event detected, running script...");
        addCheckBoxes();
        observer.disconnect(); // Stop observing after first match
    }
});

observer.observe(document.body, { childList: true, subtree: true });

function addCheckBoxes() {
    document.querySelectorAll('.agenda-event__item').forEach(item => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '10px';
        checkbox.classList.add('custom-checked');
        console.log("Checkbox created!");
    
        // Load saved state from local storage
        const itemId = item.getAttribute('data-event-id');
        checkbox.checked = localStorage.getItem(itemId) === 'true';

        
    
        checkbox.addEventListener('click', (event) => {
            event.stopPropagation();
            localStorage.setItem(itemId, checkbox.checked);
            item.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        });
    
        item.appendChild(checkbox);
    });

} 


