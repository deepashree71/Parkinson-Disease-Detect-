import React, { useState } from 'react';
import { Activity, Brain, FileText, User } from 'lucide-react';
import PatientForm from './components/PatientForm';
import DrawingCanvas from './components/DrawingCanvas';
import AnalysisResults from './components/AnalysisResults';
import ExerciseChart from './components/ExerciseChart';
import Header from './components/Header';
import Navigation from './components/Navigation';

export interface PatientData {
  name: string;
  age: number;
  gender: string;
  symptoms: string[];
  medicalHistory: string;
}

export interface AnalysisResult {
  probability: number;
  confidence: number;
  features: {
    tremor: number;
    speed: number;
    pressure: number;
    smoothness: number;
  };
  recommendation: string;
  rawAnalysis?: {
    totalTime: number;
    shakiness: number;
    averageSpeed: number;
    pressureVariation: number;
    tremorFrequency: number;
    strokeCount: number;
    pathLength: number;
  };
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [drawingData, setDrawingData] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps = [
    { id: 0, title: 'Patient Information', icon: User },
    { id: 1, title: 'Handwriting Analysis', icon: FileText },
    { id: 2, title: 'PD Analysis', icon: Brain },
    { id: 3, title: 'Exercise Therapy', icon: Activity }
  ];

  const handlePatientSubmit = (data: PatientData) => {
    setPatientData(data);
    setCurrentStep(1);
  };

  const handleDrawingComplete = async (imageData: string, analysisData?: any) => {
    setDrawingData(imageData);
    setCurrentStep(2);
    setIsAnalyzing(true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const baseRisk = analysisData ?
      Math.min(0.9, (analysisData.shakiness * 0.02 + analysisData.tremorFrequency * 0.1 + analysisData.pressureVariation * 0.5)) :
      Math.random() > 0.5 ? 0.75 + Math.random() * 0.2 : 0.15 + Math.random() * 0.3;

    const mockResult: AnalysisResult = {
      probability: baseRisk,
      confidence: 0.85 + Math.random() * 0.1,
      features: {
        tremor: analysisData ? Math.min(1, analysisData.shakiness / 50) : Math.random(),
        speed: analysisData ? Math.min(1, analysisData.averageSpeed / 10) : Math.random(),
        pressure: analysisData ? analysisData.pressureVariation : Math.random(),
        smoothness: analysisData ? Math.max(0, 1 - analysisData.shakiness / 100) : Math.random()
      },
      recommendation: baseRisk > 0.7
        ? "Recommended to consult with a neurologist for further evaluation"
        : "Continue monitoring. Regular check-ups recommended",
      rawAnalysis: analysisData
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Navigation steps={steps} currentStep={currentStep} />

      <main className="container mx-auto px-6 py-8">
        {currentStep === 0 && (
          <PatientForm onSubmit={handlePatientSubmit} />
        )}

        {currentStep === 1 && (
          <DrawingCanvas
            onComplete={handleDrawingComplete}
            patientName={patientData?.name || 'Patient'}
          />
        )}

        {currentStep === 2 && (
          <AnalysisResults
            isAnalyzing={isAnalyzing}
            result={analysisResult}
            patientData={patientData}
          />
        )}

        {currentStep === 3 && analysisResult && (
          <ExerciseChart
            analysisResult={analysisResult}
            patientData={patientData}
          />
        )}
      </main>
    </div>
  );
}

export default App;
