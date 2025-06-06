
import React from 'react';
import { Calculator, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/75"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-600 rounded-full">
              <Calculator className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            ACFT Score Calculator
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Calculate your Army Combat Fitness Test score based on age, gender, and performance. 
            Get instant results with our updated 2025 ACFT standards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
              onClick={scrollToCalculator}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate My Score
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Award className="mr-2 h-5 w-5" />
              Learn About ACFT
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">6</div>
              <div className="text-slate-300">Test Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">600</div>
              <div className="text-slate-300">Maximum Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">360</div>
              <div className="text-slate-300">Minimum to Pass</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
