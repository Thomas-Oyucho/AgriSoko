import { Head, Link } from '@inertiajs/react';
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';

export default function AwaitingApproval() {
    return (
        <AuthSimpleLayout
            title="Awaiting Approval"
            description="Your farmer account is currently being reviewed by our administrators."
        >
            <Head title="Awaiting Approval" />
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Thank you for joining FarmConnect AgriSoko. Once your account is verified, you will be able to access your dashboard and list your produce.
                </p>
                <div className="flex justify-center">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Log out
                    </Link>
                </div>
            </div>
        </AuthSimpleLayout>
    );
}
