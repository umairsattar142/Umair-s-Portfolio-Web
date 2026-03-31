import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ExperienceCard = ({ title, company, period, highlights, extra, last }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${!last ? 'mb-4 pb-4 border-b border-gray-700' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
        <h3 className="text-base font-medium text-blue-400">{title}</h3>
        <span className="text-gray-400 text-xs">{period}</span>
      </div>
      <p className="text-gray-300 text-sm mb-2">{company}</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs sm:text-sm">
        {highlights.map((h, i) => <li key={i}>{h}</li>)}
        {expanded && extra && extra.map((h, i) => <li key={`e${i}`}>{h}</li>)}
      </ul>
      {extra && extra.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
        >
          {expanded ? 'Show less' : `+ ${extra.length} more`}
        </button>
      )}
    </div>
  );
};

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
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">About Me</h1>

          {/* Summary - compact */}
          <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-5 md:p-6 mb-6 border border-gray-700">
            <p className="text-sm sm:text-base text-gray-200">
              Full Stack Engineer with 2 years of experience specializing in end-to-end application development, deployment, and complex problem-solving. Proven ability to architect scalable solutions, optimize system performance, and rapidly adapt to emerging technologies.
            </p>
          </div>

          {/* Experience - collapsible cards */}
          <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-5 md:p-6 mb-6 border border-gray-700">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">Experience</h2>
            <ExperienceCard
              title="Software Engineer"
              company="VaporVM – Lahore, Pakistan"
              period="Jan 2025 – Present"
              highlights={[
                "Architected and delivered an enterprise IT Asset Management (ITAM) system using .NET Core, React.js, PostgreSQL, and MongoDB.",
                "Designed and optimized RESTful APIs, enabling export of 2,000+ assets per operation and improving response times by 40%.",
                "Implemented RBAC with claims-based authorization for module- and tenant-level permissions.",
              ]}
              extra={[
                "Built an expiry-notification service with Hangfire for scheduled and recurring reminders.",
                "Enhanced bulk asset upload with row-level validation, reducing upload failures by 70%.",
                "Integrated AWS S3 for tenant-specific logo/file management.",
                "Improved application performance by 30% through front-end and back-end optimization.",
                "Ensured quality with unit, integration, and performance testing; collaborated in Agile sprints.",
              ]}
            />
            <ExperienceCard
              title="Associate Software Engineer"
              company="VentureDive – Lahore, Pakistan"
              period="Jun 2024 – Jan 2025"
              highlights={[
                "Developed backend APIs using ASP.NET Core and EF Core, following Clean Architecture and SOLID principles.",
                "Built responsive frontend components using React.js and Next.js, integrating with RESTful APIs.",
                "Designed backend services using Python (FastAPI) with database schema design and query optimization.",
              ]}
              extra={[
                "Worked with SQL Server and PostgreSQL for designing schemas and managing migrations.",
                "Created RESTful APIs with Node.js and Express with a focus on data security.",
                "Implemented state management using Redux and developed reusable, modular frontend code.",
                "Conducted unit and integration testing; collaborated in Agile sprints and code reviews.",
              ]}
            />
            <ExperienceCard
              title="Full Stack Developer Intern"
              company="INTERNNCRAFT – Lahore, Pakistan"
              period="Feb 2024 – April 2024"
              highlights={[
                "Gained hands-on experience in full-stack development using .NET Core, React.js, and MongoDB.",
                "Completed two comprehensive web projects, applying clean architecture and responsive UI principles.",
                "Integrated and optimized API endpoints, reducing latency and improving performance.",
              ]}
              last
            />
          </div>

          {/* Skills + Education + Certs in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Skills */}
            <div className="md:col-span-2 bg-white bg-opacity-10 rounded-lg shadow-xl p-5 md:p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Skills</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-blue-400 mb-1">Languages</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["C#", "JavaScript", "Python"].map(s => <span key={s} className="px-2.5 py-0.5 text-sm bg-gray-700 rounded-full border border-gray-600">{s}</span>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-400 mb-1">Technologies</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["ASP.NET Core", "EF Core", "React.js", "Angular", "MediatR", "LINQ", "Node.js"].map(s => <span key={s} className="px-2.5 py-0.5 text-sm bg-gray-700 rounded-full border border-gray-600">{s}</span>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-400 mb-1">Databases</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["PostgreSQL", "MongoDB", "MySQL"].map(s => <span key={s} className="px-2.5 py-0.5 text-sm bg-gray-700 rounded-full border border-gray-600">{s}</span>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-400 mb-1">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {["Collaboration", "Leadership", "Communication", "Problem Solving", "Adaptability"].map(s => <span key={s} className="px-2.5 py-0.5 text-sm bg-gray-700 rounded-full border border-gray-600">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Education + Certifications + Languages stacked */}
            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-5 md:p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-white">Education</h2>
                <h3 className="text-base font-medium text-blue-400">BS in Computer Science</h3>
                <p className="text-gray-300 text-sm">FAST NUCES</p>
                <p className="text-gray-400 text-sm">Aug 2020 – Dec 2024</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-5 md:p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-white">Certifications</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                  <li>CSS, JavaScript & Python Complete Course (Udemy)</li>
                  <li>Git: Become an Expert in Git & GitHub (Udemy)</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg shadow-xl p-5 md:p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-2 text-white">Languages</h2>
                <p className="text-sm text-gray-300"><span className="text-white font-medium">English:</span> Proficient</p>
                <p className="text-sm text-gray-300"><span className="text-white font-medium">Urdu:</span> Native Speaker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;