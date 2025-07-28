'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { ChatbotSettings } from '@/components/chatbot-settings';
import { ChatbotPreview } from '@/components/chatbot-preview';
import { EmbedCode } from '@/components/embed-code';
import { Separator } from '@/components/ui/separator';

export default function ChatbotPage() {
  const [generatedPersona, setGeneratedPersona] = useState<string | null>(
    "I am a friendly and helpful assistant for FAQ Bot. I'm here to answer questions based on the provided documents."
  );

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Chatbot Settings"
        description="Customize your chatbot's personality and behavior."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ChatbotSettings setGeneratedPersona={setGeneratedPersona} />
        </div>
        <div className="space-y-8">
          <ChatbotPreview generatedPersona={generatedPersona} />
          <EmbedCode />
        </div>
      </div>
    </div>
  );
}
