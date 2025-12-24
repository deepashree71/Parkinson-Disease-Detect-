import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface NavigationProps {
  steps: Step[];
  currentStep: number;
}

const Navigation: React.FC<NavigationProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="hidden md:block">
                    <div
                      className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      Step {step.id + 1}
                    </div>
                    <div
                      className={`text-xs ${
                        isActive || isCompleted ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-200 rounded">
                      <div
                        className={`h-1 rounded transition-all duration-500 ${
                          isCompleted ? 'bg-green-500 w-full' : 'bg-gray-200 w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
