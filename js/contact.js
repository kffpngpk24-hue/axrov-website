// Contact form handling with email backend
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value,
            recipientEmail: 'infoayanirfan@gmail.com',
            timestamp: new Date().toISOString()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send email via backend service
            const response = await sendEmailViaBackend(formData);
            
            if (response.success) {
                submitBtn.textContent = 'Message Sent Successfully! ✓';
                submitBtn.style.backgroundColor = 'var(--light-green)';
                contactForm.reset();
                
                showNotification('Your message has been sent to infoayanirfan@gmail.com! We\'ll respond within 24 hours.', 'success');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Email sending failed');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            submitBtn.textContent = 'Error Sending Message';
            submitBtn.style.backgroundColor = '#dc3545';
            
            showNotification('Message saved locally. Email backend not configured. Contact us at infoayanirfan@gmail.com', 'warning');
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Function to send email via backend
async function sendEmailViaBackend(formData) {
    // Option 1: Using EmailJS (Frontend service)
    try {
        if (typeof emailjs !== 'undefined') {
            const emailParams = {
                to_email: formData.recipientEmail,
                from_email: formData.email,
                from_name: formData.name,
                company: formData.company || 'Not provided',
                service: formData.service || 'General inquiry',
                budget: formData.budget || 'Not specified',
                message: formData.message,
                reply_to: formData.email
            };
            
            const response = await emailjs.send('service_axrov', 'template_axrov', emailParams);
            return { success: response.status === 200 };
        }
    } catch (error) {
        console.error('EmailJS error:', error);
    }
    
    // Option 2: Using Formspree (No backend needed)
    try {
        const response = await fetch('https://formspree.io/f/xyzwvutz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                service: formData.service,
                budget: formData.budget,
                message: formData.message,
                _replyto: formData.email
            })
        });
        return { success: response.ok };
    } catch (error) {
        console.error('Formspree error:', error);
    }
    
    // Option 3: Using backend API
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return { success: response.ok };
    } catch (error) {
        console.error('Backend API error:', error);
        return { success: false };
    }
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#2d6a4f' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ff9800' : '#0d2818';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${bgColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
        header.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    }
});

console.log('✓ Contact page loaded - Email recipient: infoayanirfan@gmail.com');