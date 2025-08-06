import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  BookOpen, 
  Target, 
  Download,
  Zap,
  Leaf,
  Sun,
  Users,
  AlertTriangle
} from 'lucide-react';

const Dashboard = ({ onNavigate, userProgress, onDownload }) => {
  const [totalXP, setTotalXP] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('energyFlowProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setTotalXP(progress.totalXP || 0);
      setAchievements(progress.achievements || []);
    }
  }, [userProgress]);

  const modules = [
    {
      id: 'energy-basics',
      title: 'Energy Basics',
      description: 'Understanding energy and the Sun as our primary source',
      icon: Sun,
      color: 'bg-yellow-500',
      progress: userProgress?.['energy-basics'] || 0,
      xp: 150
    },
    {
      id: 'energy-flow',
      title: 'Energy Flow',
      description: 'How energy moves through living organisms',
      icon: Zap,
      color: 'bg-blue-500',
      progress: userProgress?.['energy-flow'] || 0,
      xp: 200
    },
    {
      id: 'food-chains',
      title: 'Food Chains',
      description: 'Energy transfer from one organism to the next',
      icon: Target,
      color: 'bg-green-500',
      progress: userProgress?.['food-chains'] || 0,
      xp: 250
    },
    {
      id: 'food-webs',
      title: 'Food Webs',
      description: 'Complex networks of interconnected food chains',
      icon: Users,
      color: 'bg-purple-500',
      progress: userProgress?.['food-webs'] || 0,
      xp: 300
    },
    {
      id: 'organism-roles',
      title: 'Organism Roles',
      description: 'Producers, consumers, and decomposers',
      icon: Leaf,
      color: 'bg-emerald-500',
      progress: userProgress?.['organism-roles'] || 0,
      xp: 200
    },
    {
      id: 'chernobyl-special',
      title: 'Chernobyl Fungi',
      description: 'Special: Radioactive fungus that feeds on radiation',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      progress: userProgress?.['chernobyl-special'] || 0,
      xp: 500,
      special: true
    }
  ];

  const overallProgress = modules.reduce((acc, module) => acc + module.progress, 0) / modules.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Energy Flow in Ecosystems
          </h1>
          <p className="text-lg text-gray-600">
            Explore how energy moves through living systems and discover amazing organisms!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Trophy className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Star className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalXP}</div>
              <p className="text-xs opacity-90">Experience Points Earned</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Badge className="bg-white text-orange-600">{achievements.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievements.length}/12</div>
              <p className="text-xs opacity-90">Badges Unlocked</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={module.id} 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    module.special ? 'ring-2 ring-orange-400 ring-opacity-50' : ''
                  }`}
                  onClick={() => onNavigate(module.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${module.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      {module.special && (
                        <Badge variant="destructive" className="text-xs">
                          SPECIAL
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(module.progress)}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">+{module.xp} XP</span>
                        <Button size="sm" variant="outline">
                          {module.progress === 0 ? 'Start' : 'Continue'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quiz Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Test your knowledge with interactive quizzes and earn bonus XP!
              </p>
              <Button onClick={() => onNavigate('quiz-center')} className="w-full">
                Take a Quiz
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Download your progress, quiz results, or the entire website for offline use.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => onDownload('progress')} 
                  variant="outline" 
                  className="w-full"
                >
                  Download Progress
                </Button>
                <Button 
                  onClick={() => onDownload('website')} 
                  variant="outline" 
                  className="w-full"
                >
                  Download Website
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

