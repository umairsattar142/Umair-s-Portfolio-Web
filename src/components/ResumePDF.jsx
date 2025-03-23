import React, { useEffect, useRef } from 'react';
import resumeImage from '../images/resume (2).jpg'; 
import * as THREE from 'three';

const ResumePage = () => {
    const mountRef = useRef(null);
    
    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        const mount = mountRef.current; // Store the current value of mountRef
        
        if (mount) {
            mount.appendChild(renderer.domElement);
        }
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x77bbff,
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Camera position
        camera.position.z = 2;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);
    
    return (
        <div className="relative min-h-screen p-4 bg-gray-900 text-white flex flex-col items-center overflow-auto">
            {/* Three.js background */}
            <div 
                ref={mountRef} 
                className="absolute inset-0 z-0"
            />
            
            <h1 className="text-3xl sm:text-3xl font-bold pt-5 mb-6 sm:mb-8 z-10">Umair's Resume</h1>
            
            <div className="flex justify-center items-center  w-full h-full z-10">
                <img 
                    src={resumeImage} 
                    alt="My Resume" 
                    className="max-h-[70vh] sm:max-h-[80vh] max-w-[90vw] object-contain shadow-lg"
                />
            </div>

            {/* Download Button */}
            <div className="mt-6 sm:mt-8 z-10">
                <a 
                    href="/resume.jpg" 
                    download="Umair_Resume.jpg" // Name of the downloaded file
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Download Resume
                </a>
            </div>
        </div>
    );
};

export default ResumePage;