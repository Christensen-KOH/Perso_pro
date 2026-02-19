import { useState, useRef, useEffect } from 'react';
import { Check, BookOpen, Gamepad2, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    id: 'organize',
    title: 'Organize Lessons',
    description: 'Create structured courses with CEFR-aligned content. Manage programs, classes, and materials all in one place.',
    icon: BookOpen,
    image: '/feature-organize.jpg',
    benefits: [
      'Drag-and-drop lesson builder',
      'CEFR level tracking',
      'Resource library integration',
      'Google Drive sync',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'games',
    title: 'Play & Learn',
    description: 'Engage students with interactive ESL games. From vocabulary challenges to grammar quizzes, learning becomes fun.',
    icon: Gamepad2,
    image: '/feature-games.jpg',
    benefits: [
      '50+ interactive games',
      'Multiplayer classroom mode',
      'Real-time leaderboards',
      'Adaptive difficulty',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'track',
    title: 'Track Progress',
    description: 'Monitor student performance with detailed analytics. Identify weak areas and celebrate achievements.',
    icon: BarChart3,
    image: '/feature-track.jpg',
    benefits: [
      'Detailed progress reports',
      'Skill-based analytics',
      'Attendance tracking',
      'Export to PDF/Excel',
    ],
    color: 'from-green-500 to-emerald-500',
  },
];

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-bg-blue mb-6">
              <Sparkles className="h-4 w-4 text-brand-blue" />
              <span className="text-sm font-medium text-brand-dark-blue">Powerful Features</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything you need to{' '}
              <span className="text-gradient">teach and learn</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit for ESL educators and learners, designed to make language learning effective and enjoyable.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeFeature === index
                      ? 'border-brand-blue bg-brand-bg-blue/50 shadow-glow'
                      : 'border-transparent bg-muted/50 hover:bg-muted hover:border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      
                      {/* Benefits - Only show for active */}
                      <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${
                        activeFeature === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                      }`}>
                        {feature.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-brand-green flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Image Stack */}
            <div 
              ref={imageContainerRef}
              className="relative lg:sticky lg:top-32"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      activeFeature === index
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-95 rotate-3'
                    }`}
                    style={{
                      transformOrigin: 'center center',
                      transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}

                {/* Feature Indicator */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeFeature === index
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl bg-brand-cyan/30" />
              <div className="absolute -z-20 -top-8 -right-8 w-full h-full rounded-3xl bg-brand-yellow/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
