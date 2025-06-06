
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FAQSection = () => {
  const faqs = [
    {
      question: "What is a good ACFT score?",
      answer: "A 'good' ACFT score depends on your goals and role. The minimum passing score is 360 (60 points per event). Scores of 480+ are considered very good, while 540+ are excellent. However, some military occupations may require higher minimum scores."
    },
    {
      question: "What happens if you fail the ACFT?",
      answer: "Failing the ACFT can result in counseling, additional training, enrollment in the Army Body Composition Program if applicable, and potentially administrative actions. Soldiers typically get opportunities for remedial training and retesting."
    },
    {
      question: "How often is the ACFT taken?",
      answer: "The ACFT is administered at least twice per year for all soldiers. Additional tests may be required for specific circumstances, such as before deployment, during leadership courses, or as part of promotion requirements."
    },
    {
      question: "Can I choose between leg tuck and plank?",
      answer: "Yes, soldiers can choose between the leg tuck and the plank for the core strength event. However, the leg tuck is the preferred method, and some units may require it specifically."
    },
    {
      question: "Are ACFT scores age and gender neutral?",
      answer: "The ACFT uses a single standard for scoring regardless of age or gender, but minimum requirements may vary by Military Occupational Specialty (MOS). This represents a significant change from the previous APFT system."
    },
    {
      question: "How should I prepare for the ACFT?",
      answer: "Preparation should include strength training, cardiovascular conditioning, and practicing the specific ACFT events. Focus on compound movements, explosive power development, and functional fitness patterns that mirror the test events."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Common questions about the Army Combat Fitness Test and scoring.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index}>
              <Card className="border border-slate-200 shadow-sm">
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-left font-semibold text-slate-900 text-lg">
                        {faq.question}
                      </h3>
                      <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
