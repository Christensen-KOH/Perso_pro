import { useRef, useEffect, useState } from 'react';
import type { View } from '@/App';
import { Button } from '@/components/ui/button';
import { 
  Gamepad2, 
  ArrowRight, 
  Trophy, 
  Zap, 
  Target,
  Users,
  Timer
} from 'lucide-react';

interface GameZoneProps {
  onNavigate: (view: View) => void;
}

const games = [
  {
    id: 'maze-chase',
    title: 'Maze Chase',
    description: 'Navigate through mazes while collecting vocabulary words',
    icon: '🏃',
    players: '2.5k',
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 'matching',
    title: 'Word Match',
    description: 'Match words with their definitions and images',
    icon: '🧩',
    players: '3.2k',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Learn vocabulary with interactive flashcards',
    icon: '🎴',
    players: '4.1k',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'quiz',
    title: 'Quiz Master',
    description: 'Test your knowledge with timed quizzes',
    icon: '❓',
    players: '5.8k',
    color: 'from-orange-400 to-red-500',
  },
];

const stats = [
  { label: 'Active Games', value: '50+', icon: Gamepad2 },
  { label: 'Daily Players', value: '12k', icon: Users },
  { label: 'Questions', value: '10k+', icon: Target },
  { label: 'Avg. Session', value: '25min', icon: Timer },
];

export function GameZone({ onNavigate }: GameZoneProps) {
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

  return (
    <section ref={sectionRef} className="py-24 bg-brand-bg-blue/50 dark:bg-gray-900/50 overflow-hidden">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-soft mb-6">
                <Gamepad2 className="h-4 w-4 text-brand-blue" />
                <span className="text-sm font-medium text-brand-dark-blue">ESL Game Zone</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Make Learning{' '}
                <span className="text-gradient">Fun</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                Transform boring study sessions into exciting adventures. Our interactive games 
                help students learn faster while having fun.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat) => (
                  <div 
                    key={stat.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-bg-blue flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('games')}
                  className="bg-brand-blue hover:bg-brand-dark-blue text-white px-8 rounded-xl shadow-glow"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Play Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('games')}
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-bg-blue rounded-xl"
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  View Leaderboard
                </Button>
              </div>
            </div>

            {/* Right Content - Games Grid */}
            <div 
              className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {games.map((game, index) => (
                <div
                  key={game.id}
                  onClick={() => onNavigate('games')}
                  className={`group cursor-pointer p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 ${
                    index === 1 || index === 2 ? 'lg:translate-y-8' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {game.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {game.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{game.players} playing</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
