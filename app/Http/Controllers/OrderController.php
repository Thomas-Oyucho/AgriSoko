<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Produce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $consumer = Auth::user()->consumer;
        if (! $consumer) {
            abort(403, 'Not a consumer');
        }

        $request->validate([
            'produce_id' => 'required|exists:produce,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $produce = Produce::findOrFail($request->produce_id);

        if ($request->quantity > $produce->quantity_available) {
            return back()->with('error', 'The requested quantity exceeds available stock.');
        }

        $totalPrice = $produce->price * $request->quantity;

        DB::transaction(function () use ($consumer, $produce, $request, $totalPrice) {
            Order::create([
                'consumer_id' => $consumer->id,
                'produce_id' => $produce->id,
                'quantity' => $request->quantity,
                'unit_price' => $produce->price,
                'total_price' => $totalPrice,
            ]);

            $produce->decrement('quantity_available', $request->quantity);
        });

        return to_route('consumer.dashboard')->with('success', 'Order placed successfully!');
    }
}
