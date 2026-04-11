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
        $sixMonthsAgo = Carbon::now()->subMonths(6);
        $startOfCurrentMonth = Carbon::now()->startOfMonth();

        // Sales trends (last 6 months)
        $salesTrends = Order::where('status', 'paid')
            ->where('created_at', '>=', $sixMonthsAgo)
            ->select(
                DB::raw('sum(total_price) as total'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // User registration growth (last 6 months)
        $registrationGrowth = User::where('created_at', '>=', $sixMonthsAgo)
            ->select(
                DB::raw('count(*) as count'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // Sales Summary by Category (Current Month)
        $categorySales = ProduceCategory::select(
            'produce_categories.category_name',
            DB::raw('SUM(orders.total_price) as total_revenue')
        )
            ->join('produce', 'produce_categories.id', '=', 'produce.category_id')
            ->join('orders', 'produce.id', '=', 'orders.produce_id')
            ->where('orders.status', 'paid')
            ->where('orders.created_at', '>=', $startOfCurrentMonth)
            ->groupBy('produce_categories.id', 'produce_categories.category_name')
            ->orderBy('total_revenue', 'desc')
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'reports' => [
                'salesTrends' => $salesTrends,
                'registrationGrowth' => $registrationGrowth,
                'categorySales' => $categorySales,
            ]
        ]);
    }
}
