
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UseChatbotProps {
  apiKey?: string;
}

export const useChatbot = ({ apiKey }: UseChatbotProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      if (!apiKey) {
        // Simulate response if no API key
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: "To use the AI chatbot, you'll need to add your OpenAI API key. The AI can answer questions about donations, needs, and how the platform works." 
          }
        ]);
      } else {
        // In a real implementation, this would call the OpenAI API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: "I'm happy to help! This is a simulated response. Once you add your OpenAI API key, I'll be able to provide real answers to your questions about donations and community needs." 
          }
        ]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from AI",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! How can I help you today?' },
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};
