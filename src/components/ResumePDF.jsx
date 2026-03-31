import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ResumePage = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const mount = mountRef.current;

        if (mount) {
            mount.appendChild(renderer.domElement);
        }

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x77bbff,
            transparent: true,
            opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        camera.position.z = 2;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center">
            {/* Three.js background */}
            <div
                ref={mountRef}
                className="absolute inset-0 z-0"
            />

            <div className="relative z-10 flex flex-col items-center w-full px-4 py-8 sm:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    My Resume
                </h1>

                <div className="bg-white bg-opacity-5 rounded-lg border border-gray-700 shadow-xl max-w-4xl w-full overflow-hidden" style={{ height: '75vh' }}>
                    <iframe
                        src="/resume.pdf"
                        title="Umair's Resume"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>

                <div className="mt-6 sm:mt-8">
                    <a
                        href="/resume.pdf"
                        download="Umair_Sattar_Resume.pdf"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;
