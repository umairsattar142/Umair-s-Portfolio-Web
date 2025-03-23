import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const Home = () => {
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run check on initial load
    checkMobile();
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
    const mount = mountRef.current;
    
    if (mount) {
      mount.appendChild(renderer.domElement);
    }
    
    // Create particles - reduced count for mobile
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 1000 : 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.007 : 0.005, // Slightly larger on mobile for visibility
      color: 0x77bbff,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Camera position
    camera.position.z = 2;
    
    // Animation with performance optimization
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      // Update mobile status
      checkMobile();
      
      // Update camera and renderer
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Adjust particle size for different screen sizes
      particlesMaterial.size = window.innerWidth < 768 ? 0.007 : 0.005;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationId);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isMobile]);

  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Three.js canvas container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-8">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Hi, I'm Umair Sattar
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8">
            Software Engineer & Full Stack Developer
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto">
            I'm a strong problem-solver with good analytical reasoning skills.
            Actively pursuing a career in software development, with hands-on experience in developing web-applications. My skill set spans both frontend and 
            backend development, with a focus on delivering seamless user experiences and optimizing performance. 
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link 
              to="/projects" 
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              View My Work
            </Link>
            <Link 
              to="/contact" 
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              Get In Touch
            </Link>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 mt-8 sm:mt-12">
            <a href="https://github.com/umairsattar142" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="http://linkedin.com/in/umair-sattar-90917623b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="sm:hidden mt-10 animate-bounce">
            <svg className="h-6 w-6 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-xs text-gray-400">Scroll down</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;