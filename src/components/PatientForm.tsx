import React, { useState } from 'react';
import { User, Calendar, Users, Stethoscope, ArrowRight } from 'lucide-react';
import type { PatientData } from '../App';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: 0,
    gender: '',
    symptoms: [],
    medicalHistory: ''
  });

  const commonSymptoms = [
    'Tremor at rest',
    'Muscle stiffness',
    'Slow movement',
    'Balance problems',
    'Changes in handwriting',
    'Speech changes',
    'Loss of smell',
    'Sleep problems'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age > 0 && formData.gender) {
      onSubmit(formData);
    }
  };

  const isValid = formData.name && formData.age > 0 && formData.gender;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Patient Information</h2>
              <p className="text-blue-100">Please provide your details for personalized analysis</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Age
              </label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your age"
                min="1"
                max="120"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Stethoscope className="h-4 w-4 mr-2 text-blue-600" />
              Current Symptoms (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {commonSymptoms.map((symptom) => (
                <label
                  key={symptom}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.symptoms.includes(symptom)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.symptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Medical History (Optional)
            </label>
            <textarea
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any relevant medical history or conditions..."
              rows={4}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                isValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Handwriting Analysis
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
