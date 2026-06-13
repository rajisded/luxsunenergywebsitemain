document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initStickyHeader();
  initMobileNav();
  initFAQAccordion();
  initTestimonialsSlider();
  initFormValidation();
  initHeroScrollAnimation();
  initScrollReveal();
  initStatsCounter();
});

// Premium Page Transition Load Trigger
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

/* Sticky Header on Scroll */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const toggleSticky = () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  window.addEventListener('scroll', toggleSticky);
  toggleSticky(); // Run initial check
}

/* Mobile Nav Drawer toggle */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!mobileToggle || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileToggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close drawer when clicking a link
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* FAQ Accordion Panel toggles */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* Testimonials Carousel / Auto-sliding script */
function initTestimonialsSlider() {
  const wrapper = document.querySelector('.testimonials-wrapper');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');

  if (!wrapper || slides.length === 0) return;

  let currentIndex = 0;
  let slideInterval;
  const slideDelay = 5000; // 5 seconds auto scroll

  // Create dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;

    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const startAutoSlide = () => {
    slideInterval = setInterval(nextSlide, slideDelay);
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval);
    startAutoSlide();
  };

  // Add click handlers for buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  // Handle window resizing
  window.addEventListener('resize', () => {
    goToSlide(currentIndex); // Recenter current slide
  });

  // Start auto play
  startAutoSlide();
}

/* Contact and Career Form validation */
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Enable submit button once any input changes (combats default disabled next.js state on mockups)
    form.addEventListener('input', () => {
      if (submitBtn) submitBtn.removeAttribute('disabled');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        // Simple empty verification
        if (!input.value.trim()) {
          isValid = false;
          highlightField(input, 'This field is required');
        } else {
          clearHighlight(input);
        }

        // Email verification
        if (input.type === 'email' || input.name === 'email') {
          const emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
          if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            highlightField(input, 'Enter a valid email address');
          }
        }

        // Phone number length checking
        if (input.type === 'tel' || input.name === 'phone') {
          const cleaned = input.value.replace(/\D/g, '');
          if (cleaned.length < 10) {
            isValid = false;
            highlightField(input, 'Enter a valid 10-digit phone number');
          }
        }
      });

      if (isValid) {
        alert('Thank you! Your submission has been sent successfully.');
        form.reset();
        if (submitBtn) submitBtn.setAttribute('disabled', 'disabled');
      }
    });
  });
}

function highlightField(field, message) {
  field.style.borderColor = 'red';
  
  // Try to find if there is an existing error label
  let errorLabel = field.parentNode.querySelector('.error-message');
  if (!errorLabel) {
    errorLabel = document.createElement('p');
    errorLabel.classList.add('error-message');
    errorLabel.style.color = 'red';
    errorLabel.style.fontSize = '0.8rem';
    errorLabel.style.marginTop = '0.25rem';
    field.parentNode.appendChild(errorLabel);
  }
  errorLabel.textContent = message;
}

function clearHighlight(field) {
  field.style.borderColor = '';
  const errorLabel = field.parentNode.querySelector('.error-message');
  if (errorLabel) {
    errorLabel.remove();
  }
}

/* Helper function to draw an image inside canvas with 'cover' aspect ratio */
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }
  offsetX = typeof offsetX === "number" ? offsetX : 0.5;
  offsetY = typeof offsetY === "number" ? offsetY : 0.5;

  var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,
      nh = ih * r,
      cx, cy, cw, ch, ar = 1;

  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

/* Scroll-driven video background animation in hero section */
function initHeroScrollAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  const scrollContainer = document.querySelector('.hero-scroll-container');
  const heroContent = document.querySelector('.hero-content');

  // Narrative steps for fade-in/fade-out scroll animations
  const step1 = document.querySelector('.hero-content-step.step-1');
  const step2 = document.querySelector('.hero-content-step.step-2');
  const step3 = document.querySelector('.hero-content-step.step-3');

  const loadingOverlay = document.querySelector('.hero-loading-overlay');
  const loadingPercentage = document.querySelector('.loading-percentage');

  const totalFrames = 240;
  const images = [];
  let loadedCount = 0;

  // Frame URL helper
  const getFramePath = (index) => {
    const frameNum = index.toString().padStart(4, '0');
    return `Resources/frames_30fps/frame_${frameNum}.jpg`;
  };

  // Adjust canvas size to match viewport
  function resizeCanvas() {
    if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    renderCurrentFrame();
  }

  // Draw current interpolated frame
  function renderCurrentFrame() {
    const imgIndex = Math.round(currentFrameIndex);
    const img = images[imgIndex];
    if (img && img.complete) {
      drawImageProp(context, img);
    }
  }

  // Preload all 240 frames
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      loadedCount++;
      
      // Update loading percentage text
      if (loadingPercentage) {
        const pct = Math.round((loadedCount / totalFrames) * 100);
        loadingPercentage.textContent = `${pct}%`;
      }

      // Draw first frame immediately once loaded
      if (i === 1) {
        resizeCanvas();
      }

      // Once all loaded, hide preloader and setup animation
      if (loadedCount === totalFrames) {
        if (loadingOverlay) {
          loadingOverlay.classList.add('fade-out');
        }
        setupAnimation();
      }
    };
    img.onerror = () => {
      loadedCount++;
      if (loadedCount === totalFrames) {
        if (loadingOverlay) loadingOverlay.classList.add('fade-out');
        setupAnimation();
      }
    };
    images.push(img);
  }

  let targetFrameIndex = 0;
  let currentFrameIndex = 0;
  let animationFrameId = null;

  function setupAnimation() {
    // Initial size setting
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track scroll position
    const handleScroll = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollTop = -containerRect.top;
      const scrollRange = scrollContainer.offsetHeight - window.innerHeight;

      // Fraction of container scroll completed (0 to 1)
      let scrollFraction = scrollTop / scrollRange;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      // Calculate target frame index
      targetFrameIndex = scrollFraction * (totalFrames - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    // Premium Linear Interpolation (lerp) loop for buttery smooth animation throttled to 30 FPS
    let lastRenderTime = 0;
    const fpsInterval = 1000 / 30; // 33.33ms

    function updateLoop(timestamp) {
      animationFrameId = requestAnimationFrame(updateLoop);

      if (!timestamp) {
        timestamp = performance.now();
      }

      const elapsed = timestamp - lastRenderTime;
      if (elapsed < fpsInterval) {
        return;
      }
      
      // Adjust lastRenderTime
      lastRenderTime = timestamp - (elapsed % fpsInterval);

      const diff = targetFrameIndex - currentFrameIndex;
      if (Math.abs(diff) > 0.005) {
        currentFrameIndex += diff * 0.15; // smooth factor
        renderCurrentFrame();
      }

      // Calculate smooth transitions for text steps based on currentFrameIndex (interpolated scroll fraction)
      const sf = currentFrameIndex / (totalFrames - 1);

      // Step 1: Visible at start, fades out 5% to 22%
      let op1 = 0, transY1 = 0;
      if (sf < 0.05) {
        op1 = 1;
        transY1 = 0;
      } else if (sf >= 0.05 && sf <= 0.22) {
        op1 = 1 - (sf - 0.05) / 0.17;
        transY1 = -25 * (1 - op1);
      } else {
        op1 = 0;
        transY1 = -25;
      }

      // Step 2: Hidden at first, fades in 20% to 30%, stays until 45%, fades out 45% to 55%
      let op2 = 0, transY2 = 0;
      if (sf < 0.20) {
        op2 = 0;
        transY2 = 25;
      } else if (sf >= 0.20 && sf < 0.30) {
        op2 = (sf - 0.20) / 0.10;
        transY2 = 25 * (1 - op2);
      } else if (sf >= 0.30 && sf <= 0.45) {
        op2 = 1;
        transY2 = 0;
      } else if (sf > 0.45 && sf <= 0.55) {
        op2 = 1 - (sf - 0.45) / 0.10;
        transY2 = -25 * (1 - op2);
      } else {
        op2 = 0;
        transY2 = -25;
      }

      // Step 3: Hidden until 50%, fades in 50% to 60%, stays until 75%, fades out 75% to 85%
      let op3 = 0, transY3 = 0;
      if (sf < 0.50) {
        op3 = 0;
        transY3 = 25;
      } else if (sf >= 0.50 && sf < 0.60) {
        op3 = (sf - 0.50) / 0.10;
        transY3 = 25 * (1 - op3);
      } else if (sf >= 0.60 && sf <= 0.75) {
        op3 = 1;
        transY3 = 0;
      } else if (sf > 0.75 && sf <= 0.85) {
        op3 = 1 - (sf - 0.75) / 0.10;
        transY3 = -25 * (1 - op3);
      } else {
        op3 = 0;
        transY3 = -25;
      }

      // Apply styles to steps with visibility and pointerEvents management
      if (step1) {
        step1.style.opacity = op1;
        step1.style.transform = `translateY(${transY1}px)`;
        step1.style.visibility = op1 === 0 ? 'hidden' : 'visible';
        step1.style.pointerEvents = op1 < 0.1 ? 'none' : 'auto';
      }
      if (step2) {
        step2.style.opacity = op2;
        step2.style.transform = `translateY(${transY2}px)`;
        step2.style.visibility = op2 === 0 ? 'hidden' : 'visible';
        step2.style.pointerEvents = op2 < 0.1 ? 'none' : 'auto';
      }
      if (step3) {
        step3.style.opacity = op3;
        step3.style.transform = `translateY(${transY3}px)`;
        step3.style.visibility = op3 === 0 ? 'hidden' : 'visible';
        step3.style.pointerEvents = op3 < 0.1 ? 'none' : 'auto';
      }

      // Support for the legacy hero content element if it still exists
      if (heroContent && !step1 && !step2 && !step3) {
        const opacity = Math.max(0, 1 - (sf / 0.35));
        heroContent.style.opacity = opacity;
        heroContent.style.visibility = opacity === 0 ? 'hidden' : 'visible';
      }
    }
    updateLoop();
  }
}

/* Premium Scroll Reveal Animation Engine (Intersection Observer + Stagger) */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[class*="reveal-"]');
  if (revealElements.length === 0) return;

  const observerOptions = {
    threshold: 0.08, // trigger when 8% of the element enters viewport
    rootMargin: '0px 0px -40px 0px' // offset to feel organic
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Staggered grid child support
        if (target.classList.contains('reveal-stagger')) {
          const children = target.querySelectorAll(':scope > *, .service-card, .team-card, .product-card, .why-us-card, .partner-card');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 80}ms`; // staggered delay multiplier
            child.classList.add('revealed');
          });
          target.classList.add('revealed');
        } else {
          target.classList.add('revealed');
        }
        observer.unobserve(target); // animate only once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    // Register base reveal init styles
    el.classList.add('reveal-init');

    // Register child inits for staggers
    if (el.classList.contains('reveal-stagger')) {
      const children = el.querySelectorAll(':scope > *, .service-card, .team-card, .product-card, .why-us-card, .partner-card');
      children.forEach(child => {
        child.classList.add('reveal-init-child');
      });
    }

    observer.observe(el);
  });
}

/* Smooth scrolling implementation with Lenis */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis smooth scrolling library is not loaded.');
    return;
  }

  const lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    normalizeWheel: true
  });

  // Expose lenis instance globally in case other scripts need it
  window.lenis = lenis;

  let lastLenisTime = 0;
  const lenisInterval = 1000 / 30; // 33.33ms

  function raf(time) {
    requestAnimationFrame(raf);

    if (!time) {
      time = performance.now();
    }

    const elapsed = time - lastLenisTime;
    if (elapsed >= lenisInterval) {
      lastLenisTime = time - (elapsed % lenisInterval);
      lenis.raf(time);
    }
  }

  requestAnimationFrame(raf);

  // Link Lenis to scroll reveal updates if needed
  lenis.on('scroll', () => {
    // Reveal handler can run on native scroll
  });
  
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, {
          offset: -80, // Offset for sticky header
          duration: 1.2
        });
      }
    });
  });
}

/* Replicate scroll-driven stats number count-up animation */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-num');
  if (statsElements.length === 0) return;

  // Easing function: easeOutQuart
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  // Helper to format numbers dynamically
  const formatNumber = (num, isFloat) => {
    if (isFloat) {
      return num.toFixed(1);
    }
    return Math.floor(num).toLocaleString('en-US');
  };

  const animateCounter = (el) => {
    const originalText = el.textContent.trim();
    
    // Regex matching prefix, numeric content (including decimals/commas), and suffix
    const match = originalText.match(/^([^\d.]*)(\d+(?:\.\d+)?)([^\d.]*)$/);
    if (!match) return;

    const prefix = match[1];
    const targetValue = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = match[2].includes('.');

    let startTime = null;
    const duration = 1000; // 1 second duration
    let lastRenderTime = 0;
    const fpsInterval = 1000 / 30; // 33.33ms

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }

      const elapsedSinceLastRender = currentTime - lastRenderTime;
      if (elapsedSinceLastRender >= fpsInterval || progress === 1) {
        lastRenderTime = currentTime - (elapsedSinceLastRender % fpsInterval);

        const easedProgress = easeOutQuart(progress);
        const currentValue = easedProgress * targetValue;

        // Update text content with parsed structure
        el.textContent = `${prefix}${formatNumber(currentValue, isFloat)}${suffix}`;

        if (progress === 1) {
          // Ensure final state exactly matches the original static text
          el.textContent = originalText;
        }
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // IntersectionObserver to trigger when stats bar enters viewport
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, {
    threshold: 0.15 // Trigger when 15% of the element is visible
  });

  statsElements.forEach(el => observer.observe(el));
}
