import React, { useState } from 'react';
import { Clock, CheckCircle, Circle, AlertCircle, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  instructions: string;
}

export function MedicationPage() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Donepezil',
      dosage: '10mg',
      time: '9:00 AM',
      taken: true,
      instructions: 'Take with breakfast'
    },
    {
      id: 2,
      name: 'Memantine',
      dosage: '5mg',
      time: '9:00 AM',
      taken: true,
      instructions: 'Take with food'
    },
    {
      id: 3,
      name: 'Vitamin B12',
      dosage: '1000mcg',
      time: '2:00 PM',
      taken: false,
      instructions: 'With or without food'
    },
    {
      id: 4,
      name: 'Donepezil',
      dosage: '10mg',
      time: '6:00 PM',
      taken: false,
      instructions: 'Take with dinner'
    },
  ]);

  const toggleMedication = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const takenCount = medications.filter(m => m.taken).length;
  const totalCount = medications.length;

  return (
    <div className="space-y-4 pb-4">
      {/* Progress Card */}
      <Card className="p-5 bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg">
        <div className="text-center mb-4">
          <p className="text-5xl font-bold mb-2">{takenCount}/{totalCount}</p>
          <p className="text-base text-red-100">Medications taken today</p>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${(takenCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="p-4 bg-amber-50 border-2 border-amber-300">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">Important</p>
            <p className="text-xs text-amber-800">
              Take medications as prescribed. Contact your doctor if you miss a dose.
            </p>
          </div>
        </div>
      </Card>

      {/* Medication List */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 px-1">Today's Medications</h3>
        {medications.map((med) => (
          <Card
            key={med.id}
            className={`p-4 shadow-md transition-all ${
              med.taken
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-white'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {med.taken ? (
                    <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-7 h-7 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{med.name}</h4>
                    <p className="text-base text-gray-600">{med.dosage}</p>
                  </div>
                </div>
              </div>
              
              <div className="ml-10 space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-semibold">{med.time}</span>
                </div>
                <p className="text-sm text-gray-600">{med.instructions}</p>
              </div>

              <Button
                onClick={() => toggleMedication(med.id)}
                className={`w-full py-6 text-base font-bold ${
                  med.taken
                    ? 'bg-gray-400 hover:bg-gray-500'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {med.taken ? '✓ Taken - Tap to Undo' : 'Mark as Taken'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Call Healthcare Provider */}
      <Card className="p-5 bg-blue-50 border-2 border-blue-300">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-900 mb-4">
            Questions about medication?
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-base font-bold">
            <Phone className="w-5 h-5 mr-2" />
            Call Doctor
          </Button>
        </div>
      </Card>
    </div>
  );
}
