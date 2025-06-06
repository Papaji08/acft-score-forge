
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Zap, TrendingUp, Users, Calculator } from 'lucide-react';

const ACFTScoringSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Understanding the ACFT Events and Scoring System
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
            The ACFT uses a comprehensive scoring system with a maximum of 100 points per event. 
            Each event tests different aspects of physical fitness required for combat readiness.
          </p>
        </div>

        {/* Scoring Breakdown */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Scoring Standards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardHeader className="text-center">
                <Trophy className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-emerald-800">Excellent</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-emerald-700 mb-2">540-600</div>
                <p className="text-sm text-emerald-600">Outstanding performance</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-blue-800">Very Good</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-blue-700 mb-2">480-539</div>
                <p className="text-sm text-blue-600">Above average fitness</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-green-800">Good</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-green-700 mb-2">420-479</div>
                <p className="text-sm text-green-600">Solid performance</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardHeader className="text-center">
                <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-yellow-800">Passing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-yellow-700 mb-2">360-419</div>
                <p className="text-sm text-yellow-600">Minimum standard</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Breakdown */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Event Breakdown and Performance Tips</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold">DL</span>
                  </div>
                  3-Rep Max Deadlift
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Tests lower body and back strength. You have three attempts to lift maximum weight.</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Focus on proper form over maximum weight</li>
                    <li>• Engage core and keep back straight</li>
                    <li>• Practice progressive overload training</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">SPT</span>
                  </div>
                  Standing Power Throw
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Measures explosive power using a 10lb medicine ball thrown backwards overhead.</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Use your whole body, not just arms</li>
                    <li>• Practice with medicine ball throws</li>
                    <li>• Focus on hip drive and follow-through</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">HRP</span>
                  </div>
                  Hand-Release Push-ups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Tests upper body endurance with a complete range of motion push-up.</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Maintain straight body alignment</li>
                    <li>• Lift hands completely off ground at bottom</li>
                    <li>• Build endurance with high-rep training</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">SDC</span>
                  </div>
                  Sprint-Drag-Carry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Tests anaerobic capacity through 5 different movement patterns over 250 meters.</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Practice each movement separately</li>
                    <li>• Focus on quick transitions</li>
                    <li>• Build anaerobic endurance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold">LTK</span>
                  </div>
                  Leg Tuck / Plank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Tests core strength with choice between leg tuck repetitions or plank hold.</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Strengthen grip for leg tucks</li>
                    <li>• Focus on core stability training</li>
                    <li>• Practice proper form for chosen event</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">2MR</span>
                  </div>
                  2-Mile Run
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Tests cardiovascular endurance with a timed 2-mile run.</p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Build aerobic base with long runs</li>
                    <li>• Include interval training</li>
                    <li>• Practice pacing strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Facts */}
        <div className="bg-slate-50 rounded-lg p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Key ACFT Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">360</div>
              <p className="text-slate-600">Minimum passing score (60 per event)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">600</div>
              <p className="text-slate-600">Maximum possible score (100 per event)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
              <p className="text-slate-600">Events testing different fitness domains</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ACFTScoringSection;
