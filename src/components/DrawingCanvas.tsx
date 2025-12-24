import React, { useRef, useEffect, useState } from 'react';
import { Pen, RotateCcw, Download, ArrowRight, Activity, Clock, Zap } from 'lucide-react';

interface DrawingCanvasProps {
  onComplete: (imageData: string, analysisData: AnalysisData) => void;
  patientName: string;
}

interface Point {
  x: number;
  y: number;
  time: number;
  pressure: number;
}

interface AnalysisData {
  totalTime: number;
  shakiness: number;
  averageSpeed: number;
  pressureVariation: number;
  smoothness: number;
  tremorFrequency: number;
  strokeCount: number;
  pathLength: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onComplete, patientName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [realTimeAnalysis, setRealTimeAnalysis] = useState<Partial<AnalysisData>>({});
  const [strokeCount, setStrokeCount] = useState(0);

  const tasks = [
    {
      title: "Draw a Spiral",
      description: "Starting from the center, draw a spiral moving outward. Take your time and draw naturally.",
      instruction: "Place your pen/finger at the center dot and draw a spiral outward.",
      pattern: "spiral"
    },
    {
      title: "Draw Connecting Lines",
      description: "Connect the dots by drawing straight lines between them. Try to be as accurate as possible.",
      instruction: "Draw straight lines to connect each dot in sequence.",
      pattern: "lines"
    },
    {
      title: "Write Your Name",
      description: "Write your full name in cursive or print letters. Write naturally at your normal speed.",
      instruction: "Write your name clearly in the designated area.",
      pattern: "text"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 500;

    clearCanvas();
  }, [currentTask]);

  useEffect(() => {
    if (points.length > 2) {
      const analysis = calculateRealTimeAnalysis(points);
      setRealTimeAnalysis(analysis);
    }
  }, [points]);

  const calculateRealTimeAnalysis = (pointsArray: Point[]): Partial<AnalysisData> => {
    if (pointsArray.length < 3) return {};

    let shakeCount = 0;
    let totalDistance = 0;
    let speeds: number[] = [];

    for (let i = 2; i < pointsArray.length; i++) {
      const p1 = pointsArray[i-2];
      const p2 = pointsArray[i-1];
      const p3 = pointsArray[i];

      const dx1 = p2.x - p1.x;
      const dy1 = p2.y - p1.y;
      const dx2 = p3.x - p2.x;
      const dy2 = p3.y - p2.y;

      const dot = dx1 * dx2 + dy1 * dy2;
      const mag1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const mag2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      if (mag1 > 0 && mag2 > 0) {
        const cosAngle = dot / (mag1 * mag2);
        if (cosAngle < 0.7) shakeCount++;
      }

      const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      const timeDiff = p3.time - p2.time;
      if (timeDiff > 0) {
        speeds.push(distance / timeDiff);
      }
      totalDistance += distance;
    }

    const pressures = pointsArray.map(p => p.pressure);
    const avgPressure = pressures.reduce((a, b) => a + b, 0) / pressures.length;
    const pressureVariation = Math.sqrt(
      pressures.reduce((sum, p) => sum + Math.pow(p - avgPressure, 2), 0) / pressures.length
    );

    const averageSpeed = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;

    const totalTime = pointsArray.length > 0 ?
      (pointsArray[pointsArray.length - 1].time - pointsArray[0].time) / 1000 : 0;
    const tremorFrequency = totalTime > 0 ? shakeCount / totalTime : 0;

    return {
      shakiness: shakeCount,
      averageSpeed,
      pressureVariation,
      tremorFrequency,
      pathLength: totalDistance
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.setLineDash([]);

    if (currentTask === 0) {
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.arc(400, 250, 6, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#6B7280';
      ctx.font = '16px sans-serif';
      ctx.fillText('Start here →', 420, 255);

      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let angle = 0; angle < 6 * Math.PI; angle += 0.1) {
        const radius = angle * 8;
        const x = 400 + radius * Math.cos(angle);
        const y = 250 + radius * Math.sin(angle);
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else if (currentTask === 1) {
      const dots = [
        { x: 150, y: 120 },
        { x: 300, y: 180 },
        { x: 500, y: 120 },
        { x: 650, y: 200 },
        { x: 550, y: 350 },
        { x: 250, y: 380 }
      ];

      ctx.fillStyle = '#3B82F6';
      dots.forEach((dot, index) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${index + 1}`, dot.x, dot.y + 5);
        ctx.fillStyle = '#3B82F6';
      });
    } else {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(100, 200, 600, 100);
      ctx.setLineDash([]);

      ctx.fillStyle = '#6B7280';
      ctx.font = '16px sans-serif';
      ctx.fillText('Write your name here', 110, 190);
    }

    setPoints([]);
    setHasDrawn(false);
    setStartTime(null);
    setEndTime(null);
    setRealTimeAnalysis({});
  };

  const getEventPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const pos = getEventPos(e);
    const currentTime = Date.now();

    if (!startTime) {
      setStartTime(currentTime);
    }

    const pressure = 'force' in e && typeof e.force === 'number' ? e.force : 0.5;

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = '#1F2937';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setIsDrawing(true);
    setHasDrawn(true);
    setStrokeCount(prev => prev + 1);

    const newPoint: Point = {
      x: pos.x,
      y: pos.y,
      time: currentTime - (startTime || currentTime),
      pressure
    };

    setPoints(prev => [...prev, newPoint]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const pos = getEventPos(e);
    const currentTime = Date.now();
    const pressure = 'force' in e && typeof e.force === 'number' ? e.force : 0.5;

    ctx.lineWidth = 2 + pressure * 4;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    const newPoint: Point = {
      x: pos.x,
      y: pos.y,
      time: currentTime - (startTime || currentTime),
      pressure
    };

    setPoints(prev => [...prev, newPoint]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setEndTime(Date.now());
  };

  const nextTask = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setStrokeCount(0);
    } else {
      completeAnalysis();
    }
  };

  const completeAnalysis = () => {
    const canvas = canvasRef.current;
    if (!canvas || !startTime || !endTime) return;

    const imageData = canvas.toDataURL();
    const finalAnalysis: AnalysisData = {
      totalTime: (endTime - startTime) / 1000,
      shakiness: realTimeAnalysis.shakiness || 0,
      averageSpeed: realTimeAnalysis.averageSpeed || 0,
      pressureVariation: realTimeAnalysis.pressureVariation || 0,
      smoothness: Math.max(0, 100 - (realTimeAnalysis.shakiness || 0) * 2),
      tremorFrequency: realTimeAnalysis.tremorFrequency || 0,
      strokeCount,
      pathLength: realTimeAnalysis.pathLength || 0
    };

    onComplete(imageData, finalAnalysis);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Advanced Handwriting Analysis</h2>
              <p className="text-blue-100">Hello {patientName}, complete the drawing tasks with real-time analysis</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Task Progress</div>
              <div className="text-2xl font-bold">{currentTask + 1} / {tasks.length}</div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {tasks[currentTask].title}
                </h3>
                <p className="text-gray-600 mb-2">{tasks[currentTask].description}</p>
                <p className="text-sm text-blue-600 font-medium">{tasks[currentTask].instruction}</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="border-2 border-gray-300 rounded-lg cursor-crosshair shadow-lg touch-none"
                    style={{ touchAction: 'none' }}
                  />
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-lg p-2">
                    <Pen className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={clearCanvas}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </button>

                {hasDrawn && (
                  <button
                    onClick={nextTask}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {currentTask < tasks.length - 1 ? (
                      <>
                        Next Task
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      'Complete Analysis'
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Real-time Analysis
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Tremor Level</span>
                      <span className="text-sm font-bold text-gray-800">
                        {realTimeAnalysis.shakiness || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (realTimeAnalysis.shakiness || 0) > 20 ? 'bg-red-500' :
                          (realTimeAnalysis.shakiness || 0) > 10 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (realTimeAnalysis.shakiness || 0) * 2)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Drawing Speed</span>
                      <span className="text-sm font-bold text-gray-800">
                        {(realTimeAnalysis.averageSpeed || 0).toFixed(1)} px/ms
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${Math.min(100, (realTimeAnalysis.averageSpeed || 0) * 10)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Pressure Variation</span>
                      <span className="text-sm font-bold text-gray-800">
                        {(realTimeAnalysis.pressureVariation || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (realTimeAnalysis.pressureVariation || 0) > 0.3 ? 'bg-red-500' :
                          (realTimeAnalysis.pressureVariation || 0) > 0.15 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (realTimeAnalysis.pressureVariation || 0) * 200)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Tremor Frequency</span>
                      <span className="text-sm font-bold text-gray-800">
                        {(realTimeAnalysis.tremorFrequency || 0).toFixed(1)} Hz
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (realTimeAnalysis.tremorFrequency || 0) > 5 ? 'bg-red-500' :
                          (realTimeAnalysis.tremorFrequency || 0) > 2 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (realTimeAnalysis.tremorFrequency || 0) * 10)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
                    <Clock className="h-4 w-4" />
                    <span>Points captured: {points.length}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-700 mt-1">
                    <Zap className="h-4 w-4" />
                    <span>Strokes: {strokeCount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Analysis Features</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>Real-time tremor detection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>Pressure sensitivity analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>Movement speed tracking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>Pattern smoothness evaluation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Draw naturally at your normal speed</li>
                  <li>• Apply consistent pressure</li>
                  <li>• Complete each pattern fully</li>
                  <li>• Take breaks if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
