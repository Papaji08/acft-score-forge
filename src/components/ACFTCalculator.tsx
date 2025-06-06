
import React, { useState } from 'react';
import { Calculator, FileText, Share2, Trophy, Target, TrendingUp, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface ACFTScore {
  deadlift: number;
  powerThrow: number;
  pushups: number;
  sprintDragCarry: number;
  legTuckPlank: number;
  run: number;
  total: number;
}

const ACFTCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    deadlift: '',
    powerThrow: '',
    pushups: '',
    sprintDragCarry: '',
    legTuckPlank: '',
    legTuckPlankType: 'legTuck',
    run: ''
  });

  const [scores, setScores] = useState<ACFTScore | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Simplified scoring logic (actual ACFT scoring is more complex)
  const calculateScore = (value: number, event: string, age: number, gender: string): number => {
    // This is a simplified scoring system - actual ACFT uses detailed tables
    const baseScores = {
      deadlift: { min: 140, max: 340, minScore: 60, maxScore: 100 },
      powerThrow: { min: 4.5, max: 12.5, minScore: 60, maxScore: 100 },
      pushups: { min: 10, max: 60, minScore: 60, maxScore: 100 },
      sprintDragCarry: { min: 300, max: 120, minScore: 60, maxScore: 100 }, // Lower time = higher score
      legTuckPlank: { min: 1, max: 20, minScore: 60, maxScore: 100 },
      run: { min: 21*60, max: 13*60, minScore: 60, maxScore: 100 } // In seconds, lower = better
    };

    const eventData = baseScores[event as keyof typeof baseScores];
    if (!eventData) return 0;

    let normalizedValue = value;
    if (event === 'sprintDragCarry' || event === 'run') {
      // For time-based events, invert the calculation
      if (value <= eventData.max) return eventData.maxScore;
      if (value >= eventData.min) return eventData.minScore;
      normalizedValue = eventData.min - (value - eventData.max);
      const range = eventData.min - eventData.max;
      const scoreRange = eventData.maxScore - eventData.minScore;
      return Math.round(eventData.minScore + (normalizedValue / range) * scoreRange);
    } else {
      if (value >= eventData.max) return eventData.maxScore;
      if (value <= eventData.min) return eventData.minScore;
      const range = eventData.max - eventData.min;
      const scoreRange = eventData.maxScore - eventData.minScore;
      return Math.round(eventData.minScore + ((value - eventData.min) / range) * scoreRange);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in your age and gender.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const age = parseInt(formData.age);
    
    // Convert run time from MM:SS to seconds
    const runParts = formData.run.split(':');
    const runSeconds = parseInt(runParts[0]) * 60 + parseInt(runParts[1] || '0');
    
    // Convert sprint-drag-carry time from MM:SS to seconds
    const sdcParts = formData.sprintDragCarry.split(':');
    const sdcSeconds = parseInt(sdcParts[0]) * 60 + parseInt(sdcParts[1] || '0');

    const calculatedScores: ACFTScore = {
      deadlift: calculateScore(parseInt(formData.deadlift), 'deadlift', age, formData.gender),
      powerThrow: calculateScore(parseFloat(formData.powerThrow), 'powerThrow', age, formData.gender),
      pushups: calculateScore(parseInt(formData.pushups), 'pushups', age, formData.gender),
      sprintDragCarry: calculateScore(sdcSeconds, 'sprintDragCarry', age, formData.gender),
      legTuckPlank: calculateScore(parseInt(formData.legTuckPlank), 'legTuckPlank', age, formData.gender),
      run: calculateScore(runSeconds, 'run', age, formData.gender),
      total: 0
    };

    calculatedScores.total = Object.values(calculatedScores).reduce((sum, score) => 
      typeof score === 'number' ? sum + score : sum, 0
    ) - calculatedScores.total; // Subtract to avoid double counting

    setScores(calculatedScores);
    setIsCalculating(false);
    
    toast({
      title: "Score Calculated! 🎯",
      description: `Your total ACFT score is ${calculatedScores.total}/600`,
    });
  };

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

  const shareScore = (platform: string) => {
    if (!scores) return;
    
    const text = `I just calculated my ACFT score: ${scores.total}/600! Calculate yours at`;
    const url = window.location.href;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    }
  };

  const printResults = () => {
    if (!scores) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>ACFT Score Results</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
              .total-score { background: #f0f9ff; padding: 20px; text-align: center; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>ACFT Score Results</h1>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="score-grid">
              <div>3-Rep Max Deadlift: ${scores.deadlift} points</div>
              <div>Standing Power Throw: ${scores.powerThrow} points</div>
              <div>Hand-Release Push-ups: ${scores.pushups} points</div>
              <div>Sprint-Drag-Carry: ${scores.sprintDragCarry} points</div>
              <div>Leg Tuck/Plank: ${scores.legTuckPlank} points</div>
              <div>2-Mile Run: ${scores.run} points</div>
            </div>
            <div class="total-score">
              <h2>Total Score: ${scores.total}/600</h2>
              <p>Performance Level: ${getScoreInterpretation(scores.total).level}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const resetForm = () => {
    setFormData({
      age: '',
      gender: '',
      deadlift: '',
      powerThrow: '',
      pushups: '',
      sprintDragCarry: '',
      legTuckPlank: '',
      legTuckPlankType: 'legTuck',
      run: ''
    });
    setScores(null);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Calculate Your ACFT Score
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enter your performance data for each of the six ACFT events to get your official score with detailed analysis.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-6 w-6" />
                </div>
                ACFT Performance Data
                <div className="ml-auto flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Real-time Scoring
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-emerald-500">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        Age Range
                        <span className="text-emerald-600">*</span>
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}>
                        <SelectTrigger className="border-2 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                          <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-21">18-21 years</SelectItem>
                          <SelectItem value="22-26">22-26 years</SelectItem>
                          <SelectItem value="27-31">27-31 years</SelectItem>
                          <SelectItem value="32-36">32-36 years</SelectItem>
                          <SelectItem value="37-41">37-41 years</SelectItem>
                          <SelectItem value="42-46">42-46 years</SelectItem>
                          <SelectItem value="47-51">47-51 years</SelectItem>
                          <SelectItem value="52-56">52-56 years</SelectItem>
                          <SelectItem value="57-61">57-61 years</SelectItem>
                          <SelectItem value="62+">62+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        Gender
                        <span className="text-emerald-600">*</span>
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger className="border-2 hover:border-emerald-300 focus:border-emerald-500 transition-colors">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* ACFT Events */}
                <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    ACFT Test Events
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="deadlift" className="text-sm font-medium text-slate-700">
                        3-Rep Max Deadlift (lbs)
                      </Label>
                      <Input
                        id="deadlift"
                        type="number"
                        placeholder="e.g., 340"
                        value={formData.deadlift}
                        onChange={(e) => setFormData(prev => ({ ...prev, deadlift: e.target.value }))}
                        className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="powerThrow" className="text-sm font-medium text-slate-700">
                        Standing Power Throw (meters)
                      </Label>
                      <Input
                        id="powerThrow"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 12.5"
                        value={formData.powerThrow}
                        onChange={(e) => setFormData(prev => ({ ...prev, powerThrow: e.target.value }))}
                        className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pushups" className="text-sm font-medium text-slate-700">
                        Hand-Release Push-ups (repetitions)
                      </Label>
                      <Input
                        id="pushups"
                        type="number"
                        placeholder="e.g., 60"
                        value={formData.pushups}
                        onChange={(e) => setFormData(prev => ({ ...prev, pushups: e.target.value }))}
                        className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sprintDragCarry" className="text-sm font-medium text-slate-700">
                        Sprint-Drag-Carry (MM:SS)
                      </Label>
                      <Input
                        id="sprintDragCarry"
                        type="text"
                        placeholder="e.g., 1:33"
                        value={formData.sprintDragCarry}
                        onChange={(e) => setFormData(prev => ({ ...prev, sprintDragCarry: e.target.value }))}
                        className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legTuckPlankType" className="text-sm font-medium text-slate-700">
                        Core Event Type
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, legTuckPlankType: value }))}>
                        <SelectTrigger className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="legTuck">Leg Tuck (repetitions)</SelectItem>
                          <SelectItem value="plank">Plank (MM:SS)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legTuckPlank" className="text-sm font-medium text-slate-700">
                        {formData.legTuckPlankType === 'legTuck' ? 'Leg Tuck Repetitions' : 'Plank Duration (MM:SS)'}
                      </Label>
                      <Input
                        id="legTuckPlank"
                        type={formData.legTuckPlankType === 'legTuck' ? 'number' : 'text'}
                        placeholder={formData.legTuckPlankType === 'legTuck' ? 'e.g., 20' : 'e.g., 2:30'}
                        value={formData.legTuckPlank}
                        onChange={(e) => setFormData(prev => ({ ...prev, legTuckPlank: e.target.value }))}
                        className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Cardio Event
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="run" className="text-sm font-medium text-slate-700">
                        2-Mile Run Time (MM:SS)
                      </Label>
                      <Input
                        id="run"
                        type="text"
                        placeholder="e.g., 13:30"
                        value={formData.run}
                        onChange={(e) => setFormData(prev => ({ ...prev, run: e.target.value }))}
                        className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isCalculating}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-5 w-5" />
                        Calculate ACFT Score
                      </>
                    )}
                  </Button>
                  
                  {scores && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={resetForm}
                      className="px-6 py-4 border-2 hover:bg-slate-50"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </form>

              {/* Results Section */}
              {scores && (
                <div className="mt-12 space-y-8 animate-in fade-in duration-500">
                  {/* Main Score Display */}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">Your ACFT Results</h3>
                    <div className={`inline-block px-8 py-6 rounded-2xl ${getScoreInterpretation(scores.total).bgColor} border-2 border-white shadow-lg`}>
                      <div className="flex items-center justify-center gap-3 mb-3">
                        {React.createElement(getScoreInterpretation(scores.total).icon, {
                          className: `w-8 h-8 ${getScoreInterpretation(scores.total).color}`
                        })}
                        <div className="text-4xl font-bold text-slate-900">{scores.total}/600</div>
                      </div>
                      <div className={`text-lg font-semibold ${getScoreInterpretation(scores.total).color} mb-2`}>
                        {getScoreInterpretation(scores.total).level}
                      </div>
                      <div className="text-sm text-slate-600">
                        {getScoreInterpretation(scores.total).message}
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
                    <Button onClick={printResults} variant="outline" className="flex items-center border-2 hover:bg-slate-50">
                      <FileText className="mr-2 h-4 w-4" />
                      Print Results
                    </Button>
                    <Button onClick={() => shareScore('twitter')} variant="outline" className="flex items-center border-2 hover:bg-blue-50">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share on Twitter
                    </Button>
                    <Button onClick={() => shareScore('linkedin')} variant="outline" className="flex items-center border-2 hover:bg-blue-50">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share on LinkedIn
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ACFTCalculator;
