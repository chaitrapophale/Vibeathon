import React from 'react';
import { Sun, Cloud, Heart, Bell, Pill, Calendar, Brain, Image, Phone, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';

interface HomePageProps {
  onNavigate: (page: 'home' | 'medication' | 'schedule' | 'memory' | 'contacts' | 'photos') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const quickActions = [
    { id: 'medication', label: 'Medications', icon: Pill, color: 'bg-red-500', page: 'medication' as const },
    { id: 'schedule', label: 'Schedule', icon: Calendar, color: 'bg-purple-500', page: 'schedule' as const },
    { id: 'memory', label: 'Memory', icon: Brain, color: 'bg-pink-500', page: 'memory' as const },
    { id: 'photos', label: 'Photos', icon: Image, color: 'bg-orange-500', page: 'photos' as const },
  ];

  const upcomingTasks = [
    { time: '12:00 PM', task: 'Lunch time', type: 'meal' },
    { time: '2:00 PM', task: 'Memory exercises', type: 'activity' },
    { time: '6:00 PM', task: 'Evening medication', type: 'medication' },
  ];

  return (
    <div className="space-y-4 pb-4">
      {/* Greeting Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-3xl font-bold mb-1">{greeting}!</h2>
            <p className="text-base text-blue-100">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          {hour < 18 ? (
            <Sun className="w-16 h-16 text-yellow-300" />
          ) : (
            <Cloud className="w-16 h-16 text-blue-200" />
          )}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-white shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-2">
              <Heart className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">Medications</p>
            <p className="text-2xl font-bold text-gray-900">2 of 4</p>
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-2">
              <Bell className="w-7 h-7 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">Tasks Done</p>
            <p className="text-2xl font-bold text-gray-900">5 of 8</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.page)}
                className={`${action.color} text-white p-6 rounded-2xl shadow-lg active:scale-95 transition-transform`}
              >
                <Icon className="w-10 h-10 mb-2 mx-auto" />
                <p className="text-base font-semibold">{action.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Up */}
      <Card className="p-4 bg-white shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Coming Up</h3>
        <div className="space-y-3">
          {upcomingTasks.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex-1">
                <p className="text-base font-semibold text-blue-600">{item.time}</p>
                <p className="text-sm text-gray-700">{item.task}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.type === 'medication' 
                  ? 'bg-red-100 text-red-700' 
                  : item.type === 'meal'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Contact */}
      <button
        onClick={() => onNavigate('contacts')}
        className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white p-5 rounded-2xl shadow-lg flex items-center justify-between active:scale-95 transition-transform"
      >
        <div className="flex items-center space-x-3">
          <Phone className="w-8 h-8" />
          <div className="text-left">
            <p className="text-base font-semibold">Emergency Contacts</p>
            <p className="text-sm text-green-100">Tap to call family</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Daily Reminder */}
      <Card className="p-4 bg-amber-50 border-2 border-amber-200 shadow-md">
        <div className="flex items-start space-x-3">
          <Bell className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-base font-semibold text-amber-900 mb-1">Reminder</h4>
            <p className="text-sm text-amber-800">
              Remember to drink water and take a short walk today!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
