// Star Generation
function createStars() {
    const container = document.querySelector('.stars');
    container.innerHTML = '';
    
    for(let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animation = `twinkle ${Math.random() * 2 + 1}s infinite`;
        star.style.opacity = Math.random() * 0.5 + 0.5;
        container.appendChild(star);
    }
}
createStars();
window.addEventListener('resize', createStars);

// Smooth Scroll Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.getElementById(this.dataset.section);
        const yOffset = -80;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    });
});

// Gradient Transition
let currentActive = 0;
const gradients = [
    'var(--space-gradient-1)',
    'var(--space-gradient-2)',
    'var(--space-gradient-3)',
    'var(--space-gradient-4)'
];

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.neon-card');
    const scrollPosition = window.scrollY + window.innerHeight/2;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if(scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            if(currentActive !== index) {
                currentActive = index;
                document.body.style.background = gradients[index];
            }
        }
    });
});

// Add this script for accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
        
        // Close other open items
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if(otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Enhanced photo interaction
document.querySelectorAll('.photo-item').forEach(photo => {
    photo.addEventListener('click', function() {
        // Remove active class from all photos
        document.querySelectorAll('.photo-item').forEach(p => {
            p.classList.remove('active-photo');
        });
        
        // Add active class to clicked photo
        this.classList.add('active-photo');
        
        // Update navigation dots
        const index = this.dataset.index;
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });
        document.querySelector(`.dot[data-target="${index}"]`).classList.add('active');
    });
});

// Dot navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const targetIndex = this.dataset.target;
        const targetPhoto = document.querySelector(`.photo-item[data-index="${targetIndex}"]`);
        
        // Trigger click on corresponding photo
        targetPhoto.click();
    });
});

document.getElementById('resume-download').addEventListener('click', function() {
    // Create invisible download link
    const link = document.createElement('a');
    link.href = 'Software_Resume.pdf'; // Replace with actual path
    link.download = 'Vivi-Huang-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional click feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 200);
});