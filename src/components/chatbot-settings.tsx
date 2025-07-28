'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateChatbot } from '@/ai/flows/generate-chatbot-from-prompt';
import { Input } from './ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Chatbot name is required').default('My Chatbot'),
  persona: z
    .string()
    .min(10, 'Persona description must be at least 10 characters.')
    .default('A friendly assistant that helps users with their questions.'),
  fallback: z
    .string()
    .default("I'm sorry, I don't have enough information to answer that question."),
});

interface ChatbotSettingsProps {
  setGeneratedPersona: (persona: string | null) => void;
}

export function ChatbotSettings({ setGeneratedPersona }: ChatbotSettingsProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: 'My FAQ Bot',
        persona: "You are a helpful assistant. Your goal is to answer user questions based on the documents provided. Be friendly and professional. If you don't know the answer, say so.",
        fallback: "I'm sorry, I don't have the information to answer that question. Please try asking in a different way."
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await generateChatbot({ prompt: values.persona });
      setGeneratedPersona(result.chatbotPersona);
      toast({
        title: 'Chatbot Updated!',
        description: 'Your chatbot is now using the new persona.',
      });
    } catch (error) {
      console.error('Failed to generate chatbot:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'Failed to generate chatbot. Please check the console for details.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Chatbot Persona</CardTitle>
            <CardDescription>
              Define how your chatbot should sound and behave. This will be used to generate its core instructions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Chatbot Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Support Bot" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone & Personality</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A friendly and professional assistant that specializes in marketing documents."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="fallback"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Fallback Response</FormLabel>
                    <FormControl>
                        <Textarea placeholder="e.g., Sorry, I can't find an answer to that." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Generating...' : 'Update Chatbot'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
