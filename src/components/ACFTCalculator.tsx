
import React, { useState } from 'react';
import { Calculator, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import PersonalInfoSection from './calculator/PersonalInfoSection';
import ACFTEventsSection from './calculator/ACFTEventsSection';
import ScoreResults from './calculator/ScoreResults';
import { calculateScore, ACFTScore } from './calculator/ACFTScoring';

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

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
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
                <PersonalInfoSection 
                  formData={formData} 
                  onFormDataChange={handleFormDataChange} 
                />
                
                <ACFTEventsSection 
                  formData={formData} 
                  onFormDataChange={handleFormDataChange} 
                />

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

              {scores && (
                <ScoreResults 
                  scores={scores} 
                  onPrintResults={printResults} 
                  onShareScore={shareScore} 
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ACFTCalculator;
