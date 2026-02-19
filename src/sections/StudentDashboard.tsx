import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  BookOpen,
  Trophy,
  Zap,
  Target,
  Gamepad2,
  Calendar,
  CheckCircle,
  Lock,
  Play,
  Flame,
  Award,
  Gem,
} from 'lucide-react';

const enrolledCourses = [
  {
    id: '1',
    title: 'Business English Pro',
    progress: 65,
    totalLessons: 40,
    completedLessons: 26,
    nextLesson: 'Email Writing Essentials',
    image: '/course-business.jpg',
    cefrLevel: 'B1',
  },
  {
    id: '2',
    title: 'English for Kids Starter',
    progress: 30,
    totalLessons: 24,
    completedLessons: 7,
    nextLesson: 'Colors and Shapes',
    image: '/course-kids.jpg',
    cefrLevel: 'A1',
  },
];

const achievements = [
  { id: '1', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true, points: 50 },
  { id: '2', title: 'Week Warrior', description: 'Study 7 days in a row', icon: '🔥', earned: true, points: 100 },
  { id: '3', title: 'Vocabulary Master', description: 'Learn 100 new words', icon: '📚', earned: true, points: 200 },
  { id: '4', title: 'Game Champion', description: 'Win 10 games', icon: '🏆', earned: false, points: 150 },
  { id: '5', title: 'Perfect Score', description: 'Get 100% on a quiz', icon: '⭐', earned: false, points: 100 },
  { id: '6', title: 'Social Butterfly', description: 'Join a group study session', icon: '🦋', earned: false, points: 75 },
];

const vocabularyBank = [
  { word: 'Ambitious', definition: 'Having a strong desire to succeed', learned: '2 days ago', review: true },
  { word: 'Collaborate', definition: 'Work together on a project', learned: '3 days ago', review: false },
  { word: 'Efficient', definition: 'Achieving maximum productivity', learned: '5 days ago', review: true },
  { word: 'Innovative', definition: 'Introducing new ideas', learned: '1 week ago', review: false },
];

const gameProgress = [
  { game: 'Maze Chase', score: 2450, rank: 12, played: '2 hours ago' },
  { game: 'Word Match', score: 1890, rank: 8, played: '1 day ago' },
  { game: 'Quiz Master', score: 3200, rank: 5, played: '3 days ago' },
];

const dailyTasks = [
  { id: '1', task: 'Complete 1 lesson', completed: true, reward: 20 },
  { id: '2', task: 'Play 2 games', completed: true, reward: 30 },
  { id: '3', task: 'Review 5 vocabulary words', completed: false, reward: 15 },
  { id: '4', task: 'Watch a video lesson', completed: false, reward: 25 },
];

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [streak] = useState(12);
  const [xp] = useState(2840);
  const [level] = useState(8);

  const xpToNextLevel = 3000;
  const xpProgress = (xp / xpToNextLevel) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-brand-bg-blue shadow-soft">
                  <img
                    src="/avatar-3.jpg"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center shadow-soft">
                  <span className="text-lg">🔥</span>
                </div>
              </div>
              <div>
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome back, Alex!
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="secondary" className="gap-1">
                    <Trophy className="h-3 w-3" />
                    Level {level}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    {streak} day streak
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    {xp} XP
                  </Badge>
                </div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft min-w-[250px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level Progress</span>
                <span className="text-sm text-muted-foreground">{xp}/{xpToNextLevel} XP</span>
              </div>
              <Progress value={xpProgress} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {xpToNextLevel - xp} XP to Level {level + 1}
              </p>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-fit flex-wrap">
              <TabsTrigger value="overview" className="gap-2">
                <Target className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="gap-2">
                <BookOpen className="h-4 w-4" />
                My Courses
              </TabsTrigger>
              <TabsTrigger value="games" className="gap-2">
                <Gamepad2 className="h-4 w-4" />
                Games
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="vocabulary" className="gap-2">
                <Gem className="h-4 w-4" />
                Vocabulary
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Daily Tasks */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-brand-blue" />
                      Daily Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dailyTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                            task.completed ? 'bg-brand-bg-blue/50' : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              task.completed ? 'bg-brand-green text-white' : 'border-2 border-muted-foreground'
                            }`}>
                              {task.completed && <CheckCircle className="h-4 w-4" />}
                            </div>
                            <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                              {task.task}
                            </span>
                          </div>
                          <Badge variant="secondary" className="gap-1">
                            <Zap className="h-3 w-3" />
                            +{task.reward} XP
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-display font-bold">33</p>
                          <p className="text-sm text-muted-foreground">Lessons Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Gamepad2 className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-display font-bold">47</p>
                          <p className="text-sm text-muted-foreground">Games Played</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                          <Gem className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-display font-bold">156</p>
                          <p className="text-sm text-muted-foreground">Words Learned</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Continue Learning */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Continue Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => toast.info('Course details coming soon!')}
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{course.title}</h4>
                            <Badge variant="secondary" className="text-xs">{course.cefrLevel}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Next: {course.nextLesson}
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress value={course.progress} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                        </div>
                        <Button size="icon" className="rounded-full bg-brand-blue hover:bg-brand-dark-blue">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="mb-2">{course.cefrLevel}</Badge>
                        <h3 className="text-white font-display text-xl font-semibold">{course.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons} of {course.totalLessons} lessons
                        </span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 mb-4" />
                      <Button className="w-full bg-brand-blue hover:bg-brand-dark-blue">
                        <Play className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Games Tab */}
            <TabsContent value="games" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Game Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gameProgress.map((game) => (
                      <div
                        key={game.game}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-brand-bg-blue flex items-center justify-center">
                            <Gamepad2 className="h-6 w-6 text-brand-blue" />
                          </div>
                          <div>
                            <p className="font-medium">{game.game}</p>
                            <p className="text-sm text-muted-foreground">Played {game.played}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-lg">{game.score.toLocaleString()}</p>
                          <Badge variant="secondary" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            Rank #{game.rank}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      achievement.earned
                        ? 'bg-brand-bg-blue/50 border-brand-blue/30'
                        : 'bg-muted/30 border-border opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{achievement.icon}</span>
                      {achievement.earned ? (
                        <CheckCircle className="h-5 w-5 text-brand-green" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <Badge variant="secondary" className="gap-1">
                      <Zap className="h-3 w-3" />
                      {achievement.points} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Vocabulary Tab */}
            <TabsContent value="vocabulary" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-lg">My Vocabulary Bank</CardTitle>
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Review All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vocabularyBank.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{item.word}</h4>
                            {item.review && (
                              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                Review
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.definition}</p>
                          <p className="text-xs text-muted-foreground mt-1">Learned {item.learned}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Practice
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
