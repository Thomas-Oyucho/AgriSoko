import { useForm, usePage } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { Send, ShoppingBag } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Conversation, Message, Order, User, SharedProps } from '@/types';

interface Props {
    conversation: Conversation;
    messages: Message[];
    otherUser: User;
    orders: Order[];
}

export default function Show({ conversation, messages, otherUser, orders }: Props) {
    const { auth } = usePage<SharedProps>().props;
    const user = auth.user;
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, reset } = useForm({
        body: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Messages', href: '/messages' },
        { title: `${otherUser.first_name} ${otherUser.last_name}`, href: `/messages/${conversation.id}` },
    ];

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.body.trim() === '') return;

        post(`/messages/${conversation.id}`, {
            onSuccess: () => {
                reset('body');
                scrollToBottom();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8 h-[calc(100vh-140px)]">
                {/* Chat Column */}
                <div className="lg:col-span-3 flex flex-col gap-4 h-full">
                    <Card className="flex flex-col flex-1 min-h-0 overflow-hidden border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="border-b dark:border-slate-800 shrink-0">
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                                    {otherUser.first_name[0]}{otherUser.last_name[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span>{otherUser.first_name} {otherUser.last_name}</span>
                                    <span className="text-xs font-normal text-slate-500">
                                        Last active {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                                    </span>
                                </div>
                            </CardTitle>
                        </CardHeader>

                        <CardContent
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-50/50 dark:bg-slate-900/20"
                        >
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                                    <MessageSquare className="w-12 h-12 text-slate-300" />
                                    <p>Start your conversation about the order below.</p>
                                </div>
                            ) : (
                                messages.map((message) => {
                                    const isMine = message.sender_id === user.id;
                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                                    isMine
                                                        ? 'bg-emerald-600 text-white rounded-tr-none'
                                                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border dark:border-slate-700'
                                                }`}
                                            >
                                                <p className="whitespace-pre-wrap">{message.body}</p>
                                                <div className={`text-[10px] mt-1 opacity-70 text-right`}>
                                                    {format(new Date(message.created_at), 'HH:mm')}
                                                    {isMine && message.is_read && <span className="ml-1">✓✓</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>

                        {!user.is_admin && (
                            <div className="p-4 border-t dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <Textarea
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        placeholder="Type your message..."
                                        className="min-h-[60px] max-h-[120px] resize-none bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-emerald-500"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e);
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={processing || data.body.trim() === ''}
                                        size="icon"
                                        className="h-[60px] w-[60px] bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                                <p className="text-[10px] text-slate-400 mt-2 text-center">
                                    Press Enter to send, Shift+Enter for new line
                                </p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Orders Context Sidebar */}
                <div className="hidden lg:block h-full">
                    <Card className="h-full flex flex-col border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="border-b dark:border-slate-800 shrink-0">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                                Related Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                            {orders.length === 0 ? (
                                <p className="text-xs text-slate-500 text-center py-4">No recent orders found.</p>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="p-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-800/50 text-xs"
                                    >
                                        <div className="flex justify-between font-semibold mb-1">
                                            <span className="text-slate-900 dark:text-slate-100">Order #{order.id}</span>
                                            <span className="text-emerald-600">${Number(order.total_price).toFixed(2)}</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 mb-1">
                                            {order.produce?.name} ({order.produce?.category?.name})
                                        </p>
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>Qty: {order.quantity}</span>
                                            <span>{format(new Date(order.created_at), 'MMM d, yyyy')}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

const MessageSquare = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
