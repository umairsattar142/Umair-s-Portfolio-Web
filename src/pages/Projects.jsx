import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import tokenForgeImage from '../images/tokenforge.jpg';
import HealthcareImage from '../images/Healthcare.jpg';
import rareFindsImage from '../images/rarefinds_Pics1.jpg';
import pwImage from '../images/PortfolioWebPic.jpg';
import mvImage from '../images/mintvault.jpg';


const Projects = () => {
  const canvasRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startX, setStartX] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Packet Sniffer",
      description: "A packet sniffer captures and analyzes data packets traversing a network interface for various purposes such as troubleshooting or security monitoring.",
      technologies: ["Python", "Pycharm"],
      image: tokenForgeImage,
      link: "https://github.com/umairsattar142/Packet-Sniffer",
      demo: "https://github.com/umairsattar142/Packet-Sniffer"
    },
    {
      id: 2,
      title: "MintVault: Your own NFT wallet",
      description: "MintVault is a decentralized NFT minting dApp that allows users to create and store NFTs securely on the blockchain",
      technologies: ["React.js", "Solidity", "Ether.js", "Metamask", "Express", "Tailwind CSS", "Netlify"],
      image: mvImage,
      link: "https://github.com/umairsattar142/MiniVault",
      demo: "https://mini-vault-web.netlify.app/"
    },
    {
      id: 3,
      title: "Rare Finds",
      description: "Rare Finds is a mobile application for unique items marketplace in Pakistan, ensuring security, transparency, and trust in transactions.",
      technologies: ["React Native", "React", "MongoDB", "Solidity", "Tailwind CSS","Node.js"],
      image: rareFindsImage,
      link: "https://github.com/umairsattar142/rarefindsFyp",
      demo: "https://github.com/umairsattar142/rarefindsFyp"
    },
    {
      id: 4,
      title: "Portfolio Web",
      description: "The Resume Portfolio Web Application is a modern, dynamic platform designed to showcase my professional profile, skills, and projects in a sleek and interactive manner.",
      technologies: ["React.js", "Three.js for 3D graphics","Tailwind CSS", "EmailJs", "Netlify"],
      image: pwImage,
      link: "https://github.com/hashkhan0/Hashir-s-Portfolio_Web",
      demo: "https://hashirsportfolio.netlify.app"
    },
    {
      id: 5,
      title: "Healthcare",
      description: "HealthCare, your one-stop destination for all your health care needs.",
      technologies: ["Html", "CSS","Javascript"],
      image: HealthcareImage,
      link: "https://github.com/umairsattar142/Healthcare-Website?tab=readme-ov-file",
      demo: "https://healthcare-mini-web.netlify.app/"
    }
  ];

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasElement.appendChild(renderer.domElement);
    
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4169e1,
      wireframe: true
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);
    camera.position.z = 7;
    
    const animate = () => {
      requestAnimationFrame(animate);
      icosahedron.rotation.x += 0.002;
      icosahedron.rotation.y += 0.003;
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
      canvasElement.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const navigateToProject = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };
  
  const nextProject = () => navigateToProject((currentIndex + 1) % projects.length);
  
  const prevProject = () => navigateToProject((currentIndex - 1 + projects.length) % projects.length);

  const handleTouchStart = (e) => {
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
  };

  const getVisibleProjects = () => {
    const visibleProjects = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + projects.length) % projects.length;
      visibleProjects.push({
        project: projects[index],
        position: i
      });
    }
    return visibleProjects;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <div ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 flex flex-col h-full">
        <div className="py-4">
          <h1 className="text-3xl font-bold mb-1 pt-12 text-center">Projects</h1>
          <p className="text-base text-center text-gray-300 mb-2">
            A selection of my recent work
          </p>
        </div>
        
        <div 
          className="flex-grow flex items-center justify-center"
          ref={carouselRef}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full flex justify-center">
            {getVisibleProjects().map(({ project, position }) => (
              <div 
                key={project.id}
                className={`transform transition-all duration-500 ease-in-out w-full max-w-md mx-2 ${
                  position === -1 ? '-translate-x-full opacity-30 scale-90' : 
                  position === 1 ? 'translate-x-full opacity-30 scale-90' : 
                  'z-10'
                }`}
                style={{
                  position: position === 0 ? 'relative' : 'absolute'
                }}
              >
                <div className="bg-gray-800 bg-opacity-80 rounded-lg overflow-hidden shadow-xl h-full flex flex-col">
                  <div className="h-40 bg-gray-700 flex items-center justify-center">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-gray-400 mb-1">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 text-xs bg-blue-900 text-blue-200 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-auto">
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition-colors"
                      >
                        View Code
                      </a>
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs font-medium transition-colors"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="py-4 flex justify-center items-center space-x-4">
          <button 
            onClick={prevProject}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-1">
            {projects.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'}`}
                onClick={() => navigateToProject(index)}
              />
            ))}
          </div>
          <button 
            onClick={nextProject}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-xl mb-2">
            Want to see more of my work?
          </p>
          <a 
            href="https://github.com/umairsattar142"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;