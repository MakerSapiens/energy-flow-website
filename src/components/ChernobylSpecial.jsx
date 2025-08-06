import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Zap, 
  Microscope, 
  Atom,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Award,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Chernobyl fungus images
import fungusImage1 from '../assets/UpwXuJiup0Hx.jpg';
import fungusImage2 from '../assets/08ACOIuCaQZu.jpg';
import fungusImage3 from '../assets/Nxt7KgefKsAe.png';
import fungusImage4 from '../assets/4Lh6QPrqlLax.jpg';
import fungusImage5 from '../assets/CDss3nEhGXde.jpg';

const ChernobylSpecial = ({ onBack, onUpdateProgress }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);

  const sections = [
    {
      id: 'introduction',
      title: 'The Chernobyl Discovery',
      content: 'In 1986, the Chernobyl nuclear disaster created one of the most radioactive environments on Earth. But life found a way...',
      image: fungusImage1,
      animation: 'fadeIn'
    },
    {
      id: 'discovery',
      title: 'Black Fungus in the Reactor',
      content: 'Scientists discovered black fungus growing on the walls of the damaged reactor, thriving in deadly radiation levels.',
      image: fungusImage2,
      animation: 'slideIn'
    },
    {
      id: 'species',
      title: 'Meet the Radiation Eaters',
      content: 'Two main species: Cladosporium sphaerospermum and Cryptococcus neoformans - both use melanin to convert radiation into energy.',
      image: fungusImage4,
      animation: 'zoomIn'
    },
    {
      id: 'mechanism',
      title: 'How Radiosynthesis Works',
      content: 'Like photosynthesis uses sunlight, radiosynthesis uses gamma radiation. Melanin captures radiation and converts it to chemical energy.',
      image: fungusImage5,
      animation: 'rotateIn'
    },
    {
      id: 'significance',
      title: 'Scientific Breakthrough',
      content: 'This discovery revolutionized our understanding of life and opened possibilities for space exploration and radiation cleanup.',
      image: fungusImage3,
      animation: 'bounceIn'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What makes Chernobyl fungus special?",
      options: [
        "It glows in the dark",
        "It feeds on radiation",
        "It's extremely poisonous",
        "It grows very fast"
      ],
      correct: 1,
      explanation: "Chernobyl fungus can convert radiation into energy through radiosynthesis, similar to how plants use photosynthesis."
    },
    {
      id: 2,
      question: "Which pigment helps the fungus process radiation?",
      options: [
        "Chlorophyll",
        "Carotene",
        "Melanin",
        "Hemoglobin"
      ],
      correct: 2,
      explanation: "Melanin, the same pigment that colors human skin and hair, helps these fungi capture and convert radiation into usable energy."
    },
    {
      id: 3,
      question: "How does this relate to energy flow in ecosystems?",
      options: [
        "It doesn't relate at all",
        "It shows alternative energy sources",
        "It proves radiation is always harmful",
        "It only affects dead organisms"
      ],
      correct: 1,
      explanation: "This discovery shows that life can find alternative energy sources beyond sunlight, expanding our understanding of energy flow in ecosystems."
    }
  ];

  useEffect(() => {
    const progress = ((currentSection + 1) / sections.length) * 100;
    setSectionProgress(progress);
    
    if (progress === 100 && !showQuiz) {
      // Award XP for completing the content
      const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
      savedProgress.totalXP = (savedProgress.totalXP || 0) + 100;
      savedProgress['chernobyl-special'] = Math.max(savedProgress['chernobyl-special'] || 0, 70);
      localStorage.setItem('energyFlowProgress', JSON.stringify(savedProgress));
      onUpdateProgress?.(savedProgress);
    }
  }, [currentSection, showQuiz, onUpdateProgress]);

  const RadiationAnimation = () => {
    return (
      <div className="relative w-full h-64 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Radiation source */}
          <motion.div
            className="w-8 h-8 bg-yellow-400 rounded-full"
            animate={animationPlaying ? {
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Radiation waves */}
          {animationPlaying && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 border-2 border-yellow-400 rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 3, 6],
                    opacity: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </>
          )}
          
          {/* Fungus */}
          <motion.div
            className="absolute right-20 w-12 h-12 bg-black rounded-full flex items-center justify-center"
            animate={animationPlaying ? {
              scale: [1, 1.2, 1.1],
              backgroundColor: ['#000000', '#1a1a1a', '#000000']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Microscope className="w-6 h-6 text-white" />
          </motion.div>
          
          {/* Energy conversion arrows */}
          {animationPlaying && (
            <motion.div
              className="absolute right-32 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 text-green-400" />
              <span className="text-green-400 text-sm ml-2">Energy!</span>
            </motion.div>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <Button
            onClick={() => setAnimationPlaying(!animationPlaying)}
            size="sm"
            variant="outline"
            className="bg-white/20 text-white border-white/30"
          >
            {animationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {animationPlaying ? 'Pause' : 'Play'} Animation
          </Button>
          
          <Button
            onClick={() => setAnimationPlaying(false)}
            size="sm"
            variant="outline"
            className="bg-white/20 text-white border-white/30"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    const correctAnswers = quizQuestions.filter(q => quizAnswers[q.id] === q.correct).length;
    const score = (correctAnswers / quizQuestions.length) * 100;
    
    // Award XP based on quiz performance
    const bonusXP = Math.round(score * 2); // Up to 200 XP for perfect score
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    savedProgress.totalXP = (savedProgress.totalXP || 0) + bonusXP;
    savedProgress['chernobyl-special'] = 100; // Complete the section
    
    // Add achievement for completing Chernobyl section
    if (!savedProgress.achievements) savedProgress.achievements = [];
    if (!savedProgress.achievements.includes('chernobyl-expert')) {
      savedProgress.achievements.push('chernobyl-expert');
    }
    
    localStorage.setItem('energyFlowProgress', JSON.stringify(savedProgress));
    onUpdateProgress?.(savedProgress);
    
    alert(`Quiz completed! Score: ${score}% (+${bonusXP} XP)`);
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => setShowQuiz(false)} variant="outline">
              ← Back to Content
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-orange-500" />
                Chernobyl Fungi Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Test your knowledge about these amazing radiation-eating organisms!
              </p>
              <Progress value={(Object.keys(quizAnswers).length / quizQuestions.length) * 100} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {quizQuestions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}: {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant={quizAnswers[question.id] === optionIndex ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleQuizAnswer(question.id, optionIndex)}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </Button>
                    ))}
                  </div>
                  
                  {quizAnswers[question.id] !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-3 rounded-lg ${
                        quizAnswers[question.id] === question.correct
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <p className="font-medium">
                        {quizAnswers[question.id] === question.correct ? '✓ Correct!' : '✗ Incorrect'}
                      </p>
                      <p className="text-sm mt-1">{question.explanation}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {Object.keys(quizAnswers).length === quizQuestions.length && (
            <div className="mt-6 text-center">
              <Button onClick={submitQuiz} size="lg" className="bg-orange-500 hover:bg-orange-600">
                Submit Quiz & Earn XP
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button onClick={onBack} variant="outline" className="mb-4">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <h1 className="text-4xl font-bold text-gray-800">Chernobyl's Radiation-Eating Fungi</h1>
              <Badge variant="destructive">SPECIAL</Badge>
            </div>
            <p className="text-lg text-gray-600">
              Discover the incredible organisms that turned disaster into opportunity
            </p>
          </div>
          
          <Card className="w-64">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(sectionProgress)}%</span>
              </div>
              <Progress value={sectionProgress} />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Content Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Atom className="h-6 w-6 text-orange-500" />
                      {sections[currentSection].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <img
                        src={sections[currentSection].image}
                        alt={sections[currentSection].title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {sections[currentSection].content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                variant="outline"
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSection
                        ? 'bg-orange-500'
                        : index <= currentSection
                        ? 'bg-orange-300'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={() => {
                  if (currentSection === sections.length - 1) {
                    setShowQuiz(true);
                  } else {
                    setCurrentSection(Math.min(sections.length - 1, currentSection + 1));
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {currentSection === sections.length - 1 ? 'Take Quiz' : 'Next'}
              </Button>
            </div>
          </div>

          {/* Animation Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  Radiosynthesis Animation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadiationAnimation />
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>How it works:</strong> Gamma radiation hits the melanin in the fungus,
                    which converts it into chemical energy, just like plants convert sunlight!
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span>Radiation Source</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <span>Fungus</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-green-400" />
                      <span>Energy Conversion</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                  Did You Know?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p><strong>Space Applications:</strong> NASA is studying these fungi for potential use in space missions as radiation shielding and food production!</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p><strong>Cleanup Potential:</strong> These organisms might help clean up radioactive waste sites around the world.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p><strong>Ancient Process:</strong> Scientists believe radiosynthesis might be one of the oldest forms of energy conversion on Earth!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Quiz Access */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready for the Challenge?</h3>
                <p className="opacity-90">Test your knowledge and earn bonus XP!</p>
              </div>
              <Button
                onClick={() => setShowQuiz(true)}
                variant="secondary"
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Take Quiz Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChernobylSpecial;

