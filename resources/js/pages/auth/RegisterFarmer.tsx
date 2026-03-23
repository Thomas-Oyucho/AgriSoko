import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function RegisterFarmer() {
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
            title="Sign Up as Farmer"
            description=""
        >
            <Head title="Register as Farmer" />

           <form
    onSubmit={(e) => {
        e.preventDefault();
        form.post('/register/farmer');
    }}
    className="flex flex-col gap-6"
>
    <div className="grid gap-4">

        {/* First Name */}
        <div className="grid gap-2">
            <Label htmlFor="first_name" className="text-[#1e293b] font-semibold">First Name *</Label>
            <Input
                id="first_name"
                type="text"
                name="first_name"
                required
                autoFocus
                placeholder="First name"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.first_name}
                onChange={(e) =>
                    form.setData('first_name', e.target.value)
                }
            />
            <InputError message={form.errors.first_name} />
        </div>

        {/* Middle Name */}
        <div className="grid gap-2">
            <Label htmlFor="middle_name" className="text-[#1e293b] font-semibold">Middle Name</Label>
            <Input
                id="middle_name"
                type="text"
                name="middle_name"
                placeholder="Middle name"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.middle_name}
                onChange={(e) =>
                    form.setData('middle_name', e.target.value)
                }
            />
            <InputError message={form.errors.middle_name} />
        </div>

        {/* Last Name */}
        <div className="grid gap-2">
            <Label htmlFor="last_name" className="text-[#1e293b] font-semibold">Last Name *</Label>
            <Input
                id="last_name"
                type="text"
                name="last_name"
                required
                placeholder="Last name"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.last_name}
                onChange={(e) =>
                    form.setData('last_name', e.target.value)
                }
            />
            <InputError message={form.errors.last_name} />
        </div>

        {/* Email */}
        <div className="grid gap-2">
            <Label htmlFor="email" className="text-[#1e293b] font-semibold">Email Address *</Label>
            <Input
                id="email"
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.email}
                onChange={(e) =>
                    form.setData('email', e.target.value)
                }
            />
            <InputError message={form.errors.email} />
        </div>

        {/* Phone */}
        <div className="grid gap-2">
            <Label htmlFor="phone" className="text-[#1e293b] font-semibold">Phone Number</Label>
            <Input
                id="phone"
                type="text"
                name="phone"
                placeholder="+254712345678"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.phone}
                onChange={(e) =>
                    form.setData('phone', e.target.value)
                }
            />
            <InputError message={form.errors.phone} />
        </div>

        {/* Location */}
        <div className="grid gap-2">
            <Label htmlFor="location" className="text-[#1e293b] font-semibold">Location *</Label>
            <Input
                id="location"
                type="text"
                name="location"
                required
                placeholder="Nairobi, Kenya"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.location}
                onChange={(e) =>
                    form.setData('location', e.target.value)
                }
            />
            <InputError message={form.errors.location} />
        </div>

        {/* Password */}
        <div className="grid gap-2">
            <Label htmlFor="password" className="text-[#1e293b] font-semibold">Password *</Label>
            <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="At least 6 characters"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                value={form.data.password}
                onChange={(e) =>
                    form.setData('password', e.target.value)
                }
            />
            <InputError message={form.errors.password} />
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
            <Label htmlFor="password_confirmation" className="text-[#1e293b] font-semibold">
                Confirm Password *
            </Label>
            <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                required
                placeholder="Confirm your password"
                className="bg-[#f1f5f9] border-none rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
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
            className="mt-2 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl h-12 text-lg font-bold"
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
