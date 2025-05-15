"use client";

import type { FC } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { RecommendationItem } from '@/types';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  item: RecommendationItem;
  onFeedback: (id: string, feedback: 'liked' | 'disliked') => void;
}

const RecommendationCard: FC<RecommendationCardProps> = ({ item, onFeedback }) => {
  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardContent className="p-4">
        <p className="text-foreground leading-relaxed">{item.text}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFeedback(item.id, 'liked')}
          aria-label="Like recommendation"
          className={cn(
            "rounded-full hover:bg-green-100 dark:hover:bg-green-900",
            item.feedback === 'liked' ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' : 'text-slate-500 hover:text-green-600 dark:hover:text-green-400'
          )}
        >
          <ThumbsUp className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFeedback(item.id, 'disliked')}
          aria-label="Dislike recommendation"
           className={cn(
            "rounded-full hover:bg-red-100 dark:hover:bg-red-900",
            item.feedback === 'disliked' ? 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' : 'text-slate-500 hover:text-red-600 dark:hover:text-red-400'
          )}
        >
          <ThumbsDown className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
