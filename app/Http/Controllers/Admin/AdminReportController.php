<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\ProduceCategory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminReportController extends Controller
{
    public function index()
    {
        // Sales trends (last 6 months)
        $salesTrends = Order::where('status', 'paid')
            ->select(
                DB::raw('sum(total_price) as total'),
                DB::raw("strftime('%Y-%m', created_at) as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // User registration growth
        $registrationGrowth = User::select(
                DB::raw('count(*) as count'),
                DB::raw("strftime('%Y-%m', created_at) as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // Popular categories
        $popularCategories = ProduceCategory::withCount('produce')
            ->orderBy('produce_count', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'reports' => [
                'salesTrends' => $salesTrends,
                'registrationGrowth' => $registrationGrowth,
                'popularCategories' => $popularCategories,
            ]
        ]);
    }
}
