'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DocumentUpload } from '@/components/document-upload';
import { DocumentList } from '@/components/document-list';

export interface Document {
  id: string;
  name: string;
  uploaded: Date;
  status: 'Trained' | 'Pending' | 'Error';
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Product Roadmap Q4.pdf', uploaded: new Date('2023-10-15T10:30:00Z'), status: 'Trained' },
    { id: '2', name: 'Onboarding Guide.docx', uploaded: new Date('2023-10-14T14:00:00Z'), status: 'Trained' },
    { id: '3', name: 'API Documentation.md', uploaded: new Date('2023-10-12T09:00:00Z'), status: 'Pending' },
    { id: '4', name: 'Security Policy.pdf', uploaded: new Date('2023-10-11T11:45:00Z'), status: 'Error' },
  ]);

  const handleFileUpload = (file: File) => {
    const newDocument: Document = {
      id: (documents.length + 1).toString(),
      name: file.name,
      uploaded: new Date(),
      status: 'Pending',
    };
    setDocuments((prev) => [newDocument, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };


  return (
    <div className="space-y-8">
      <DashboardHeader title="Documents" description="Upload and manage documents for your chatbot to learn from." />
      <DocumentUpload onFileUpload={handleFileUpload} />
      <DocumentList documents={documents} onDelete={handleDeleteDocument} />
    </div>
  );
}
