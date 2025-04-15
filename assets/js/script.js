// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('nav ul');
  
  mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('show');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
              navMenu.classList.remove('show');
          }
      });
  });
  
  // Accessibility Features
  const increaseFontBtn = document.getElementById('increaseFont');
  const decreaseFontBtn = document.getElementById('decreaseFont');
  const voiceNavBtn = document.getElementById('voiceNav');
  
  if (increaseFontBtn && decreaseFontBtn) {
      increaseFontBtn.addEventListener('click', function() {
          changeFontSize(1);
      });
      
      decreaseFontBtn.addEventListener('click', function() {
          changeFontSize(-1);
      });
  }
  
  if (voiceNavBtn) {
      voiceNavBtn.addEventListener('click', toggleVoiceNavigation);
  }
  
  // Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          // Here you would typically send the form data to a server
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
      });
  }
  
  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const emailInput = newsletterForm.querySelector('input[type="email"]');
          alert(`Thank you for subscribing with ${emailInput.value}!`);
          newsletterForm.reset();
      });
  }
});

function changeFontSize(direction) {
  const html = document.documentElement;
  const currentSize = parseFloat(window.getComputedStyle(html, null).getPropertyValue('font-size'));
  const newSize = direction > 0 ? currentSize * 1.1 : currentSize * 0.9;
  html.style.fontSize = newSize + 'px';
  
  // Store preference in localStorage
  localStorage.setItem('fontSizePreference', newSize);
}

function toggleVoiceNavigation() {
  if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
          alert('Voice navigation turned off.');
      } else {
          const message = new SpeechSynthesisUtterance();
          message.text = 'Voice navigation activated. Use the tab key to navigate through the page elements.';
          speechSynthesis.speak(message);
      }
  } else {
      alert('Your browser does not support speech synthesis. Please try Chrome or Edge.');
  }
}

// Check for saved font size preference
window.addEventListener('load', function() {
  const savedSize = localStorage.getItem('fontSizePreference');
  if (savedSize) {
      document.documentElement.style.fontSize = savedSize + 'px';
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add animation class when elements come into view
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.service-card, .team-member, .testimonial-card, .post-card, .tool-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.classList.add('animate');
          }
      });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});
  