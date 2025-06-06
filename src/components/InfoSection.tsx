
import React from 'react';
import { Trophy, Target, Zap, FileText, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InfoSection = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* About ACFT */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            About the Army Combat Fitness Test
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              The Army Combat Fitness Test (ACFT) is the U.S. Army's new physical fitness assessment that replaced the Army Physical Fitness Test (APFT) in 2022. The ACFT is designed to better measure soldiers' physical readiness for combat operations and consists of six challenging events that test different aspects of fitness.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Unlike the APFT, the ACFT is age and gender-neutral for scoring, focusing on the physical demands of military occupational specialties (MOS). All soldiers must achieve a minimum score of 360 points (60 points per event) to pass, with a maximum possible score of 600 points.
            </p>
          </div>
        </div>

        {/* ACFT Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">The Six ACFT Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg">3-Rep Max Deadlift</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Tests muscular strength, specifically in the posterior chain muscles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Standing Power Throw</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Measures explosive power in the hips, legs, and core.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Hand-Release Push-ups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Tests muscular endurance of the chest, shoulders, and triceps.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Sprint-Drag-Carry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Tests anaerobic capacity and functional movement patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Leg Tuck or Plank</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Tests core strength and endurance with alternative options.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">2-Mile Run</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Tests aerobic endurance and cardiovascular fitness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Training Tips */}
        <div id="training" className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tips to Improve Your ACFT Performance</h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Strength Training</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Focus on compound movements like deadlifts, squats, and rows</li>
                  <li>• Progressive overload is key for strength gains</li>
                  <li>• Include explosive movements like medicine ball throws</li>
                  <li>• Train core stability with planks and leg raises</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Conditioning</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>• Mix aerobic and anaerobic training methods</li>
                  <li>• Practice event-specific movements regularly</li>
                  <li>• Include interval training for cardiovascular fitness</li>
                  <li>• Don't neglect recovery and proper nutrition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Download Standards */}
        <div className="text-center">
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="h-6 w-6 text-emerald-600" />
                ACFT Standards Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Download the official ACFT scoring standards and training guide.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Download PDF Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
