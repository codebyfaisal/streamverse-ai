import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const faqs = [
  {
    question: "What is StreamVerse?",
    answer:
      "StreamVerse is a video streaming platform that allows creators to share their content and viewers to discover and enjoy high-quality videos.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button in the top right corner and follow the registration process. You can sign up using your email or through social media accounts.",
  },
  {
    question: "Is StreamVerse free to use?",
    answer:
      "Yes, StreamVerse is free to use with basic features. We also offer premium plans with additional features for both viewers and creators.",
  },
  {
    question: "How can I become a content creator?",
    answer:
      "Any registered user can become a creator by verifying their account and uploading their first video. Visit your profile settings to get started.",
  },
  {
    question: "What video formats are supported?",
    answer:
      "We support most common video formats including MP4, AVI, MOV, and more. Videos are automatically transcoded for optimal playback.",
  },
  // Add more FAQs as needed
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between font-medium text-left"
        >
          {faq.question}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 text-muted-foreground">
        {faq.answer}
      </CollapsibleContent>
    </Collapsible>
  );
}

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container max-w-3xl py-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about StreamVerse
          </p>
        </div>

        {/* FAQ List */}
        <div className="divide-y">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={index === openIndex}
              onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="text-xl font-semibold">Still have questions?</h2>
          <p className="text-muted-foreground">
            Can't find the answer you're looking for? Please contact our support
            team.
          </p>
          <Button asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
