export type User = {
    id: number;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    email: string;
    phone?: string | null;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_farmer?: boolean;
    is_consumer?: boolean;
    is_admin?: boolean;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export interface SharedProps {
    auth: Auth;
    [key: string]: unknown;
}
