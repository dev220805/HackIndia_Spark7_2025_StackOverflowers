
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
        try {
          // Call OpenAI API
          const chatMessages = messages.concat(userMessage).map(msg => ({
            role: msg.role,
            content: msg.content
          }));
          
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: 'You are a helpful assistant for a donation platform called Impact Beacon. You provide information about donations, community needs, and how the platform connects donors with NGOs. Keep responses helpful, friendly and concise.'
                },
                ...chatMessages
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error?.message?.includes('quota')) {
              throw new Error('API quota exceeded. Please try again later or use a different API key.');
            }
            throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
          }

          const data = await response.json();
          const assistantResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
          
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: assistantResponse }
          ]);
        } catch (error: any) {
          // If quota exceeded or other API error, fall back to predefined responses
          if (error.message.includes('quota')) {
            setMessages(prev => [
              ...prev,
              { 
                role: 'assistant', 
                content: "I'm sorry, but the API quota has been exceeded. I can still answer basic questions about Impact Beacon. What would you like to know about donations or community needs?" 
              }
            ]);
            toast({
              title: "API Quota Exceeded",
              description: "Using fallback responses instead of the OpenAI API.",
              variant: "destructive"
            });
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Error in AI response:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI",
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
