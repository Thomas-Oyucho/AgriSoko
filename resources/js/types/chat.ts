import type { User } from './auth';

export type PaginatedConversation = {
    data: Conversation[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
};

export type Message = {
    id: number;
    conversation_id: number;
    sender_id: number;
    body: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
    sender?: User;
};

export type Conversation = {
    id: number;
    user_one_id: number;
    user_two_id: number;
    last_message_at: string | null;
    created_at: string;
    updated_at: string;
    user_one?: User;
    user_two?: User;
    last_message?: Message;
};

export type Order = {
    id: number;
    consumer_id: number;
    produce_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at: string;
    produce?: {
        id: number;
        name: string;
        category?: {
            id: number;
            name: string;
        };
    };
};
