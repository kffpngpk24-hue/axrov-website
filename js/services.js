// Service tab switching
const serviceTabs = document.querySelectorAll('.service-tab');
const serviceContents = document.querySelectorAll('.service-content');

serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        serviceTabs.forEach(t => t.classList.remove('active'));
        serviceContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const activeContent = document.getElementById(tabName);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href.includes('index'))) {
            link.classList.add('active');
        }
    });
});

console.log('Services page loaded');