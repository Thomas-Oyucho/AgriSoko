<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Produce;
use Inertia\Inertia;

class AdminProduceController extends Controller
{
    public function index()
    {
        $products = Produce::with(['farmer.user', 'category'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Produce/Index', [
            'products' => $products,
        ]);
    }
}
