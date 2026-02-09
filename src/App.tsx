import React, { useState } from 'react';
import { Home, Calendar, Pill, Brain, Phone, Image, ArrowLeft } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { MedicationPage } from './components/MedicationPage';
import { SchedulePage } from './components/SchedulePage';
import { MemoryPage } from './components/MemoryPage';
import { ContactsPage } from './components/ContactsPage';
import { PhotosPage } from './components/PhotosPage';

type Page = 'home' | 'medication' | 'schedule' | 'memory' | 'contacts' | 'photos';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigation = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'medication' as Page, label: 'Meds', icon: Pill },
    { id: 'schedule' as Page, label: 'Schedule', icon: Calendar },
    { id: 'memory' as Page, label: 'Memory', icon: Brain },
    { id: 'photos' as Page, label: 'Photos', icon: Image },
    { id: 'contacts' as Page, label: 'Contacts', icon: Phone },
  ];

  const pageTitle = {
    home: 'Care Companion',
    medication: 'Medication',
    schedule: 'My Schedule',
    memory: 'Memory Games',
    contacts: 'Contacts',
    photos: 'My Photos'
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[430px] h-[932px] bg-black rounded-[60px] shadow-2xl p-3 border-8 border-gray-800">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
        
        {/* Phone Screen */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-[48px] overflow-hidden flex flex-col">
          
          {/* Status Bar */}
          <div className="h-12 flex items-center justify-between px-8 pt-2 bg-white/80 backdrop-blur-sm">
            <span className="text-sm font-semibold">9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4">📶</div>
              <div className="w-4 h-4">📱</div>
              <div className="w-4 h-4">🔋</div>
            </div>
          </div>

          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {currentPage !== 'home' && (
                <button
                  onClick={() => setCurrentPage('home')}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
              )}
              <h1 className="text-2xl font-semibold text-gray-900 flex-1">
                {pageTitle[currentPage]}
              </h1>
            </div>
          </header>

          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto px-4 py-4">
            {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
            {currentPage === 'medication' && <MedicationPage />}
            {currentPage === 'schedule' && <SchedulePage />}
            {currentPage === 'memory' && <MemoryPage />}
            {currentPage === 'contacts' && <ContactsPage />}
            {currentPage === 'photos' && <PhotosPage />}
          </main>

          {/* Bottom Navigation */}
          <nav className="bg-white border-t border-gray-200 shadow-lg px-2 pb-6">
            <div className="grid grid-cols-6 gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 transition-colors rounded-lg ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
