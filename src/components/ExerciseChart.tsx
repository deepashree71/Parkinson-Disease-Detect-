import React, { useState } from 'react';
import { Activity, Clock, Target, Star, Play, Pause, RotateCcw } from 'lucide-react';
import type { AnalysisResult, PatientData } from '../App';

interface ExerciseChartProps {
  analysisResult: AnalysisResult;
  patientData: PatientData | null;
}

const ExerciseChart: React.FC<ExerciseChartProps> = ({ analysisResult, patientData }) => {
  const [selectedCategory, setSelectedCategory] = useState('motor');
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const exercises = {
    motor: [
      {
        id: 'finger-tapping',
        name: 'Finger Tapping',
        description: 'Tap your thumb to your index finger repeatedly',
        duration: '2 minutes',
        difficulty: 'Easy',
        instructions: [
          'Sit comfortably with your hand resting on a table',
          'Touch your thumb to your index finger',
          'Lift and repeat the movement as quickly as possible',
          'Maintain rhythm for 2 minutes, then switch hands'
        ],
        benefits: 'Improves finger dexterity and reduces stiffness'
      },
      {
        id: 'hand-stretches',
        name: 'Hand and Wrist Stretches',
        description: 'Gentle stretches to improve flexibility',
        duration: '5 minutes',
        difficulty: 'Easy',
        instructions: [
          'Extend your arm forward with palm facing up',
          'With the other hand, gently pull fingers back',
          'Hold for 15 seconds, then switch directions',
          'Repeat with the other hand'
        ],
        benefits: 'Reduces muscle stiffness and improves range of motion'
      },
      {
        id: 'writing-practice',
        name: 'Large Movement Writing',
        description: 'Practice writing with exaggerated movements',
        duration: '10 minutes',
        difficulty: 'Medium',
        instructions: [
          'Use large paper and a thick marker',
          'Write letters 2-3 inches tall',
          'Focus on smooth, flowing movements',
          'Practice your name, alphabet, or simple words'
        ],
        benefits: 'Improves handwriting and motor control'
      }
    ],
    balance: [
      {
        id: 'standing-balance',
        name: 'Standing Balance',
        description: 'Practice maintaining balance in different positions',
        duration: '5 minutes',
        difficulty: 'Medium',
        instructions: [
          'Stand with feet shoulder-width apart',
          'Hold the position for 30 seconds',
          'Progress to standing with feet together',
          'Advanced: try standing on one foot with support'
        ],
        benefits: 'Improves stability and reduces fall risk'
      },
      {
        id: 'heel-toe-walking',
        name: 'Heel-to-Toe Walking',
        description: 'Walk in a straight line placing heel directly in front of toe',
        duration: '5 minutes',
        difficulty: 'Hard',
        instructions: [
          'Find a straight line on the floor',
          'Place one foot directly in front of the other',
          'Touch heel to toe with each step',
          'Walk 10-15 steps, turn around, and repeat'
        ],
        benefits: 'Enhances balance and coordination'
      }
    ],
    speech: [
      {
        id: 'vocal-exercises',
        name: 'Vocal Loudness Exercises',
        description: 'Practice speaking with increased volume and clarity',
        duration: '10 minutes',
        difficulty: 'Easy',
        instructions: [
          'Take a deep breath and say "AH" loudly',
          'Count from 1 to 20 with strong, clear voice',
          'Read aloud for 5 minutes with exaggerated articulation',
          'Practice tongue twisters slowly and clearly'
        ],
        benefits: 'Improves speech volume and clarity'
      },
      {
        id: 'breathing-exercises',
        name: 'Deep Breathing',
        description: 'Strengthen respiratory muscles for better speech',
        duration: '5 minutes',
        difficulty: 'Easy',
        instructions: [
          'Sit up straight with shoulders relaxed',
          'Breathe in slowly through nose for 4 counts',
          'Hold breath for 4 counts',
          'Exhale slowly through mouth for 6 counts'
        ],
        benefits: 'Strengthens diaphragm and improves speech support'
      }
    ],
    cognitive: [
      {
        id: 'memory-games',
        name: 'Memory Enhancement',
        description: 'Simple games to maintain cognitive function',
        duration: '15 minutes',
        difficulty: 'Medium',
        instructions: [
          'Practice recalling lists of items',
          'Do simple math calculations mentally',
          'Play word association games',
          'Practice remembering short stories'
        ],
        benefits: 'Maintains cognitive flexibility and memory'
      },
      {
        id: 'concentration',
        name: 'Concentration Exercises',
        description: 'Focus-building activities',
        duration: '10 minutes',
        difficulty: 'Medium',
        instructions: [
          'Focus on a single object for 2 minutes',
          'Practice mindful breathing',
          'Complete simple puzzles or crosswords',
          'Practice meditation for 5-10 minutes'
        ],
        benefits: 'Improves attention and mental clarity'
      }
    ]
  };

  const categories = [
    { id: 'motor', name: 'Motor Skills', icon: Activity, color: 'blue' },
    { id: 'balance', name: 'Balance', icon: Target, color: 'green' },
    { id: 'speech', name: 'Speech', icon: Star, color: 'purple' },
    { id: 'cognitive', name: 'Cognitive', icon: Clock, color: 'orange' }
  ];

  const startTimer = (exerciseId: string) => {
    setActiveExercise(exerciseId);
    setTimer(0);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
    setActiveExercise(null);
  };

  const riskLevel = analysisResult.probability > 0.7 ? 'Parkinson' : 'Healthy';

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
       <div
  className={`text-white p-6 ${
    riskLevel === 'Parkinson'
      ? 'bg-gradient-to-r from-red-600 to-pink-600'
      : 'bg-gradient-to-r from-green-600 to-teal-600'
  }`}
>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Personalized Exercise Program</h2>
              <p className="text-green-100">Therapeutic exercises tailored for {patientData?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100">Prediction Result</div>
              <div className={`text-2xl font-bold ${
                riskLevel === 'high' ? 'text-red-200' : 'text-green-200'
              }`}>
                {riskLevel.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Exercise Categories</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCategory === category.id
                        ? `border-${category.color}-500 bg-${category.color}-50 text-${category.color}-700`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-gray-600">
                      {exercises[selectedCategory as keyof typeof exercises].length} exercises
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {categories.find(c => c.id === selectedCategory)?.name} Exercises
              </h3>
              {activeExercise && (
                <div className="flex items-center space-x-4 bg-blue-50 px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-mono text-xl font-bold text-blue-600">
                    {formatTime(timer)}
                  </span>
                  <button
                    onClick={toggleTimer}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  >
                    {isTimerRunning ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {exercises[selectedCategory as keyof typeof exercises].map((exercise) => (
                <div
                  key={exercise.id}
                  className={`p-6 border-2 rounded-xl transition-all duration-200 ${
                    activeExercise === exercise.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {exercise.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{exercise.duration}</span>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          exercise.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          exercise.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {exercise.difficulty}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => startTimer(exercise.id)}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Instructions:</h5>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {exercise.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="font-medium text-blue-600">{index + 1}.</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-1">Benefits:</h5>
                      <p className="text-sm text-green-700">{exercise.benefits}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h3 className="font-semibold text-yellow-800 mb-3">Important Guidelines</h3>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2" />
                <span>Perform exercises daily for best results, but listen to your body</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2" />
                <span>Start slowly and gradually increase intensity as you feel comfortable</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2" />
                <span>Consult with your healthcare provider before starting any new exercise program</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2" />
                <span>Stop any exercise that causes pain or excessive fatigue</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseChart;
