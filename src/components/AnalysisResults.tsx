import React from 'react';
import { Brain, Activity, TrendingUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import type { AnalysisResult, PatientData } from '../App';

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  patientData: PatientData | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ isAnalyzing, result, patientData }) => {
  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Loader className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Analyzing Your Handwriting</h2>
          <p className="text-gray-600 mb-8">Processing your handwriting patterns using advanced deep learning algorithms...</p>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-gray-600">Extracting movement patterns</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-75" />
              <span className="text-gray-600">Analyzing tremor characteristics</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-150" />
              <span className="text-gray-600">Computing confidence scores</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const riskLevel = result.probability > 0.7 ? 'Parkinson' : 'Healthy';
  const riskColor = riskLevel === 'Parkinson' ? 'red' : 'green';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <p className="text-blue-100">PD Detection Assessment for {patientData?.name}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className={`p-6 rounded-xl border-2 ${
                riskColor === 'red' ? 'border-red-200 bg-red-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Risk Assessment</h3>
                  {riskLevel === 'high' ? (
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        riskColor === 'red' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.probability * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Analysis Confidence</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  riskColor === 'red' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <p className={`text-sm font-medium ${
                    riskColor === 'red' ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {result.recommendation}
                  </p>
                </div>
              </div>

              {result.rawAnalysis && (
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Metrics</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Time:</span>
                      <span className="font-medium">{result.rawAnalysis.totalTime.toFixed(1)}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Path Length:</span>
                      <span className="font-medium">{result.rawAnalysis.pathLength.toFixed(0)}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stroke Count:</span>
                      <span className="font-medium">{result.rawAnalysis.strokeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tremor Freq:</span>
                      <span className="font-medium">{result.rawAnalysis.tremorFrequency.toFixed(1)} Hz</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{patientData?.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{patientData?.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symptoms Reported:</span>
                    <span className="font-medium">{patientData?.symptoms.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Feature Analysis</h3>
                </div>

                <div className="space-y-4">
                  {Object.entries(result.features).map(([feature, score]) => (
                    <div key={feature}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {feature === 'tremor' ? 'Tremor Severity' :
                           feature === 'speed' ? 'Movement Speed' :
                           feature === 'pressure' ? 'Pen Pressure' :
                           'Stroke Smoothness'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                          {(score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            score > 0.7 ? 'bg-red-500' :
                            score > 0.4 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${score * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Next Steps</h3>
                </div>

                <div className="space-y-3 text-sm text-blue-700">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>View personalized exercise recommendations below</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>Schedule follow-up assessment in 3-6 months</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>Consult with healthcare provider for professional evaluation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
