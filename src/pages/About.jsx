import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const About = () => {
  const canvasRef = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const torus = useRef(null);

  useEffect(() => {
    // Scene setup
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setPixelRatio(window.devicePixelRatio);

    // Store the current value of canvasRef in a variable
    const canvas = canvasRef.current;

    // Append the canvas to the DOM only if it hasn't been appended already
    if (canvas.children.length === 0) {
      canvas.appendChild(renderer.current.domElement);
    }

    // Create a spinning torus
    const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6495ed,
      wireframe: true,
    });
    torus.current = new THREE.Mesh(geometry, material);
    scene.current.add(torus.current);

    // Camera position
    camera.current.position.z = 6;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      torus.current.rotation.x += 0.003;
      torus.current.rotation.y += 0.002;
      renderer.current.render(scene.current, camera.current);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js objects
      if (renderer.current) {
        renderer.current.dispose();
      }

      // Remove the canvas element from the DOM using the stored variable
      if (canvas && renderer.current.domElement) {
        canvas.removeChild(renderer.current.domElement);
      }

      // Dispose of geometry and material
      if (torus.current) {
        torus.current.geometry.dispose();
        torus.current.material.dispose();
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Three.js background */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-white">About Me</h1>

          <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-6 md:p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">Intro</h2>
            <p className="text-base sm:text-lg mb-6 text-white">
              I'm Umair Sattar, a passionate software engineer with strong problem-solving and analytical reasoning skills.
              Actively pursuing a career in Full Stack development, with hands-on experience in MERN projects.
              Continuously enhancing problem-solving abilities through consistent practice on competitive programming platforms like
              LeetCode. Eager to contribute innovative and optimized solutions and want to grow in the rapidly evolving development
              industry under a great mentorship.
            </p>
            <p className="text-base sm:text-lg text-gray-300 text-white">
              I'm driven by the constant evolution of technology and enjoy solving complex problems with elegant solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-white">Education</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-blue-400">Bachelor of Science in Computer Science</h3>
                  <p className="text-gray-300 text-white">FAST-NUCES</p>
                  <p className="text-gray-400 text-white">Graduated: Dec-2024</p>
                  <p className="mt-2 text-gray-300 text-white">
                    Relevant Coursework: <br />Data Structures, Design & analysis of Algorithms, Blockchain Development, Natural Language Processing, Database Systems, Secure Software Design, Object Oriented programming.
                     
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-white">Skills</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">C</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">C++</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">SQL</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">JavaScript</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">HTML</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">CSS</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">C#</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Python</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Frameworks & Libraries</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Tailwind CSS</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Ether.js</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Web3.js</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">ReactJS</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">EmailJs</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Git</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Remix</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Express</span>
                   <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Vscode</span>
                   <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">NodeJs</span>
                  {/*  <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Vscode</span>*/}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Database</h3>
                  <div className="flex flex-wrap gap-2">
                  
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">PostgreSQL</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">MongoDB</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">Firebase</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full border border-gray-600">EmailJs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-6 md:p-8 mt-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Interests</h2>
            <p className="text-base sm:text-lg mb-4 text-gray-300 text-white">
              Outside of coding, I'm passionate about:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-gray-300 text-white">
              <li>Solving puzzles and brain teasers</li>
              <li>Playing chess or strategic board games</li>
              <li>Crypto trading</li>
              <li>Fitness (e.g., gym, running)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;