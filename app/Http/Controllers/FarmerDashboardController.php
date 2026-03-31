<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Produce;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class FarmerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $farmer = $request->user()->farmer;

        if (!$farmer) {
            return redirect()->route('home');
        }

        $totalProducts = Produce::where('farmer_id', $farmer->id)->count();

        $thirtyDaysAgo = Carbon::now()->subDays(30);
        $totalRevenue = Order::whereHas('produce', function ($query) use ($farmer) {
            $query->where('farmer_id', $farmer->id);
        })
        ->where('status', 'paid')
        ->where('created_at', '>=', $thirtyDaysAgo)
        ->sum('total_price');

        $lowStockProducts = Produce::where('farmer_id', $farmer->id)
            ->where('quantity_available', '<', 15)
            ->count();

        $recentOrders = Order::with(['produce', 'consumer.user'])
            ->whereHas('produce', function ($query) use ($farmer) {
                $query->where('farmer_id', $farmer->id);
            })
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('FarmerDashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalRevenue' => (float) $totalRevenue,
                'lowStockProducts' => $lowStockProducts,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
