<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['consumer.user', 'produce.farmer.user'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function transactions()
    {
        $transactions = Order::with(['consumer.user', 'produce.farmer.user'])
            ->whereIn('status', ['paid', 'failed'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }
}
