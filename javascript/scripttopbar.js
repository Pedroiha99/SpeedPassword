// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
            
    // Toggle icon between hamburger and X
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
        
// Mobile language dropdown toggle
const mobileLanguageButton = document.querySelector('#mobile-menu button');
if (mobileLanguageButton) {
    mobileLanguageButton.addEventListener('click', function() {
        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle('hidden');
                
        // Toggle chevron direction
    const chevron = this.querySelector('.fa-chevron-down');
        chevron.classList.toggle('fa-chevron-down');
        chevron.classList.toggle('fa-chevron-up');
    });
}