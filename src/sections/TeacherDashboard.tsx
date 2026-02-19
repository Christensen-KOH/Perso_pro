import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  MessageSquare,
  FileText,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const stats = [
  { 
    title: 'Total Students', 
    value: '248', 
    change: '+12%', 
    trend: 'up',
    icon: Users,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    title: 'Active Courses', 
    value: '12', 
    change: '+2', 
    trend: 'up',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    title: 'Completion Rate', 
    value: '87%', 
    change: '+5%', 
    trend: 'up',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    title: 'Avg. Session', 
    value: '32m', 
    change: '-3m', 
    trend: 'down',
    icon: Clock,
    color: 'from-orange-500 to-red-500'
  },
];

const recentStudents = [
  { id: '1', name: 'Alice Johnson', progress: 85, lastActive: '2 hours ago', avatar: '/avatar-3.jpg', status: 'active' },
  { id: '2', name: 'Bob Smith', progress: 62, lastActive: '5 hours ago', avatar: '/avatar-2.jpg', status: 'active' },
  { id: '3', name: 'Carol White', progress: 45, lastActive: '1 day ago', avatar: '/avatar-1.jpg', status: 'warning' },
  { id: '4', name: 'David Brown', progress: 92, lastActive: '30 mins ago', avatar: '/avatar-3.jpg', status: 'active' },
  { id: '5', name: 'Emma Davis', progress: 28, lastActive: '3 days ago', avatar: '/avatar-1.jpg', status: 'inactive' },
];

const upcomingClasses = [
  { id: '1', title: 'Business English B1', time: '09:00 AM', students: 12, type: 'online' },
  { id: '2', title: 'Kids Starter A1', time: '11:30 AM', students: 8, type: 'in-person' },
  { id: '3', title: 'IELTS Preparation', time: '02:00 PM', students: 15, type: 'online' },
  { id: '4', title: 'Conversation Club', time: '04:30 PM', students: 6, type: 'online' },
];

const skillAnalytics = [
  { skill: 'Speaking', score: 78, color: 'bg-blue-500' },
  { skill: 'Listening', score: 85, color: 'bg-green-500' },
  { skill: 'Reading', score: 72, color: 'bg-purple-500' },
  { skill: 'Writing', score: 68, color: 'bg-orange-500' },
  { skill: 'Grammar', score: 75, color: 'bg-pink-500' },
  { skill: 'Vocabulary', score: 82, color: 'bg-cyan-500' },
];

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Teacher Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your classes.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => toast.info('Report generation coming soon!')}>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button className="bg-brand-blue hover:bg-brand-dark-blue">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Class
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                      <div className={`flex items-center gap-1 mt-2 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-fit">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="students" className="gap-2">
                <Users className="h-4 w-4" />
                Students
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <PieChart className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Student Progress */}
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-display text-lg">Student Progress</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('students')}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentStudents.map((student) => (
                        <div key={student.id} className="flex items-center gap-4">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{student.name}</span>
                              <span className="text-sm text-muted-foreground">{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="h-2" />
                          </div>
                          <Badge 
                            variant={student.status === 'active' ? 'default' : student.status === 'warning' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {student.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Classes */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-display text-lg">Today's Classes</CardTitle>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                        <div key={cls.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                          <div className="w-10 h-10 rounded-lg bg-brand-bg-blue flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{cls.title}</p>
                            <p className="text-xs text-muted-foreground">{cls.time}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {cls.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {cls.students} students
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Create Lesson', icon: FileText, action: () => toast.info('Coming soon!') },
                  { label: 'Add Student', icon: Users, action: () => toast.info('Coming soon!') },
                  { label: 'Create Quiz', icon: BarChart3, action: () => toast.info('Coming soon!') },
                  { label: 'Send Message', icon: MessageSquare, action: () => toast.info('Coming soon!') },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={action.action}
                  >
                    <action.icon className="h-6 w-6 text-brand-blue" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">All Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-sm">Student</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Progress</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Last Active</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentStudents.map((student) => (
                          <tr key={student.id} className="border-b last:border-0">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="font-medium text-sm">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Progress value={student.progress} className="w-24 h-2" />
                                <span className="text-sm text-muted-foreground">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{student.lastActive}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                variant={student.status === 'active' ? 'default' : student.status === 'warning' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {student.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-lg">Skills Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillAnalytics.map((skill) => (
                        <div key={skill.skill}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{skill.skill}</span>
                            <span className="text-sm text-muted-foreground">{skill.score}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${skill.color} transition-all duration-500`}
                              style={{ width: `${skill.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-lg">Weekly Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between h-48 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                        const height = [60, 80, 45, 90, 70, 55, 85][i];
                        return (
                          <div key={day} className="flex-1 flex flex-col items-center gap-2">
                            <div 
                              className="w-full bg-brand-blue/20 rounded-t-lg relative overflow-hidden"
                              style={{ height: `${height}%` }}
                            >
                              <div 
                                className="absolute bottom-0 left-0 right-0 bg-brand-blue rounded-t-lg transition-all duration-500"
                                style={{ height: '100%' }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{day}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Messages Coming Soon
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Soon you'll be able to communicate with your students directly through the platform.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
