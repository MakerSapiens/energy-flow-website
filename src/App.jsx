import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import LearningModule from './components/LearningModule'
import ChernobylSpecial from './components/ChernobylSpecial'
import QuizSystem from './components/QuizSystem'
import DownloadCenter from './components/DownloadCenter'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [userProgress, setUserProgress] = useState({})

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('energyFlowProgress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    } else {
      // Initialize with default progress
      const defaultProgress = {
        totalXP: 0,
        achievements: [],
        'energy-basics': 0,
        'energy-flow': 0,
        'food-chains': 0,
        'food-webs': 0,
        'organism-roles': 0,
        'chernobyl-special': 0,
        quizResults: []
      }
      localStorage.setItem('energyFlowProgress', JSON.stringify(defaultProgress))
      setUserProgress(defaultProgress)
    }
  }, [])

  const handleNavigation = (view) => {
    setCurrentView(view)
  }

  const handleUpdateProgress = (newProgress) => {
    setUserProgress(newProgress)
  }

  const handleDownload = (type) => {
    if (type === 'progress') {
      // Download progress as JSON
      const blob = new Blob([JSON.stringify(userProgress, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `energy-flow-progress-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } else if (type === 'website') {
      // Navigate to download center for full website package
      setCurrentView('download-center')
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={handleNavigation}
            userProgress={userProgress}
            onDownload={handleDownload}
          />
        )
      case 'quiz-center':
        return (
          <QuizSystem
            onBack={() => setCurrentView('dashboard')}
            onUpdateProgress={handleUpdateProgress}
          />
        )
      case 'download-center':
        return (
          <DownloadCenter
            onBack={() => setCurrentView('dashboard')}
          />
        )
      case 'chernobyl-special':
        return (
          <ChernobylSpecial
            onBack={() => setCurrentView('dashboard')}
            onUpdateProgress={handleUpdateProgress}
          />
        )
      default:
        // Handle learning modules
        if (currentView.includes('energy-') || currentView.includes('food-') || currentView.includes('organism-')) {
          return (
            <LearningModule
              moduleId={currentView}
              onBack={() => setCurrentView('dashboard')}
              onUpdateProgress={handleUpdateProgress}
            />
          )
        }
        return (
          <Dashboard
            onNavigate={handleNavigation}
            userProgress={userProgress}
            onDownload={handleDownload}
          />
        )
    }
  }

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  )
}

export default App
