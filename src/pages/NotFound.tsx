import React, { useEffect, useRef } from "react";
// Assuming you are using react-router-dom, but if not, you can remove this import.
// If you are not using it, you'll need to pass the path some other way or remove the logging.
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const canvasRef = useRef(null);

  // Log the non-existent route to the console
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Effect for the animated DNA background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let resizeTimeout;

    const setup = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Set initial size
    setup();
    
    // Handle window resize
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setup, 100);
    }

    window.addEventListener('resize', handleResize);

    const dnaChars = "ATCG";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    const draw = () => {
      // Set a semi-transparent background to create the fading trail effect
      ctx.fillStyle = "rgba(17, 24, 39, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#facc15"; // Yellow color for the DNA letters
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = dnaChars.charAt(Math.floor(Math.random() * dnaChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop to the top randomly to make the rain effect uneven
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function to stop the animation and remove event listener
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect to load Google Sans font
  useEffect(() => {
    const link = document.createElement('link');
    // Note: 'Google Sans' is not a standard font on Google Fonts. 
    // This link provides a font that is visually similar.
    link.href = 'https://fonts.googleapis.com/css?family=Google+Sans:400,500,700';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Cleanup function to remove the font link
    return () => {
        if(document.head.contains(link)) {
            document.head.removeChild(link);
        }
    }
  }, []);


  return (
    <div style={{fontFamily: "'Google Sans', sans-serif"}} className="relative flex min-h-screen items-center justify-center bg-gray-900 overflow-hidden">
      {/* Canvas for the DNA background animation */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      
      {/* Content */}
      <div className="relative z-10 text-center p-8 bg-gray-900 bg-opacity-70 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse">
          404
        </h1>
        <p className="mt-4 mb-8 text-lg md:text-xl font-bold text-gray-200">
          Oops! The page you're looking for has mutated.
        </p>
        <a 
          href="/" 
          className="inline-block px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg transition-transform transform duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900 hover:scale-105"
        >
          Return to Home Base
        </a>
      </div>
    </div>
  );
};

// If you're not using react-router-dom, you might need to export the component differently
// or wrap it in a context provider if you want to access location information.
export default NotFound;

