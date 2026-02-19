import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import type { View } from '@/App';
import { ArrowRight, Play, BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';

interface HeroProps {
  onNavigate: (view: View) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export function Hero({ onNavigate, onOpenAuth }: HeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      imageRef.current.style.transform = `
        perspective(1000px)
        rotateY(${xPercent * 5}deg)
        rotateX(${-yPercent * 5}deg)
        translateY(${Math.sin(Date.now() / 1000) * 5}px)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTeacherLogin = () => {
    onOpenAuth('login');
    toast.info('Teacher login coming soon!', {
      description: 'Use demo credentials to explore the platform.',
    });
  };

  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-brand-yellow/30 animation-float" />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-brand-pink/30 animation-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-brand-cyan/40 animation-float" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-lg bg-brand-blue/20 rotate-45 animation-float-delayed" />
      </div>

      <div className="relative section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
            {/* Left Content */}
            <div className="flex flex-col gap-8 pt-8 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-brand-blue/20 w-fit shadow-soft">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-sm font-medium text-brand-dark-blue">
                  Trusted by 10,000+ educators worldwide
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Learn English{' '}
                <span className="text-gradient">Smarter.</span>
                <br />
                Teach English{' '}
                <span className="text-gradient">Better.</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                The all-in-one platform for ESL educators and learners. Organize lessons, 
                play interactive games, and track progress effortlessly.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('courses')}
                  className="bg-brand-blue hover:bg-brand-dark-blue text-white px-8 py-6 text-lg rounded-xl shadow-glow hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('games')}
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-bg-blue px-8 py-6 text-lg rounded-xl transition-all hover:-translate-y-0.5"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Playing
                </Button>
                
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={handleTeacherLogin}
                  className="text-muted-foreground hover:text-foreground px-8 py-6 text-lg rounded-xl"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Teacher Login
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <p className="text-3xl font-display font-bold text-brand-blue">500+</p>
                  <p className="text-sm text-muted-foreground">Interactive Lessons</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-brand-blue">50+</p>
                  <p className="text-sm text-muted-foreground">ESL Games</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-brand-blue">10k+</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div 
              ref={imageRef}
              className="relative flex items-center justify-center lg:justify-end transition-transform duration-200 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-soft-blue/20 rounded-3xl blur-3xl scale-110" />
                
                {/* Main Image */}
                <img
                  src="/hero-main.jpg"
                  alt="English Learning Platform"
                  className="relative rounded-3xl shadow-2xl w-full max-w-lg lg:max-w-xl animation-pulse-soft"
                />
                
                {/* Floating Cards */}
                <div className="absolute -left-8 top-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4 animation-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <span className="text-brand-green text-lg">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lesson Completed!</p>
                      <p className="text-xs text-muted-foreground">+50 XP earned</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 bottom-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4 animation-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-yellow/30 flex items-center justify-center">
                      <span className="text-xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Achievement!</p>
                      <p className="text-xs text-muted-foreground">Vocabulary Master</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
}
