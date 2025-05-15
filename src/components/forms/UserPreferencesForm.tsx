"use client";

import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Settings2, List, FileText } from 'lucide-react';

const formSchema = z.object({
  userPreferences: z.string().min(10, { message: 'Please describe your preferences in a bit more detail.' }),
  availableSources: z.string().min(10, { message: 'Please list some available sources or content types.' }),
});

export type UserPreferencesFormData = z.infer<typeof formSchema>;

interface UserPreferencesFormProps {
  onSubmit: (data: UserPreferencesFormData) => void;
  isLoading: boolean;
  defaultValues?: Partial<UserPreferencesFormData>;
}

const UserPreferencesForm: FC<UserPreferencesFormProps> = ({ onSubmit, isLoading, defaultValues }) => {
  const form = useForm<UserPreferencesFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPreferences: defaultValues?.userPreferences || '',
      availableSources: defaultValues?.availableSources || '',
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings2 className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Your Preferences</CardTitle>
        </div>
        <CardDescription>
          Tell us what you like and what content sources are available so we can generate personalized recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg flex items-center gap-2">
                    <List className="h-5 w-5 text-muted-foreground" />
                    Describe your preferences, interests, and history:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I enjoy science fiction movies, indie music, and cooking documentaries..."
                      className="min-h-[100px] resize-y"
                      {...field}
                      aria-label="User preferences"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableSources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg flex items-center gap-2">
                     <FileText className="h-5 w-5 text-muted-foreground" />
                    Available sources of items/content:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Netflix, Spotify, YouTube channels about cooking, local library catalog..."
                      className="min-h-[100px] resize-y"
                      {...field}
                      aria-label="Available sources"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserPreferencesForm;
