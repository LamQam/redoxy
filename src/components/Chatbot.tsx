import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `You are an AI assistant for a business services company called Redoxy. Your role is to provide information about our services and assist potential clients. 
      
      Here's detailed information about our services:
      
      1. WASTE TREATMENT
      - Industrial waste management
      - Hazardous waste disposal
      - Recycling solutions
      - Waste-to-energy conversion
      - Compliance with environmental regulations
      
      2. ENVIRONMENTAL SERVICES
      - Environmental impact assessments
      - Air and water quality testing
      - Sustainability consulting
      - Carbon footprint reduction
      - Environmental compliance audits
      
      3. INDUSTRIAL SOLUTIONS
      - Process optimization
      - Equipment maintenance
      - Industrial cleaning
      - Safety compliance
      - Facility management
      
      4. TRADING
      - Raw materials supply
      - Industrial equipment
      - Environmental technologies
      - Global sourcing solutions
      - Supply chain management
      
      Company Information:
      - We are ISO 9001, ISO 14001, and OHSAS 18001 certified
      - We provide end-to-end solutions with a focus on sustainability
      - Our team consists of industry experts with years of experience
      
      When responding to inquiries:
      - Be professional and helpful
      - Provide accurate information from the knowledge base
      - If you don't know an answer, direct them to contact our team
      - Keep responses concise but informative`
    },
    {
      role: 'assistant',
      content: 'Hello! Welcome to Redoxy. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    
    // Check for common greetings and questions
    const lowerInput = input.toLowerCase();
    if (['hi', 'hello', 'hey'].some(greeting => lowerInput.includes(greeting))) {
      setTimeout(() => {
        const greetingResponse: Message = {
          role: 'assistant',
          content: 'Hello! Welcome to Redoxy. How can I assist you with our services today?'
        };
        setMessages(prev => [...prev, greetingResponse]);
      }, 500);
      return;
    }
    
    if (['service', 'services', 'what do you offer', 'offerings'].some(term => lowerInput.includes(term))) {
      setTimeout(() => {
        const servicesResponse: Message = {
          role: 'assistant',
          content: `We offer a comprehensive range of services:
          
          1. Waste Treatment - Including industrial waste management and recycling solutions
          2. Environmental Services - Covering assessments and sustainability consulting
          3. Industrial Solutions - For process optimization and facility management
          4. Trading - Supplying raw materials and industrial equipment
          
          Would you like more details about any specific service?`
        };
        setMessages(prev => [...prev, servicesResponse]);
      }, 500);
      return;
    }
    setIsTyping(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Business Services Chatbot'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: updatedMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: "I'm having trouble connecting to the chat service. Please try again later." 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-[500px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-primary-orange text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">How can I help you?</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded-full"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages
              .filter(msg => msg.role !== 'system')
              .map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-100 text-blue-900' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="whitespace-pre-wrap">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            {isTyping && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 bg-primary-orange text-white rounded-lg hover:bg-primary-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-primary-orange text-white rounded-full shadow-lg hover:bg-primary-orange/90 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
