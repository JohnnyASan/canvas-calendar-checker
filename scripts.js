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
        checkbox.style.width = '20px';
        checkbox.style.height = '20px';
    
        // Load saved state from local storage
        const itemId = item.getAttribute('data-event-id');
        checkbox.checked = localStorage.getItem(itemId) === 'true';

        const container = item.querySelector('.agenda-event__item-container');
        const assignmentTitle = item.querySelector('.agenda-event__title');
        if (assignmentTitle.classList.contains(strikethrough_class)) {
            checkbox.checked = true;
        } else {
            checkbox.addEventListener('click', (event) => {
                event.stopPropagation();
                localStorage.setItem(itemId, checkbox.checked);
                assignmentTitle.classList.toggle(strikethrough_class, checkbox.checked);
                
            });
        }
    
        
        container.append(checkbox)
    });

} 


