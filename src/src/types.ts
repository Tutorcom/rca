export type Page = 'dashboard' | 'discover' | 'applications' | 'profile' | 'clients' | 'analytics' | 'settings' | 'support' | 'document-hub' | 'messages' | 'projects' | 'tasks' | 'billing' | 'team' | 'client-detail';

export type ProjectStatus = 'opportunity' | 'in_progress' | 'on_hold' | 'completed';

export interface Project {
  id: number;
  title: string;
  clientName: string;
  clientId: number;
  value: string;
  description: string;
  tags: string[];
  deadline: string;
  status: ProjectStatus;
  relatedDocuments: { name: string; url: string }[];
  budgetedHours: number;
  trackedHours: number;
  rate: number; // hourly rate
  expenses: number;
}

export type ApplicationStatus = 'approved' | 'review' | 'update' | 'rejected' | 'draft' | 'submitted';

export interface Application {
  id: number;
  contractTitle: string;
  contractor: string;
  contractorId: number;
  date: string;
  status: ApplicationStatus;
}

export type ActivityType = 'contract' | 'user' | 'feedback' | 'deadline' | 'document' | 'application' | 'task' | 'invoice';

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

export interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'word' | 'excel';
  size: string;
  date: string;
  uploadedBy: number; // user ID
}

export interface User {
  id: number;
  name: string;
  role: 'admin' | 'contractor';
  email: string;
  avatar: string;
  companyName: string;
  status: 'active' | 'pending_review';
  certifications: string[];
  tags: string[];
}

export interface Notification {
  id: number;
  title:string;
  description: string;
  time: string;
  read: boolean;
}

export interface AiMessage {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface ChatMessage {
  id: number;
  conversationId: string;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Task {
    id: number;
    title: string;
    projectId: number;
    assignedTo: number; // userId
    status: 'todo' | 'in_progress' | 'done';
    dueDate: string;
}

export interface TimeEntry {
    id: number;
    projectId: number;
    userId: number;
    hours: number;
    date: string;
    description: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface InvoiceLineItem {
    description: string;
    quantity: number;
    price: number;
}
export interface Invoice {
    id: number;
    clientId: number;
    projectId: number;
    amount: number;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
    lineItems: InvoiceLineItem[];
}

export type SidebarLinkType = 'link' | 'header';

export type SidebarLink = {
    type: SidebarLinkType;
    title: string;
    iconName?: string;
    page?: Page;
    roles?: ('admin' | 'contractor')[];
};