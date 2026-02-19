// User Types
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Course Types
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type AgeGroup = 'kids' | 'teens' | 'adults';
export type SkillType = 'speaking' | 'listening' | 'reading' | 'writing' | 'grammar' | 'vocabulary';

export interface Course {
  id: string;
  title: string;
  description: string;
  cefrLevel: CEFRLevel;
  ageGroup: AgeGroup;
  duration: string;
  coverImage: string;
  tags: string[];
  skills: SkillType[];
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  coverImage: string;
  isPublished: boolean;
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  courseId: string;
  objectives: string[];
  materials: Material[];
  videos: Video[];
  homework: Homework;
  notes: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  duration: number;
  order: number;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'slide' | 'audio' | 'link';
  url: string;
  size?: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: number;
  thumbnail?: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  attachments: Material[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  definition: string;
  example: string;
  pronunciation?: string;
  image?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'open';
}

// Game Types
export type GameType = 'maze-chase' | 'matching' | 'flashcards' | 'sentence-completion' | 'quiz' | 'lava-survival';

export interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  thumbnail: string;
  difficulty: CEFRLevel;
  category: string;
  playsCount: number;
  rating: number;
  isMultiplayer: boolean;
}

export interface GameSession {
  id: string;
  gameId: string;
  playerId: string;
  score: number;
  timeSpent: number;
  accuracy: number;
  completedAt: Date;
}

// Progress Types
export interface StudentProgress {
  studentId: string;
  courseId: string;
  lessonsCompleted: string[];
  overallProgress: number;
  timeSpent: number;
  lastAccessed: Date;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  points: number;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: 'lesson' | 'exam' | 'meeting' | 'deadline';
  attendees?: string[];
  courseId?: string;
  lessonId?: string;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'flashcard' | 'worksheet' | 'slide' | 'audio' | 'video' | 'game';
  category: string;
  cefrLevel: CEFRLevel;
  ageGroup: AgeGroup;
  url: string;
  thumbnail?: string;
  downloads: number;
  rating: number;
  tags: string[];
  createdBy: string;
  createdAt: Date;
}

// Analytics Types
export interface TeacherAnalytics {
  teacherId: string;
  totalStudents: number;
  totalCourses: number;
  totalLessons: number;
  averageCompletionRate: number;
  studentEngagement: {
    date: string;
    activeStudents: number;
    timeSpent: number;
  }[];
  topPerformingStudents: {
    studentId: string;
    name: string;
    progress: number;
  }[];
  weakAreas: {
    skill: SkillType;
    averageScore: number;
  }[];
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  location: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';
