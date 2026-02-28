<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Consumer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ConsumerRegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('auth/RegisterConsumer');
    }

    public function store(Request $request)
    {
        
        $data = $request->validate([
            'first_name' => ['required','string','max:255'],
            'middle_name' => ['nullable','string','max:255'],
            'last_name' => ['required','string','max:255'],
            'email' => ['required','email','max:255','unique:users,email'],
            'phone' => ['nullable','string','max:20'],
            'password' => ['required','string','confirmed','min:8'],
            'location' => ['required','string','max:255'],
        ]);
#OBJECT RELATIONAL MAPPING (ORM) TRANSACTION (eloquent) to ensure that both user and consumer records are created successfully, and if any part of the process fails, the entire transaction will be rolled back to maintain data integrity.
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'middle_name' => $data['middle_name'] ?? null,
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'password' => Hash::make($data['password']),
            ]);

            $user->consumer()->create([
                'location' => $data['location'],
            ]);

            auth()->login($user);

            return to_route('consumer.dashboard');
        });
    }
}
