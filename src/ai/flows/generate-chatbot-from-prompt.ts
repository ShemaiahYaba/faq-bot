'use server';

/**
 * @fileOverview A chatbot generation AI agent.
 *
 * - generateChatbot - A function that handles the chatbot creation process.
 * - GenerateChatbotInput - The input type for the generateChatbot function.
 * - GenerateChatbotOutput - The return type for the generateChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChatbotInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A description of the chatbot, its desired behavior, and personality.'
    ),
});
export type GenerateChatbotInput = z.infer<typeof GenerateChatbotInputSchema>;

const GenerateChatbotOutputSchema = z.object({
  chatbotPersona: z
    .string()
    .describe('A description of the chatbot persona based on the prompt.'),
  chatbotInstructions: z
    .string()
    .describe('Specific instructions for the chatbot based on the prompt.'),
});
export type GenerateChatbotOutput = z.infer<typeof GenerateChatbotOutputSchema>;

export async function generateChatbot(input: GenerateChatbotInput): Promise<GenerateChatbotOutput> {
  return generateChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatbotPrompt',
  input: {schema: GenerateChatbotInputSchema},
  output: {schema: GenerateChatbotOutputSchema},
  prompt: `You are an AI chatbot generator.  You will take a description of a desired chatbot, and create a persona and instructions for it.

Description: {{{prompt}}}

Create a persona for the chatbot, and specific instructions on how to behave. Return a JSON object with the chatbotPersona and chatbotInstructions fields.`,
});

const generateChatbotFlow = ai.defineFlow(
  {
    name: 'generateChatbotFlow',
    inputSchema: GenerateChatbotInputSchema,
    outputSchema: GenerateChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
