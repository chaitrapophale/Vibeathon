import React, { useState } from 'react';
import { Star, Trophy, ChevronRight, Lightbulb, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  completed: boolean;
}

export function MemoryPage() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: 'Word Match',
      description: 'Match related words together',
      difficulty: 'easy',
      icon: '📝',
      completed: true
    },
    {
      id: 2,
      title: 'Picture Pairs',
      description: 'Find matching images',
      difficulty: 'easy',
      icon: '🖼️',
      completed: false
    },
    {
      id: 3,
      title: 'Number Game',
      description: 'Remember number patterns',
      difficulty: 'medium',
      icon: '🔢',
      completed: false
    },
    {
      id: 4,
      title: 'Story Time',
      description: 'Listen and answer questions',
      difficulty: 'medium',
      icon: '📖',
      completed: false
    },
    {
      id: 5,
      title: 'Puzzle Fun',
      description: 'Complete jigsaw puzzles',
      difficulty: 'medium',
      icon: '🧩',
      completed: false
    },
    {
      id: 6,
      title: 'Name the Song',
      description: 'Identify familiar melodies',
      difficulty: 'easy',
      icon: '🎵',
      completed: false
    }
  ]);

  const toggleComplete = (id: number) => {
    setExercises(exercises.map(ex =>
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const totalPoints = completedCount * 10;

  return (
    <div className="space-y-4 pb-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
          <div className="text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-xs opacity-90">Points</p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg">
          <div className="text-center">
            <Star className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-xs opacity-90">Done</p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <div className="text-center">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs opacity-90">Day Streak</p>
          </div>
        </Card>
      </div>

      {/* Daily Goal */}
      <Card className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-300">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Daily Goal (3 games)</span>
          <span className="text-lg font-bold text-purple-600">{completedCount}/3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((completedCount / 3) * 100, 100)}%` }}
          ></div>
        </div>
        {completedCount >= 3 && (
          <p className="text-center text-sm text-green-600 font-bold mt-2">
            🎉 Goal achieved! Great job!
          </p>
        )}
      </Card>

      {/* Exercises List */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 px-1">Available Games</h3>
        {exercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={`p-4 shadow-md transition-all ${
              exercise.completed
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-white'
            }`}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="text-4xl">{exercise.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-lg font-bold text-gray-900">{exercise.title}</h4>
                  {exercise.completed && (
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {!exercise.completed && (
                <Button className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-base font-bold">
                  Start Game
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                onClick={() => toggleComplete(exercise.id)}
                variant={exercise.completed ? "outline" : "secondary"}
                className="w-full py-5 text-base font-bold"
              >
                {exercise.completed ? 'Undo' : 'Mark Complete'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Benefits */}
      <Card className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300">
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-8 h-8 text-orange-600 flex-shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-orange-900 mb-3">Why Play?</h4>
            <ul className="space-y-2 text-sm text-orange-800">
              <li className="flex items-start">
                <span className="mr-2">🧠</span>
                <span>Improve memory and focus</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">😊</span>
                <span>Feel accomplished</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⭐</span>
                <span>Have fun while learning</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
