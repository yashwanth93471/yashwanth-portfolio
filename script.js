// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
  });
  
  // Close mobile menu when clicking a link
  const navLinkElements = document.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });
  
  // Smooth scroll for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  
  const validateName = () => {
    const name = nameInput.value.trim();
    if (name === '') {
      nameError.textContent = 'Name is required';
      return false;
    }
    if (name.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      return false;
    }
    if (name.length > 100) {
      nameError.textContent = 'Name must be less than 100 characters';
      return false;
    }
    nameError.textContent = '';
    return true;
  };
  
  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
      emailError.textContent = 'Email is required';
      return false;
    }
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email';
      return false;
    }
    if (email.length > 255) {
      emailError.textContent = 'Email must be less than 255 characters';
      return false;
    }
    emailError.textContent = '';
    return true;
  };
  
  const validateMessage = () => {
    const message = messageInput.value.trim();
    if (message === '') {
      messageError.textContent = 'Message is required';
      return false;
    }
    if (message.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      return false;
    }
    if (message.length > 1000) {
      messageError.textContent = 'Message must be less than 1000 characters';
      return false;
    }
    messageError.textContent = '';
    return true;
  };
  
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const message = encodeURIComponent(messageInput.value.trim());
      
      const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
      const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      contactForm.reset();
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
    }
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections and cards
  const elementsToAnimate = document.querySelectorAll(
    '.section, .glass-card-hover, .project-card, .cert-card, .blog-card, .timeline-item'
  );
  
  elementsToAnimate.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});