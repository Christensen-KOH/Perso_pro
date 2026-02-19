import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Gamepad2,
  Trophy,
  Clock,
  Star,
  Zap,
  Users,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  ArrowRight,
  Target,
  Flame,
} from 'lucide-react';

// Game Types
interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  players: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const games: Game[] = [
  {
    id: 'maze-chase',
    title: 'Maze Chase',
    description: 'Navigate through mazes while collecting vocabulary words before time runs out!',
    icon: '🏃',
    color: 'from-green-400 to-emerald-500',
    players: 2540,
    rating: 4.8,
    difficulty: 'Medium',
    category: 'Vocabulary',
  },
  {
    id: 'word-match',
    title: 'Word Match',
    description: 'Match English words with their definitions and images. Test your memory!',
    icon: '🧩',
    color: 'from-blue-400 to-indigo-500',
    players: 3120,
    rating: 4.9,
    difficulty: 'Easy',
    category: 'Vocabulary',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Learn new words with interactive flashcards. Includes pronunciation!',
    icon: '🎴',
    color: 'from-purple-400 to-pink-500',
    players: 4150,
    rating: 4.7,
    difficulty: 'Easy',
    category: 'Learning',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Test your knowledge with timed quizzes on grammar, vocabulary, and more!',
    icon: '❓',
    color: 'from-orange-400 to-red-500',
    players: 5820,
    rating: 4.6,
    difficulty: 'Hard',
    category: 'Quiz',
  },
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    description: 'Drag and drop words to form correct sentences. Practice grammar!',
    icon: '📝',
    color: 'from-cyan-400 to-blue-500',
    players: 1890,
    rating: 4.5,
    difficulty: 'Medium',
    category: 'Grammar',
  },
  {
    id: 'spelling-bee',
    title: 'Spelling Bee',
    description: 'Listen and spell words correctly. Improve your spelling skills!',
    icon: '🐝',
    color: 'from-yellow-400 to-orange-500',
    players: 2230,
    rating: 4.8,
    difficulty: 'Medium',
    category: 'Spelling',
  },
];

// Quiz Game Component
function QuizGame({ onClose }: { onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'finished'>('playing');

  const questions = [
    {
      question: 'What is the correct past tense of "go"?',
      options: ['goed', 'went', 'gone', 'going'],
      correct: 'went',
    },
    {
      question: 'Which word is a synonym for "happy"?',
      options: ['sad', 'joyful', 'angry', 'tired'],
      correct: 'joyful',
    },
    {
      question: 'Choose the correct article: "___ apple a day keeps the doctor away."',
      options: ['A', 'An', 'The', 'No article'],
      correct: 'An',
    },
    {
      question: 'What is the plural form of "child"?',
      options: ['childs', 'children', 'childes', 'child'],
      correct: 'children',
    },
    {
      question: 'Which sentence is in the present continuous tense?',
      options: [
        'I eat breakfast every day.',
        'I am eating breakfast now.',
        'I ate breakfast yesterday.',
        'I will eat breakfast tomorrow.',
      ],
      correct: 'I am eating breakfast now.',
    },
  ];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleAnswer('');
    }
  }, [timeLeft, gameState, selectedAnswer]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 100 + timeLeft * 10);
      toast.success('Correct!', { duration: 1000 });
    } else {
      toast.error('Incorrect!', { duration: 1000 });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        setShowResult(true);
        setGameState('finished');
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="font-display text-3xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-center mb-6">
          <p className="text-4xl font-display font-bold text-brand-blue mb-2">{score}</p>
          <p className="text-muted-foreground">Points earned</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setTimeLeft(15);
            setSelectedAnswer(null);
            setShowResult(false);
            setGameState('playing');
          }}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
          <Button variant="outline" onClick={onClose}>
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-display font-bold">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <Progress value={(currentQuestion / questions.length) * 100} className="w-32 h-2" />
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-1 text-lg">
            <Clock className="h-4 w-4" />
            {timeLeft}s
          </Badge>
          <Badge variant="secondary" className="gap-1 text-lg">
            <Zap className="h-4 w-4" />
            {score}
          </Badge>
        </div>
      </div>

      {/* Question */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <h3 className="text-xl font-medium text-center">
            {questions[currentQuestion].question}
          </h3>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {questions[currentQuestion].options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              selectedAnswer === null
                ? 'border-border hover:border-brand-blue hover:bg-brand-bg-blue/50'
                : selectedAnswer === option
                ? option === questions[currentQuestion].correct
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : option === questions[currentQuestion].correct
                ? 'border-green-500 bg-green-50'
                : 'border-border opacity-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {selectedAnswer === option && (
                option === questions[currentQuestion].correct ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Word Match Game Component
function WordMatchGame({ onClose }: { onClose: () => void }) {
  const [cards, setCards] = useState([
    { id: 1, word: 'Happy', matched: false, flipped: false },
    { id: 2, word: 'Joyful', matched: false, flipped: false },
    { id: 3, word: 'Sad', matched: false, flipped: false },
    { id: 4, word: 'Unhappy', matched: false, flipped: false },
    { id: 5, word: 'Big', matched: false, flipped: false },
    { id: 6, word: 'Large', matched: false, flipped: false },
    { id: 7, word: 'Small', matched: false, flipped: false },
    { id: 8, word: 'Tiny', matched: false, flipped: false },
  ]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards.find(c => c.id === id)?.flipped) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const firstCard = cards.find(c => c.id === flippedCards[0]);
      const secondCard = cards.find(c => c.id === id);

      // Check if match (simplified logic)
      const isMatch = 
        (firstCard?.word === 'Happy' && secondCard?.word === 'Joyful') ||
        (firstCard?.word === 'Joyful' && secondCard?.word === 'Happy') ||
        (firstCard?.word === 'Sad' && secondCard?.word === 'Unhappy') ||
        (firstCard?.word === 'Unhappy' && secondCard?.word === 'Sad') ||
        (firstCard?.word === 'Big' && secondCard?.word === 'Large') ||
        (firstCard?.word === 'Large' && secondCard?.word === 'Big') ||
        (firstCard?.word === 'Small' && secondCard?.word === 'Tiny') ||
        (firstCard?.word === 'Tiny' && secondCard?.word === 'Small');

      setTimeout(() => {
        if (isMatch) {
          setCards(prev => prev.map(c => 
            c.id === flippedCards[0] || c.id === id ? { ...c, matched: true } : c
          ));
          setMatches(matches + 1);
          toast.success('Match!', { duration: 1000 });
        } else {
          setCards(prev => prev.map(c => 
            c.id === flippedCards[0] || c.id === id ? { ...c, flipped: false } : c
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  if (matches === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display text-3xl font-bold mb-4">Congratulations!</h2>
        <p className="text-muted-foreground mb-6">You completed the game in {moves} moves!</p>
        <div className="flex gap-3">
          <Button onClick={() => {
            setCards([
              { id: 1, word: 'Happy', matched: false, flipped: false },
              { id: 2, word: 'Joyful', matched: false, flipped: false },
              { id: 3, word: 'Sad', matched: false, flipped: false },
              { id: 4, word: 'Unhappy', matched: false, flipped: false },
              { id: 5, word: 'Big', matched: false, flipped: false },
              { id: 6, word: 'Large', matched: false, flipped: false },
              { id: 7, word: 'Small', matched: false, flipped: false },
              { id: 8, word: 'Tiny', matched: false, flipped: false },
            ]);
            setMatches(0);
            setMoves(0);
            setFlippedCards([]);
          }}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
          <Button variant="outline" onClick={onClose}>
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-1">
            <Target className="h-4 w-4" />
            Matches: {matches}/4
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-4 w-4" />
            Moves: {moves}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched || card.flipped}
            className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
              card.matched
                ? 'border-green-500 bg-green-50 opacity-50'
                : card.flipped
                ? 'border-brand-blue bg-brand-bg-blue'
                : 'border-border bg-muted hover:border-brand-blue/50'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              {(card.flipped || card.matched) ? (
                <span className="font-medium text-sm">{card.word}</span>
              ) : (
                <span className="text-2xl">?</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ESLGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'quiz-master') {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => setActiveGame(null)} className="mb-6">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Games
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <span className="text-3xl">❓</span>
                  Quiz Master
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuizGame onClose={() => setActiveGame(null)} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeGame === 'word-match') {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => setActiveGame(null)} className="mb-6">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Games
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <span className="text-3xl">🧩</span>
                  Word Match
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WordMatchGame onClose={() => setActiveGame(null)} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                ESL Game Zone
              </h1>
              <p className="text-muted-foreground">
                Learn English while having fun with our interactive games!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1 text-lg px-4 py-2">
                <Flame className="h-5 w-5 text-orange-500" />
                2,450 XP
              </Badge>
              <Badge variant="secondary" className="gap-1 text-lg px-4 py-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Rank #42
              </Badge>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Games Played', value: '47', icon: Gamepad2 },
              { label: 'Total Score', value: '12,450', icon: Star },
              { label: 'Active Players', value: '1,240', icon: Users },
              { label: 'Time Played', value: '8h 32m', icon: Clock },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-bg-blue flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card
                key={game.id}
                className="group overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-card"
                onClick={() => {
                  if (game.id === 'quiz-master' || game.id === 'word-match') {
                    setActiveGame(game.id);
                  } else {
                    toast.info(`${game.title} coming soon!`, {
                      description: 'Try Quiz Master or Word Match for now.',
                    });
                  }
                }}
              >
                <div className={`h-2 bg-gradient-to-r ${game.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{game.icon}</span>
                    <Badge 
                      variant={game.difficulty === 'Easy' ? 'default' : game.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {game.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {game.players.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {game.rating}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {game.category}
                    </Badge>
                  </div>

                  <Button className={`w-full mt-4 bg-gradient-to-r ${game.color} text-white border-0`}>
                    <Play className="mr-2 h-4 w-4" />
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leaderboard Preview */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Players This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Sarah M.', score: 15420, avatar: '/avatar-1.jpg' },
                  { rank: 2, name: 'James K.', score: 14250, avatar: '/avatar-2.jpg' },
                  { rank: 3, name: 'Emma L.', score: 13890, avatar: '/avatar-3.jpg' },
                  { rank: 4, name: 'Michael R.', score: 12500, avatar: '/avatar-2.jpg' },
                  { rank: 5, name: 'Lisa T.', score: 11980, avatar: '/avatar-1.jpg' },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        player.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        player.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        player.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {player.rank}
                      </div>
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Zap className="h-3 w-3" />
                      {player.score.toLocaleString()} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
