import React, { useState } from 'react';
import { Check, Coffee, Utensils, Moon, Sun, Activity, Droplet } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ScheduleItem {
  id: number;
  time: string;
  activity: string;
  category: 'meal' | 'medication' | 'exercise' | 'social' | 'rest' | 'hygiene';
  completed: boolean;
}

export function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { id: 1, time: '7:00 AM', activity: 'Wake up', category: 'hygiene', completed: true },
    { id: 2, time: '8:00 AM', activity: 'Breakfast', category: 'meal', completed: true },
    { id: 3, time: '9:00 AM', activity: 'Morning meds', category: 'medication', completed: true },
    { id: 4, time: '10:00 AM', activity: 'Short walk', category: 'exercise', completed: true },
    { id: 5, time: '12:00 PM', activity: 'Lunch', category: 'meal', completed: false },
    { id: 6, time: '1:00 PM', activity: 'Rest time', category: 'rest', completed: false },
    { id: 7, time: '2:00 PM', activity: 'Memory games', category: 'exercise', completed: false },
    { id: 8, time: '3:00 PM', activity: 'Snack', category: 'meal', completed: false },
    { id: 9, time: '4:00 PM', activity: 'Social time', category: 'social', completed: false },
    { id: 10, time: '6:00 PM', activity: 'Dinner', category: 'meal', completed: false },
    { id: 11, time: '6:30 PM', activity: 'Evening meds', category: 'medication', completed: false },
    { id: 12, time: '9:00 PM', activity: 'Get ready for bed', category: 'hygiene', completed: false },
  ]);

  const toggleComplete = (id: number) => {
    setSchedule(schedule.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meal': return Utensils;
      case 'medication': return Coffee;
      case 'exercise': return Activity;
      case 'social': return Sun;
      case 'rest': return Moon;
      case 'hygiene': return Droplet;
      default: return Sun;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meal': return 'bg-green-500';
      case 'medication': return 'bg-red-500';
      case 'exercise': return 'bg-purple-500';
      case 'social': return 'bg-yellow-500';
      case 'rest': return 'bg-blue-500';
      case 'hygiene': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const completedCount = schedule.filter(item => item.completed).length;
  const nextTask = schedule.find(item => !item.completed);

  return (
    <div className="space-y-4 pb-4">
      {/* Progress Card */}
      <Card className="p-5 bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg">
        <div className="text-center mb-4">
          <p className="text-5xl font-bold mb-2">{completedCount}/{schedule.length}</p>
          <p className="text-base text-purple-100">Tasks completed</p>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / schedule.length) * 100}%` }}
          ></div>
        </div>
      </Card>

      {/* Next Up */}
      {nextTask && (
        <Card className="p-5 bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
          <p className="text-sm font-semibold mb-2 opacity-90">NEXT UP</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold mb-1">{nextTask.time}</p>
              <p className="text-lg">{nextTask.activity}</p>
            </div>
            <Button
              onClick={() => toggleComplete(nextTask.id)}
              className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-6 text-base font-bold"
            >
              Done
            </Button>
          </div>
        </Card>
      )}

      {/* Schedule Items */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 px-1">Today's Schedule</h3>
        {schedule.map((item) => {
          const CategoryIcon = getCategoryIcon(item.category);
          const colorClass = getCategoryColor(item.category);
          
          return (
            <Card
              key={item.id}
              className={`p-4 shadow-md transition-all ${
                item.completed
                  ? 'bg-green-50 border-2 border-green-300 opacity-75'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`${colorClass} p-2.5 rounded-xl text-white`}>
                  <CategoryIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-blue-600">{item.time}</p>
                  <p className={`text-base ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.activity}
                  </p>
                </div>
                {item.completed && (
                  <Check className="w-7 h-7 text-green-600" />
                )}
              </div>
              
              {!item.completed && (
                <Button
                  onClick={() => toggleComplete(item.id)}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-5 text-base font-bold"
                >
                  Mark Complete
                </Button>
              )}
              
              {item.completed && (
                <Button
                  onClick={() => toggleComplete(item.id)}
                  variant="outline"
                  className="w-full py-5 text-base font-bold"
                >
                  Undo
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="p-4 bg-purple-50 border-2 border-purple-300">
        <h4 className="text-base font-semibold text-purple-900 mb-3">Daily Tips</h4>
        <ul className="space-y-2 text-sm text-purple-800">
          <li className="flex items-start">
            <span className="mr-2 text-base">✓</span>
            <span>Keep activities at the same time each day</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-base">✓</span>
            <span>Take breaks when needed</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-base">✓</span>
            <span>Stay hydrated throughout the day</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
