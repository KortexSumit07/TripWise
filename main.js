import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

// DOM elements
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const header = document.querySelector('.header');
const alertCloseButton = document.querySelector('.alert-close');
const weatherAlert = document.querySelector('.weather-alert');
const addStopButton = document.querySelector('.add-stop');

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme === 'true') {
    document.body.classList.add('dark-theme');
  }
}

// Mobile menu toggle
if (mobileMenuToggle && header) {
  mobileMenuToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
}

// Close weather alert
if (alertCloseButton && weatherAlert) {
  alertCloseButton.addEventListener('click', () => {
    weatherAlert.style.display = 'none';
  });
}

// Add additional stop
if (addStopButton) {
  addStopButton.addEventListener('click', () => {
    const stopsContainer = document.querySelector('.form-group:has(#stops)');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Add another stop';
    newInput.className = 'mt-2';
    
    if (stopsContainer) {
      stopsContainer.insertBefore(newInput, addStopButton);
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
      }
      
      // Update active link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Update active menu item on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100; // Adjust for header height
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Animate elements on scroll (simple implementation)
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.feature-card, .hotel-card, .weather-card');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load