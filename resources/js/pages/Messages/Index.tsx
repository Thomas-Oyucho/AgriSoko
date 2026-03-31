import { Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Conversation, User, PaginatedConversation, SharedProps } from '@/types';

interface Props {
    conversations: Conversation[] | PaginatedConversation;
}

export default function Index({ conversations }: Props) {
    const { auth } = usePage<SharedProps>().props;
    const user = auth.user;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Messages',
            href: '/messages',
        },
    ];

    const isPaginated = !Array.isArray(conversations);
    const conversationList = isPaginated ? (conversations as PaginatedConversation).data : conversations;

    const getOtherUser = (conversation: Conversation) => {
        if (user.is_admin) {
            return conversation.user_one;
        }
        return conversation.user_one_id === user.id ? conversation.user_two : conversation.user_one;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 sm:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-emerald-600" />
                            Messages
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {conversationList.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                No conversations yet. Conversations start after an order is placed.
                            </div>
                        ) : (
                            <div className="divide-y">
                                {conversationList.map((conversation: Conversation) => {
                                    const otherUser = getOtherUser(conversation) as User;
                                    return (
                                        <Link
                                            key={conversation.id}
                                            href={`/messages/${conversation.id}`}
                                            className="flex items-center gap-4 py-4 px-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-lg"
                                        >
                                            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
                                                {otherUser.first_name[0]}{otherUser.last_name[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                                                        {otherUser.first_name} {otherUser.last_name}
                                                        {user.is_admin && (
                                                            <span className="text-xs font-normal text-slate-500 ml-2">
                                                                (between {conversation.user_one?.first_name} and {conversation.user_two?.first_name})
                                                            </span>
                                                        )}
                                                    </h3>
                                                    {conversation.last_message_at && (
                                                        <span className="text-xs text-slate-500 whitespace-nowrap">
                                                            {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                                    {conversation.last_message ? conversation.last_message.body : 'No messages yet'}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {isPaginated && (conversations as PaginatedConversation).links && (
                            <div className="mt-6 flex justify-center gap-2">
                                {(conversations as PaginatedConversation).meta.links.map((link, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        className={`px-3 py-1 text-sm rounded ${
                                            link.active
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
