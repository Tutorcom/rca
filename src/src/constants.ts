import type { Project, Application, Activity, Document, User, Notification, ChatMessage, Task, Invoice, SidebarLink } from './types';

export const projects: Project[] = [
    {
        id: 1,
        title: "Downtown Arcadia Redevelopment",
        clientName: "City of Arcadia, FL",
        clientId: 3, // Corresponds to Coastal Construction for this demo
        value: "2.4M",
        description: "Redevelopment of downtown corridor including facade improvements, streetscape enhancements, and public space activation.",
        tags: ["Redevelopment", "CRA Zone", "P3 Project"],
        deadline: "2024-12-15",
        status: "in_progress",
        relatedDocuments: [
            { name: "Request_for_Proposal_Arcadia.pdf", url: "#" },
            { name: "City_Planning_Guidelines.pdf", url: "#" },
        ],
        budgetedHours: 300,
        trackedHours: 150,
        rate: 150,
        expenses: 12000,
    },
    {
        id: 2,
        title: "Affordable Housing Development",
        clientName: "Sarasota County Housing Authority",
        clientId: 4, // Corresponds to Sunshine Builders
        value: "5.1M",
        description: "Development of 50-unit affordable housing complex with community amenities in designated opportunity zone.",
        tags: ["Affordable Housing", "Live Local Act", "Multi-family"],
        deadline: "2024-11-30",
        status: "opportunity",
        relatedDocuments: [
            { name: "Sarasota_RFP_Housing.pdf", url: "#" },
            { name: "Live_Local_Act_Summary.pdf", url: "#" },
            { name: "General_Terms_and_Conditions.pdf", url: "#" },
        ],
        budgetedHours: 500,
        trackedHours: 0,
        rate: 180,
        expenses: 0,
    },
    {
        id: 3,
        title: "Waterfront Infrastructure Upgrade",
        clientName: "Tampa Bay Development Authority",
        clientId: 5, // Corresponds to Gulf Coast Developers
        value: "8.7M",
        description: "Comprehensive infrastructure improvements for waterfront district including utilities, walkways, and public amenities.",
        tags: ["Infrastructure", "P3 Project", "Waterfront"],
        deadline: "2025-01-20",
        status: "completed",
        relatedDocuments: [
            { name: "Tampa_Waterfront_RFP.pdf", url: "#" },
        ],
        budgetedHours: 800,
        trackedHours: 780,
        rate: 200,
        expenses: 45000,
    },
    {
        id: 4,
        title: "County-Wide Fiber Optic Network",
        clientName: "Manatee County Government",
        clientId: 3,
        value: "12.5M",
        description: "Installation of a new fiber optic network to connect all government buildings and improve public internet access.",
        tags: ["Technology", "Infrastructure", "Public Works"],
        deadline: "2025-02-28",
        status: "on_hold",
        relatedDocuments: [
            { name: "Manatee_Fiber_RFP.pdf", url: "#" },
            { name: "Technical_Specifications.pdf", url: "#" },
        ],
        budgetedHours: 1200,
        trackedHours: 250,
        rate: 220,
        expenses: 10000,
    }
];

export const applications: Application[] = [
    {
        id: 1,
        contractTitle: "North Port Community Center",
        contractor: "Coastal Construction Group",
        contractorId: 3,
        date: "2023-10-12",
        status: "approved"
    },
];

export const activities: Activity[] = [
    {
        id: 1,
        type: "contract",
        title: "New Project Opportunity",
        description: "Affordable Housing Development posted.",
        time: "2 hours ago"
    },
    {
        id: 2,
        type: "user",
        title: "Client Approved",
        description: "Coastal Construction Group approved",
        time: "Yesterday"
    },
    {
        id: 3,
        type: "task",
        title: "Task Completed",
        description: "Initial Site Survey for Arcadia Project.",
        time: "3 days ago"
    },
    {
        id: 4,
        type: "invoice",
        title: "Invoice Paid",
        description: "Invoice #2024-001 for $15,000 was paid by Gulf Coast Developers.",
        time: "4 days ago"
    }
];

export const documents: Document[] = [
    {
        id: 1,
        name: "Company Capabilities Statement.pdf",
        type: "pdf",
        size: "2.4 MB",
        date: "Oct 15, 2023",
        uploadedBy: 1, // Admin
    },
    {
        id: 2,
        name: "Coastal_Construction_Insurance.pdf",
        type: "pdf",
        size: "1.8 MB",
        date: "Oct 14, 2023",
        uploadedBy: 3, // Contractor
    },
];

export const users: User[] = [
    {
        id: 1,
        name: "Moni Roy",
        role: "admin",
        email: "moni@rosado.com",
        avatar: "MR",
        companyName: "Rosado Commercial Advisors",
        status: 'active',
        certifications: ["Certified Admin", "Project Management Professional (PMP)"],
        tags: ['Admin', 'Founder']
    },
    {
        id: 2,
        name: "Maria Rodriguez",
        role: "admin",
        email: "maria@rosado.com",
        avatar: "MR",
        companyName: "Rosado Commercial Advisors",
        status: 'active',
        certifications: ["Project Management Professional (PMP)"],
        tags: ['Admin', 'Project Manager']
    },
    {
        id: 3,
        name: "Coastal Construction",
        role: "contractor",
        email: "info@coastal.com",
        avatar: "CC",
        companyName: "Coastal Construction Group",
        status: 'active',
        certifications: ["General Contractor License", "LEED AP"],
        tags: ['Active Client', 'Top Tier']
    },
    {
        id: 4,
        name: "Sunshine Builders",
        role: "contractor",
        email: "contact@sunshine.com",
        avatar: "SB",
        companyName: "Sunshine Builders Inc.",
        status: 'pending_review',
        certifications: ["Florida State Certified Building Contractor"],
        tags: ['New Lead']
    },
    {
        id: 5,
        name: "Gulf Coast Developers",
        role: "contractor",
        email: "tenders@gulfcoastdev.com",
        avatar: "GC",
        companyName: "Gulf Coast Developers LLC",
        status: 'active',
        certifications: ["General Contractor License", "SBA 8(a) Certified"],
        tags: ['Active Client']
    }
];

export const notifications: Notification[] = [
    {
        id: 1,
        title: "New Project Lead",
        description: "Sunshine Builders has registered and is pending review.",
        time: "10 min ago",
        read: false
    },
    {
        id: 2,
        title: "Invoice #2024-002 is due soon.",
        description: "Payment for Arcadia Redevelopment is due in 3 days.",
        time: "1 hour ago",
        read: false
    }
];

export const messages: ChatMessage[] = [
    {
        id: 1,
        conversationId: '1_3',
        senderId: 1,
        text: 'Hello! I am reviewing your proposal for the Arcadia project. Can you please confirm your insurance coverage details?',
        timestamp: '2024-05-20T10:00:00Z',
    },
    {
        id: 2,
        conversationId: '1_3',
        senderId: 3,
        text: 'Hi Moni, certainly. I have just uploaded our latest Certificate of Insurance to my profile. Let me know if you need anything else.',
        timestamp: '2024-05-20T10:05:00Z',
    },
];

export const tasks: Task[] = [
    { id: 1, title: 'Draft initial proposal for Housing Dev', projectId: 2, assignedTo: 2, status: 'in_progress', dueDate: '2024-09-15'},
    { id: 2, title: 'Review Coastal Construction insurance docs', projectId: 1, assignedTo: 1, status: 'todo', dueDate: '2024-09-10'},
    { id: 3, title: 'Finalize quarterly report for Tampa project', projectId: 3, assignedTo: 2, status: 'done', dueDate: '2024-08-30'},
    { id: 4, title: 'Follow up with Manatee County on fiber network pause', projectId: 4, assignedTo: 1, status: 'todo', dueDate: '2024-09-12'},
];

export const invoices: Invoice[] = [
    { id: 1, clientId: 5, projectId: 3, amount: 15000, status: 'paid', issueDate: '2024-08-01', dueDate: '2024-08-31', lineItems: [{ description: 'Phase 3 Completion', quantity: 1, price: 15000}] },
    { id: 2, clientId: 3, projectId: 1, amount: 25000, status: 'sent', issueDate: '2024-08-15', dueDate: '2024-09-15', lineItems: [{ description: 'Initial Mobilization & Site Prep', quantity: 1, price: 25000}] },
    { id: 3, clientId: 3, projectId: 4, amount: 5000, status: 'draft', issueDate: '2024-09-01', dueDate: '2024-10-01', lineItems: [{ description: 'Preliminary Network Design', quantity: 1, price: 5000}] },
];

export const SIDEBAR_LINKS: SidebarLink[] = [
    { type: 'link', title: 'Dashboard', iconName: 'HomeIcon', page: 'dashboard', roles: ['admin', 'contractor'] },
    { type: 'link', title: 'Projects', iconName: 'FileContractIcon', page: 'projects', roles: ['admin', 'contractor'] },
    { type: 'link', title: 'My Applications', iconName: 'FileAltIcon', page: 'applications', roles: ['contractor'] },
    { type: 'link', title: 'Clients', iconName: 'UsersIcon', page: 'clients', roles: ['admin'] },
    { type: 'link', title: 'Team', iconName: 'UsersIcon', page: 'team', roles: ['admin'] },
    
    { type: 'header', title: 'Tools' },
    
    { type: 'link', title: 'Tasks', iconName: 'CheckCircleIcon', page: 'tasks', roles: ['admin', 'contractor'] },
    { type: 'link', title: 'Billing', iconName: 'BillingIcon', page: 'billing', roles: ['admin', 'contractor'] },
    { type: 'link', title: 'Messages', iconName: 'MailIcon', page: 'messages', roles: ['admin', 'contractor'] },
    { type: 'link', title: 'Document Hub', iconName: 'FileArchiveIcon', page: 'document-hub', roles: ['admin'] },
    { type: 'link', title: 'Analytics', iconName: 'ChartLineIcon', page: 'analytics', roles: ['admin'] },
];

export const SIDEBAR_BOTTOM_LINKS: SidebarLink[] = [
    { type: 'link', title: 'My Profile', iconName: 'UserTieIcon', page: 'profile', roles: ['admin', 'contractor'] },
    { type: 'link', title: 'Settings', iconName: 'CogIcon', page: 'settings', roles: ['admin', 'contractor'] },
];