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
        $oneYearAgo = Carbon::now()->subYear();

        // Sales trends (last 12 months)
        $salesTrends = Order::where('status', 'paid')
            ->where('created_at', '>=', $oneYearAgo)
            ->select(
                DB::raw('sum(total_price) as total'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // User registration growth (last 12 months)
        $registrationGrowth = User::where('created_at', '>=', $oneYearAgo)
            ->select(
                DB::raw('count(*) as count'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
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
