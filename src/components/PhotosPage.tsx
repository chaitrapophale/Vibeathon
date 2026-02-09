import React, { useState } from 'react';
import { Heart, Calendar, Users, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Photo {
  id: number;
  url: string;
  title: string;
  description: string;
  date: string;
  people: string[];
  isFavorite: boolean;
}

export function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
      title: 'Family Gathering',
      description: 'Thanksgiving dinner',
      date: 'November 2025',
      people: ['John', 'Mary', 'Sarah'],
      isFavorite: true
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
      title: 'Beach Vacation',
      description: 'Summer fun',
      date: 'July 2025',
      people: ['Emily', 'Michael'],
      isFavorite: true
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800',
      title: 'Birthday Party',
      description: '80th celebration',
      date: 'March 2025',
      people: ['Family', 'Friends'],
      isFavorite: false
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=800',
      title: 'Anniversary',
      description: '50 years together',
      date: 'June 2024',
      people: ['Spouse'],
      isFavorite: true
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
      title: 'Garden Party',
      description: 'Spring celebration',
      date: 'April 2025',
      people: ['Neighbors'],
      isFavorite: false
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      title: 'Christmas',
      description: 'Opening presents',
      date: 'December 2024',
      people: ['John', 'Mary'],
      isFavorite: true
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const toggleFavorite = (id: number) => {
    setPhotos(photos.map(photo =>
      photo.id === id ? { ...photo, isFavorite: !photo.isFavorite } : photo
    ));
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto({ ...selectedPhoto, isFavorite: !selectedPhoto.isFavorite });
    }
  };

  const favoritePhotos = photos.filter(p => p.isFavorite);

  return (
    <div className="space-y-4 pb-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-lg">
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">{photos.length}</p>
            <p className="text-sm opacity-90">Total Photos</p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg">
          <div className="text-center">
            <Heart className="w-8 h-8 mx-auto mb-1 fill-white" />
            <p className="text-3xl font-bold mb-1">{favoritePhotos.length}</p>
            <p className="text-sm opacity-90">Favorites</p>
          </div>
        </Card>
      </div>

      {/* Photo Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 px-1">Your Memories</h3>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Card className="overflow-hidden shadow-md active:scale-95 transition-transform">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(photo.id);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg active:scale-90 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        photo.isFavorite
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-gray-900 mb-1 truncate">{photo.title}</h4>
                  <p className="text-xs text-gray-600 truncate">{photo.description}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{photo.date.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{photo.people.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <Card className="p-4 bg-purple-50 border-2 border-purple-300">
        <h4 className="text-base font-semibold text-purple-900 mb-3">Photo Tips</h4>
        <ul className="space-y-2 text-sm text-purple-800">
          <li className="flex items-start">
            <span className="mr-2">📸</span>
            <span>Photos help bring back happy memories</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">❤️</span>
            <span>Tap the heart to mark favorites</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">👨‍👩‍👧</span>
            <span>Share photos when family visits</span>
          </li>
        </ul>
      </Card>

      {/* Selected Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-[90%] max-h-[85vh] overflow-auto m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 left-3 bg-black/50 text-white rounded-full p-2 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(selectedPhoto.id);
                }}
                className="absolute top-3 right-3 bg-white rounded-full p-3 shadow-lg active:scale-90 transition-transform"
              >
                <Heart
                  className={`w-7 h-7 ${
                    selectedPhoto.isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.title}</h3>
              <p className="text-base text-gray-700 mb-4">{selectedPhoto.description}</p>
              <div className="space-y-3 mb-5">
                <div className="flex items-center text-base text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{selectedPhoto.date}</span>
                </div>
                <div className="flex items-start text-base text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">People:</p>
                    <p>{selectedPhoto.people.join(', ')}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setSelectedPhoto(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-bold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
