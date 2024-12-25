import React from "react";
import { faqs } from "@/data";
import Container from "../container/Container";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  size: string;
}

const Faq = ({ size }: FaqProps) => {
  const index = size === "all" ? faqs.length : 4;

  return (
    <section className="w-full min-h-screen section-padding">
      <Container>
        <div>
          <h2 className="secondary-heading text-center">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="md:text-center">
            Got questions? {`We've`} got answers. Check out our FAQs below.
          </p>
          <div className="w-full mt-10 flex justify-center">
            <Accordion
              type="single"
              collapsible
              className="w-full md:w-[75%] flex flex-col gap-5"
            >
              {faqs.slice(0, index).map((faq) => (
                <AccordionItem
                  value={faq.id.toString()}
                  key={faq.id}
                  className="shadow-lg"
                >
                  <AccordionTrigger className="px-5 text-xl text-left font-[500]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-5 bg-secondary-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
