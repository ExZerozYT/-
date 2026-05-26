document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Business Open/Closed Status Logic
  const statusPanel = document.querySelector("[data-business-status]");
  const statusText = document.querySelector("[data-status-text]");

  if (statusPanel && statusText) {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const isSunday = day === 0;
    const isOpen = !isSunday; // Open Monday to Saturday

    statusPanel.setAttribute("data-open", String(isOpen));
    statusText.textContent = isOpen 
      ? "เปิดให้บริการวันนี้ (08:00 - 17:00)" 
      : "วันนี้ปิดทำการ (เปิดทำการ จันทร์ - เสาร์)";
  }

  // 2. Sticky Header Shrink & Glassmorphic effect on scroll
  const header = document.getElementById("topbar");
  if (header) {
    const toggleHeaderClass = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    
    // Initial check in case page is loaded scrolled down
    toggleHeaderClass();
    window.addEventListener("scroll", toggleHeaderClass, { passive: true });
  }

  // 3. Intersection Observer for smooth reveal-on-scroll animations
  const revealElements = document.querySelectorAll(".reveal");
  
  if (revealElements.length > 0) {
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Once animated, we don't need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      });

      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    } else {
      // Fallback for older browsers: make everything visible immediately
      revealElements.forEach((el) => {
        el.classList.add("active");
      });
    }
  }

  // 4. Hero Background Slider Logic
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  
  if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // Change image every 5 seconds
    let autoSlideTimer;

    const showSlide = (index) => {
      // Remove active from current
      slides[currentSlide].classList.remove("active");
      dots[currentSlide].classList.remove("active");
      
      // Update index
      currentSlide = index;
      
      // Add active to new
      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    };

    const nextSlide = () => {
      let nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    };

    const startAutoSlide = () => {
      autoSlideTimer = setInterval(nextSlide, slideInterval);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideTimer);
      startAutoSlide();
    };

    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetAutoSlide();
      });
    });

    // Start auto slider
    startAutoSlide();
  }
});

