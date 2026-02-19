import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  BookOpen,
  FolderOpen,
  Calendar,
  Search,
  Plus,
  MoreVertical,
  Clock,
  Users,
  FileText,
  Video,
  Link as LinkIcon,
  CheckCircle,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react';
import type { Program, Lesson } from '@/types';

// Mock data
const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Kids English Starter',
    description: 'Foundation English course for young learners',
    courses: [],
    coverImage: '/course-kids.jpg',
    isPublished: true,
  },
  {
    id: '2',
    title: 'Business English Pro',
    description: 'Professional English for the workplace',
    courses: [],
    coverImage: '/course-business.jpg',
    isPublished: true,
  },
  {
    id: '3',
    title: 'IELTS Preparation',
    description: 'Comprehensive IELTS exam preparation',
    courses: [],
    coverImage: '/course-exam.jpg',
    isPublished: false,
  },
];

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Greetings',
    courseId: '1',
    objectives: ['Learn basic greetings', 'Practice pronunciation', 'Use greetings in context'],
    materials: [
      { id: '1', title: 'Greetings Worksheet', type: 'pdf', url: '#', size: '2.5 MB' },
      { id: '2', title: 'Audio Practice', type: 'audio', url: '#', size: '5.1 MB' },
    ],
    videos: [
      { id: '1', title: 'Greeting Scenarios', url: '#', duration: 480, thumbnail: '/feature-games.jpg' },
    ],
    homework: {
      id: '1',
      title: 'Practice Greetings',
      description: 'Record yourself using 5 different greetings',
      attachments: [],
    },
    notes: 'Focus on formal vs informal greetings',
    vocabulary: [
      { id: '1', word: 'Hello', definition: 'A common greeting', example: 'Hello, how are you?' },
      { id: '2', word: 'Good morning', definition: 'Greeting used in the morning', example: 'Good morning, everyone!' },
    ],
    grammar: [
      { id: '1', title: 'Present Simple', explanation: 'Used for habits and general truths', examples: ['I wake up at 7 AM', 'She works in London'], exercises: [] },
    ],
    duration: 45,
    order: 1,
  },
  {
    id: '2',
    title: 'Numbers and Counting',
    courseId: '1',
    objectives: ['Learn numbers 1-100', 'Practice counting', 'Use numbers in conversations'],
    materials: [
      { id: '3', title: 'Numbers Chart', type: 'pdf', url: '#', size: '1.8 MB' },
    ],
    videos: [],
    homework: {
      id: '2',
      title: 'Counting Exercise',
      description: 'Write numbers 1-50 in words',
      attachments: [],
    },
    notes: 'Use visual aids for better understanding',
    vocabulary: [
      { id: '3', word: 'One', definition: 'The number 1', example: 'I have one apple.' },
    ],
    grammar: [],
    duration: 60,
    order: 2,
  },
];

export function LessonOrganizer() {
  const [activeTab, setActiveTab] = useState('courses');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateNew = () => {
    toast.info('Create new feature coming soon!', {
      description: 'This will open a form to create new content.',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Lesson Organizer
              </h1>
              <p className="text-muted-foreground">
                Manage your courses, programs, and lessons in one place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleCreateNew} className="bg-brand-blue hover:bg-brand-dark-blue">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="w-fit">
                <TabsTrigger value="courses" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="programs" className="gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Programs
                </TabsTrigger>
                <TabsTrigger value="lessons" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Lessons
                </TabsTrigger>
                <TabsTrigger value="calendar" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Calendar
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex items-center border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-muted' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={program.coverImage}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <MoreVertical className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge variant={program.isPublished ? 'default' : 'secondary'}>
                          {program.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {program.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            12 courses
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            450 students
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs" className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-border shadow-soft"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-bg-blue flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-brand-blue" />
                      </div>
                      <Badge variant={program.isPublished ? 'default' : 'secondary'}>
                        {program.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        8 courses
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        24 weeks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Lessons Tab */}
            <TabsContent value="lessons" className="space-y-6">
              <div className="space-y-4">
                {mockLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-border shadow-soft"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-bg-blue flex items-center justify-center flex-shrink-0">
                        <span className="font-display font-bold text-brand-blue">{lesson.order}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {lesson.duration} min
                            </span>
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {lesson.objectives.map((objective, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {objective}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            {lesson.materials.length} materials
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Video className="h-4 w-4" />
                            {lesson.videos.length} videos
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <CheckCircle className="h-4 w-4" />
                            {lesson.vocabulary.length} words
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-border shadow-soft text-center">
                <Calendar className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Calendar Integration Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Sync with Google Calendar, schedule lessons, and set reminders for your classes.
                </p>
                <Button variant="outline" onClick={() => toast.info('Coming soon!')}>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Connect Google Calendar
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
