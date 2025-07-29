import { DashboardHeader } from '@/components/dashboard-header';
import { EmbedCode } from '@/components/embed-code';

export default function EmbedPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Embed Chatbot"
        description="Copy and paste this snippet into your website's HTML to embed the chatbot."
      />
      <EmbedCode />
    </div>
  );
}
