<?php

namespace App\Http\Controllers;

use App\Models\Produce;
use Inertia\Inertia;

class ConsumerProduceController extends Controller
{
    public function index()
    {
        $produces = Produce::with(['category', 'farmer.user'])
            ->where('quantity_available', '>', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('ConsumerProduce', [
            'produces' => $produces,
        ]);
    }

    public function show(Produce $produce)
    {
        return Inertia::render('ConsumerProduceShow', [
            'produce' => $produce->load(['category', 'farmer.user']),
        ]);
    }
}
