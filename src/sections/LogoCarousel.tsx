import { useRef, useEffect, useState } from 'react';

const partners = [
  { name: 'Cambridge', logo: 'Cambridge' },
  { name: 'Oxford', logo: 'Oxford' },
  { name: 'British Council', logo: 'British Council' },
  { name: 'IELTS', logo: 'IELTS' },
  { name: 'TOEFL', logo: 'TOEFL' },
  { name: 'Pearson', logo: 'Pearson' },
  { name: 'Macmillan', logo: 'Macmillan' },
  { name: 'National Geographic', logo: 'Nat Geo' },
];

export function LogoCarousel() {
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
    <section ref={sectionRef} className="py-16 bg-background overflow-hidden">
      {/* Top Border Animation */}
      <div className="relative h-px mb-12 overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent transition-all duration-1000 ${
            isVisible ? 'w-full' : 'w-0'
          }`}
        />
      </div>

      <div className="section-padding">
        <p 
          className={`text-center text-muted-foreground mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Trusted by language schools and educators worldwide
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Logos */}
        <div className="flex animation-marquee hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <div className="group relative">
                <div className="px-8 py-4 rounded-xl bg-muted/50 border border-border/50 transition-all duration-300 group-hover:bg-muted group-hover:border-brand-blue/30 group-hover:shadow-soft">
                  <span className="text-xl font-display font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {partner.logo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Border Animation */}
      <div className="relative h-px mt-12 overflow-hidden">
        <div 
          className={`absolute inset-y-0 right-0 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent transition-all duration-1000 delay-300 ${
            isVisible ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </section>
  );
}
