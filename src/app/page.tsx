"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import UserPreferencesForm, { type UserPreferencesFormData } from '@/components/forms/UserPreferencesForm';
import RecommendationsDisplay from '@/components/recommendations/RecommendationsDisplay';
import { generateRecommendations } from '@/ai/flows/generate-recommendations';
import type { RecommendationItem } from '@/types';
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [userPreferences, setUserPreferences] = useState('');
  const [availableSources, setAvailableSources] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Effect to load preferences from localStorage if available
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    const savedSources = localStorage.getItem('availableSources');
    if (savedPrefs) setUserPreferences(savedPrefs);
    if (savedSources) setAvailableSources(savedSources);
  }, []);


  const handleGenerateRecommendations = async (data: UserPreferencesFormData) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]); // Clear previous recommendations

    // Save to state and localStorage
    setUserPreferences(data.userPreferences);
    setAvailableSources(data.availableSources);
    localStorage.setItem('userPreferences', data.userPreferences);
    localStorage.setItem('availableSources', data.availableSources);

    try {
      const result = await generateRecommendations({
        userPreferences: data.userPreferences,
        availableSources: data.availableSources,
      });
      
      const parsedRecommendations = result.recommendations
        .split('\n')
        .map(s => s.trim())
        .filter(text => text !== "")
        .map((text, index) => ({ id: String(index), text }));
      
      setRecommendations(parsedRecommendations);
      if (parsedRecommendations.length === 0) {
        toast({
          title: "No specific recommendations found",
          description: "Try broadening your preferences or sources.",
          variant: "default",
        });
      }
    } catch (e) {
      console.error("Error generating recommendations:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to generate recommendations: ${errorMessage}. Please try again.`);
      toast({
        title: "Error",
        description: `Failed to generate recommendations: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (id: string, feedback: 'liked' | 'disliked') => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, feedback: rec.feedback === feedback ? undefined : feedback } : rec
      )
    );
    toast({
      title: "Feedback Received",
      description: `Thanks for your feedback on recommendation "${recommendations.find(r => r.id === id)?.text.substring(0,30)}..."!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl p-4 md:p-6">
        <div className="space-y-8">
          <UserPreferencesForm
            onSubmit={handleGenerateRecommendations}
            isLoading={isLoading}
            defaultValues={{ userPreferences, availableSources }}
          />
          <RecommendationsDisplay
            recommendations={recommendations}
            isLoading={isLoading}
            error={error}
            onFeedback={handleFeedback}
          />
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} RecommenderPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
