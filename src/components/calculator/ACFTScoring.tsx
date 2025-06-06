
export interface ACFTScore {
  deadlift: number;
  powerThrow: number;
  pushups: number;
  sprintDragCarry: number;
  legTuckPlank: number;
  run: number;
  total: number;
}

export const calculateScore = (value: number, event: string, age: number, gender: string): number => {
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
