
import React from 'react';
import { Trophy, Target, Award, CheckCircle, AlertCircle, FileText, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ACFTScore {
  deadlift: number;
  powerThrow: number;
  pushups: number;
  sprintDragCarry: number;
  legTuckPlank: number;
  run: number;
  total: number;
}

interface ScoreResultsProps {
  scores: ACFTScore;
  onPrintResults: () => void;
  onShareScore: (platform: string) => void;
}

const ScoreResults = ({ scores, onPrintResults, onShareScore }: ScoreResultsProps) => {
  const getScoreInterpretation = (score: number) => {
    if (score >= 540) return { 
      level: "Excellent", 
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50", 
      icon: Trophy,
      message: "Outstanding performance! You're in top condition." 
    };
    if (score >= 480) return { 
      level: "Very Good", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50", 
      icon: Award,
      message: "Great job! Your fitness level is well above average." 
    };
    if (score >= 420) return { 
      level: "Good", 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      icon: CheckCircle,
      message: "Good performance! Keep up the training." 
    };
    if (score >= 360) return { 
      level: "Satisfactory", 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50", 
      icon: Target,
      message: "You passed! Focus on improving weak areas." 
    };
    return { 
      level: "Needs Improvement", 
      color: "text-red-600", 
      bgColor: "bg-red-50", 
      icon: AlertCircle,
      message: "Additional training required. Don't give up!" 
    };
  };

  const interpretation = getScoreInterpretation(scores.total);

  return (
    <div className="mt-12 space-y-8 animate-in fade-in duration-500">
      {/* Main Score Display */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-slate-900 mb-6">Your ACFT Results</h3>
        <div className={`inline-block px-8 py-6 rounded-2xl ${interpretation.bgColor} border-2 border-white shadow-lg`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            {React.createElement(interpretation.icon, {
              className: `w-8 h-8 ${interpretation.color}`
            })}
            <div className="text-4xl font-bold text-slate-900">{scores.total}/600</div>
          </div>
          <div className={`text-lg font-semibold ${interpretation.color} mb-2`}>
            {interpretation.level}
          </div>
          <div className="text-sm text-slate-600">
            {interpretation.message}
          </div>
        </div>
      </div>

      {/* Individual Event Scores */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { score: scores.deadlift, label: "Deadlift", icon: "💪" },
          { score: scores.powerThrow, label: "Power Throw", icon: "🏋️" },
          { score: scores.pushups, label: "Push-ups", icon: "💥" },
          { score: scores.sprintDragCarry, label: "Sprint-Drag-Carry", icon: "🏃" },
          { score: scores.legTuckPlank, label: "Leg Tuck/Plank", icon: "🎯" },
          { score: scores.run, label: "2-Mile Run", icon: "🏃‍♂️" }
        ].map((event, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-xl shadow-md border-2 border-slate-100 hover:border-emerald-200 transition-colors">
            <div className="text-2xl mb-2">{event.icon}</div>
            <div className="font-bold text-2xl text-slate-900">{event.score}</div>
            <div className="text-sm text-slate-600 font-medium">{event.label}</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${event.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onPrintResults} variant="outline" className="flex items-center border-2 hover:bg-slate-50">
          <FileText className="mr-2 h-4 w-4" />
          Print Results
        </Button>
        <Button onClick={() => onShareScore('twitter')} variant="outline" className="flex items-center border-2 hover:bg-blue-50">
          <Share2 className="mr-2 h-4 w-4" />
          Share on Twitter
        </Button>
        <Button onClick={() => onShareScore('linkedin')} variant="outline" className="flex items-center border-2 hover:bg-blue-50">
          <Share2 className="mr-2 h-4 w-4" />
          Share on LinkedIn
        </Button>
      </div>
    </div>
  );
};

export default ScoreResults;
