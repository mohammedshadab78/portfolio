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

  // Start progress animation
  interval = setInterval(() => {
    progress += Math.random() * 2  + 1; // slower increment for longer animation
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      hidePreloader();
    }
    progressText.textContent = Math.floor(progress) + '%';
  }, 150); // slower interval

  // Minimum display time: 3 seconds
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

// Start on DOM ready

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}

// Ensure hide on full load (but wait minimum time)
window.addEventListener('load', function() {
  // This will trigger hidePreloader but minimum time is already set
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
// GALLERY LIGHTBOX
// =====================
const galleryImages = [
  "assets/gallery1.jpg",
  "assets/gallery2.jpg",
  "assets/gallery3.jpg",
  "assets/gallery4.jpg",
  "assets/gallery5.jpg",
];

let currentIndex = 0;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Open Lightbox
function openLightbox(index) {
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

// Bind events
document.querySelectorAll(".gallery-item").forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});
if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", nextImage);
if (prevBtn) prevBtn.addEventListener("click", prevImage);

// Close on ESC
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

// Animate when skills section comes into view
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateSkillBars, 500); // Delay for smooth animation
      skillsObserver.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.5 });

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Also animate on page load if section is already visible
document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      setTimeout(animateSkillBars, 1000);
    }
  }
});
// Enhanced Contact Form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = form?.querySelector('button');

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  status.textContent = '⏳ Sending your message...';
  status.style.color = '#f9d423';

  emailjs.sendForm('service_ov1gu9w','template_dqram3o', this)
    .then(() => {
      status.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
      status.style.color = '#06d6a0';
      form.reset();
      
      // Success animation
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
// Scroll reveal animation for CV Project section
AOS.init({
  duration: 1000,
  once: true
});
// Initialize AOS (Scroll animations)
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
    console.log("Initializing particles with interactivity...");
    
    particlesJS('particles-js', {
      particles: {
        number: { 
          value: 80, 
          density: { 
            enable: true, 
            value_area: 800 
          } 
        },
        color: { 
          value: ["#667eea", "#764ba2", "#f093fb"] 
        },
        shape: { 
          type: "circle" 
        },
        opacity: { 
          value: 0.7, 
          random: true,
          anim: { 
            enable: true, 
            speed: 1, 
            opacity_min: 0.3, 
            sync: false 
          }
        },
        size: { 
          value: 3, 
          random: true,
          anim: { 
            enable: true, 
            speed: 2, 
            size_min: 1, 
            sync: false 
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#764ba2",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas", // ✅ CRITICAL FOR INTERACTIVITY
        events: {
          onhover: {
            enable: true,
            mode: "grab" // Particles connect on hover
          },
          onclick: {
            enable: true,
            mode: "push" // Add particles on click
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.8
            }
          },
          push: {
            particles_nb: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      retina_detect: true
    });
    
    console.log("Particles initialized successfully!");
  } else {
    console.error("ParticlesJS not loaded!");
  }
}

// Initialize with proper timing
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - waiting for particles...");
  setTimeout(initParticles, 2000); // Wait 2 seconds
});

window.addEventListener('load', function() {
  console.log("Window loaded - initializing particles");
  initParticles();
});
// =====================
// DEBUG MAJOR PROJECTS SECTION
// =====================
function debugMajorProjects() {
  const section = document.getElementById('major-projects');
  const projects = document.querySelectorAll('.project-card');
  
  console.log("=== MAJOR PROJECTS DEBUG ===");
  console.log("Section exists:", !!section);
  console.log("Number of project cards:", projects.length);
  
  if (section) {
    console.log("Section styles:", window.getComputedStyle(section));
    console.log("Section content:", section.innerHTML);
  }
}

// Run debug when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(debugMajorProjects, 3000);
});
// =====================
// ULTRA REALISTIC ABSTRACT SCULPTURE - THREE.JS
// =====================

function initRealisticSculpture() {
  if (typeof THREE === 'undefined') {
    console.log('Three.js not loaded');
    return;
  }

  const container = document.getElementById('3d-container');
  if (!container) return;
    // 🎯 FORCE FRONT LAYER - ADD THIS LINE
  container.style.zIndex = '999999';
  console.log('Creating Ultra Realistic Abstract Sculpture...');

  // 🎨 REALISTIC SCENE SETUP
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);
  
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
  });
  
  renderer.setSize(280,280);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 🎨 CREATE REALISTIC MATERIALS
  function createMetalMaterial(color, roughness, metalness) {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness,
      metalness: metalness,
      transparent: false
    });
  }

  function createGlassMaterial(color, opacity, transmission) {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      transmission: transmission,
      roughness: 0.1,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5
    });
  }

  function createCrystalMaterial(color, opacity) {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.05,
      transmission: 0.2,
      ior: 1.4
    });
  }

  // 🎨 REAL-WORLD COLOR PALETTE
  const colors = {
    brushedCopper: 0xb87333,    // Real copper color
    polishedSilver: 0xc0c0c0,   // Silver metal
    oxidizedBronze: 0x8c7853,   // Aged bronze
    smokedGlass: 0x2f4f4f,      // Dark glass
    amberCrystal: 0xffbf00,     // Golden amber
    roseQuartz: 0xf7c8c8,       // Pink crystal
    aquaMarine: 0x7fffd4,       // Teal gemstone
    obsidian: 0x0c0c0c,        // Black volcanic glass
    jade: 0x00a86b,            // Green jade
    sapphire: 0x0f52ba         // Blue sapphire
  };

  // 🎨 CREATE SCULPTURE STRUCTURE
  const sculptureGroup = new THREE.Group();

  // Main Base - Polished Silver Platform
  const baseGeometry = new THREE.CylinderGeometry(2.5, 2.8, 0.3, 32);
  const baseMaterial = createMetalMaterial(colors.polishedSilver, 0.2, 0.8);
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -1.8;
  base.castShadow = true;
  base.receiveShadow = true;
  sculptureGroup.add(base);

  // Central Crystal Core - Sapphire
  const coreGeometry = new THREE.OctahedronGeometry(1.0, 3);
  const coreMaterial = createCrystalMaterial(colors.sapphire, 0.9);
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.castShadow = true;
  sculptureGroup.add(core);

  // Copper Support Structure
  const supportGeometry = new THREE.CylinderGeometry(0.1, 0.15, 2.5, 8);
  const supportMaterial = createMetalMaterial(colors.brushedCopper, 0.4, 0.7);
  
  const support1 = new THREE.Mesh(supportGeometry, supportMaterial);
  support1.position.set(1.2, 0, 0);
  support1.rotation.z = Math.PI / 6;
  support1.castShadow = true;
  sculptureGroup.add(support1);

  const support2 = new THREE.Mesh(supportGeometry, supportMaterial);
  support2.position.set(-1.2, 0, 0);
  support2.rotation.z = -Math.PI / 6;
  support2.castShadow = true;
  sculptureGroup.add(support2);

  // Glass Orbital Rings
  const ringGeometry = new THREE.TorusGeometry(1.8, 0.06, 16, 100);
  const ringMaterial = createGlassMaterial(colors.smokedGlass, 0.6, 0.3);
  
  const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
  ring1.rotation.x = Math.PI / 2;
  ring1.castShadow = true;
  sculptureGroup.add(ring1);

  const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
  ring2.rotation.y = Math.PI / 2;
  ring2.castShadow = true;
  sculptureGroup.add(ring2);

  // Jade Floating Elements
  const jadeGeometry = new THREE.DodecahedronGeometry(0.3, 1);
  const jadeMaterial = createCrystalMaterial(colors.jade, 0.8);
  
  const jade1 = new THREE.Mesh(jadeGeometry, jadeMaterial);
  jade1.position.set(2.2, 0.5, 0);
  jade1.castShadow = true;
  sculptureGroup.add(jade1);

  const jade2 = new THREE.Mesh(jadeGeometry, jadeMaterial);
  jade2.position.set(-2.2, -0.3, 0);
  jade2.castShadow = true;
  sculptureGroup.add(jade2);

  // Amber Crystal Spikes
  const spikeGeometry = new THREE.ConeGeometry(0.08, 0.6, 8);
  const spikeMaterial = createCrystalMaterial(colors.amberCrystal, 0.9);
  
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const distance = 1.4;
    
    const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
    spike.position.x = Math.cos(angle) * distance;
    spike.position.z = Math.sin(angle) * distance;
    spike.position.y = 0.8;
    
    spike.lookAt(0, 0.8, 0);
    spike.rotateX(Math.PI / 2);
    spike.castShadow = true;
    
    sculptureGroup.add(spike);
  }

  // Rose Quartz Floating Orbs
  const orbGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const orbMaterial = createCrystalMaterial(colors.roseQuartz, 0.8);
  
  for (let i = 0; i < 4; i++) {
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    const angle = (i / 4) * Math.PI * 2;
    const radius = 1.0;
    
    orb.position.x = Math.cos(angle) * radius;
    orb.position.z = Math.sin(angle) * radius;
    orb.position.y = 0.2 + Math.sin(angle) * 0.3;
    
    orb.castShadow = true;
    sculptureGroup.add(orb);
  }

  scene.add(sculptureGroup);

  // 🎨 REALISTIC LIGHTING SETUP
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
  scene.add(ambientLight);
  
  // Main directional light (sun simulation)
  const mainLight = new THREE.DirectionalLight(0xfff5e1, 1.2);
  mainLight.position.set(10, 15, 10);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 50;
  scene.add(mainLight);

  // Fill light for softer shadows
  const fillLight = new THREE.DirectionalLight(0x667eea, 0.4);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  // Accent lights for material highlights
  const accentLight1 = new THREE.PointLight(0xf093fb, 0.6, 15);
  accentLight1.position.set(3, 3, 3);
  scene.add(accentLight1);

  const accentLight2 = new THREE.PointLight(0x4fd1c7, 0.5, 12);
  accentLight2.position.set(-3, 2, -3);
  scene.add(accentLight2);

  // Rim light for edge definition
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set(0, -10, -10);
  scene.add(rimLight);

  camera.position.set(0, 1, 6);
  camera.lookAt(0, 0, 0);

  // 🎨 MOUSE INTERACTION
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // 🎨 REALISTIC ANIMATION LOOP
  const clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const time = Date.now() * 0.001;
    
    // Smooth rotation based on mouse
    sculptureGroup.rotation.y += (mouseX * 0.8 - sculptureGroup.rotation.y) * 0.03;
    sculptureGroup.rotation.x += (mouseY * 0.4 - sculptureGroup.rotation.x) * 0.03;
    
    // Subtle floating animation
    sculptureGroup.position.y = Math.sin(time * 0.8) * 0.1;
    
    // Rotate rings at different realistic speeds
    ring1.rotation.z += delta * 0.3;
    ring2.rotation.x += delta * 0.2;
    
    // Gentle crystal pulse
    core.scale.setScalar(1 + Math.sin(time * 1.5) * 0.05);
    
    // Floating jade elements
    jade1.position.y = 0.5 + Math.sin(time * 0.7) * 0.2;
    jade2.position.y = -0.3 + Math.cos(time * 0.9) * 0.15;
    
    jade1.rotation.y += delta * 0.5;
    jade2.rotation.x += delta * 0.3;
    
    // Slow camera orbit for viewing
    camera.position.x = Math.cos(time * 0.1) * 1.5;
    camera.position.z = 8 + Math.sin(time * 0.05) * 0.5;
    camera.lookAt(0, 0.5, 0);
    
    renderer.render(scene, camera);
  }

  // Handle resize
  function handleResize() {
    renderer.setSize(240, 240);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', handleResize);
  
  // Start animation
  animate();
  
  console.log('Ultra Realistic Abstract Sculpture created!');
}

// Initialize realistic sculpture
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (window.innerWidth > 1024) {
      initRealisticSculpture();
    }
  }, 3000);
});
// =====================
// SMART NOTIFICATIONS SYSTEM
// =====================

class SmartNotifications {
  constructor() {
    this.notifications = [];
    this.viewerCount = 0;
    this.lastProjectView = null;
    this.initializeNotifications();
  }

  initializeNotifications() {
    // Track viewer count (simulated)
    this.viewerCount = Math.floor(Math.random() * 10) + 1;
    
    // Show welcome notification after page load
    setTimeout(() => {
      this.showWelcomeNotification();
    }, 2000);

    // Show random notifications based on user behavior
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
    const projects = [
      "E-commerce Website", "Task Management App", "Weather Dashboard",
      "Chat Application", "Portfolio Website", "API Integration Project"
    ];
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    
    this.createNotification({
      type: 'projects',
      icon: '⭐',
      message: `Someone just viewed "${randomProject}" project`,
      duration: 5500
    });
  }

  showAchievementNotification() {
    const achievements = [
      "🌟 Portfolio reached 50+ views today!",
      "🚀 Your projects got 10+ likes!",
      "💫 New skill added: Three.js Mastery",
      "🎯 SEO score improved to 95%",
      "📱 Mobile responsiveness: Excellent"
    ];
    const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
    
    this.createNotification({
      type: 'achievement',
      icon: '🎉',
      message: randomAchievement,
      duration: 7000
    });
  }

  showPerformanceNotification() {
    const performance = [
      "⚡ Page loaded in 1.2s - Excellent!",
      "🎨 Animations running smoothly at 60FPS",
      "📊 Performance score: 98/100",
      "🔍 SEO optimized for better visibility"
    ];
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
          <button class="notification-close" onclick="smartNotifications.removeNotification('${notificationId}')">
            ×
          </button>
        </div>
        <div class="notification-progress"></div>
      </div>
    `;

    const container = document.getElementById('smart-notifications');
    container.insertAdjacentHTML('beforeend', notificationHTML);

    const notification = {
      id: notificationId,
      element: document.getElementById(notificationId),
      timeout: null
    };

    this.notifications.push(notification);

    // Auto-remove after duration
    notification.timeout = setTimeout(() => {
      this.removeNotification(notificationId);
    }, duration);

    // Start progress bar animation
    setTimeout(() => {
      const progressBar = document.querySelector(`#${notificationId} .notification-progress`);
      if (progressBar) {
        progressBar.classList.add('hiding');
      }
    }, 100);

    // Limit max notifications
    if (this.notifications.length > 3) {
      this.removeNotification(this.notifications[0].id);
    }
  }

  removeNotification(notificationId) {
    const notificationIndex = this.notifications.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) return;

    const notification = this.notifications[notificationIndex];
    const element = notification.element;

    if (element) {
      element.classList.remove('show');
      element.classList.add('hide');

      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 500);
    }

    if (notification.timeout) {
      clearTimeout(notification.timeout);
    }

    this.notifications.splice(notificationIndex, 1);
  }

  setupBehaviorTracking() {
    // Show project notification when projects section is viewed
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.showProjectNotification();
            }, 1000);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(projectsSection);
    }

    // Show random notifications periodically
    setInterval(() => {
      if (this.notifications.length < 2 && Math.random() > 0.7) {
        const randomTypes = [
          () => this.showViewersNotification(),
          () => this.showAchievementNotification(),
          () => this.showPerformanceNotification()
        ];
        const randomNotification = randomTypes[Math.floor(Math.random() * randomTypes.length)];
        randomNotification();
      }
    }, 15000);

    // Show notification on scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50 && maxScroll < 50) {
        this.createNotification({
          type: 'achievement',
          icon: '🎯',
          message: 'You explored 50% of my portfolio! Thanks for your interest!',
          duration: 6000
        });
        maxScroll = 50;
      }
      
      if (scrollPercent > 90 && maxScroll < 90) {
        this.createNotification({
          type: 'achievement',
          icon: '🏆',
          message: 'You viewed my entire portfolio! Ready to work together?',
          duration: 7000
        });
        maxScroll = 90;
      }
    });
  }
}

// Initialize smart notifications
const smartNotifications = new SmartNotifications();
// Initialize smart notifications when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything to load
  setTimeout(() => {
    window.smartNotifications = new SmartNotifications();
  }, 3000);
});
