<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Produce;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders for the authenticated consumer.
     */
    public function consumerIndex()
    {
        $consumer = Auth::user()->consumer;
        if (! $consumer) {
            abort(403, 'Not a consumer');
        }

        $orders = Order::where('consumer_id', $consumer->id)
            ->with(['produce.farmer.user', 'produce.category'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('ConsumerOrders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display a listing of orders received by the authenticated farmer.
     */
    public function farmerIndex()
    {
        $farmer = Auth::user()->farmer;
        if (! $farmer) {
            abort(403, 'Not a farmer');
        }

        $orders = Order::whereHas('produce', function ($query) use ($farmer) {
            $query->where('farmer_id', $farmer->id);
        })
            ->with(['produce.category', 'consumer.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('FarmerOrders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Store a new order for a consumer.
     */
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

            // Ensure a conversation exists between the consumer and the farmer
            $farmerUserId = $produce->farmer->user_id;
            $consumerUserId = $consumer->user_id;

            $userIds = [$farmerUserId, $consumerUserId];
            sort($userIds);

            Conversation::firstOrCreate([
                'user_one_id' => $userIds[0],
                'user_two_id' => $userIds[1],
            ]);
        });

        return to_route('consumer.orders.index')->with('success', 'Order placed successfully!');
    }

    /**
     * Update an existing order.
     */
    public function update(Request $request, Order $order)
    {
        $consumer = Auth::user()->consumer;
        if (! $consumer || $order->consumer_id !== $consumer->id) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $produce = $order->produce;
        $diff = $request->quantity - $order->quantity;

        if ($diff > $produce->quantity_available) {
            return back()->with('error', 'The requested quantity exceeds available stock.');
        }

        $totalPrice = $order->unit_price * $request->quantity;

        DB::transaction(function () use ($order, $produce, $request, $diff, $totalPrice) {
            $order->update([
                'quantity' => $request->quantity,
                'total_price' => $totalPrice,
            ]);

            $produce->decrement('quantity_available', $diff);
        });

        return back()->with('success', 'Order updated successfully!');
    }

    /**
     * Delete an order.
     */
    public function destroy(Order $order)
    {
        $consumer = Auth::user()->consumer;
        if (! $consumer || $order->consumer_id !== $consumer->id) {
            abort(403);
        }

        DB::transaction(function () use ($order) {
            $order->produce->increment('quantity_available', $order->quantity);
            $order->delete();
        });

        return back()->with('success', 'Order cancelled successfully!');
    }
}
