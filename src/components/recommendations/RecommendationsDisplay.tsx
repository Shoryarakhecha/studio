"use client";

import type { FC } from 'react';
import RecommendationCard from './RecommendationCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import type { RecommendationItem } from '@/types';
import { Wand2, AlertTriangle, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


interface RecommendationsDisplayProps {
  recommendations: RecommendationItem[];
  isLoading: boolean;
  error: string | null;
  onFeedback: (id: string, feedback: 'liked' | 'disliked') => void;
}

const RecommendationsDisplay: FC<RecommendationsDisplayProps> = ({ recommendations, isLoading, error, onFeedback }) => {
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Your Recommendations</CardTitle>
          </div>
          <CardDescription>Generating your personalized list...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg shadow-sm">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex justify-end gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="shadow-md">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (recommendations.length === 0) {
    return (
       <Card className="shadow-lg text-center">
        <CardHeader>
          <div className="flex items-center gap-2 justify-center">
            <Info className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">No Recommendations Yet</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Enter your preferences above and click "Get Recommendations" to see personalized suggestions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
           <Wand2 className="h-6 w-6 text-primary" />
           <CardTitle className="text-2xl">Your Recommendations</CardTitle>
        </div>
        <CardDescription>Here are some suggestions based on your preferences. Let us know what you think!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((item) => (
          <RecommendationCard key={item.id} item={item} onFeedback={onFeedback} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendationsDisplay;
