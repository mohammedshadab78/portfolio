// =====================
// PRELOADER
// =====================
let progress = 0;
let interval;
let preloaderTimeout;

function initPreloader() {
  const progressText = document.querySelector('.progress-text');
  const preloader = document.getElementById("preloader");
  if (!preloader || !progressText) return;

  interval = setInterval(() => {
    progress += Math.random() * 2 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      hidePreloader();
    }
    progressText.textContent = Math.floor(progress) + '%';
  }, 150);

  preloaderTimeout = setTimeout(hidePreloader, 5000);
}

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader && preloader.style.display !== "none") {
    const progressText = document.querySelector('.progress-text');
    if (progress < 100) {
      progress = 100;
      if (progressText) progressText.textContent = '100%';
      if (interval) clearInterval(interval);
    }
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
      if (preloaderTimeout) clearTimeout(preloaderTimeout);
    }, 1000);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}

window.addEventListener('load', function() {
  setTimeout(hidePreloader, 1000);
});

// =====================
// SCROLL PROGRESS BAR
// =====================
window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress-bar");
  if (!progress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progress.style.width = scrollPercent + "%";
});

// =====================
// PARALLAX BLOBS
// =====================
const blob1 = document.querySelector(".blob1");
const blob2 = document.querySelector(".blob2");

window.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const moveX = (e.clientX - innerWidth / 2) / 40;
  const moveY = (e.clientY - innerHeight / 2) / 40;

  if (blob1) blob1.style.transform = `translate(${moveX}px, ${moveY}px)`;
  if (blob2) blob2.style.transform = `translate(${moveX / 2}px, ${moveY / 2}px)`;
});

// =====================
// GALLERY LIGHTBOX (fixed for gallery images)
// =====================
let currentIndex = 0;
let galleryImages = []; // will be populated from DOM

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Open Lightbox
function openLightbox(index) {
  if (!galleryImages.length) return;
  currentIndex = index;
  lightboxImg.src = galleryImages[currentIndex];
  lightbox.style.display = "flex";
}

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Next/Prev
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}
function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

// Bind events to gallery images (with class 'gallery-img')
function initGalleryLightbox() {
  const imgs = document.querySelectorAll('.gallery-img');
  galleryImages = Array.from(imgs).map(img => img.src);
  
  imgs.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });
}

// Call after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryLightbox);
} else {
  initGalleryLightbox();
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", nextImage);
if (prevBtn) prevBtn.addEventListener("click", prevImage);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// =====================
// NAVBAR TOGGLE (MOBILE)
// =====================
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}

// Close navbar when link clicked (mobile)
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('show');
  });
});

// =====================
// SKILL PROGRESS BARS ANIMATION
// =====================
function animateSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress');
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateSkillBars, 500);
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      setTimeout(animateSkillBars, 1000);
    }
  }
});

// =====================
// CONTACT FORM (EmailJS)
// =====================
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = form?.querySelector('button');

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  status.textContent = '⏳ Sending your message...';
  status.style.color = '#f9d423';

  emailjs.sendForm('service_ov1gu9w', 'template_dqram3o', this)
    .then(() => {
      status.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
      status.style.color = '#06d6a0';
      form.reset();
      submitBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
      }, 150);
    })
    .catch((err) => {
      status.textContent = '❌ Failed to send message. Please try again or email me directly.';
      status.style.color = '#ff6b6b';
      console.error('EmailJS Error:', err);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    });
});

// =====================
// FOOTER YEAR
// =====================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// =====================
// AOS INIT
// =====================
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
});

// =====================
// PARTICLE.JS - FIXED INTERACTIVITY
// =====================
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#667eea", "#764ba2", "#f093fb"] },
        shape: { type: "circle" },
        opacity: { value: 0.7, random: true, anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false } },
        size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
        line_linked: { enable: true, distance: 150, color: "#764ba2", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 200, duration: 0.4 }
        }
      },
      retina_detect: true
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initParticles, 2000);
});
window.addEventListener('load', initParticles);

// =====================
// SMART NOTIFICATIONS SYSTEM
// =====================
class SmartNotifications {
  constructor() {
    this.notifications = [];
    this.viewerCount = Math.floor(Math.random() * 10) + 1;
    this.initializeNotifications();
  }

  initializeNotifications() {
    setTimeout(() => this.showWelcomeNotification(), 2000);
    this.setupBehaviorTracking();
  }

  showWelcomeNotification() {
    this.createNotification({
      type: 'welcome',
      icon: '👋',
      message: `Welcome to my portfolio! You're visitor #${this.viewerCount} today`,
      duration: 6000
    });
  }

  showViewersNotification() {
    const newViewers = Math.floor(Math.random() * 3) + 1;
    this.viewerCount += newViewers;
    this.createNotification({
      type: 'viewers',
      icon: '🔥',
      message: `${newViewers} new people viewing your portfolio now`,
      duration: 5000
    });
  }

  showProjectNotification() {
    const projects = ["E-commerce Website", "Task Management App", "Weather Dashboard", "Chat Application", "Portfolio Website", "API Integration Project"];
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    this.createNotification({
      type: 'projects',
      icon: '⭐',
      message: `Someone just viewed "${randomProject}" project`,
      duration: 5500
    });
  }

  showAchievementNotification() {
    const achievements = ["🌟 Portfolio reached 50+ views today!", "🚀 Your projects got 10+ likes!", "💫 New skill added: Three.js Mastery", "🎯 SEO score improved to 95%", "📱 Mobile responsiveness: Excellent"];
    const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
    this.createNotification({
      type: 'achievement',
      icon: '🎉',
      message: randomAchievement,
      duration: 7000
    });
  }

  showPerformanceNotification() {
    const performance = ["⚡ Page loaded in 1.2s - Excellent!", "🎨 Animations running smoothly at 60FPS", "📊 Performance score: 98/100", "🔍 SEO optimized for better visibility"];
    const randomPerformance = performance[Math.floor(Math.random() * performance.length)];
    this.createNotification({
      type: 'performance',
      icon: '📈',
      message: randomPerformance,
      duration: 6000
    });
  }

  createNotification({ type, icon, message, duration = 5000 }) {
    const notificationId = 'notification-' + Date.now();
    const notificationHTML = `
      <div class="notification ${type} show" id="${notificationId}">
        <div class="notification-content">
          <span class="notification-icon">${icon}</span>
          <span class="notification-text">${message}</span>
          <button class="notification-close" onclick="smartNotifications.removeNotification('${notificationId}')">×</button>
        </div>
        <div class="notification-progress"></div>
      </div>
    `;
    const container = document.getElementById('smart-notifications');
    container.insertAdjacentHTML('beforeend', notificationHTML);
    const element = document.getElementById(notificationId);
    const notification = { id: notificationId, element, timeout: null };
    this.notifications.push(notification);

    notification.timeout = setTimeout(() => this.removeNotification(notificationId), duration);
    setTimeout(() => {
      const progressBar = document.querySelector(`#${notificationId} .notification-progress`);
      if (progressBar) progressBar.classList.add('hiding');
    }, 100);

    if (this.notifications.length > 3) this.removeNotification(this.notifications[0].id);
  }

  removeNotification(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index === -1) return;
    const notification = this.notifications[index];
    if (notification.element) {
      notification.element.classList.remove('show');
      notification.element.classList.add('hide');
      setTimeout(() => notification.element?.parentNode?.removeChild(notification.element), 500);
    }
    if (notification.timeout) clearTimeout(notification.timeout);
    this.notifications.splice(index, 1);
  }

  setupBehaviorTracking() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setTimeout(() => this.showProjectNotification(), 1000);
        });
      }, { threshold: 0.5 });
      observer.observe(projectsSection);
    }

    setInterval(() => {
      if (this.notifications.length < 2 && Math.random() > 0.7) {
        const randomTypes = [() => this.showViewersNotification(), () => this.showAchievementNotification(), () => this.showPerformanceNotification()];
        randomTypes[Math.floor(Math.random() * randomTypes.length)]();
      }
    }, 15000);

    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && maxScroll < 50) {
        this.createNotification({ type: 'achievement', icon: '🎯', message: 'You explored 50% of my portfolio! Thanks for your interest!', duration: 6000 });
        maxScroll = 50;
      }
      if (scrollPercent > 90 && maxScroll < 90) {
        this.createNotification({ type: 'achievement', icon: '🏆', message: 'You viewed my entire portfolio! Ready to work together?', duration: 7000 });
        maxScroll = 90;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => { window.smartNotifications = new SmartNotifications(); }, 3000);
});