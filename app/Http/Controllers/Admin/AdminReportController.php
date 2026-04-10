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
<<<<<<< HEAD
        $sixMonthsAgo = Carbon::now()->subMonths(6);
        $startOfCurrentMonth = Carbon::now()->startOfMonth();

        // Generate all last 6 months
        $allMonths = [];
        for ($i = 5; $i >= 0; $i--) {
            $allMonths[] = Carbon::now()->subMonths($i)->format('Y-m');
        }

        // Sales trends (last 6 months)
        $salesData = Order::where('status', 'paid')
            ->where('created_at', '>=', $sixMonthsAgo)
=======
        $oneYearAgo = Carbon::now()->subYear();

        // Sales trends (last 12 months)
        $salesTrends = Order::where('status', 'paid')
            ->where('created_at', '>=', $oneYearAgo)
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
            ->select(
                DB::raw('sum(total_price) as total'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
<<<<<<< HEAD
            ->get()
            ->keyBy('month');

        // Fill in missing months with 0
        $salesTrends = collect($allMonths)->map(function ($month) use ($salesData) {
            return [
                'month' => $month,
                'total' => $salesData->get($month)?->total ?? 0,
            ];
        });

        // User registration growth (last 6 months)
        $registrationData = User::where('created_at', '>=', $sixMonthsAgo)
=======
            ->get();

        // User registration growth (last 12 months)
        $registrationGrowth = User::where('created_at', '>=', $oneYearAgo)
>>>>>>> 250ff03 (feat: add sales, registration and category charts to admin reports)
            ->select(
                DB::raw('count(*) as count'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get()
            ->keyBy('month');

        // Fill in missing months with 0
        $registrationGrowth = collect($allMonths)->map(function ($month) use ($registrationData) {
            return [
                'month' => $month,
                'count' => $registrationData->get($month)?->count ?? 0,
            ];
        });

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
