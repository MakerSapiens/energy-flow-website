import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Zap, 
  Target, 
  Users, 
  Leaf, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LearningModule = ({ moduleId, onBack, onUpdateProgress }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [completedSlides, setCompletedSlides] = useState(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const modules = {
    'energy-basics': {
      title: 'Energy Basics',
      icon: Sun,
      color: 'bg-yellow-500',
      slides: [
        {
          id: 'intro',
          title: 'What is Energy?',
          content: 'Energy is the ability to do work or cause change. In living systems, energy flows from one organism to another, powering all life processes.',
          animation: 'fadeIn',
          interactive: false
        },
        {
          id: 'sun-source',
          title: 'The Sun: Our Primary Energy Source',
          content: 'The Sun provides virtually all energy for life on Earth. Solar energy drives photosynthesis in plants, which forms the foundation of all food chains.',
          animation: 'sunRays',
          interactive: true
        },
        {
          id: 'energy-forms',
          title: 'Forms of Energy in Living Systems',
          content: 'Energy exists in different forms: light energy from the sun, chemical energy in food, and kinetic energy in movement. Energy can be converted from one form to another.',
          animation: 'energyConversion',
          interactive: true
        }
      ],
      quiz: [
        {
          id: 1,
          question: "What is the primary source of energy for most life on Earth?",
          options: ["The Moon", "The Sun", "Wind", "Geothermal energy"],
          correct: 1,
          explanation: "The Sun provides the energy that drives photosynthesis, which is the foundation of most food chains."
        },
        {
          id: 2,
          question: "What process converts solar energy into chemical energy?",
          options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
          correct: 1,
          explanation: "Photosynthesis converts light energy from the sun into chemical energy stored in glucose."
        }
      ]
    },
    'energy-flow': {
      title: 'Energy Flow Through Organisms',
      icon: Zap,
      color: 'bg-blue-500',
      slides: [
        {
          id: 'energy-transfer',
          title: 'How Energy Moves',
          content: 'Energy flows through living organisms in a one-way direction. It enters as light energy and is converted to chemical energy, then transferred through feeding relationships.',
          animation: 'energyFlow',
          interactive: true
        },
        {
          id: 'energy-loss',
          title: 'Energy Loss at Each Level',
          content: 'At each step in a food chain, about 90% of energy is lost as heat through metabolic processes. Only 10% is passed to the next level.',
          animation: 'energyPyramid',
          interactive: true
        },
        {
          id: 'energy-efficiency',
          title: 'Why Energy Transfer is Inefficient',
          content: 'Energy is lost through cellular respiration, movement, heat production, and waste. This explains why food chains are usually short.',
          animation: 'energyLoss',
          interactive: false
        }
      ],
      quiz: [
        {
          id: 1,
          question: "What percentage of energy is typically passed from one trophic level to the next?",
          options: ["90%", "50%", "10%", "1%"],
          correct: 2,
          explanation: "Only about 10% of energy is transferred between trophic levels, with 90% lost as heat and metabolic processes."
        },
        {
          id: 2,
          question: "Why are food chains usually short?",
          options: [
            "Animals don't like to eat many things",
            "Energy is lost at each level",
            "There aren't enough different species",
            "It's easier to draw short chains"
          ],
          correct: 1,
          explanation: "Energy loss at each level limits the number of trophic levels that can be supported in an ecosystem."
        }
      ]
    },
    'food-chains': {
      title: 'Food Chains',
      icon: Target,
      color: 'bg-green-500',
      slides: [
        {
          id: 'chain-definition',
          title: 'What is a Food Chain?',
          content: 'A food chain shows the transfer of energy from one organism to the next. It always starts with a producer and shows who eats whom.',
          animation: 'chainBuilder',
          interactive: true
        },
        {
          id: 'chain-levels',
          title: 'Trophic Levels',
          content: 'Each step in a food chain is called a trophic level. Producers are at the first level, primary consumers at the second, and so on.',
          animation: 'trophicLevels',
          interactive: true
        },
        {
          id: 'chain-examples',
          title: 'Food Chain Examples',
          content: 'Grass → Rabbit → Fox is a simple food chain. Ocean example: Phytoplankton → Krill → Fish → Seal → Shark.',
          animation: 'chainExamples',
          interactive: true
        }
      ],
      quiz: [
        {
          id: 1,
          question: "What always starts a food chain?",
          options: ["A consumer", "A producer", "A decomposer", "A predator"],
          correct: 1,
          explanation: "Food chains always begin with producers (plants) that can make their own food."
        },
        {
          id: 2,
          question: "In the food chain Grass → Rabbit → Fox, what is the rabbit?",
          options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
          correct: 1,
          explanation: "The rabbit is a primary consumer because it eats the producer (grass)."
        }
      ]
    },
    'food-webs': {
      title: 'Food Webs',
      icon: Users,
      color: 'bg-purple-500',
      slides: [
        {
          id: 'web-definition',
          title: 'What is a Food Web?',
          content: 'A food web is a network of interconnected food chains. It shows the complex feeding relationships in an ecosystem.',
          animation: 'webBuilder',
          interactive: true
        },
        {
          id: 'web-complexity',
          title: 'Why Food Webs are Important',
          content: 'Food webs show that most organisms eat more than one thing and are eaten by more than one predator. This creates stability in ecosystems.',
          animation: 'webStability',
          interactive: true
        },
        {
          id: 'web-vs-chain',
          title: 'Food Webs vs Food Chains',
          content: 'Food chains are simple and linear. Food webs are complex and show multiple pathways for energy flow through an ecosystem.',
          animation: 'webComparison',
          interactive: true
        }
      ],
      quiz: [
        {
          id: 1,
          question: "How is a food web different from a food chain?",
          options: [
            "It's exactly the same",
            "It shows multiple interconnected food chains",
            "It only shows plants",
            "It's simpler than a food chain"
          ],
          correct: 1,
          explanation: "A food web shows how multiple food chains interconnect, creating a complex network of feeding relationships."
        },
        {
          id: 2,
          question: "Why do food webs make ecosystems more stable?",
          options: [
            "They look prettier",
            "They provide multiple food sources",
            "They are easier to understand",
            "They have fewer organisms"
          ],
          correct: 1,
          explanation: "Food webs provide alternative food sources, so if one species disappears, others can fill the gap."
        }
      ]
    },
    'organism-roles': {
      title: 'Organism Roles',
      icon: Leaf,
      color: 'bg-emerald-500',
      slides: [
        {
          id: 'producers',
          title: 'Producers: The Foundation',
          content: 'Producers make their own food through photosynthesis. They include plants, algae, and some bacteria. They form the base of all food chains.',
          animation: 'photosynthesis',
          interactive: true
        },
        {
          id: 'consumers',
          title: 'Consumers: The Energy Users',
          content: 'Consumers get energy by eating other organisms. Primary consumers eat producers, secondary consumers eat primary consumers, and so on.',
          animation: 'consumerLevels',
          interactive: true
        },
        {
          id: 'decomposers',
          title: 'Decomposers: The Recyclers',
          content: 'Decomposers break down dead organisms and waste materials, returning nutrients to the soil for producers to use again.',
          animation: 'decomposition',
          interactive: true
        }
      ],
      quiz: [
        {
          id: 1,
          question: "What do we call organisms that make their own food?",
          options: ["Consumers", "Producers", "Decomposers", "Predators"],
          correct: 1,
          explanation: "Producers make their own food through photosynthesis using sunlight, water, and carbon dioxide."
        },
        {
          id: 2,
          question: "What role do decomposers play?",
          options: [
            "They eat living plants",
            "They eat living animals",
            "They break down dead organisms",
            "They make their own food"
          ],
          correct: 2,
          explanation: "Decomposers break down dead organisms and waste, recycling nutrients back into the ecosystem."
        }
      ]
    }
  };

  const currentModule = modules[moduleId];
  const currentSlideData = currentModule?.slides[currentSlide];

  useEffect(() => {
    // Load completed slides from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    if (savedProgress[moduleId + '_completed']) {
      setCompletedSlides(new Set(savedProgress[moduleId + '_completed']));
    }
  }, [moduleId]);

  const markSlideComplete = () => {
    const newCompleted = new Set(completedSlides);
    newCompleted.add(currentSlideData.id);
    setCompletedSlides(newCompleted);
    
    // Save to localStorage
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    savedProgress[moduleId + '_completed'] = Array.from(newCompleted);
    savedProgress[moduleId] = (newCompleted.size / currentModule.slides.length) * 100;
    localStorage.setItem('energyFlowProgress', JSON.stringify(savedProgress));
    onUpdateProgress?.(savedProgress);
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    const correctAnswers = currentModule.quiz.filter(q => quizAnswers[q.id] === q.correct).length;
    const score = (correctAnswers / currentModule.quiz.length) * 100;
    const xpEarned = Math.round(score * 1.5); // Up to 150 XP for perfect score
    
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    savedProgress.totalXP = (savedProgress.totalXP || 0) + xpEarned;
    savedProgress[moduleId] = 100; // Complete the module
    
    if (!savedProgress.achievements) savedProgress.achievements = [];
    if (score === 100 && !savedProgress.achievements.includes('module-master')) {
      savedProgress.achievements.push('module-master');
    }
    
    localStorage.setItem('energyFlowProgress', JSON.stringify(savedProgress));
    onUpdateProgress?.(savedProgress);
    
    alert(`Module completed! Score: ${score}% (+${xpEarned} XP)`);
    onBack();
  };

  const AnimationComponent = ({ type }) => {
    const animations = {
      sunRays: (
        <div className="relative w-full h-48 bg-gradient-to-b from-blue-400 to-green-400 rounded-lg overflow-hidden">
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full"
            animate={animationPlaying ? {
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {animationPlaying && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-8 left-1/2 w-1 h-8 bg-yellow-300 origin-bottom"
                  style={{
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                    transformOrigin: '50% 100%'
                  }}
                  animate={{
                    scaleY: [0.5, 1.5, 0.5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </>
          )}
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          {animationPlaying && (
            <motion.div
              className="absolute bottom-8 left-20 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 text-white" />
              <span className="text-white text-sm ml-2">Energy!</span>
            </motion.div>
          )}
        </div>
      ),
      energyFlow: (
        <div className="relative w-full h-48 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg overflow-hidden">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            🐰
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            🦊
          </div>
          {animationPlaying && (
            <>
              <motion.div
                className="absolute left-12 top-1/2 transform -translate-y-1/2"
                animate={{ x: [0, 80, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-6 h-6 text-yellow-500" />
              </motion.div>
              <motion.div
                className="absolute left-1/3 top-1/2 transform translate-x-8 -translate-y-1/2"
                animate={{ x: [0, 80, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Zap className="w-6 h-6 text-orange-500" />
              </motion.div>
            </>
          )}
        </div>
      ),
      chainBuilder: (
        <div className="relative w-full h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between h-full">
            <motion.div
              className="flex flex-col items-center"
              animate={animationPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium">Producer</span>
            </motion.div>
            
            {animationPlaying && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ArrowRight className="w-8 h-8 text-gray-600" />
              </motion.div>
            )}
            
            <motion.div
              className="flex flex-col items-center"
              animate={animationPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center mb-2">
                🐰
              </div>
              <span className="text-sm font-medium">Primary Consumer</span>
            </motion.div>
            
            {animationPlaying && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <ArrowRight className="w-8 h-8 text-gray-600" />
              </motion.div>
            )}
            
            <motion.div
              className="flex flex-col items-center"
              animate={animationPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mb-2">
                🦊
              </div>
              <span className="text-sm font-medium">Secondary Consumer</span>
            </motion.div>
          </div>
        </div>
      )
    };

    return animations[type] || <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">Animation Placeholder</div>;
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Module Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The requested learning module could not be found.</p>
          <Button onClick={onBack}>← Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => setShowQuiz(false)} variant="outline">
              ← Back to Module
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-purple-500" />
                {currentModule.title} Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Test your understanding of this module!
              </p>
              <Progress value={(Object.keys(quizAnswers).length / currentModule.quiz.length) * 100} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {currentModule.quiz.map((question, index) => (
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

          {Object.keys(quizAnswers).length === currentModule.quiz.length && (
            <div className="mt-6 text-center">
              <Button onClick={submitQuiz} size="lg" className="bg-purple-500 hover:bg-purple-600">
                Complete Module & Earn XP
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const IconComponent = currentModule.icon;
  const progress = ((currentSlide + 1) / currentModule.slides.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button onClick={onBack} variant="outline" className="mb-4">
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${currentModule.color} text-white`}>
                <IconComponent className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">{currentModule.title}</h1>
            </div>
            <p className="text-lg text-gray-600">
              Slide {currentSlide + 1} of {currentModule.slides.length}
            </p>
          </div>
          
          <Card className="w-64">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">Completed:</span>
                <div className="flex gap-1">
                  {currentModule.slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`w-2 h-2 rounded-full ${
                        completedSlides.has(slide.id)
                          ? 'bg-green-500'
                          : index === currentSlide
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Content Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{currentSlideData.title}</span>
                      {completedSlides.has(currentSlideData.id) && (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {currentSlideData.content}
                    </p>
                    
                    {!completedSlides.has(currentSlideData.id) && (
                      <Button
                        onClick={markSlideComplete}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Complete (+10 XP)
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                variant="outline"
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {currentModule.slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? 'bg-blue-500'
                        : completedSlides.has(currentModule.slides[index].id)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={() => {
                  if (currentSlide === currentModule.slides.length - 1) {
                    setShowQuiz(true);
                  } else {
                    setCurrentSlide(Math.min(currentModule.slides.length - 1, currentSlide + 1));
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {currentSlide === currentModule.slides.length - 1 ? 'Take Quiz' : 'Next'}
              </Button>
            </div>
          </div>

          {/* Animation Section */}
          <div className="space-y-6">
            {currentSlideData.interactive && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    Interactive Animation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimationComponent type={currentSlideData.animation} />
                  <div className="mt-4 flex justify-center gap-2">
                    <Button
                      onClick={() => setAnimationPlaying(!animationPlaying)}
                      size="sm"
                      variant="outline"
                    >
                      {animationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {animationPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      onClick={() => setAnimationPlaying(false)}
                      size="sm"
                      variant="outline"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Slides Completed:</span>
                    <span>{completedSlides.size}/{currentModule.slides.length}</span>
                  </div>
                  <Progress value={(completedSlides.size / currentModule.slides.length) * 100} />
                  <div className="text-xs text-gray-500">
                    Complete all slides to unlock the quiz and earn bonus XP!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Module Complete */}
        {completedSlides.size === currentModule.slides.length && (
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Module Complete!</h3>
                  <p className="opacity-90">You've completed all slides. Ready for the quiz?</p>
                </div>
                <Button
                  onClick={() => setShowQuiz(true)}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Take Quiz Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LearningModule;

