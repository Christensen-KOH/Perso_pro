import { useState, useRef, useEffect } from 'react';
import type { View } from '@/App';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';
import type { Course, CEFRLevel, AgeGroup } from '@/types';

interface CoursesProps {
  onNavigate: (view: View) => void;
  fullPage?: boolean;
}

const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const ageGroups: AgeGroup[] = ['kids', 'teens', 'adults'];

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'English for Kids Starter',
    description: 'A fun and engaging introduction to English for young learners aged 5-8.',
    cefrLevel: 'A1',
    ageGroup: 'kids',
    duration: '12 weeks',
    coverImage: '/course-kids.jpg',
    tags: ['beginner', 'vocabulary', 'speaking'],
    skills: ['speaking', 'listening', 'vocabulary'],
    lessonsCount: 24,
    studentsCount: 1250,
    rating: 4.8,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Teen English Accelerator',
    description: 'Boost your English skills with topics that matter to teenagers.',
    cefrLevel: 'A2',
    ageGroup: 'teens',
    duration: '16 weeks',
    coverImage: '/course-teens.jpg',
    tags: ['intermediate', 'grammar', 'conversation'],
    skills: ['speaking', 'grammar', 'reading'],
    lessonsCount: 32,
    studentsCount: 890,
    rating: 4.7,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Business English Pro',
    description: 'Master professional English for the workplace and corporate communication.',
    cefrLevel: 'B1',
    ageGroup: 'adults',
    duration: '20 weeks',
    coverImage: '/course-business.jpg',
    tags: ['business', 'professional', 'writing'],
    skills: ['writing', 'speaking', 'vocabulary'],
    lessonsCount: 40,
    studentsCount: 2100,
    rating: 4.9,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'IELTS Exam Preparation',
    description: 'Comprehensive preparation for the IELTS exam with practice tests.',
    cefrLevel: 'B2',
    ageGroup: 'adults',
    duration: '24 weeks',
    coverImage: '/course-exam.jpg',
    tags: ['exam', 'academic', 'test-prep'],
    skills: ['reading', 'writing', 'listening', 'speaking'],
    lessonsCount: 48,
    studentsCount: 3400,
    rating: 4.8,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Advanced Conversation',
    description: 'Develop fluency and confidence in English conversations.',
    cefrLevel: 'C1',
    ageGroup: 'adults',
    duration: '16 weeks',
    coverImage: '/course-adults.jpg',
    tags: ['advanced', 'speaking', 'fluency'],
    skills: ['speaking', 'listening'],
    lessonsCount: 32,
    studentsCount: 650,
    rating: 4.9,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function Courses({ onNavigate, fullPage = false }: CoursesProps) {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');
  const [selectedAge, setSelectedAge] = useState<AgeGroup | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredCourses = mockCourses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.cefrLevel === selectedLevel;
    const matchesAge = selectedAge === 'all' || course.ageGroup === selectedAge;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesAge && matchesSearch;
  });

  const getCEFRColor = (level: CEFRLevel) => {
    const colors: Record<CEFRLevel, string> = {
      A1: 'bg-green-500',
      A2: 'bg-lime-500',
      B1: 'bg-yellow-500',
      B2: 'bg-orange-500',
      C1: 'bg-red-500',
      C2: 'bg-red-700',
    };
    return colors[level];
  };

  return (
    <section 
      ref={sectionRef} 
      className={`${fullPage ? 'pt-28 pb-16' : 'py-24'} bg-background`}
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Browse by <span className="text-gradient">Category</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Discover courses tailored to your level, age group, and learning goals.
              </p>
            </div>
            
            {!fullPage && (
              <Button
                onClick={() => onNavigate('courses')}
                variant="outline"
                className="w-fit rounded-xl border-brand-blue text-brand-blue hover:bg-brand-bg-blue"
              >
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters */}
          <div 
            className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as CEFRLevel | 'all')}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all cursor-pointer"
              >
                <option value="all">All Levels</option>
                {cefrLevels.map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Age Filter */}
            <div className="relative">
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value as AgeGroup | 'all')}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all cursor-pointer capitalize"
              >
                <option value="all">All Ages</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* CEFR Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold ${getCEFRColor(course.cefrLevel)}`}>
                    {course.cefrLevel}
                  </div>
                  
                  {/* Age Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 text-xs font-medium capitalize">
                    {course.ageGroup}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessonsCount} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.studentsCount}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-brand-blue hover:bg-brand-dark-blue rounded-xl"
                    onClick={() => toast.info('Course details coming soon!')}
                  >
                    Explore Course
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
