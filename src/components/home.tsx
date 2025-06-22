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
  Facebook,
  Settings,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";
import AdminDashboard from "./AdminDashboard";
import ContactForm from "./ContactForm";

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Projects data
  const projects = [
    {
      title: "Fullstack Blog App",
      description:
        "Full-stack blogging application built with Next.js, TailwindCSS, Supabase",
      tech: ["MERN"],
      stars: 156,
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

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAdminDashboardOpen(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminDashboardOpen(false);
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-gray-900"
      }`}
    >
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
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ajit"
                alt="Ajit Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-600 hover:border-gray-400 transition-colors"
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
                          href="https://github.com"
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
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-300 text-sm">
                            Facebook
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
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
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

      {/* Secret Admin Icon */}
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        title="Admin Login"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

      {/* Hero Section */}
      <section id="home" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=tim"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
            />
            <h1 className="text-5xl font-bold mb-4">Hire Ajit</h1>
            <p className="text-xl text-gray-300 mb-8">
              Frontend Developer & MERN Stack Enthusiast
            </p>

            {/* Skill Stack Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                React
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Python
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Php
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                MYSQL
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                HTML+CSS
              </Badge>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-6 transition-colors duration-300 ${
          isDarkMode ? "bg-[#1a1a1a]" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Oh Hello There!
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className={`text-lg leading-relaxed mb-6 transition-colors ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I'm Ajit Singh, a frontend-focused web developer passionate
                about clean design and practical solutions. I build responsive
                and modern websites using HTML, CSS, JavaScript, React,
                TailwindCSS, Bootstrap, and more.
              </p>
              <p
                className={`text-lg leading-relaxed mb-6 transition-colors ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I also have backend experience with PHP, MySQL, and PostgreSQL,
                and a strong foundation in Python. I'm currently learning the
                MERN stack to become a full-stack developer.
              </p>
              <p
                className={`text-lg leading-relaxed transition-colors ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                From creating engaging UIs to working with databases, I enjoy
                transforming ideas into working web projects. I'm actively
                building real-world applications and constantly improving my
                skills.
              </p>
            </div>

            {/* Image Collage */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
                alt="About me 1"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&q=80"
                alt="About me 2"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80"
                alt="About me 3"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80"
                alt="About me 4"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
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
                            ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                            : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                        }`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        className={`transition-colors ${
                          isDarkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        Learn More
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
