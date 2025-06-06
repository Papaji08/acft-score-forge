
import React, { useState } from 'react';
import { Calculator, FileText, Share2, Menu, X, Trophy, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import ACFTCalculator from '@/components/ACFTCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';
import FAQSection from '@/components/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main>
        <HeroSection />
        <ACFTCalculator />
        <InfoSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
