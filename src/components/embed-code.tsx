'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCopy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function EmbedCode() {
  const { toast } = useToast();
  const embedCode = `<script src="https://your-domain.com/faq-bot-embed.js" data-bot-id="YOUR_BOT_ID" async defer></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: 'Copied to Clipboard!',
      description: 'You can now paste the embed code into your website.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed on Your Website</CardTitle>
        <CardDescription>
          Copy and paste this snippet into your website's HTML to embed the chatbot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            <code>{embedCode}</code>
          </pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            aria-label="Copy embed code"
          >
            <ClipboardCopy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
