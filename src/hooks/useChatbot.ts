import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UseChatbotProps { 
  apiKey?: string;
}

const FALLBACK_RESPONSES = {
  noApiKey: "To use the AI chatbot, you'll need to add your Google Gemini API key.",
  apiError: "I'm having trouble connecting to the AI service. I can still answer basic questions about Impact Beacon. What would you like to know about donations or community needs?",
  quotaExceeded: "I'm sorry, but the API quota has been exceeded. I can still answer basic questions about Impact Beacon. What would you like to know about donations or community needs?"
};

export const useChatbot = ({ apiKey }: UseChatbotProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!apiKey) {
        console.error('No API key provided');
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: FALLBACK_RESPONSES.noApiKey }
        ]);
        return;
      }

      console.log('Using API key:', apiKey ? `${apiKey.substring(0, 8)}...` : 'No API key provided');
      console.log('Sending request with content:', content);

      if (!apiKey.startsWith('AIza')) {
        console.error('Invalid API key format. API key should start with "AIza"');
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Invalid API key format. Please check your API key.' }
        ]);
        return;
      }

      try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: content }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error Details:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            error: errorData
          });

          if (errorData.error?.message?.includes('API key not valid')) {
            throw new Error('Invalid API key. Please make sure you have enabled the Gemini API in your Google Cloud Console and created a valid API key.');
          } else if (errorData.error?.message?.includes('quota')) {
            throw new Error('quota');
          }
          throw new Error(errorData.error?.message || 'Failed to get response from API');
        }

        const data = await response.json();
        console.log('Successful API Response:', data);

        const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: assistantResponse }
        ]);
      } catch (error) {
        console.error('Detailed error:', error);
        if (error instanceof Error) {
          if (error.message.includes('quota')) {
            setMessages(prev => [
              ...prev,
              { role: 'assistant', content: FALLBACK_RESPONSES.quotaExceeded }
            ]);
            toast({
              title: "API Quota Exceeded",
              description: "Using fallback responses instead of the API.",
              variant: "destructive"
            });
          } else {
            setMessages(prev => [
              ...prev,
              { role: 'assistant', content: FALLBACK_RESPONSES.apiError }
            ]);
            toast({
              title: "API Error",
              description: error.message,
              variant: "destructive"
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in AI response:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: FALLBACK_RESPONSES.apiError }
      ]);
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
