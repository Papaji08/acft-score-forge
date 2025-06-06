
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ACFTEventsSectionProps {
  formData: {
    deadlift: string;
    powerThrow: string;
    pushups: string;
    sprintDragCarry: string;
    legTuckPlank: string;
    legTuckPlankType: string;
    run: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

const ACFTEventsSection = ({ formData, onFormDataChange }: ACFTEventsSectionProps) => {
  return (
    <>
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
              onChange={(e) => onFormDataChange({ deadlift: e.target.value })}
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
              onChange={(e) => onFormDataChange({ powerThrow: e.target.value })}
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
              onChange={(e) => onFormDataChange({ pushups: e.target.value })}
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
              onChange={(e) => onFormDataChange({ sprintDragCarry: e.target.value })}
              className="border-2 hover:border-blue-300 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="legTuckPlankType" className="text-sm font-medium text-slate-700">
              Core Event Type
            </Label>
            <Select onValueChange={(value) => onFormDataChange({ legTuckPlankType: value })}>
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
              onChange={(e) => onFormDataChange({ legTuckPlank: e.target.value })}
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
              onChange={(e) => onFormDataChange({ run: e.target.value })}
              className="border-2 hover:border-purple-300 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ACFTEventsSection;
