'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { ChatbotSettings } from '@/components/chatbot-settings';
import { ChatbotPreview } from '@/components/chatbot-preview';

export default function ChatbotPage() {
  const [generatedPersona, setGeneratedPersona] = useState<string | null>(
    "I am a friendly and helpful assistant for FAQ Bot. I'm here to answer questions based on the provided documents."
  );
  const [persona, setPersona] = useState<string>("You are a helpful assistant. Your goal is to answer user questions based on the documents provided. Be friendly and professional. If you don't know the answer, say so.");

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Chatbot Settings"
        description="Customize your chatbot's personality and behavior."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ChatbotSettings setGeneratedPersona={setGeneratedPersona} setPersona={setPersona} />
        </div>
        <div>
          <ChatbotPreview generatedPersona={persona} />
        </div>
      </div>
    </div>
  );
}
