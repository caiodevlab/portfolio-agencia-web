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
    container.style.opacity = '0.9';
    document.body.prepend(container);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Cinematic Orange-Red / Crimson Space Lighting
    const ambientLight = new THREE.AmbientLight(0x1a0f0a, 1.2);
    scene.add(ambientLight);

    // Warm orange-red sun/rim light on the moon
    const sunLight = new THREE.DirectionalLight(0xff5722, 3.2);
    sunLight.position.set(25, 12, 20);
    scene.add(sunLight);

    // Cool cyan fill light for contrast (Studio balance)
    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    fillLight.position.set(-20, -10, -10);
    scene.add(fillLight);

    // Create High-Detail Procedural Moon with Cinematic Orange-Red Tone
    const moonGeometry = new THREE.SphereGeometry(4.8, 128, 128);
    
    const moonMaterial = new THREE.MeshStandardMaterial({
        color: 0xff7043, // Warm vibrant orange-red base tint
        emissive: 0x3d1400,
        emissiveIntensity: 0.3,
        roughness: 0.75,
        metalness: 0.2,
        bumpScale: 0.08
    });

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=1536',
        (texture) => {
            texture.anisotropy = 16;
            moonMaterial.map = texture;
            moonMaterial.needsUpdate = true;
        },
        undefined,
        (err) => {
            console.log('Using procedural fallback for moon texture.');
        }
    );

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(6.5, 0.8, -3);
    scene.add(moon);

    // Atmospheric Orange Glow Halo around the moon
    const haloGeometry = new THREE.SphereGeometry(5.2, 64, 64);
    const haloMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                gl_FragColor = vec4(1.0, 0.35, 0.1, 1.0) * intensity * 0.7;
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });
    const moonHalo = new THREE.Mesh(haloGeometry, haloMaterial);
    moonHalo.position.copy(moon.position);
    scene.add(moonHalo);

    // Starfield Particles with Orange/Cyan Sparks
    const particlesCount = 1800;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesColors = new Float32Array(particlesCount * 3);

    const colorOptions = [
        new THREE.Color(0xff5722), // Orange
        new THREE.Color(0xff9800), // Amber
        new THREE.Color(0x06b6d4), // Cyan
        new THREE.Color(0xffffff), // White
        new THREE.Color(0x818cf8)  // Indigo
    ];

    for (let i = 0; i < particlesCount * 3; i += 3) {
        particlesPositions[i] = (Math.random() - 0.5) * 70;
        particlesPositions[i + 1] = (Math.random() - 0.5) * 70;
        particlesPositions[i + 2] = (Math.random() - 0.5) * 70 - 15;

        const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        particlesColors[i] = col.r;
        particlesColors[i + 1] = col.g;
        particlesColors[i + 2] = col.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.14,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
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
            y: -5.5,
            x: -4.5,
            z: -9,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5
            }
        });

        gsap.to(moonHalo.position, {
            y: -5.5,
            x: -4.5,
            z: -9,
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
        moon.rotation.y += 0.0012;

        // Subtle floating of starfield
        starfield.rotation.y = elapsedTime * 0.015;

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
