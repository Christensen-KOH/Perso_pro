import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { LogoCarousel } from './sections/LogoCarousel';
import { Features } from './sections/Features';
import { Courses } from './sections/Courses';
import { GameZone } from './sections/GameZone';
import { Testimonials } from './sections/Testimonials';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { LessonOrganizer } from './sections/LessonOrganizer';
import { TeacherDashboard } from './sections/TeacherDashboard';
import { StudentDashboard } from './sections/StudentDashboard';
import { ESLGames } from './sections/ESLGames';
import { AuthModal } from './components/AuthModal';
import { Toaster } from './components/ui/sonner';
import './App.css';

export type View = 'home' | 'courses' | 'games' | 'lesson-organizer' | 'teacher-dashboard' | 'student-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg-blue">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-brand-dark-blue font-medium">Loading EnglishFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Navigation 
            currentView={currentView}
            onNavigate={handleNavigation}
            onOpenAuth={openAuthModal}
          />
          
          <main>
            {currentView === 'home' && (
              <>
                <Hero onNavigate={handleNavigation} onOpenAuth={openAuthModal} />
                <LogoCarousel />
                <Features />
                <Courses onNavigate={handleNavigation} />
                <GameZone onNavigate={handleNavigation} />
                <Testimonials />
                <CTA onOpenAuth={openAuthModal} />
              </>
            )}
            {currentView === 'courses' && <Courses onNavigate={handleNavigation} fullPage />}
            {currentView === 'games' && <ESLGames />}
            {currentView === 'lesson-organizer' && <LessonOrganizer />}
            {currentView === 'teacher-dashboard' && <TeacherDashboard />}
            {currentView === 'student-dashboard' && <StudentDashboard />}
          </main>

          {currentView === 'home' && <Footer onNavigate={handleNavigation} />}
          
          <AuthModal 
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            mode={authMode}
            onModeChange={setAuthMode}
          />
          
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
