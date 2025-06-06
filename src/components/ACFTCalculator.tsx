
import React, { useState } from 'react';
import { Calculator, FileText, Share2, Trophy, Target } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in your age and gender.",
        variant: "destructive"
      });
      return;
    }

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
    
    toast({
      title: "Score Calculated!",
      description: `Your total ACFT score is ${calculatedScores.total}/600`,
    });
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 540) return { level: "Excellent", color: "text-emerald-600", bgColor: "bg-emerald-50" };
    if (score >= 480) return { level: "Very Good", color: "text-blue-600", bgColor: "bg-blue-50" };
    if (score >= 420) return { level: "Good", color: "text-green-600", bgColor: "bg-green-50" };
    if (score >= 360) return { level: "Satisfactory", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-50" };
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

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Calculate Your ACFT Score
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enter your performance data for each of the six ACFT events to get your official score.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-6 w-6 text-emerald-600" />
                ACFT Performance Data
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="age" className="text-sm font-medium text-slate-700">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-sm font-medium text-slate-700">
                      Gender
                    </Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ACFT Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="deadlift" className="text-sm font-medium text-slate-700">
                      3-Rep Max Deadlift (lbs)
                    </Label>
                    <Input
                      id="deadlift"
                      type="number"
                      placeholder="e.g., 340"
                      value={formData.deadlift}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadlift: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
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
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pushups" className="text-sm font-medium text-slate-700">
                      Hand-Release Push-ups (repetitions)
                    </Label>
                    <Input
                      id="pushups"
                      type="number"
                      placeholder="e.g., 60"
                      value={formData.pushups}
                      onChange={(e) => setFormData(prev => ({ ...prev, pushups: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sprintDragCarry" className="text-sm font-medium text-slate-700">
                      Sprint-Drag-Carry (MM:SS)
                    </Label>
                    <Input
                      id="sprintDragCarry"
                      type="text"
                      placeholder="e.g., 1:33"
                      value={formData.sprintDragCarry}
                      onChange={(e) => setFormData(prev => ({ ...prev, sprintDragCarry: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="legTuckPlankType" className="text-sm font-medium text-slate-700">
                      Leg Tuck or Plank
                    </Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, legTuckPlankType: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legTuck">Leg Tuck (repetitions)</SelectItem>
                        <SelectItem value="plank">Plank (MM:SS)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="legTuckPlank" className="text-sm font-medium text-slate-700">
                      {formData.legTuckPlankType === 'legTuck' ? 'Leg Tuck Repetitions' : 'Plank Duration (MM:SS)'}
                    </Label>
                    <Input
                      id="legTuckPlank"
                      type={formData.legTuckPlankType === 'legTuck' ? 'number' : 'text'}
                      placeholder={formData.legTuckPlankType === 'legTuck' ? 'e.g., 20' : 'e.g., 2:30'}
                      value={formData.legTuckPlank}
                      onChange={(e) => setFormData(prev => ({ ...prev, legTuckPlank: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="run" className="text-sm font-medium text-slate-700">
                      2-Mile Run (MM:SS)
                    </Label>
                    <Input
                      id="run"
                      type="text"
                      placeholder="e.g., 13:30"
                      value={formData.run}
                      onChange={(e) => setFormData(prev => ({ ...prev, run: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate ACFT Score
                </Button>
              </form>

              {/* Results Section */}
              {scores && (
                <div className="mt-12 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Your ACFT Results</h3>
                    <div className={`inline-block px-6 py-3 rounded-lg ${getScoreInterpretation(scores.total).bgColor}`}>
                      <div className="text-3xl font-bold text-slate-900">{scores.total}/600</div>
                      <div className={`text-sm ${getScoreInterpretation(scores.total).color}`}>
                        {getScoreInterpretation(scores.total).level}
                      </div>
                    </div>
                  </div>

                  {/* Individual Event Scores */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">{scores.deadlift}</div>
                      <div className="text-sm text-slate-600">Deadlift</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">{scores.powerThrow}</div>
                      <div className="text-sm text-slate-600">Power Throw</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">{scores.pushups}</div>
                      <div className="text-sm text-slate-600">Push-ups</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">{scores.sprintDragCarry}</div>
                      <div className="text-sm text-slate-600">Sprint-Drag-Carry</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">{scores.legTuckPlank}</div>
                      <div className="text-sm text-slate-600">Leg Tuck/Plank</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="font-semibold text-slate-900">{scores.run}</div>
                      <div className="text-sm text-slate-600">2-Mile Run</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={printResults} variant="outline" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Print Results
                    </Button>
                    <Button onClick={() => shareScore('twitter')} variant="outline" className="flex items-center">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share on Twitter
                    </Button>
                    <Button onClick={() => shareScore('linkedin')} variant="outline" className="flex items-center">
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
