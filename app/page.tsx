"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import Image from 'next/image';

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    activity: "",
    food: "",
    transport: "",
    date: new Date(),
  });

  const questions = [
    {
      question: "What kind of activity would you like to do?",
      options: ["Movie", "Picnic", "Museum", "Concert"],
      key: "activity",
    },
    {
      question: "What food should we try?",
      options: ["Duren", "Seblak", "Bakso", "Pecel Lele "],
      key: "food",
    },
    {
      question: "How should we get there?",
      options: ["Car", "Public Transport", "Walk", ],
      key: "transport",
    },
  ];

  const handleAnswer = (answer: string) => {
    if (step < questions.length) {
      setAnswers({ ...answers, [questions[step].key]: answer });
      setStep(step + 1);
    } else if (step === questions.length) {
      setStep(step + 1); 
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setAnswers({ ...answers, date });
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 0 ? (
              <>
                Will you go on a date with me? <HeartIcon className="inline-block text-red-500" />
              </>
            ) : step === 4 ? (
              "It&apos;s a date!"
            ) : (
              "Let&apos;s plan our perfect date!"
            )}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 0
              ? "I&apos;ve prepared some questions to make it special for you."
              : step === 4
              ? "I can&apos;t wait to spend time with you!"
              : `Question ${step} of ${questions.length + 1}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 0 ? (
            <Button onClick={() => setStep(1)} className="w-full">
              Yes, I&apos;d love to!
            </Button>
          ) : step <= 3 ? (
            <div className="space-y-4">
              <h3 className="font-medium">{questions[step - 1].question}</h3>
              <RadioGroup onValueChange={handleAnswer}>
                {questions[step - 1].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : step === 4 ? (
            <div className="space-y-4">
              <h3 className="font-medium">When would you like to go?</h3>
              <Calendar
                mode="single"
                selected={answers.date}
                onSelect={handleDateChange}
                className="rounded-md border"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <p>Great! Here&apos;s a summary of our date:</p>
              <ul className="list-disc list-inside">
                <li>Activity: {answers.activity}</li>
                <li>Food: {answers.food}</li>
                <li>Transportation: {answers.transport}</li>
                <li>Date: {answers.date.toISOString().split('T')[0]}</li>
              </ul>
            </div>
          )}
        </CardContent>
        {step === 5 && (
          <CardFooter className="flex flex-col items-center">
            <Button onClick={() => setStep(0)} className="w-full mb-4">
              Start Over
            </Button>
            <Image src="/love.jpg" alt="Flower" width={100} height={100} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}