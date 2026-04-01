<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Farmer;
use App\Models\Order;
use Carbon\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $activeFarmersCount = Farmer::whereHas('user', function($q) {
            $q->where('is_active', true);
        })->count();

        $activeConsumersCount = User::whereHas('consumer')
            ->where('is_active', true)
            ->count();

        $thirtyDaysAgo = Carbon::now()->subDays(30);
        $totalSuccessfulPayments = Order::where('status', 'paid')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->sum('total_price');

        $totalOrders = Order::count();

        $recentUnverifiedFarmers = Farmer::with('user')
            ->where('is_verified', false)
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('AdminDashboard', [
            'stats' => [
                'activeFarmers' => $activeFarmersCount,
                'activeConsumers' => $activeConsumersCount,
                'totalSuccessfulPayments' => (float)$totalSuccessfulPayments,
                'totalOrders' => $totalOrders,
            ],
            'recentUnverifiedFarmers' => $recentUnverifiedFarmers,
        ]);
    }
}
