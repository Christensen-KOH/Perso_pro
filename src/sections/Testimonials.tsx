import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'ESL Teacher',
    avatar: '/avatar-1.jpg',
    content: 'EnglishFlow has completely transformed how I organize my lessons. The CEFR-aligned structure and interactive games have made my students more engaged than ever. I can\'t imagine teaching without it now!',
    rating: 5,
    location: 'New York, USA',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Language School Director',
    avatar: '/avatar-2.jpg',
    content: 'As a school director, I needed a platform that could handle multiple teachers and track student progress effectively. EnglishFlow delivers on all fronts. The analytics dashboard is incredibly insightful.',
    rating: 5,
    location: 'Toronto, Canada',
  },
  {
    id: '3',
    name: 'Emma Williams',
    role: 'English Student',
    avatar: '/avatar-3.jpg',
    content: 'The games make learning English so much fun! I used to struggle with vocabulary, but the flashcards and matching games have helped me remember words much better. My CEFR level improved from A2 to B1 in just 3 months!',
    rating: 5,
    location: 'London, UK',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div 
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What our <span className="text-gradient">users say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied educators and learners who have transformed their English teaching and learning experience.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div 
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Card */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-card p-8 lg:p-12">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center shadow-glow">
                <Quote className="h-6 w-6 text-white" />
              </div>

              <div className="grid lg:grid-cols-[200px,1fr] gap-8 items-center">
                {/* Avatar Section */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-bg-blue shadow-soft">
                      <img
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Rating */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-brand-yellow shadow-soft">
                      <Star className="h-4 w-4 fill-yellow-600 text-yellow-600" />
                      <span className="text-sm font-bold text-yellow-800">
                        {testimonials[activeIndex].rating}.0
                      </span>
                    </div>
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testimonials[activeIndex].location}
                  </p>
                </div>

                {/* Content Section */}
                <div className="relative">
                  <p className="text-lg lg:text-xl text-foreground leading-relaxed italic">
                    "{testimonials[activeIndex].content}"
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? 'w-8 bg-brand-blue'
                          : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full hover:bg-brand-bg-blue hover:border-brand-blue"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full hover:bg-brand-bg-blue hover:border-brand-blue"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -z-10 -top-4 -left-4 w-full h-full rounded-3xl bg-brand-cyan/30" />
            <div className="absolute -z-20 -top-8 -left-8 w-full h-full rounded-3xl bg-brand-yellow/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
