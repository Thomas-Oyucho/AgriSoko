import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function RegisterConsumer() {
    const form = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        location: '',
    });

    return (
        <AuthLayout
            title="Consumer sign up"
            description="Create an account to start placing orders"
        >
            <Head title="Register as Consumer" />

          <form
    onSubmit={(e) => {
        e.preventDefault();
        form.post('/register/consumer');
    }}
    className="flex flex-col gap-6"
>
    <div className="grid gap-6">

        {/* First Name */}
        <div className="grid gap-2">
            <Label htmlFor="first_name">First name</Label>
            <Input
                id="first_name"
                type="text"
                name="first_name"
                required
                autoFocus
                value={form.data.first_name}
                onChange={(e) =>
                    form.setData('first_name', e.target.value)
                }
            />
            <InputError message={form.errors.first_name} />
        </div>

        {/* Middle Name */}
        <div className="grid gap-2">
            <Label htmlFor="middle_name">Middle name</Label>
            <Input
                id="middle_name"
                type="text"
                name="middle_name"
                value={form.data.middle_name}
                onChange={(e) =>
                    form.setData('middle_name', e.target.value)
                }
            />
            <InputError message={form.errors.middle_name} />
        </div>

        {/* Last Name */}
        <div className="grid gap-2">
            <Label htmlFor="last_name">Last name</Label>
            <Input
                id="last_name"
                type="text"
                name="last_name"
                required
                value={form.data.last_name}
                onChange={(e) =>
                    form.setData('last_name', e.target.value)
                }
            />
            <InputError message={form.errors.last_name} />
        </div>

        {/* Email */}
        <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
                id="email"
                type="email"
                name="email"
                required
                value={form.data.email}
                onChange={(e) =>
                    form.setData('email', e.target.value)
                }
            />
            <InputError message={form.errors.email} />
        </div>

        {/* Phone */}
        <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
                id="phone"
                type="text"
                name="phone"
                value={form.data.phone}
                onChange={(e) =>
                    form.setData('phone', e.target.value)
                }
            />
            <InputError message={form.errors.phone} />
        </div>

        {/* Location */}
        <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
                id="location"
                type="text"
                name="location"
                required
                value={form.data.location}
                onChange={(e) =>
                    form.setData('location', e.target.value)
                }
            />
            <InputError message={form.errors.location} />
        </div>

        {/* Password */}
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                name="password"
                required
                value={form.data.password}
                onChange={(e) =>
                    form.setData('password', e.target.value)
                }
            />
            <InputError message={form.errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
            <Label htmlFor="password_confirmation">
                Confirm password
            </Label>
            <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                required
                value={form.data.password_confirmation}
                onChange={(e) =>
                    form.setData('password_confirmation', e.target.value)
                }
            />
            <InputError message={form.errors.password_confirmation} />
        </div>

        {/* Submit */}
        <Button
            type="submit"
            className="mt-2 w-full"
            disabled={form.processing}
        >
            {form.processing && <Spinner />}
            Register
        </Button>

    </div>
</form>
        </AuthLayout>
    );
}
