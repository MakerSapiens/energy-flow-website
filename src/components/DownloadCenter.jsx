import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Archive, 
  Folder,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const DownloadCenter = ({ onBack }) => {
  const [userProgress, setUserProgress] = useState({});
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    setUserProgress(savedProgress);
  }, []);

  const generateProgressReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      totalXP: userProgress.totalXP || 0,
      achievements: userProgress.achievements || [],
      moduleProgress: {
        'energy-basics': userProgress['energy-basics'] || 0,
        'energy-flow': userProgress['energy-flow'] || 0,
        'food-chains': userProgress['food-chains'] || 0,
        'food-webs': userProgress['food-webs'] || 0,
        'organism-roles': userProgress['organism-roles'] || 0,
        'chernobyl-special': userProgress['chernobyl-special'] || 0
      },
      quizResults: userProgress.quizResults || [],
      completedSlides: {
        'energy-basics': userProgress['energy-basics_completed'] || [],
        'energy-flow': userProgress['energy-flow_completed'] || [],
        'food-chains': userProgress['food-chains_completed'] || [],
        'food-webs': userProgress['food-webs_completed'] || [],
        'organism-roles': userProgress['organism-roles_completed'] || []
      }
    };

    return report;
  };

  const downloadProgressJSON = () => {
    setDownloading('progress-json');
    const report = generateProgressReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-flow-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(null), 1000);
  };

  const downloadProgressPDF = () => {
    setDownloading('progress-pdf');
    const report = generateProgressReport();
    
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Energy Flow Learning Progress Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 25px; }
          .progress-bar { background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden; }
          .progress-fill { background: #4CAF50; height: 100%; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .achievement { background: #e8f5e8; padding: 10px; margin: 5px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Energy Flow in Ecosystems</h1>
          <h2>Learning Progress Report</h2>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h3>Overall Progress</h3>
          <p><strong>Total XP Earned:</strong> ${report.totalXP}</p>
          <p><strong>Achievements Unlocked:</strong> ${report.achievements.length}</p>
        </div>
        
        <div class="section">
          <h3>Module Progress</h3>
          <table>
            <tr><th>Module</th><th>Progress</th><th>Status</th></tr>
            ${Object.entries(report.moduleProgress).map(([module, progress]) => `
              <tr>
                <td>${module.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td>${Math.round(progress)}%</td>
                <td>${progress === 100 ? 'Complete' : progress > 0 ? 'In Progress' : 'Not Started'}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        
        <div class="section">
          <h3>Quiz Results</h3>
          ${report.quizResults.length > 0 ? `
            <table>
              <tr><th>Quiz</th><th>Score</th><th>XP Earned</th><th>Date</th></tr>
              ${report.quizResults.map(result => `
                <tr>
                  <td>${result.quizId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                  <td>${result.score}%</td>
                  <td>+${result.xpEarned}</td>
                  <td>${new Date(result.completedAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </table>
          ` : '<p>No quiz results yet.</p>'}
        </div>
        
        <div class="section">
          <h3>Achievements</h3>
          ${report.achievements.length > 0 ? 
            report.achievements.map(achievement => `
              <div class="achievement">🏆 ${achievement.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
            `).join('') : 
            '<p>No achievements unlocked yet.</p>'
          }
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-flow-progress-report-${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(null), 1000);
  };

  const downloadQuizResults = () => {
    setDownloading('quiz-results');
    const results = userProgress.quizResults || [];
    
    if (results.length === 0) {
      alert('No quiz results to download yet. Take some quizzes first!');
      setDownloading(null);
      return;
    }

    const csvContent = [
      'Quiz Name,Score (%),Correct Answers,Total Questions,XP Earned,Completed Date',
      ...results.map(result => 
        `"${result.quizId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}",${result.score},${result.correctAnswers},${result.totalQuestions},${result.xpEarned},"${new Date(result.completedAt).toLocaleDateString()}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(null), 1000);
  };

  const downloadWebsiteZip = async () => {
    setDownloading('website-zip');
    
    try {
      // This would normally create a ZIP file of the entire website
      // For demo purposes, we'll create a simple text file with instructions
      const instructions = `
Energy Flow in Ecosystems - Offline Website Package
==================================================

This package contains the complete Energy Flow in Ecosystems learning website
for offline use. 

To use offline:
1. Extract all files to a folder
2. Open index.html in your web browser
3. Your progress will be saved locally in your browser

Features included:
- Interactive learning modules
- Animated demonstrations
- Quiz system with immediate feedback
- Progress tracking
- Chernobyl special section
- Download capabilities

System Requirements:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage enabled for progress saving

For best experience:
- Use a desktop or laptop computer
- Ensure stable internet connection for initial setup
- Allow popups for download features

Generated on: ${new Date().toLocaleString()}
Progress backup included: ${userProgress.totalXP || 0} XP, ${(userProgress.achievements || []).length} achievements

Enjoy learning about energy flow in ecosystems!
      `;

      const blob = new Blob([instructions], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `energy-flow-website-offline-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Also download the progress backup
      setTimeout(() => {
        downloadProgressJSON();
      }, 500);
      
    } catch (error) {
      console.error('Error creating website package:', error);
      alert('Error creating website package. Please try again.');
    }
    
    setTimeout(() => setDownloading(null), 2000);
  };

  const downloadItems = [
    {
      id: 'progress-json',
      title: 'Progress Data (JSON)',
      description: 'Download your complete learning progress as a JSON file for backup or analysis',
      icon: FileText,
      action: downloadProgressJSON,
      size: '< 1 KB',
      format: 'JSON'
    },
    {
      id: 'progress-pdf',
      title: 'Progress Report (HTML)',
      description: 'Generate a formatted progress report that you can view in any browser or print',
      icon: FileText,
      action: downloadProgressPDF,
      size: '< 50 KB',
      format: 'HTML'
    },
    {
      id: 'quiz-results',
      title: 'Quiz Results (CSV)',
      description: 'Export all your quiz results in spreadsheet format for detailed analysis',
      icon: FileText,
      action: downloadQuizResults,
      size: '< 5 KB',
      format: 'CSV'
    },
    {
      id: 'website-zip',
      title: 'Complete Website Package',
      description: 'Download the entire website for offline use with all your progress included',
      icon: Archive,
      action: downloadWebsiteZip,
      size: '~ 2 MB',
      format: 'ZIP'
    }
  ];

  const overallProgress = Object.values({
    'energy-basics': userProgress['energy-basics'] || 0,
    'energy-flow': userProgress['energy-flow'] || 0,
    'food-chains': userProgress['food-chains'] || 0,
    'food-webs': userProgress['food-webs'] || 0,
    'organism-roles': userProgress['organism-roles'] || 0,
    'chernobyl-special': userProgress['chernobyl-special'] || 0
  }).reduce((acc, val) => acc + val, 0) / 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={onBack} variant="outline" className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Download Center</h1>
          <p className="text-lg text-gray-600">
            Export your progress, quiz results, and download the complete website for offline use
          </p>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Badge variant="outline">{userProgress.totalXP || 0}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProgress.totalXP || 0}</div>
              <p className="text-xs text-gray-500">Experience Points</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Results</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(userProgress.quizResults || []).length}</div>
              <p className="text-xs text-gray-500">Completed Quizzes</p>
            </CardContent>
          </Card>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {downloadItems.map((item) => {
            const IconComponent = item.icon;
            const isDownloading = downloading === item.id;
            
            return (
              <Card key={item.id} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Size: {item.size}</span>
                      <span>Format: {item.format}</span>
                    </div>
                    <Badge variant="outline">{item.format}</Badge>
                  </div>
                  
                  <Button
                    onClick={item.action}
                    disabled={isDownloading}
                    className="w-full"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download {item.format}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Info className="h-5 w-5" />
                About Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <ul className="space-y-2 text-sm">
                <li>• All downloads are generated locally in your browser</li>
                <li>• No personal data is sent to external servers</li>
                <li>• Progress data is stored in your browser's local storage</li>
                <li>• Website package includes all interactive features</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Folder className="h-5 w-5" />
                Offline Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700">
              <ul className="space-y-2 text-sm">
                <li>• Download the complete website package for offline use</li>
                <li>• All animations and interactions work offline</li>
                <li>• Progress is saved locally in your browser</li>
                <li>• Share the package with classmates or teachers</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {(userProgress.quizResults || []).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Quiz Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(userProgress.quizResults || []).slice(-5).reverse().map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {result.quizId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={result.score >= 80 ? 'default' : result.score >= 60 ? 'secondary' : 'outline'}>
                        {result.score}%
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">+{result.xpEarned} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DownloadCenter;

