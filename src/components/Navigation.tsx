import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { View } from '@/App';
import {
  Menu,
  Sun,
  Moon,
  Monitor,
  User,
  LogOut,
  ChevronDown,
  BookOpen,
  Gamepad2,
  LayoutDashboard,
  GraduationCap,
  Home,
} from 'lucide-react';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export function Navigation({ currentView, onNavigate, onOpenAuth }: NavigationProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' as View, icon: Home },
    { label: 'Courses', view: 'courses' as View, icon: BookOpen },
    { label: 'Games', view: 'games' as View, icon: Gamepad2 },
  ];

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'teacher':
        return { label: 'Teacher Dashboard', view: 'teacher-dashboard' as View, icon: LayoutDashboard };
      case 'student':
        return { label: 'Student Dashboard', view: 'student-dashboard' as View, icon: GraduationCap };
      case 'admin':
        return { label: 'Teacher Dashboard', view: 'teacher-dashboard' as View, icon: LayoutDashboard };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-soft-blue flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-bold text-xl">E</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              EnglishFlow
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === link.view
                    ? 'text-brand-blue bg-brand-bg-blue'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
            {dashboardLink && (
              <button
                onClick={() => onNavigate(dashboardLink.view)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === dashboardLink.view
                    ? 'text-brand-blue bg-brand-bg-blue'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {dashboardLink.label}
              </button>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                >
                  {resolvedTheme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-brand-bg-blue flex items-center justify-center">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-brand-blue" />
                      )}
                    </div>
                    <span className="hidden sm:inline">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {dashboardLink && (
                    <DropdownMenuItem onClick={() => onNavigate(dashboardLink.view)}>
                      <dashboardLink.icon className="mr-2 h-4 w-4" />
                      {dashboardLink.label}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onNavigate('home')}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => onOpenAuth('login')}
                  className="rounded-lg"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => onOpenAuth('register')}
                  className="bg-brand-blue hover:bg-brand-dark-blue rounded-lg"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.view}
                      onClick={() => {
                        onNavigate(link.view);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        currentView === link.view
                          ? 'text-brand-blue bg-brand-bg-blue'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </button>
                  ))}
                  {dashboardLink && (
                    <button
                      onClick={() => {
                        onNavigate(dashboardLink.view);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        currentView === dashboardLink.view
                          ? 'text-brand-blue bg-brand-bg-blue'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <dashboardLink.icon className="h-5 w-5" />
                      {dashboardLink.label}
                    </button>
                  )}
                  
                  {!isAuthenticated && (
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          onOpenAuth('login');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full rounded-lg"
                      >
                        Log in
                      </Button>
                      <Button
                        onClick={() => {
                          onOpenAuth('register');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-brand-blue hover:bg-brand-dark-blue rounded-lg"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
