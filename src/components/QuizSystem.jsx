import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  CheckCircle, 
  XCircle, 
  Download,
  RotateCcw,
  Timer,
  Target,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizSystem = ({ onBack, onUpdateProgress }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const quizzes = [
    {
      id: 'energy-basics-quiz',
      title: 'Energy Basics Quiz',
      description: 'Test your understanding of energy and the Sun as our primary source',
      difficulty: 'Easy',
      questions: 5,
      timeLimit: 300,
      xpReward: 100,
      questions: [
        {
          id: 1,
          question: "What is the primary source of energy for most life on Earth?",
          options: ["The Moon", "The Sun", "Wind", "Water"],
          correct: 1,
          explanation: "The Sun provides the energy that drives photosynthesis in plants, which forms the base of most food chains."
        },
        {
          id: 2,
          question: "What process do plants use to convert sunlight into chemical energy?",
          options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
          correct: 1,
          explanation: "Photosynthesis is the process where plants use sunlight, carbon dioxide, and water to create glucose and oxygen."
        },
        {
          id: 3,
          question: "What form of energy do plants store from sunlight?",
          options: ["Heat energy", "Light energy", "Chemical energy", "Electrical energy"],
          correct: 2,
          explanation: "Plants convert light energy from the sun into chemical energy stored in glucose molecules."
        },
        {
          id: 4,
          question: "Which part of a plant is primarily responsible for photosynthesis?",
          options: ["Roots", "Stem", "Leaves", "Flowers"],
          correct: 2,
          explanation: "Leaves contain chloroplasts with chlorophyll, which capture sunlight for photosynthesis."
        },
        {
          id: 5,
          question: "What happens to energy as it moves through an ecosystem?",
          options: ["It increases", "It stays the same", "It decreases", "It disappears"],
          correct: 2,
          explanation: "Energy decreases as it moves through trophic levels due to metabolic processes and heat loss."
        }
      ]
    },
    {
      id: 'food-chains-quiz',
      title: 'Food Chains & Webs Quiz',
      description: 'Challenge yourself on food chains, webs, and energy transfer',
      difficulty: 'Medium',
      questions: 7,
      timeLimit: 420,
      xpReward: 150,
      questions: [
        {
          id: 1,
          question: "What always starts a food chain?",
          options: ["A consumer", "A producer", "A decomposer", "A predator"],
          correct: 1,
          explanation: "Food chains always begin with producers (plants) that can make their own food through photosynthesis."
        },
        {
          id: 2,
          question: "What is a primary consumer?",
          options: ["An animal that eats plants", "An animal that eats other animals", "A plant", "A decomposer"],
          correct: 0,
          explanation: "Primary consumers are herbivores that eat producers (plants) directly."
        },
        {
          id: 3,
          question: "How is a food web different from a food chain?",
          options: [
            "It's exactly the same",
            "It shows multiple interconnected food chains",
            "It only shows plants",
            "It only shows animals"
          ],
          correct: 1,
          explanation: "A food web shows how multiple food chains interconnect in an ecosystem, creating a complex network."
        },
        {
          id: 4,
          question: "What is a secondary consumer?",
          options: [
            "An animal that eats plants",
            "An animal that eats primary consumers",
            "A plant that eats animals",
            "A decomposer"
          ],
          correct: 1,
          explanation: "Secondary consumers are carnivores that eat primary consumers (herbivores)."
        },
        {
          id: 5,
          question: "Why are there usually fewer top predators than herbivores?",
          options: [
            "They're less important",
            "Energy is lost at each level",
            "They don't need as much food",
            "They reproduce more slowly"
          ],
          correct: 1,
          explanation: "Energy is lost at each trophic level, so there's less energy available to support top predators."
        },
        {
          id: 6,
          question: "What role do decomposers play in food webs?",
          options: [
            "They eat living plants",
            "They eat living animals",
            "They break down dead organisms",
            "They produce oxygen"
          ],
          correct: 2,
          explanation: "Decomposers break down dead organisms and waste, recycling nutrients back into the ecosystem."
        },
        {
          id: 7,
          question: "In the food chain: Grass → Rabbit → Fox, what is the fox?",
          options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"],
          correct: 2,
          explanation: "The fox is a secondary consumer because it eats the rabbit, which is a primary consumer."
        }
      ]
    },
    {
      id: 'ecosystem-roles-quiz',
      title: 'Ecosystem Roles Quiz',
      description: 'Master the roles of different organisms in ecosystems',
      difficulty: 'Medium',
      questions: 6,
      timeLimit: 360,
      xpReward: 120,
      questions: [
        {
          id: 1,
          question: "What are organisms called that make their own food?",
          options: ["Consumers", "Producers", "Decomposers", "Predators"],
          correct: 1,
          explanation: "Producers (like plants) make their own food through photosynthesis using sunlight."
        },
        {
          id: 2,
          question: "What do we call animals that only eat plants?",
          options: ["Carnivores", "Omnivores", "Herbivores", "Decomposers"],
          correct: 2,
          explanation: "Herbivores are animals that eat only plants, like rabbits, deer, and cows."
        },
        {
          id: 3,
          question: "What do we call animals that only eat other animals?",
          options: ["Herbivores", "Carnivores", "Omnivores", "Producers"],
          correct: 1,
          explanation: "Carnivores are animals that eat only other animals, like lions, hawks, and sharks."
        },
        {
          id: 4,
          question: "What do we call animals that eat both plants and animals?",
          options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"],
          correct: 2,
          explanation: "Omnivores eat both plants and animals, like humans, bears, and pigs."
        },
        {
          id: 5,
          question: "Which organisms break down dead material?",
          options: ["Producers", "Primary consumers", "Secondary consumers", "Decomposers"],
          correct: 3,
          explanation: "Decomposers like bacteria and fungi break down dead organisms and waste materials."
        },
        {
          id: 6,
          question: "What is a population in ecology?",
          options: [
            "All living things in an area",
            "All organisms of one species in an area",
            "All plants in an area",
            "All animals in an area"
          ],
          correct: 1,
          explanation: "A population is a group of organisms of the same species living in the same area at the same time."
        }
      ]
    }
  ];

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResults]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(quiz.timeLimit);
    setQuizStarted(true);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    setQuizStarted(false);
    setShowResults(true);
    
    const correctAnswers = selectedQuiz.questions.filter(q => 
      answers[q.id] === q.correct
    ).length;
    
    const score = (correctAnswers / selectedQuiz.questions.length) * 100;
    const xpEarned = Math.round((score / 100) * selectedQuiz.xpReward);
    
    // Save results
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    savedProgress.totalXP = (savedProgress.totalXP || 0) + xpEarned;
    
    if (!savedProgress.quizResults) savedProgress.quizResults = [];
    savedProgress.quizResults.push({
      quizId: selectedQuiz.id,
      score,
      correctAnswers,
      totalQuestions: selectedQuiz.questions.length,
      xpEarned,
      completedAt: new Date().toISOString()
    });
    
    // Add achievements
    if (!savedProgress.achievements) savedProgress.achievements = [];
    if (score === 100 && !savedProgress.achievements.includes('perfect-score')) {
      savedProgress.achievements.push('perfect-score');
    }
    if (score >= 80 && !savedProgress.achievements.includes('quiz-master')) {
      savedProgress.achievements.push('quiz-master');
    }
    
    localStorage.setItem('energyFlowProgress', JSON.stringify(savedProgress));
    onUpdateProgress?.(savedProgress);
  };

  const downloadResults = () => {
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    const results = savedProgress.quizResults || [];
    
    const csvContent = [
      'Quiz,Score,Correct Answers,Total Questions,XP Earned,Completed At',
      ...results.map(result => 
        `${result.quizId},${result.score}%,${result.correctAnswers},${result.totalQuestions},${result.xpEarned},${result.completedAt}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const correctAnswers = selectedQuiz.questions.filter(q => 
      answers[q.id] === q.correct
    ).length;
    const score = (correctAnswers / selectedQuiz.questions.length) * 100;
    const xpEarned = Math.round((score / 100) * selectedQuiz.xpReward);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="mb-4">
              {score >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
              ) : score >= 60 ? (
                <Star className="h-16 w-16 text-blue-500 mx-auto" />
              ) : (
                <Target className="h-16 w-16 text-gray-500 mx-auto" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
            <p className="text-xl text-gray-600">
              You scored {score}% on {selectedQuiz.title}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{score}%</div>
                <p className="text-gray-600">Final Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-green-600">{correctAnswers}/{selectedQuiz.questions.length}</div>
                <p className="text-gray-600">Correct Answers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-purple-600">+{xpEarned}</div>
                <p className="text-gray-600">XP Earned</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedQuiz.questions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              Your answer: {question.options[userAnswer] || 'No answer'}
                            </p>
                            {!isCorrect && (
                              <p className="text-green-600">
                                Correct answer: {question.options[question.correct]}
                              </p>
                            )}
                            <p className="text-gray-600 italic">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={() => setSelectedQuiz(null)} variant="outline">
              Back to Quizzes
            </Button>
            <Button onClick={() => startQuiz(selectedQuiz)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            <Button onClick={downloadResults} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Results
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuiz && quizStarted) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{selectedQuiz.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-red-600">
                  <Timer className="h-5 w-5" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={answers[question.id] === index ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-4"
                        onClick={() => handleAnswer(question.id, index)}
                      >
                        <span className="font-medium mr-3">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={() => setSelectedQuiz(null)}
              variant="outline"
            >
              Exit Quiz
            </Button>
            
            <Button
              onClick={nextQuestion}
              disabled={answers[question.id] === undefined}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === selectedQuiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={onBack} variant="outline" className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Center</h1>
          <p className="text-lg text-gray-600">
            Test your knowledge and earn XP with interactive quizzes!
          </p>
        </div>

        {/* Quiz Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <Badge variant={
                    quiz.difficulty === 'Easy' ? 'default' :
                    quiz.difficulty === 'Medium' ? 'secondary' : 'destructive'
                  }>
                    {quiz.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{quiz.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span>{Math.floor(quiz.timeLimit / 60)} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>XP Reward:</span>
                    <span className="text-purple-600 font-medium">Up to {quiz.xpReward} XP</span>
                  </div>
                </div>
                <Button
                  onClick={() => startQuiz(quiz)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Results */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              Recent Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuizResultsTable onDownload={downloadResults} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const QuizResultsTable = ({ onDownload }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('energyFlowProgress') || '{}');
    setResults(savedProgress.quizResults || []);
  }, []);

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No quiz results yet. Take a quiz to see your progress!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Quiz</th>
              <th className="text-left py-2">Score</th>
              <th className="text-left py-2">Correct</th>
              <th className="text-left py-2">XP Earned</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.slice(-10).reverse().map((result, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{result.quizId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td className="py-2">
                  <Badge variant={result.score >= 80 ? 'default' : result.score >= 60 ? 'secondary' : 'outline'}>
                    {result.score}%
                  </Badge>
                </td>
                <td className="py-2">{result.correctAnswers}/{result.totalQuestions}</td>
                <td className="py-2 text-purple-600 font-medium">+{result.xpEarned}</td>
                <td className="py-2">{new Date(result.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <Button onClick={onDownload} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download All Results
        </Button>
      </div>
    </div>
  );
};

export default QuizSystem;

