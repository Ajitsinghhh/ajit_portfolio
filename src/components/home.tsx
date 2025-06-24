import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Github,
  ExternalLink,
  Star,
  Mail,
  Twitter,
  Linkedin,
  Music,
  VolumeX,
  Sun,
  Moon,
  Menu,
  X,
  User,
  FileText,
  MessageCircle,
  Activity,
  Settings,
  GraduationCap,
  Briefcase,
  Code,
  Calendar,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import ContactForm from "./ContactForm";

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);

  // Particles initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // Particles loaded callback
    },
    [],
  );

  // Projects data
  const projects = [
    {
      title: "Fullstack Blog App",
      description:
        "Full-stack blogging application built with Next.js, TailwindCSS, Supabase",
      tech: ["MERN"],
      stars: 0,
      badges: ["Next.js", "TailwindCSS", "Supabase"],
      images: [
        "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=800&q=80",
      ],
    },
    {
      title: "Portfolio App 2.0",
      description:
        "This portfolio built with Svelte and SvelteKit. Components, uses MJML, Resend, and Contentful for smooth offline and online syncing.",
      tech: ["Others"],
      stars: 89,
      badges: ["Svelte", "SvelteKit", "MJML", "Contentful"],
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&q=80",
      ],
    },
    {
      title: "Mongol Food App",
      description:
        "Discover the best Mongolian cuisine, restaurants, and travel tips—all in one app.",
      tech: ["Others"],
      stars: 42,
      badges: ["React Native", "Firebase", "Maps API"],
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80",
      ],
    },
  ];

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle music modal
  const toggleMusic = () => {
    setIsSpotifyModalOpen(!isSpotifyModalOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
  };

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom cursor with trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add new trail point
      const newTrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      };

      setTrail((prevTrail) => {
        const newTrail = [newTrailPoint, ...prevTrail.slice(0, 15)];
        return newTrail;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Clean up trail points periodically
    const trailCleanup = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(0, 12));
    }, 50);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(trailCleanup);
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 cursor-none ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
      </div>

      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: point.x - 1,
            top: point.y - 1,
            opacity: Math.max(0, 1 - index * 0.08),
            transform: `scale(${Math.max(0.1, 1 - index * 0.06)})`,
          }}
        >
          <div
            className="w-0.5 h-0.5 rounded-full"
            style={{
              background: isDarkMode
                ? `rgba(59, 130, 246, ${Math.max(0, 0.8 - index * 0.05)})`
                : `rgba(239, 68, 68, ${Math.max(0, 0.8 - index * 0.05)})`,
              boxShadow: isDarkMode
                ? `0 0 ${Math.max(2, 8 - index)}px rgba(59, 130, 246, ${Math.max(0, 0.6 - index * 0.04)})`
                : `0 0 ${Math.max(2, 8 - index)}px rgba(239, 68, 68, ${Math.max(0, 0.6 - index * 0.04)})`,
            }}
          />
        </div>
      ))}
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto">
        <source
          src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Enhanced Sticky Navigation */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#0f0f0f]/90 border-gray-800"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Profile */}
            <div className="flex items-center space-x-3">
              <img
                src="/images/WhatsApp Image 2025-06-23 at 21.02.39.jpeg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-gray-400 transition-colors object-cover"
              />
              <span
                className={`font-bold text-lg transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ajit
              </span>
            </div>

            {/* Center: Navigation Links (Hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", id: "home" },
                { name: "Projects", id: "projects" },
                { name: "Blog", id: "blog" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:border-b-2 hover:border-white"
                      : "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* About Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  className={`font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:border-b-2 hover:border-white"
                      : "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
                  }`}
                >
                  About
                </button>

                {/* Dropdown Menu */}
                {isAboutDropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-[#111] rounded-xl shadow-2xl border border-gray-800 p-6 transition-all duration-300 z-50"
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column - Navigation Links */}
                      <div className="space-y-4">
                        <div
                          className="p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                          onClick={() => scrollToSection("about")}
                        >
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-blue-400" />
                            <div>
                              <div className="font-semibold text-white">
                                About Me
                              </div>
                              <div className="text-sm text-gray-400">
                                Background and experience
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-green-400" />
                            <div>
                              <div className="font-semibold text-white">
                                Resume
                              </div>
                              <div className="text-sm text-gray-400">
                                View my resume
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                          onClick={() => scrollToSection("contact")}
                        >
                          <div className="flex items-center space-x-3">
                            <MessageCircle className="w-5 h-5 text-purple-400" />
                            <div>
                              <div className="font-semibold text-white">
                                Contact
                              </div>
                              <div className="text-sm text-gray-400">
                                Contact me
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Social Links */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white mb-3">
                          Connect
                        </h4>

                        <a
                          href="https://strava.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Activity className="w-4 h-4 text-orange-400" />
                          <span className="text-gray-300 text-sm">Strava</span>
                        </a>

                        <a
                          href="mailto:ajitsinghpanwar2004@gmail.com"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-red-400" />
                          <span className="text-gray-300 text-sm">Email</span>
                        </a>

                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm">
                            X (Twitter)
                          </span>
                        </a>

                        <a
                          href="https://github.com/Ajitsinghhh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Github className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">GitHub</span>
                        </a>

                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-300 text-sm">
                            LinkedIn
                          </span>
                        </a>

                        <a
                          href="https://www.instagram.com/ajitsing_hh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 text-pink-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span className="text-gray-300 text-sm">
                            Instagram
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Controls & Social Icons */}
            <div className="flex items-center space-x-4">
              {/* Music Toggle */}
              <button
                onClick={toggleMusic}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                title="Open Spotify Playlist"
              >
                <Music className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-full transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden border-t transition-colors ${
                isDarkMode
                  ? "border-gray-800 bg-[#0f0f0f]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { name: "Home", id: "home" },
                  { name: "About", id: "about" },
                  { name: "Projects", id: "projects" },
                  { name: "Blog", id: "blog" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spotify Modal */}
      {isSpotifyModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setIsSpotifyModalOpen(false)}
        >
          <div
            className="bg-[#121212] rounded-xl p-6 shadow-xl w-full max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSpotifyModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="mt-4">
              <h3 className="text-white text-xl font-semibold mb-4">
                My Playlist
              </h3>
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/5KQ0LaEFEkTgxkYTIkmazb?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="relative py-20 px-6 min-h-screen flex items-center overflow-hidden"
      >
        {/* Particles Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          className="absolute inset-0 z-0"
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: isDarkMode
                  ? ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
                  : ["#1e40af", "#7c3aed", "#0891b2", "#059669", "#d97706"],
              },
              links: {
                color: isDarkMode ? "#3b82f6" : "#1e40af",
                distance: 150,
                enable: true,
                opacity: isDarkMode ? 0.2 : 0.4,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: isDarkMode ? 0.5 : 0.7,
                random: {
                  enable: true,
                  minimumValue: isDarkMode ? 0.1 : 0.3,
                },
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: isDarkMode ? 0.1 : 0.3,
                  sync: false,
                },
              },
              shape: {
                type: ["circle", "triangle", "polygon"],
                options: {
                  polygon: {
                    sides: 6,
                  },
                },
              },
              size: {
                value: { min: 1, max: 5 },
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 0.1,
                  sync: false,
                },
              },
            },
            detectRetina: true,
          }}
        />

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.img
              src="/images/WhatsApp Image 2025-06-23 at 21.02.39.jpeg"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl border-4 border-blue-500/30 object-cover"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
              }}
            />

            <motion.h1
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Ajit Singh Panwar
            </motion.h1>

            <motion.p
              className="text-2xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Frontend Developer & MERN Stack Enthusiast
            </motion.p>

            {/* Animated Skill Stack Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { name: "React", color: "from-cyan-400 to-cyan-600" },
                { name: "Python", color: "from-green-400 to-green-600" },
                { name: "PHP", color: "from-purple-400 to-purple-600" },
                { name: "MySQL", color: "from-blue-400 to-blue-600" },
                { name: "HTML+CSS", color: "from-orange-400 to-orange-600" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                  }}
                >
                  <Badge
                    variant="secondary"
                    className={`bg-gradient-to-r ${skill.color} text-white border-0 px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  >
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Floating Call-to-Action */}
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 bg-transparent text-white rounded-full font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {[
            { code: "</>", x: "10%", y: "20%", delay: 2 },
            { code: "{ }", x: "85%", y: "30%", delay: 2.5 },
            { code: "( )", x: "15%", y: "70%", delay: 3 },
            { code: "[ ]", x: "80%", y: "75%", delay: 3.5 },
            { code: "=>", x: "5%", y: "50%", delay: 4 },
            { code: "&&", x: "90%", y: "60%", delay: 4.5 },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl font-mono text-blue-400/20 select-none"
              style={{ left: item.x, top: item.y }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [-10, 10, -10],
              }}
              transition={{
                opacity: { duration: 1, delay: item.delay },
                scale: { duration: 1, delay: item.delay },
                rotate: { duration: 1, delay: item.delay },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                },
              }}
            >
              {item.code}
            </motion.div>
          ))}
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-6 transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1a1a]" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="space-y-20">
            {/* About Me Section */}
            <motion.div
              className={`rounded-2xl p-8 shadow-xl ${
                isDarkMode
                  ? "bg-[#0f0f0f] border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-blue-500 mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">About Me</h3>
              </div>
              <motion.p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Hi, I'm Ajit Singh, a passionate frontend-focused web developer
                with a keen eye for clean design and practical solutions. I
                specialize in building responsive and modern websites using
                cutting-edge technologies. My journey in web development has
                been driven by curiosity and a constant desire to learn and
                grow. I'm currently expanding my skills to become a full-stack
                developer, combining my frontend expertise with backend
                technologies to create comprehensive web solutions.
              </motion.p>
            </motion.div>

            {/* Education Section - Stage Journey */}
            <motion.div
              className={`rounded-2xl p-8 shadow-xl overflow-hidden relative ${
                isDarkMode
                  ? "bg-[#0f0f0f] border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mr-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Education Journey</h3>
              </div>

              {/* Stage Journey Layout */}
              <div className="relative">
                {/* Journey Path */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full opacity-30"></div>

                {/* Education Milestones */}
                <div className="space-y-12">
                  {/* BCA Stage - Now at top */}
                  <motion.div
                    className="relative flex items-center"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg z-10"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white font-bold text-lg">💻</span>
                    </motion.div>
                    <motion.div
                      className={`ml-8 p-6 rounded-xl shadow-lg flex-1 ${
                        isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                      }`}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-bold text-xl mb-2 text-blue-400">
                        Bachelor of Computer Applications (BCA)
                      </h4>
                      <p
                        className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Modern College, Pune (Pune University)
                      </p>
                      <p
                        className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        2022 - 2025
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Currently Pursuing
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Schooling Stage - Now at bottom */}
                  <motion.div
                    className="relative flex items-center"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white font-bold text-lg">🎓</span>
                    </motion.div>
                    <motion.div
                      className={`ml-8 p-6 rounded-xl shadow-lg flex-1 ${
                        isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                      }`}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-bold text-xl mb-2 text-green-400">
                        Completed Schooling
                      </h4>
                      <p
                        className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Rajasthan Board
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Foundation Stage Complete
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 10}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Section - Updated to match Education style */}
            <motion.div
              className={`rounded-2xl p-8 shadow-xl overflow-hidden relative ${
                isDarkMode
                  ? "bg-[#0f0f0f] border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mr-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Experience Journey</h3>
              </div>

              {/* Experience Journey Layout */}
              <div className="relative">
                {/* Journey Path */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-indigo-500 to-pink-500 rounded-full opacity-30"></div>

                {/* Experience Milestones */}
                <div className="space-y-12">
                  {/* Freelance Experience */}
                  <motion.div
                    className="relative flex items-center"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white font-bold text-lg">💼</span>
                    </motion.div>
                    <motion.div
                      className={`ml-8 p-6 rounded-xl shadow-lg flex-1 ${
                        isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                      }`}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-bold text-xl mb-2 text-purple-400">
                        Freelance
                      </h4>
                      <p
                        className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Immerse
                      </p>
                      <p
                        className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        May(2025) - Present
                      </p>
                      <p
                        className={`mt-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        Working as a freelance
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Currently Active
                        </span>
                      </div>
                      <a
                        href="https://instagram.com/immerse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-purple-500 hover:text-purple-400 transition-colors"
                      >
                        <span className="mr-1">Follow Immerse</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${15 + i * 15}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Section - Bridge Layout */}
            <motion.div
              className={`rounded-2xl p-8 shadow-xl overflow-hidden relative ${
                isDarkMode
                  ? "bg-[#0f0f0f] border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 mr-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Skills Bridge</h3>
              </div>

              {/* Bridge Container */}
              <div className="relative min-h-[300px] flex flex-col justify-center">
                {/* Bridge Structure */}
                <div className="relative">
                  {/* Bridge Base */}
                  <div
                    className={`h-4 rounded-full mx-8 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
                        : "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"
                    }`}
                  ></div>

                  {/* Bridge Pillars */}
                  <div className="absolute -top-8 left-8 w-2 h-12 bg-gradient-to-b from-gray-500 to-gray-600 rounded-t-full"></div>
                  <div className="absolute -top-8 right-8 w-2 h-12 bg-gradient-to-b from-gray-500 to-gray-600 rounded-t-full"></div>

                  {/* Skills on Bridge */}
                  <div className="absolute -top-16 left-0 right-0 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                      {[
                        {
                          name: "React",
                          icon: "⚛️",
                          color: "from-cyan-400 to-cyan-600",
                        },
                        {
                          name: "HTML",
                          icon: "🌐",
                          color: "from-orange-400 to-orange-600",
                        },
                        {
                          name: "CSS",
                          icon: "🎨",
                          color: "from-blue-400 to-blue-600",
                        },
                        {
                          name: "JavaScript",
                          icon: "⚡",
                          color: "from-yellow-400 to-yellow-600",
                        },
                        {
                          name: "PHP",
                          icon: "🐘",
                          color: "from-purple-400 to-purple-600",
                        },
                        {
                          name: "PostgreSQL",
                          icon: "🗄️",
                          color: "from-blue-500 to-blue-700",
                        },
                        {
                          name: "Python",
                          icon: "🐍",
                          color: "from-green-400 to-green-600",
                        },
                        {
                          name: "TailwindCSS",
                          icon: "💨",
                          color: "from-teal-400 to-teal-600",
                        },
                        {
                          name: "Bootstrap",
                          icon: "🅱️",
                          color: "from-indigo-400 to-indigo-600",
                        },
                      ].map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="group relative"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl shadow-lg cursor-pointer relative overflow-hidden`}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
                            }}
                            animate={{
                              boxShadow: [
                                "0 0 0px rgba(59, 130, 246, 0)",
                                "0 0 15px rgba(59, 130, 246, 0.3)",
                                "0 0 0px rgba(59, 130, 246, 0)",
                              ],
                            }}
                            transition={{
                              boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              },
                              scale: { type: "spring", stiffness: 300 },
                            }}
                          >
                            <span className="relative z-10">{skill.icon}</span>

                            {/* Glow Effect */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20"
                              animate={{
                                opacity: [0, 0.1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2,
                              }}
                            />
                          </motion.div>

                          {/* Skill Name Tooltip */}
                          <motion.div
                            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
                              isDarkMode
                                ? "bg-gray-800 text-white"
                                : "bg-gray-700 text-white"
                            }`}
                            initial={{ y: 10 }}
                            whileHover={{ y: 0 }}
                          >
                            {skill.name}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Tech Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Bridge Reflection */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-2 rounded-full opacity-20 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600"
                      : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
                  }`}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Projects
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", "MERN", "WordPress", "Shopify", "Others"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === filter
                    ? "bg-blue-500 text-white"
                    : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-16">
            {projects
              .filter(
                (project) =>
                  activeFilter === "All" || project.tech.includes(activeFilter),
              )
              .map((project, index) => (
                <Card
                  key={index}
                  className={`shadow-xl hover:shadow-2xl transition-shadow ${
                    isDarkMode
                      ? "bg-[#1a1a1a] border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle
                        className={`text-2xl transition-colors ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span
                          className={`transition-colors ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {project.stars}
                        </span>
                      </div>
                    </div>
                    <CardDescription
                      className={`transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.badges.map((badge, badgeIndex) => (
                        <Badge
                          key={badgeIndex}
                          variant="outline"
                          className="border-blue-500 text-blue-400"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {project.images.length === 1 ? (
                      <img
                        src={project.images[0]}
                        alt={`${project.title} Screenshot`}
                        className="w-full rounded-lg mb-6 shadow-lg"
                      />
                    ) : (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`${project.title} Screenshot ${imgIndex + 1}`}
                            className="rounded-lg shadow-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        variant="secondary"
                        className={`transition-colors ${
                          isDarkMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        🔗 Live Link
                      </Button>
                      <Button
                        variant="outline"
                        className={`transition-colors ${
                          isDarkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        💻 GitHub Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm isDarkMode={isDarkMode} />

      {/* Footer */}
      <footer
        className={`py-16 px-6 border-t transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#1a1a1a] border-gray-800"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                <a
                  href="#home"
                  className={`block transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#blog"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* GitHub Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">GitHub Stats</h3>
              <div
                className={`space-y-2 transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              ></div>
            </div>
          </div>

          <div
            className={`border-t mt-8 pt-8 text-center transition-colors ${
              isDarkMode
                ? "border-gray-800 text-gray-400"
                : "border-gray-200 text-gray-600"
            }`}
          >
            <p>&copy; 2024 Ajit Singh. Built with React & TailwindCSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
