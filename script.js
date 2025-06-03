// ===== DOM ELEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded - initializing portfolio");
    
    // Start typing animation for name with alternating text
    const typedNameElement = document.getElementById('typed-name');
    const texts = ["Mohamed Khaled", "Full Stack Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typedNameElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typedNameElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = Math.random() * 50 + 100; // Between 100-150ms
        }
        
        // Handle text switching
        if (!isDeleting && charIndex === currentText.length) {
            // Finished typing current text, wait before deleting
            typingSpeed = 1500; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before starting new text
        }
        
        // Continue the loop
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 800);
    
    // Navigation
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Skill tabs
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillGroups = document.querySelectorAll('.skill-group');
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    
    // Sections for scroll animations
    const sections = document.querySelectorAll('section');
    
    // ===== THEME TOGGLE =====
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
    
    // ===== NAVIGATION =====
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Set active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Change header style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
    
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== SKILL TABS =====
    // Initialize all skill bars to 0% width
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        // Store the final percentage as a data attribute
        const finalWidth = skill.style.width;
        skill.setAttribute('data-final-width', finalWidth);
        // Set initial width to 0%
        skill.style.width = '0%';
    });
    
    // Handle skill category clicks and animate skill bars
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            skillCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            category.classList.add('active');
            
            // Show corresponding skill group and animate its skill bars
            const categoryId = category.getAttribute('data-category');
            skillGroups.forEach(group => {
                const isActiveGroup = group.id === categoryId;
                group.classList.toggle('active', isActiveGroup);
                
                // Find skill bars in this group
                const groupSkillBars = group.querySelectorAll('.skill-level');
                
                // Animate skill bars in the active group, reset others to 0
                groupSkillBars.forEach(skillBar => {
                    if (isActiveGroup) {
                        // Animate to final width with a slight delay
                        setTimeout(() => {
                            skillBar.style.width = skillBar.getAttribute('data-final-width');
                        }, 100);
                    } else {
                        // Reset non-active groups to 0%
                        skillBar.style.width = '0%';
                    }
                });
            });
        });
    });
    
    // Trigger click on the initially active category to show its animations
    const initialActiveCategory = document.querySelector('.skill-category.active');
    if (initialActiveCategory) {
        initialActiveCategory.click();
    }
    
    // ===== CONTACT FORM =====
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // No need for additional skill animation code here
    
    // ===== SCROLL ANIMATIONS =====
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .project-card, .plan, .contact-content');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // ===== THREE.JS 3D ELEMENTS =====
    try {
        console.log("Starting Three.js initialization");
        
        // Test WebGL support first
        testWebGLSupport()
            .then(() => {
                // Initialize Three.js with proper error handling
                initThreeJS();
            })
            .catch(error => {
                console.error("WebGL not properly supported, using fallbacks:", error);
                setupFallbackImages();
            });
    } catch (e) {
        console.error("Error during initialization:", e);
        setupFallbackImages();
    }
});

// Check if WebGL is supported
function testWebGLSupport() {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) {
                reject("WebGL not supported by this browser");
                return;
            }
            
            // Test if we can create a simple WebGL context
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            // Check if Three.js is available
            if (typeof THREE === 'undefined') {
                reject("Three.js library not loaded");
                return;
            }
            
            console.log("WebGL is supported and Three.js is available");
            resolve();
        } catch (e) {
            reject("Error testing WebGL support: " + e);
        }
    });
}

// ===== THREE.JS INITIALIZATION =====
function initThreeJS() {
    console.log("Initializing Three.js components...");
    
    try {
        // Background canvas
        initBackgroundCanvas();
        
        // Use the detailed hero laptop model instead of the simple one
        initHeroModel();
        
        // About 3D model
        initAboutModel();
        
        // Project 3D models
        initProjectModels();
        
        console.log("All Three.js components initialized successfully");
    } catch (error) {
        console.error("Error initializing Three.js components:", error);
        setupFallbackImages();
    }
}

// Simplified hero model for debugging
function initSimpleHeroModel() {
    console.log("Initializing simple hero model...");
    
    const container = document.getElementById('hero-3d-model');
    if (!container) {
        console.error("Hero model container not found");
        return;
    }
    
    try {
        // Create scene
        const scene = new THREE.Scene();
        console.log("Scene created");
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        console.log("Camera created");
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        console.log("Renderer created and added to DOM");
        
        // Create a simple laptop (just the base and screen)
        const laptopGroup = new THREE.Group();
        
        // Base
        const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        laptopGroup.add(base);
        
        // Screen
        const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 1;
        screen.position.z = -1;
        screen.rotation.x = -Math.PI / 6;
        laptopGroup.add(screen);
        
        // Screen display
        const displayGeometry = new THREE.PlaneGeometry(2.8, 1.8);
        const displayMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff9d });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.y = 1;
        display.position.z = -0.95;
        display.rotation.x = -Math.PI / 6;
        laptopGroup.add(display);
        
        scene.add(laptopGroup);
        console.log("Laptop model created and added to scene");
        
        // Add light
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            laptopGroup.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
        console.log("Animation started");
        
    } catch (error) {
        console.error("Error creating simple hero model:", error);
        throw error;
    }
}

// Create fallback images when 3D rendering fails
function setupFallbackImages() {
    console.log("Setting up fallback static images");
    
    try {
        // Hero section fallback
        const heroContainer = document.getElementById('hero-3d-model');
        if (heroContainer) {
            heroContainer.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                    <div style="width: 80%; height: 80%; background-color: #232323; border-radius: 5px; display: flex; flex-direction: column; overflow: hidden;">
                        <div style="height: 80%; background-color: #1e1e1e; display: flex; justify-content: center; align-items: center;">
                            <div style="color: #00ff9d; font-family: monospace; font-size: 32px; text-align: center;">
                                &lt;/&gt;<br>
                                <span style="font-size: 16px;">Code Editor</span>
                            </div>
                        </div>
                        <div style="height: 20%; background-color: #333333;"></div>
                    </div>
                </div>
            `;
            console.log("Added laptop fallback for hero section");
        }
        
        // About section fallback
        const aboutContainer = document.getElementById('about-3d-model');
        if (aboutContainer) {
            aboutContainer.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                    <div style="width: 70%; height: 70%; background-color: #232323; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                        <div style="color: #00ff9d; font-size: 48px; text-align: center;">
                            <i class="fas fa-brain"></i>
                        </div>
                    </div>
                </div>
            `;
            console.log("Added brain fallback for about section");
        }
        
        // Project section fallbacks
        const projects = [
            { id: 'project-3d-1', icon: 'fa-globe', name: '3D Web' },
            { id: 'project-3d-2', icon: 'fa-shopping-cart', name: 'E-Commerce' },
            { id: 'project-3d-3', icon: 'fa-robot', name: 'AI Assistant' }
        ];
        
        projects.forEach(project => {
            const container = document.getElementById(project.id);
            if (container) {
                container.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: #232323;">
                        <div style="color: #00ff9d; font-size: 36px; text-align: center;">
                            <i class="fas ${project.icon}"></i><br>
                            <span style="font-size: 14px;">${project.name}</span>
                        </div>
                    </div>
                `;
            }
        });
        console.log("Added project fallbacks");
        
    } catch (error) {
        console.error("Error setting up fallback images:", error);
    }
}

// ===== BACKGROUND CANVAS =====
function initBackgroundCanvas() {
    const canvas = document.getElementById('bg-canvas');
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00ff9d, 1);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
        
        // Mouse movement effect
        if (window.mouseX && window.mouseY) {
            particlesMesh.rotation.x += window.mouseY * 0.00001;
            particlesMesh.rotation.y += window.mouseX * 0.00001;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Track mouse movement
    window.addEventListener('mousemove', (event) => {
        window.mouseX = event.clientX - window.innerWidth / 2;
        window.mouseY = event.clientY - window.innerHeight / 2;
    });
}

// ===== HERO 3D MODEL =====
function initHeroModel() {
    const container = document.getElementById('hero-3d-model');
    
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Create renderer with better quality
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Create a realistic laptop model
    const laptopGroup = new THREE.Group();
    
    // Laptop base with rounded edges
    createLaptopBase(laptopGroup);
    
    // Laptop screen with rounded edges
    createLaptopScreen(laptopGroup);
    
    // Add keyboard
    createKeyboard(laptopGroup);
    
    // Add touchpad
    createTouchpad(laptopGroup);
    
    // Add ports on the sides
    createPorts(laptopGroup);
    
    // Add laptop logo
    createLaptopLogo(laptopGroup);
    
    // Center and position the laptop
    laptopGroup.position.y = -0.2;
    laptopGroup.rotation.x = Math.PI / 24;
    
    // Add laptop to scene
    scene.add(laptopGroup);
    
    // Add lighting for more realism
    addRealisticLighting(scene);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Smoother, subtler animation
        laptopGroup.rotation.y = Math.sin(Date.now() * 0.0005) * 0.2;
        laptopGroup.position.y = -0.2 + Math.sin(Date.now() * 0.001) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Helper functions for creating laptop components

// Create laptop base with premium details
function createLaptopBase(laptopGroup) {
    // Main base body with premium materials
    const baseGeometry = new THREE.BoxGeometry(3, 0.15, 2);
    const baseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.1,
        reflectivity: 0.8,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopGroup.add(base);
    
    // Add texture details - logo engraving
    const detailCanvas = document.createElement('canvas');
    detailCanvas.width = 512;
    detailCanvas.height = 512;
    const ctx = detailCanvas.getContext('2d');
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add subtle texture pattern
    ctx.fillStyle = '#0f0f0f';
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            ctx.fillRect(i * 25, j * 25, 24, 24);
        }
    }
    
    // Logo in center
    ctx.fillStyle = '#1f1f1f';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DM', 256, 256);
    
    const detailTexture = new THREE.CanvasTexture(detailCanvas);
    detailTexture.wrapS = THREE.RepeatWrapping;
    detailTexture.wrapT = THREE.RepeatWrapping;
    
    // Apply texture to bottom face
    const bottomGeometry = new THREE.PlaneGeometry(3, 2);
    const bottomMaterial = new THREE.MeshPhysicalMaterial({
        map: detailTexture,
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.3,
        side: THREE.DoubleSide
    });
    const bottomFace = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottomFace.rotation.x = Math.PI / 2;
    bottomFace.position.set(0, -0.08, 0);
    laptopGroup.add(bottomFace);
    
    // All rounded edges for premium look
    const edges = [
        { pos: [0, 0.075, 1], rot: [0, 0, Math.PI / 2], scale: [1, 3, 1] },    // Front edge
        { pos: [0, 0.075, -1], rot: [0, 0, Math.PI / 2], scale: [1, 3, 1] },   // Back edge
        { pos: [1.5, 0.075, 0], rot: [Math.PI / 2, 0, 0], scale: [1, 2, 1] },  // Right edge
        { pos: [-1.5, 0.075, 0], rot: [Math.PI / 2, 0, 0], scale: [1, 2, 1] }  // Left edge
    ];
    
    edges.forEach(edge => {
        const edgeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1, 16);
        const edgeMesh = new THREE.Mesh(edgeGeometry, baseMaterial);
        edgeMesh.position.set(...edge.pos);
        edgeMesh.rotation.set(...edge.rot);
        edgeMesh.scale.set(...edge.scale);
        laptopGroup.add(edgeMesh);
    });
    
    // Premium rubber feet with anti-slip texture
    const feetPositions = [
        { x: -1.35, z: -0.85 },
        { x: 1.35, z: -0.85 },
        { x: -1.35, z: 0.85 },
        { x: 1.35, z: 0.85 }
    ];
    
    feetPositions.forEach(pos => {
        // Create layered foot for more detail
        const footGroup = new THREE.Group();
        
        // Base of the foot (rubber-like texture)
        const footBaseGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16);
        const footBaseMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x111111,
            roughness: 0.9,
            metalness: 0 
        });
        const footBase = new THREE.Mesh(footBaseGeometry, footBaseMaterial);
        footBase.rotation.x = Math.PI / 2;
        footGroup.add(footBase);
        
        // Inner part with grip pattern
        const footInnerGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.021, 16);
        const footInnerMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x0a0a0a,
            roughness: 1.0,
            metalness: 0
        });
        const footInner = new THREE.Mesh(footInnerGeometry, footInnerMaterial);
        footInner.rotation.x = Math.PI / 2;
        footInner.position.y = 0.001;
        footGroup.add(footInner);
        
        // Position the entire foot group
        footGroup.position.set(pos.x, -0.08, pos.z);
        laptopGroup.add(footGroup);
    });
    
    // Add ventilation grills on bottom
    const ventGroup = new THREE.Group();
    
    for (let i = 0; i < 15; i++) {
        const ventSlotGeometry = new THREE.BoxGeometry(0.8, 0.01, 0.03);
        const ventSlotMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
        const ventSlot = new THREE.Mesh(ventSlotGeometry, ventSlotMaterial);
        ventSlot.position.set(0, -0.07, -0.7 + i * 0.1);
        ventGroup.add(ventSlot);
    }
    
    ventGroup.position.set(0, 0, 0);
    laptopGroup.add(ventGroup);
}

// Create laptop screen with premium details
function createLaptopScreen(laptopGroup) {
    // Create screen group for better organization
    const screenGroup = new THREE.Group();
    
    // Main screen body with premium materials
    const screenGeometry = new THREE.BoxGeometry(3, 2, 0.05);
    // Round the edges slightly for more premium look
    const screenPositions = screenGeometry.getAttribute('position');
    for (let i = 0; i < screenPositions.count; i++) {
        const x = screenPositions.getX(i);
        const y = screenPositions.getY(i);
        
        // Round corners slightly
        if (Math.abs(x) > 1.4 && Math.abs(y) > 0.9) {
            const cornerFactor = 0.05;
            screenPositions.setX(i, x > 0 ? x - cornerFactor : x + cornerFactor);
            screenPositions.setY(i, y > 0 ? y - cornerFactor : y + cornerFactor);
        }
    }
    
    // Premium aluminum material
    const screenOuterMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.1,
        reflectivity: 0.8,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });
    const screen = new THREE.Mesh(screenGeometry, screenOuterMaterial);
    screenGroup.add(screen);
    
    // Thinner bezels for modern premium look
    const bezelGeometry = new THREE.BoxGeometry(2.92, 1.92, 0.01);
    const bezelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0c0c0c,
        shininess: 30
    });
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.position.z = 0.03;
    screenGroup.add(bezel);
    
    // Add webcam and sensors at top of screen
    const webcamGroup = new THREE.Group();
    
    // Camera lens
    const cameraGeometry = new THREE.CircleGeometry(0.04, 32);
    const cameraMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x111111,
        shininess: 90
    });
    const camera = new THREE.Mesh(cameraGeometry, cameraMaterial);
    camera.position.set(0, 0.85, 0.03);
    webcamGroup.add(camera);
    
    // Camera glass reflection
    const cameraGlassGeometry = new THREE.CircleGeometry(0.035, 32);
    const cameraGlassMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        shininess: 100,
        specular: 0xcccccc
    });
    const cameraGlass = new THREE.Mesh(cameraGlassGeometry, cameraGlassMaterial);
    cameraGlass.position.set(0, 0.85, 0.031);
    webcamGroup.add(cameraGlass);
    
    // Light sensor and microphone
    const sensorGeometry = new THREE.CircleGeometry(0.01, 16);
    const sensorMaterial = new THREE.MeshPhongMaterial({ color: 0x0a0a0a });
    
    const lightSensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
    lightSensor.position.set(0.15, 0.85, 0.03);
    webcamGroup.add(lightSensor);
    
    const microphone = new THREE.Mesh(sensorGeometry, sensorMaterial);
    microphone.position.set(-0.15, 0.85, 0.03);
    webcamGroup.add(microphone);
    
    // Status LED with proper glowing material
    const ledGeometry = new THREE.CircleGeometry(0.005, 16);
    const ledMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00ff9d,
        emissive: 0x00ff9d,
        emissiveIntensity: 0.9,
        metalness: 0.3,
        roughness: 0.2
    });
    const statusLed = new THREE.Mesh(ledGeometry, ledMaterial);
    statusLed.position.set(0.25, 0.85, 0.031);
    webcamGroup.add(statusLed);
    
    // Add a glow effect around the LED
    const ledGlowGeometry = new THREE.CircleGeometry(0.008, 16);
    const ledGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.4
    });
    const ledGlow = new THREE.Mesh(ledGlowGeometry, ledGlowMaterial);
    ledGlow.position.set(0.25, 0.85, 0.03);
    webcamGroup.add(ledGlow);
    
    screenGroup.add(webcamGroup);
    
    // Screen display (code texture)
    const displayGeometry = new THREE.PlaneGeometry(2.75, 1.75);
    
    // Create canvas for code texture with higher resolution
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 768;
    const ctx = codeCanvas.getContext('2d');
    
    // Fill background - IDE-like dark theme
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 1024, 768);
    
    // Add a window title bar
    ctx.fillStyle = '#323233';
    ctx.fillRect(0, 0, 1024, 30);
    
    // Window controls (close, minimize, maximize)
    ctx.fillStyle = '#ff5f57'; // Close
    ctx.beginPath();
    ctx.arc(15, 15, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#febc2e'; // Minimize
    ctx.beginPath();
    ctx.arc(35, 15, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#28c840'; // Maximize
    ctx.beginPath();
    ctx.arc(55, 15, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Window title
    ctx.fillStyle = '#cccccc';
    ctx.font = '14px sans-serif';
    ctx.fillText('portfolio.js - Visual Studio Code', 80, 20);
    
    // Add code editor sidebar
    ctx.fillStyle = '#252526';
    ctx.fillRect(0, 30, 50, codeCanvas.height - 30);
    
    // File icons in sidebar
    const fileIcons = [
        { y: 60, color: '#5899ee', name: 'index.html' },
        { y: 90, color: '#c2c2c2', name: 'styles.css' },
        { y: 120, color: '#dbba48', name: 'portfolio.js' },
        { y: 150, color: '#5899ee', name: 'about.html' }
    ];
    
    fileIcons.forEach(icon => {
        // File icon
        ctx.fillStyle = icon.color;
        ctx.fillRect(15, icon.y, 20, 20);
        
        // Active file indicator
        if (icon.name === 'portfolio.js') {
            ctx.fillStyle = '#00ff9d';
            ctx.fillRect(0, icon.y - 5, 3, 30);
        }
    });
    
    // Line numbers column
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(50, 30, 30, codeCanvas.height - 30);
    
    // Draw line numbers
    ctx.font = '12px monospace';
    ctx.fillStyle = '#858585';
    for (let i = 1; i <= 25; i++) {
        ctx.fillText(i.toString(), 58, 55 + i * 20);
    }
    
    // Draw code-like lines with more realistic syntax highlighting
    ctx.font = 'bold 14px "Fira Code", monospace';
    const lines = [
        'function createPortfolio() {',
        '  const skills = ["JavaScript", "Three.js", "React", "Node.js"];',
        '  const projects = getProjects();',
        '  const theme = localStorage.getItem("theme") || "dark";',
        '  ',
        '  // Initialize 3D environment',
        '  const scene = new THREE.Scene();',
        '  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);',
        '  const renderer = new THREE.WebGLRenderer({ antialias: true });',
        '  ',
        '  // Setup lighting',
        '  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);',
        '  const directionalLight = new THREE.DirectionalLight(0x00ff9d, 1);',
        '  scene.add(ambientLight);',
        '  scene.add(directionalLight);',
        '  ',
        '  return {',
        '    render() {',
        '      document.body.appendChild(renderer.domElement);',
        '      ',
        '      // Apply theme',
        '      document.documentElement.setAttribute("data-theme", theme);',
        '      ',
        '      // Render skills and projects',
        '      skills.forEach(skill => renderSkill(skill));',
        '      projects.forEach(project => renderProject(project));',
        '      ',
        '      animate();',
        '    }',
        '  };',
        '}',
        '',
        'createPortfolio().render();'
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let x = 100;
        let words = line.split(' ');
        
        for (let j = 0; j < words.length; j++) {
            let word = words[j];
            let color = '#d4d4d4'; // default text color
            
            // Keywords
            if (['function', 'const', 'let', 'var', 'return'].includes(word)) {
                color = '#569cd6'; // blue
            } 
            // Built-in objects
            else if (['document', 'window', 'localStorage'].includes(word)) {
                color = '#4ec9b0'; // teal
            }
            // Strings
            else if (word.includes('"') || word.includes("'")) {
                color = '#ce9178'; // orange/brown
            }
            // Numbers
            else if (!isNaN(parseFloat(word))) {
                color = '#b5cea8'; // light green
            }
            // Methods
            else if (word.includes('(') && word.includes(')')) {
                color = '#dcdcaa'; // yellow
            }
            // Comments
            else if (line.trim().startsWith('//')) {
                color = '#6a9955'; // green
                break; // Color the whole line
            }
            // THREE.js related
            else if (word.includes('THREE')) {
                color = '#4fc1ff'; // light blue
            }
            
            ctx.fillStyle = color;
            ctx.fillText(word, x, 55 + i * 20);
            x += ctx.measureText(word + ' ').width;
        }
    }
    
    // Create texture from canvas
    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    // Ensure crisp text rendering
    codeTexture.minFilter = THREE.LinearFilter;
    codeTexture.magFilter = THREE.LinearFilter;
    
    // Create premium screen display with glass effect
    const displayMaterial = new THREE.MeshPhysicalMaterial({ 
        map: codeTexture,
        transparent: true,
        opacity: 0.98,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.2
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.03;
    screenGroup.add(display);
    
    // Add subtle screen glass reflection
    const glassGeometry = new THREE.PlaneGeometry(2.8, 1.8);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.05,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = 0.035;
    screenGroup.add(glass);
    
    // Position and rotate the entire screen group
    screenGroup.position.y = 1.07;
    screenGroup.position.z = -1;
    screenGroup.rotation.x = -Math.PI / 6;
    laptopGroup.add(screenGroup);
    
    // Add premium hinges connecting screen to base
    createPremiumHinges(laptopGroup);
}

// Create premium laptop hinges
function createPremiumHinges(laptopGroup) {
    // Create hinge group
    const hingeGroup = new THREE.Group();
    
    // Premium metal material for hinges
    const hingeMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.3,
        reflectivity: 0.7
    });
    
    // Main hinge cylinders with more detail
    const leftHingeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 16);
    const leftHinge = new THREE.Mesh(leftHingeGeometry, hingeMaterial);
    leftHinge.position.set(-1.2, 0.07, -0.1);
    leftHinge.rotation.z = Math.PI / 2;
    hingeGroup.add(leftHinge);
    
    const rightHingeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 16);
    const rightHinge = new THREE.Mesh(rightHingeGeometry, hingeMaterial);
    rightHinge.position.set(1.2, 0.07, -0.1);
    rightHinge.rotation.z = Math.PI / 2;
    hingeGroup.add(rightHinge);
    
    // Add hinge details - end caps
    const endCapGeometry = new THREE.CircleGeometry(0.1, 16);
    const endCapMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.2
    });
    
    // Left hinge end caps
    const leftHingeEndCap1 = new THREE.Mesh(endCapGeometry, endCapMaterial);
    leftHingeEndCap1.position.set(-1.4, 0.07, -0.1);
    leftHingeEndCap1.rotation.y = Math.PI / 2;
    hingeGroup.add(leftHingeEndCap1);
    
    const leftHingeEndCap2 = new THREE.Mesh(endCapGeometry, endCapMaterial);
    leftHingeEndCap2.position.set(-1.0, 0.07, -0.1);
    leftHingeEndCap2.rotation.y = -Math.PI / 2;
    hingeGroup.add(leftHingeEndCap2);
    
    // Right hinge end caps
    const rightHingeEndCap1 = new THREE.Mesh(endCapGeometry, endCapMaterial);
    rightHingeEndCap1.position.set(1.4, 0.07, -0.1);
    rightHingeEndCap1.rotation.y = Math.PI / 2;
    hingeGroup.add(rightHingeEndCap1);
    
    const rightHingeEndCap2 = new THREE.Mesh(endCapGeometry, endCapMaterial);
    rightHingeEndCap2.position.set(1.0, 0.07, -0.1);
    rightHingeEndCap2.rotation.y = -Math.PI / 2;
    hingeGroup.add(rightHingeEndCap2);
    
    // Add to laptop group
    laptopGroup.add(hingeGroup);
}

// Create premium backlit keyboard with labeled keys
function createKeyboard(laptopGroup) {
    // Keyboard base with subtle glow effect
    const keyboardGeometry = new THREE.BoxGeometry(2.7, 0.02, 1.3);
    const keyboardEmissiveMap = createKeyboardGlowTexture();
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x111111,
        emissive: 0x00ff9d,
        emissiveIntensity: 0.1,
        emissiveMap: keyboardEmissiveMap,
        shininess: 50
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.08, 0.2);
    laptopGroup.add(keyboard);
    
    // Create standard key layout
    const keySize = 0.12;
    const keyGap = 0.02;
    const keyRows = 5;
    const keyCols = 15;
    
    const startX = -(keyCols * (keySize + keyGap)) / 2 + keySize / 2;
    const startZ = -(keyRows * (keySize + keyGap)) / 2 + keySize / 2 + 0.2;
    
    // Key layout configuration (QWERTY keyboard)
    const keyLabels = [
        ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'DEL', 'PWR'],
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫', 'HOME'],
        ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'PG↑'],
        ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER', 'ENTER', 'PG↓'],
        ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '↑', 'SHIFT', 'SHIFT', 'END']
    ];
    
    // Special key widths (multipliers)
    const specialKeys = {
        '⌫': 1.5,
        'TAB': 1.3,
        'CAPS': 1.5,
        'ENTER': 1.8,
        'SHIFT': 2.0,
        'SPACE': 6.0
    };
    
    // Create professional key geometry with rounded top and slight curve
    const keyGeometry = new THREE.BoxGeometry(keySize, 0.03, keySize, 1, 1, 2);
    // Curve the top of the keys slightly
    const keyPositions = keyGeometry.getAttribute('position');
    for (let i = 0; i < keyPositions.count; i++) {
        const y = keyPositions.getY(i);
        if (y > 0) {
            // Round the top edges slightly
            keyPositions.setY(i, y - 0.005 * Math.abs(keyPositions.getX(i)) * Math.abs(keyPositions.getZ(i)));
        }
    }
    
    // Premium key material with subtle reflection
    const keyMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x222222,
        metalness: 0.2,
        roughness: 0.8,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3
    });
    
    // Create all keys with labels
    for (let row = 0; row < keyRows; row++) {
        let xOffset = 0;
        
        for (let col = 0; col < keyCols; col++) {
            // Get key label from configuration
            const keyLabel = keyLabels[row][col];
            
            // Skip spacebar zone
            if (row === keyRows - 1 && col >= 3 && col <= 8) {
                if (col === 3) {
                    // Create spacebar
                    const spacebarGeometry = new THREE.BoxGeometry(keySize * 6, 0.03, keySize, 1, 1, 2);
                    // Curve top of spacebar
                    const spacebarPositions = spacebarGeometry.getAttribute('position');
                    for (let i = 0; i < spacebarPositions.count; i++) {
                        const y = spacebarPositions.getY(i);
                        if (y > 0) {
                            spacebarPositions.setY(i, y - 0.005 * Math.abs(spacebarPositions.getX(i)) * Math.abs(spacebarPositions.getZ(i)));
                        }
                    }
                    
                    const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
                    spacebar.position.set(
                        startX + xOffset + keySize * 3,
                        0.1,
                        startZ + row * (keySize + keyGap)
                    );
                    laptopGroup.add(spacebar);
                    
                    // Create key canvas texture for spacebar
                    const spaceCanvas = createKeyLabelTexture('SPACE', keySize * 6, keySize);
                    const spaceTexture = new THREE.CanvasTexture(spaceCanvas);
                    
                    // Add label on top of spacebar
                    const spacebarLabelGeometry = new THREE.PlaneGeometry(keySize * 5.8, keySize * 0.9);
                    const spacebarLabelMaterial = new THREE.MeshBasicMaterial({
                        map: spaceTexture,
                        transparent: true,
                        opacity: 0.9
                    });
                    const spacebarLabel = new THREE.Mesh(spacebarLabelGeometry, spacebarLabelMaterial);
                    spacebarLabel.position.set(0, 0.02, 0);
                    spacebarLabel.rotation.x = -Math.PI / 2;
                    spacebar.add(spacebarLabel);
                    
                    // Skip to after spacebar
                    xOffset += keySize * 6 + keyGap;
                }
                
                // Skip other positions where spacebar is
                continue;
            }
            
            // Check if it's a special width key
            const keyWidth = specialKeys[keyLabel] || 1;
            
            // Create key with adjusted width if needed
            let keyMesh;
            if (keyWidth !== 1) {
                const specialKeyGeometry = new THREE.BoxGeometry(keySize * keyWidth, 0.03, keySize, 1, 1, 2);
                // Curve top of special key
                const specialKeyPositions = specialKeyGeometry.getAttribute('position');
                for (let i = 0; i < specialKeyPositions.count; i++) {
                    const y = specialKeyPositions.getY(i);
                    if (y > 0) {
                        specialKeyPositions.setY(i, y - 0.005 * Math.abs(specialKeyPositions.getX(i)) * Math.abs(specialKeyPositions.getZ(i)));
                    }
                }
                keyMesh = new THREE.Mesh(specialKeyGeometry, keyMaterial);
                keyMesh.position.set(
                    startX + xOffset + (keySize * keyWidth / 2) - (keySize / 2),
                    0.1,
                    startZ + row * (keySize + keyGap)
                );
                xOffset += keySize * keyWidth + keyGap - (keySize + keyGap);
            } else {
                keyMesh = new THREE.Mesh(keyGeometry, keyMaterial);
                keyMesh.position.set(
                    startX + xOffset,
                    0.1,
                    startZ + row * (keySize + keyGap)
                );
            }
            
            laptopGroup.add(keyMesh);
            
            // Create key label texture
            const keyCanvas = createKeyLabelTexture(keyLabel, keySize * keyWidth, keySize);
            const keyTexture = new THREE.CanvasTexture(keyCanvas);
            
            // Add label on top of key
            const labelGeometry = new THREE.PlaneGeometry(keySize * keyWidth * 0.9, keySize * 0.9);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: keyTexture,
                transparent: true,
                opacity: 0.9
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.set(0, 0.02, 0);
            label.rotation.x = -Math.PI / 2;
            keyMesh.add(label);
            
            // Move to next key position
            xOffset += keySize + keyGap;
        }
    }
    
    // Add subtle keyboard backlight glow
    const backlightGeometry = new THREE.PlaneGeometry(2.7, 1.3);
    const backlightMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending
    });
    const backlight = new THREE.Mesh(backlightGeometry, backlightMaterial);
    backlight.position.set(0, 0.07, 0.2);
    backlight.rotation.x = -Math.PI / 2;
    laptopGroup.add(backlight);
}

// Helper function to create key label textures
function createKeyLabelTexture(label, width, height) {
    const canvas = document.createElement('canvas');
    const scale = 12; // Higher resolution for ultra-sharp text
    canvas.width = width * 64 * scale;
    canvas.height = height * 64 * scale;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create premium key cap background with subtle gradients
    const keycapGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    keycapGradient.addColorStop(0, 'rgba(40,40,40,0.9)'); // Darker at top
    keycapGradient.addColorStop(0.5, 'rgba(30,30,30,0.85)'); // Slightly lighter in middle
    keycapGradient.addColorStop(1, 'rgba(25,25,25,0.9)'); // Darkest at bottom
    
    // Draw key background with rounded corners
    const padding = scale * 3;
    const radius = scale * 6; // Rounded corners
    ctx.fillStyle = keycapGradient;
    
    // Draw rounded rectangle for key background
    ctx.beginPath();
    ctx.moveTo(padding + radius, padding);
    ctx.lineTo(canvas.width - padding - radius, padding);
    ctx.arcTo(canvas.width - padding, padding, canvas.width - padding, padding + radius, radius);
    ctx.lineTo(canvas.width - padding, canvas.height - padding - radius);
    ctx.arcTo(canvas.width - padding, canvas.height - padding, canvas.width - padding - radius, canvas.height - padding, radius);
    ctx.lineTo(padding + radius, canvas.height - padding);
    ctx.arcTo(padding, canvas.height - padding, padding, canvas.height - padding - radius, radius);
    ctx.lineTo(padding, padding + radius);
    ctx.arcTo(padding, padding, padding + radius, padding, radius);
    ctx.closePath();
    ctx.fill();
    
    // Add premium highlight effect (subtle glossy appearance)
    const highlightGradient = ctx.createLinearGradient(0, padding, 0, canvas.height / 3);
    highlightGradient.addColorStop(0, 'rgba(255,255,255,0.15)');
    highlightGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = highlightGradient;
    
    // Draw highlight with rounded top
    ctx.beginPath();
    ctx.moveTo(padding + radius, padding);
    ctx.lineTo(canvas.width - padding - radius, padding);
    ctx.arcTo(canvas.width - padding, padding, canvas.width - padding, padding + radius, radius);
    ctx.lineTo(canvas.width - padding, canvas.height / 3);
    ctx.lineTo(padding, canvas.height / 3);
    ctx.lineTo(padding, padding + radius);
    ctx.arcTo(padding, padding, padding + radius, padding, radius);
    ctx.closePath();
    ctx.fill();
    
    // Calculate optimal font size and style based on key type
    let fontSize, fontWeight;
    
    // Specialized sizing for different key types
    if (label.length === 1) {
        // Single character (letters, numbers)
        fontSize = 36 * scale;
        fontWeight = 'bold';
    } else if (label.length <= 3) {
        // Short keys (ESC, TAB, etc.)
        fontSize = 26 * scale;
        fontWeight = 'bold';
    } else if (label.length <= 5) {
        // Medium keys (SHIFT, ENTER, etc.)
        fontSize = 22 * scale;
        fontWeight = 'bold';
    } else {
        // Long keys (BACKSPACE, etc.)
        fontSize = 18 * scale;
        fontWeight = 'bold';
    }
    
    // Specialized keys need smaller text
    if (label === 'SPACE') {
        fontSize = 20 * scale;
    }
    
    // Draw text with premium appearance
    // First: shadow/outline for depth
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 4 * scale;
    ctx.shadowOffsetX = scale / 2;
    ctx.shadowOffsetY = scale / 2;
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    ctx.lineWidth = scale * 1.2;
    ctx.lineJoin = 'round';
    
    // Use professional keyboard fonts with fallbacks
    ctx.font = `${fontWeight} ${fontSize}px "SF Mono", "Fira Code", "Roboto Mono", "Consolas", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw outline/stroke
    ctx.strokeText(label, canvas.width / 2, canvas.height / 2);
    
    // Reset shadow for clean text
    ctx.shadowColor = 'transparent';
    
    // Choose color based on key type
    let textColor;
    if (['SHIFT', 'ENTER', 'TAB', 'CAPS', 'SPACE', 'ESC', 'DEL', 'HOME', 'END'].includes(label)) {
        // Special keys: slightly different color
        textColor = '#00E58D'; // Subtle green for special keys
    } else {
        // Regular keys: bright white
        textColor = '#FFFFFF';
    }
    
    // Draw main text
    ctx.fillStyle = textColor;
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);
    
    // Add green backlit glow effect for premium look
    ctx.shadowColor = '#00ff9d';
    ctx.shadowBlur = 8 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw subtle glow text
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText(label, canvas.width / 2, canvas.height / 2);
    
    // Add final highlight for extremely premium look
    ctx.shadowBlur = 3 * scale;
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fillText(label, canvas.width / 2, canvas.height / 2 - scale/4);
    
    return canvas;
}

// Create keyboard glow texture
function createKeyboardGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Create gradient for subtle glow between keys
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 255, 157, 0.01)');
    gradient.addColorStop(0.2, 'rgba(0, 255, 157, 0.05)');
    gradient.addColorStop(0.8, 'rgba(0, 255, 157, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 255, 157, 0.01)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle grid pattern for key separation
    ctx.strokeStyle = 'rgba(0, 255, 157, 0.07)';
    ctx.lineWidth = 1;
    
    const gridSize = 32;
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Create touchpad
function createTouchpad(laptopGroup) {
    const touchpadGeometry = new THREE.BoxGeometry(1.2, 0.01, 0.8);
    const touchpadMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        shininess: 100 
    });
    const touchpad = new THREE.Mesh(touchpadGeometry, touchpadMaterial);
    touchpad.position.set(0, 0.08, 0.7);
    laptopGroup.add(touchpad);
    
    // Touchpad buttons
    const buttonGeometry = new THREE.BoxGeometry(0.4, 0.01, 0.15);
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const leftButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    leftButton.position.set(-0.25, 0.08, 1.15);
    laptopGroup.add(leftButton);
    
    const rightButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    rightButton.position.set(0.25, 0.08, 1.15);
    laptopGroup.add(rightButton);
}

// Create ports on the sides
function createPorts(laptopGroup) {
    const portPositions = [
        { x: -1.45, y: 0, z: 0.3 },
        { x: -1.45, y: 0, z: 0 },
        { x: -1.45, y: 0, z: -0.3 },
        { x: 1.45, y: 0, z: 0.3 },
        { x: 1.45, y: 0, z: 0 }
    ];
    
    portPositions.forEach((pos, index) => {
        let portGeometry;
        
        if (index < 3) {
            // USB-C ports on left
            portGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.15);
        } else {
            // USB-A ports on right
            portGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.2);
        }
        
        const portMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
        const port = new THREE.Mesh(portGeometry, portMaterial);
        port.position.set(pos.x, pos.y, pos.z);
        port.rotation.z = Math.PI / 2;
        laptopGroup.add(port);
    });
}

// Create laptop logo
function createLaptopLogo(laptopGroup) {
    // Create a glowing logo on the back of the screen
    const logoGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const logoMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.9
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 1.1, -1.05);
    logo.rotation.x = -Math.PI / 6 + Math.PI;
    laptopGroup.add(logo);
    
    // Add point light behind logo for glow effect
    const logoLight = new THREE.PointLight(0x00ff9d, 1, 2);
    logoLight.position.set(0, 1.1, -1.2);
    laptopGroup.add(logoLight);
}

// Add realistic lighting to the scene
function addRealisticLighting(scene) {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Main directional light (like sunlight)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 20;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    
    // Fill light from the opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);
    
    // Rim light from behind
    const rimLight = new THREE.DirectionalLight(0x00ff9d, 0.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);
    
    // Accent light for green glow effect
    const accentLight = new THREE.PointLight(0x00ff9d, 1, 10);
    accentLight.position.set(0, 1, 3);
    scene.add(accentLight);
}

// ===== ABOUT 3D MODEL =====
function initAboutModel() {
    const container = document.getElementById('about-3d-model');
    
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create a floating brain model (representing knowledge/skills)
    const brainGroup = new THREE.Group();
    
    // Brain core
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        emissive: 0x00ff9d,
        emissiveIntensity: 0.2,
        shininess: 30
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    brainGroup.add(core);
    
    // Brain connections (neurons)
    for (let i = 0; i < 50; i++) {
        const neuronGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const neuronMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff9d,
            emissive: 0x00ff9d,
            emissiveIntensity: 0.5
        });
        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
        
        // Random position around the core
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 1 + Math.random() * 1.5;
        
        neuron.position.x = radius * Math.sin(phi) * Math.cos(theta);
        neuron.position.y = radius * Math.sin(phi) * Math.sin(theta);
        neuron.position.z = radius * Math.cos(phi);
        
        brainGroup.add(neuron);
        
        // Create connection line to core
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(neuron.position.x, neuron.position.y, neuron.position.z)
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff9d,
            transparent: true,
            opacity: 0.3
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        brainGroup.add(line);
    }
    
    // Add brain to scene
    scene.add(brainGroup);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        brainGroup.rotation.y += 0.005;
        brainGroup.rotation.z += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// ===== PROJECT 3D MODELS =====
function initProjectModels() {
    // Project 1: 3D Web Experience
    createProjectModel('project-3d-1', createWebExperienceModel);
    
    // Project 2: E-Commerce Platform
    createProjectModel('project-3d-2', createEcommerceModel);
    
    // Project 3: AI Code Assistant
    createProjectModel('project-3d-3', createAIModel);
}

function createProjectModel(containerId, modelCreator) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create specific model
    const model = modelCreator();
    scene.add(model);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        model.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Project 1: 3D Web Experience Model
function createWebExperienceModel() {
    const group = new THREE.Group();
    
    // Create a 3D world/globe
    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        emissive: 0x00ff9d,
        emissiveIntensity: 0.2,
        wireframe: true
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    group.add(globe);
    
    // Add some landmarks/points on the globe
    for (let i = 0; i < 10; i++) {
        const pointGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const pointMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff9d,
            emissive: 0x00ff9d,
            emissiveIntensity: 0.5
        });
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        
        // Random position on the globe
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        point.position.x = Math.sin(phi) * Math.cos(theta);
        point.position.y = Math.sin(phi) * Math.sin(theta);
        point.position.z = Math.cos(phi);
        
        group.add(point);
    }
    
    return group;
}

// Project 2: E-Commerce Platform Model
function createEcommerceModel() {
    const group = new THREE.Group();
    
    // Create a shopping cart
    const cartGroup = new THREE.Group();
    
    // Cart base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.1, 1);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.5;
    cartGroup.add(base);
    
    // Cart sides
    const sideGeometry = new THREE.BoxGeometry(0.1, 0.5, 1);
    const sideMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff9d });
    
    const leftSide = new THREE.Mesh(sideGeometry, sideMaterial);
    leftSide.position.x = -0.7;
    leftSide.position.y = -0.2;
    cartGroup.add(leftSide);
    
    const rightSide = new THREE.Mesh(sideGeometry, sideMaterial);
    rightSide.position.x = 0.7;
    rightSide.position.y = -0.2;
    cartGroup.add(rightSide);
    
    const backSide = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 0.1), sideMaterial);
    backSide.position.z = -0.45;
    backSide.position.y = -0.2;
    cartGroup.add(backSide);
    
    // Cart handle
    const handleGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32, Math.PI);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.z = 0.3;
    handle.position.y = 0.3;
    handle.rotation.x = Math.PI / 2;
    cartGroup.add(handle);
    
    // Add some products in the cart
    const product1Geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const product1Material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const product1 = new THREE.Mesh(product1Geometry, product1Material);
    product1.position.y = -0.2;
    product1.position.x = -0.3;
    cartGroup.add(product1);
    
    const product2Geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const product2Material = new THREE.MeshPhongMaterial({ color: 0x00ff9d });
    const product2 = new THREE.Mesh(product2Geometry, product2Material);
    product2.position.y = -0.2;
    product2.position.x = 0.3;
    cartGroup.add(product2);
    
    group.add(cartGroup);
    
    return group;
}

// Project 3: AI Code Assistant Model
function createAIModel() {
    const group = new THREE.Group();
    
    // Create a brain/neural network
    const coreGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        emissive: 0x00ff9d,
        emissiveIntensity: 0.2,
        flatShading: true
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);
    
    // Create neural connections
    const verticesPositions = coreGeometry.getAttribute('position').array;
    
    for (let i = 0; i < verticesPositions.length; i += 3) {
        const x = verticesPositions[i];
        const y = verticesPositions[i + 1];
        const z = verticesPositions[i + 2];
        
        // Create node at vertex
        const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff9d,
            emissive: 0x00ff9d,
            emissiveIntensity: 0.5
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(x, y, z);
        group.add(node);
        
        // Create connections between some nodes
        if (i % 6 === 0) {
            const targetIndex = (i + 6) % verticesPositions.length;
            const tx = verticesPositions[targetIndex];
            const ty = verticesPositions[targetIndex + 1];
            const tz = verticesPositions[targetIndex + 2];
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(x, y, z),
                new THREE.Vector3(tx, ty, tz)
            ]);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x00ff9d,
                transparent: true,
                opacity: 0.5
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
        }
    }
    
    // Add binary/code particles around the brain
    for (let i = 0; i < 20; i++) {
        // Create a small plane with a binary texture
        const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);
        
        // Create canvas for binary texture
        const binaryCanvas = document.createElement('canvas');
        binaryCanvas.width = 64;
        binaryCanvas.height = 64;
        const ctx = binaryCanvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 64, 64);
        
        // Draw binary (0s and 1s)
        ctx.font = '10px monospace';
        ctx.fillStyle = '#00ff9d';
        
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < 6; k++) {
                const binary = Math.random() > 0.5 ? '1' : '0';
                ctx.fillText(binary, j * 10 + 5, k * 10 + 10);
            }
        }
        
        // Create texture from canvas
        const binaryTexture = new THREE.CanvasTexture(binaryCanvas);
        const planeMaterial = new THREE.MeshBasicMaterial({
            map: binaryTexture,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        
        // Random position around the brain
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 1.5 + Math.random() * 0.5;
        
        plane.position.x = radius * Math.sin(phi) * Math.cos(theta);
        plane.position.y = radius * Math.sin(phi) * Math.sin(theta);
        plane.position.z = radius * Math.cos(phi);
        
        // Random rotation
        plane.rotation.x = Math.random() * Math.PI;
        plane.rotation.y = Math.random() * Math.PI;
        plane.rotation.z = Math.random() * Math.PI;
        
        group.add(plane);
    }
    
    return group;
}