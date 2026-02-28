import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Link } from '@inertiajs/react';
import TextLink from '@/components/text-link';

export default function Register() {
    return (
        <AuthLayout
            title="Choose account type"
            description="Select whether you are signing up as a farmer or a consumer"
        >
            <Head title="Register" />

            <div className="flex flex-col gap-4">
                <Button asChild className="w-full">
                    <Link href="/register/farmer">Register as Farmer</Link>
                </Button>
                <Button asChild className="w-full">
                    <Link href="/register/consumer">Register as Consumer</Link>
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <TextLink href="/login">
                    Log in
                </TextLink>
            </div>
        </AuthLayout>
    );
}
