'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, User } from 'lucide-react';
import { startAssessment, submitAnswer } from '@/lib/api';

// Mock types for development
interface Message {
    id: string;
    role: 'assistant' | 'user';
    content: string;
    type?: 'text' | 'options';
    options?: string[];
}

export default function AssessmentPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial Load - Start Session
    useEffect(() => {
        // In a real app, userId comes from Auth Context
        const userId = 'demo-user-123';
        setLoading(true);

        // Simulate API delay for "Thinking" feel
        setTimeout(() => {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: 'أهلاً بك يا أحمد في مساري. أنا مستشارك الأكاديمي.\nهدفي أساعدك تكتشف التخصص الأنسب لك بناءً على اهتماماتك الحقيقية.\n\nجاهز نبدأ؟',
                    type: 'options',
                    options: ['جاهز', 'عندي استفسار'],
                }
            ]);
            setSessionId('mock-session-id');
            setLoading(false);
        }, 1000);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        // 1. Add User Message
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // 2. Mock Server Response (Replace with API call in production)
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: 'ممتاز. واضح أنك متحمس.\n\nسؤالي الأول:\nعندما تواجه مشكلة تقنية، هل تحاول حلها بنفسك بالبحث والتجربة، أم تفضل سؤال شخص خبير مباشرة؟',
                    type: 'options', // Changed for demo visual
                    options: ['أحاول بنفسي', 'أسأل خبير'],
                }
            ]);
            setLoading(false);
        }, 1500); // Artificial delay for realism
    };

    return (
        <div className="flex flex-col h-screen bg-background max-w-3xl mx-auto border-x">
            {/* Header */}
            <header className="p-4 border-b flex items-center justify-between bg-card z-10">
                <div className="font-bold text-lg text-primary">المستشار الذكي</div>
                <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    سؤال 1 من 60
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                }`}>
                                {msg.role === 'assistant' ? '🤖' : <User className="w-4 h-4" />}
                            </div>

                            {/* Bubble */}
                            <div className={`space-y-3 ${msg.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 px-4'
                                    : 'bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm p-4'
                                }`}>
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {msg.content}
                                </div>

                                {/* Options (if present) */}
                                {msg.options && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {msg.options.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => !loading && handleSend(opt)}
                                                disabled={loading}
                                                className="bg-background hover:bg-muted border text-sm px-4 py-2 rounded-lg transition"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">🤖</div>
                        <div className="bg-secondary p-4 rounded-2xl rounded-tl-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-card">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                    className="relative flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        placeholder="اكتب إجابتك هنا..."
                        className="flex-1 bg-muted/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white p-3 rounded-xl transition"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
