import { GoogleGenAI } from "@google/genai";
import { Project, User } from '../types';

// In a Vite project, environment variables are accessed via `import.meta.env`.
// They must be prefixed with `VITE_` to be exposed to the client-side code.
// This is managed securely by the build process.
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
    console.warn("VITE_API_KEY is not set in your .env file. AI features will be disabled.");
}

const ai = new GoogleGenAI({apiKey: apiKey || "MISSING_API_KEY"});

export async function generateAiContent(user: User, projects: Project[], question: string): Promise<string> {
    if (!apiKey || apiKey === "MISSING_API_KEY") {
        return "The AI assistant is currently unavailable because the API key is not configured.";
    }

    const model = 'gemini-2.5-flash';
    
    // Simplify the project data to create a more focused prompt
    const simplifiedProjects = projects.map(p => ({
        title: p.title,
        value: p.value,
        deadline: p.deadline,
        tags: p.tags,
        clientName: p.clientName,
        status: p.status
    }));

    const systemInstruction = `You are an expert assistant for a company called Rosado Commercial Advisors (RCA). Your role is to analyze project data and help with communications.
    The user you are speaking to is ${user.name}, who is an ${user.role}. Tailor your response accordingly.
    - Be professional and helpful.
    - If asked to analyze data (e.g., "which project is most valuable"), provide a clear, concise answer based ONLY on the provided JSON data.
    - If asked to draft an email or a message, generate a professional, well-formatted message. You can infer common business scenarios (e.g., following up on an invoice, checking project status).
    - Do not make up information for data analysis questions. If the answer is not in the provided data, state that you cannot find the information.
    - Base all your answers ONLY on the JSON data provided in the prompt.`;
    
    const prompt = `Here is the current list of projects in JSON format: ${JSON.stringify(simplifiedProjects, null, 2)}.
    
    Please answer the following request based on this data: "${question}"`;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        return response.text ?? 'I encountered an error while processing your request. Please try again.';
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        // Provide a user-friendly error message
        return 'I encountered an error while processing your request. Please check the data format or try again later.';
    }
}