export function initSpaceBackground() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. Skipping 3D space background.');
        return;
    }

    const container = document.createElement('div');
    container.id = 'space-canvas-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '-1';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0.85';
    document.body.prepend(container);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.002);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x111827, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    directionalLight.position.set(20, 10, 15);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 1.5);
    rimLight.position.set(-20, -10, -10);
    scene.add(rimLight);

    // Create Procedural Realistic Moon
    const moonGeometry = new THREE.SphereGeometry(4.5, 64, 64);
    
    // Custom shader material for cinematic lunar appearance with displacement/craters feel
    const moonMaterial = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.85,
        metalness: 0.1,
        bumpScale: 0.05,
    });

    // Load lunar texture if available or use high-end procedural look
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=1024',
        (texture) => {
            moonMaterial.map = texture;
            moonMaterial.needsUpdate = true;
        },
        undefined,
        (err) => {
            console.log('Using procedural fallback for moon texture.');
        }
    );

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    // Position moon to the right side of the hero section for a magnificent composition
    moon.position.set(6, 1, -2);
    scene.add(moon);

    // Starfield Particles
    const particlesCount = 1200;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesColors = new Float32Array(particlesCount * 3);

    const colorOptions = [new THREE.Color(0x38bdf8), new THREE.Color(0x6366f1), new THREE.Color(0xffffff), new THREE.Color(0x06b6d4)];

    for (let i = 0; i < particlesCount * 3; i += 3) {
        particlesPositions[i] = (Math.random() - 0.5) * 60;
        particlesPositions[i + 1] = (Math.random() - 0.5) * 60;
        particlesPositions[i + 2] = (Math.random() - 0.5) * 60 - 10;

        const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        particlesColors[i] = col.r;
        particlesColors[i + 1] = col.g;
        particlesColors[i + 2] = col.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const starfield = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(starfield);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });

    // Scroll Interaction & GSAP Integration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(moon.position, {
            y: -5,
            x: -4,
            z: -8,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            }
        });

        gsap.to(moon.rotation, {
            y: Math.PI * 1.5,
            x: Math.PI * 0.3,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            }
        });
    }

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Slow self-rotation of the moon
        moon.rotation.y += 0.001;

        // Subtle floating of starfield
        starfield.rotation.y = elapsedTime * 0.02;

        // Smooth mouse parallax interpolation
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 1.5;
        camera.position.y = -targetY * 1.5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
