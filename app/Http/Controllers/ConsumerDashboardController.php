<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsumerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $consumer = $request->user()->consumer;

        if (!$consumer) {
            return redirect()->route('home');
        }

        $totalOrders = Order::where('consumer_id', $consumer->id)->count();

        $totalSpent = Order::where('consumer_id', $consumer->id)
            ->where('status', 'paid')
            ->sum('total_price');

        $pendingPayments = Order::where('consumer_id', $consumer->id)
            ->where('status', 'pending')
            ->count();

        $recentOrders = Order::with(['produce.farmer.user'])
            ->where('consumer_id', $consumer->id)
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('ConsumerDashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalSpent' => (float) $totalSpent,
                'pendingPayments' => $pendingPayments,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
