import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export function CTA({ onOpenAuth }: CTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div 
            className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-soft-blue to-brand-cyan animate-pulse-soft" />
            
            {/* Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-16">
              {/* Left - Text */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Start for Free</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to transform your English teaching?
                </h2>

                <p className="text-lg text-white/80 mb-8 max-w-lg">
                  Join thousands of educators and learners who are already using EnglishFlow 
                  to make language learning more effective and enjoyable.
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={() => onOpenAuth('register')}
                    className="bg-white text-brand-blue hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-xl"
                  >
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onOpenAuth('login')}
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                  >
                    Sign In
                  </Button>
                </div>

                <p className="text-sm text-white/60 mt-4">
                  No credit card required. Free plan available forever.
                </p>
              </div>

              {/* Right - Illustration */}
              <div className="hidden lg:flex justify-center">
                <img
                  src="/cta-celebration.jpg"
                  alt="Celebrate Learning"
                  className="rounded-2xl shadow-2xl max-w-md animation-float"
                />
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}
