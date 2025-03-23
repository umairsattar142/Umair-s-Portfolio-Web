import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import emailjs from 'emailjs-com'; // Import EmailJS

const Contact = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your EmailJS service ID, template ID, and user ID
    const serviceId = 'service_z9gxrgb';
    const templateId = 'template_p5s27qq';
    const userId = '4DDf4SfBvIbbVjB_Y';

    // Send form data to EmailJS
    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        setSubmitResult({
          success: true,
          message: 'Thank you! Your message has been sent.'
        });
      })
      .catch((error) => {
        setSubmitResult({
          success: false,
          message: 'Oops! Something went wrong. Please try again.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Clear message after 5 seconds
        setTimeout(() => {
          setSubmitResult({ success: false, message: '' });
        }, 5000);
      });
  };

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    const currentCanvas = canvasRef.current; // Store the current value of canvasRef
    
    if (currentCanvas) {
      currentCanvas.appendChild(renderer.domElement);
    }
  
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2a3b8f,
      wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
  
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02
    });
  
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
  
    // Camera position
    camera.position.z = 4;
  
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.002;
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
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
      if (currentCanvas) {
        currentCanvas.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div className="relative bg-gray-900 text-white" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Three.js background */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center">Get In Touch</h1>
          <p className="text-lg sm:text-xl text-center text-gray-300 mb-8 sm:mb-12">
            Have a question or want to work together?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact form */}
            <div className="bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              
              {submitResult.message && (
                <div className={`mb-6 p-4 rounded-md ${
                  submitResult.success
                    ? 'bg-green-900 bg-opacity-50 border border-green-500 text-green-200'
                    : 'bg-red-900 bg-opacity-50 border border-red-500 text-red-200'
                }`}>
                  {submitResult.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-md font-medium ${
                    isSubmitting ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'
                  } transition-colors`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact information */}
            <div>
              <div className="bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-xl mb-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Email</h3>
                      <a href="mailto:hashkhan.work@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                        usattar307@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Cell</h3>
                      <p className="text-gray-300">+92-305-7362141</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Location</h3>
                      <p className="text-gray-300">
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-xl">
                <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/umairsattar142" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                  
                  <a 
                    href="http://linkedin.com/in/umair-sattar-90917623b/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;