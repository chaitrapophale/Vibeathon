import React from 'react';
import { Phone, AlertCircle, User, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  isEmergency?: boolean;
  photoUrl?: string;
}

export function ContactsPage() {
  const contacts: Contact[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      relationship: 'Doctor',
      phone: '(555) 123-4567',
      isEmergency: true,
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
    },
    {
      id: 2,
      name: 'John Smith',
      relationship: 'Son',
      phone: '(555) 234-5678',
      isEmergency: true,
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
    },
    {
      id: 3,
      name: 'Mary Smith',
      relationship: 'Daughter',
      phone: '(555) 345-6789',
      isEmergency: true,
      photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    },
    {
      id: 4,
      name: 'Home Care',
      relationship: 'Caregiver',
      phone: '(555) 456-7890',
      isEmergency: false
    },
    {
      id: 5,
      name: 'Robert Williams',
      relationship: 'Neighbor',
      phone: '(555) 567-8901',
      isEmergency: false,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    },
    {
      id: 6,
      name: 'Local Pharmacy',
      relationship: 'Pharmacy',
      phone: '(555) 678-9012',
      isEmergency: false
    }
  ];

  const emergencyContacts = contacts.filter(c => c.isEmergency);
  const regularContacts = contacts.filter(c => !c.isEmergency);

  return (
    <div className="space-y-4 pb-4">
      {/* Emergency 911 */}
      <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg border-4 border-red-700">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">Emergency</h3>
          <p className="text-base mb-5 opacity-90">For immediate help</p>
          <Button
            className="w-full bg-white text-red-600 hover:bg-gray-100 py-8 text-2xl font-bold shadow-lg"
          >
            <Phone className="w-8 h-8 mr-3" />
            Call 911
          </Button>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 px-1">
          <Heart className="w-6 h-6 text-red-600" />
          <h3 className="text-base font-semibold text-gray-900">Emergency Contacts</h3>
        </div>
        {emergencyContacts.map((contact) => (
          <Card key={contact.id} className="p-4 bg-white border-2 border-red-200 shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              {contact.photoUrl ? (
                <img
                  src={contact.photoUrl}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-red-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center border-4 border-red-200">
                  <User className="w-8 h-8 text-red-600" />
                </div>
              )}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900">{contact.name}</h4>
                <p className="text-sm text-gray-600">{contact.relationship}</p>
                <p className="text-base font-semibold text-blue-600 mt-1">{contact.phone}</p>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg font-bold">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </Card>
        ))}
      </div>

      {/* Other Contacts */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 px-1">Other Contacts</h3>
        {regularContacts.map((contact) => (
          <Card key={contact.id} className="p-4 bg-white shadow-md">
            <div className="flex items-center space-x-4 mb-3">
              {contact.photoUrl ? (
                <img
                  src={contact.photoUrl}
                  alt={contact.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <User className="w-7 h-7 text-gray-600" />
                </div>
              )}
              <div className="flex-1">
                <h4 className="text-base font-bold text-gray-900">{contact.name}</h4>
                <p className="text-sm text-gray-600">{contact.relationship}</p>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">{contact.phone}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full py-5 text-base font-bold"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call
            </Button>
          </Card>
        ))}
      </div>

      {/* Help Text */}
      <Card className="p-4 bg-blue-50 border-2 border-blue-300">
        <p className="text-sm text-center text-blue-900 font-medium">
          💙 Need to add a contact? Ask your family or caregiver for help.
        </p>
      </Card>
    </div>
  );
}
