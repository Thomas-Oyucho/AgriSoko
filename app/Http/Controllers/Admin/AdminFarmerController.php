<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Farmer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminFarmerController extends Controller
{
    public function index()
    {
        $farmers = Farmer::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Farmers/Index', [
            'farmers' => $farmers,
        ]);
    }

    public function toggleVerification(Farmer $farmer)
    {
        $farmer->update([
            'is_verified' => !$farmer->is_verified,
        ]);

        return back()->with('success', 'Farmer verification status updated.');
    }
}
