
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfoSectionProps {
  formData: {
    age: string;
    gender: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

const PersonalInfoSection = ({ formData, onFormDataChange }: PersonalInfoSectionProps) => {
  return (
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
          <Select onValueChange={(value) => onFormDataChange({ age: value })}>
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
          <Select onValueChange={(value) => onFormDataChange({ gender: value })}>
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
  );
};

export default PersonalInfoSection;
