<?php

namespace App\Http\Controllers;

use App\Models\Produce;
use App\Models\ProduceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProduceController extends Controller
{
    /**
     * Display a listing of the farmer's produce.
     */
    public function index()
    {
        $farmer = Auth::user()->farmer;
        if (! $farmer) {
            abort(403, 'Not a farmer');
        }

        $produce = Produce::with('category')
            ->where('farmer_id', $farmer->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('FarmerProduce', [
            'produce' => $produce,
            'categories' => ProduceCategory::all(),
        ]);
    }

    /**
     * Display the specified produce.
     */
    public function show(Produce $produce)
    {
        // ensure the logged-in farmer owns this item
        $farmer = Auth::user()->farmer;
        if (! $farmer || $produce->farmer_id !== $farmer->id) {
            abort(403);
        }

        return inertia('FarmerProduceShow', [
            'produce' => $produce->load('category'),
        ]);
    }

    /**
     * Show the form for creating a new produce item.
     */
    public function create()
    {
        return inertia('FarmerProduceForm', [
            'categories' => ProduceCategory::all(),
        ]);
    }

    /**
     * Store a newly created produce in storage.
     */
    public function store(Request $request)
    {
        $farmer = Auth::user()->farmer;
        if (! $farmer) {
            abort(403, 'Not a farmer');
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:produce_categories,id',
            'price' => 'required|numeric|min:0',
            'quantity_available' => 'required|integer|min:0',
            'picture' => 'nullable|url',
            'description' => 'nullable|string',
            'weight_size' => 'nullable|string|max:255',
            'unit' => 'nullable|string|max:255',
            'allow_farm_visits' => 'boolean',
        ]);

        $data['farmer_id'] = $farmer->id;
        $data['date_listed'] = now();

        Produce::create($data);

        return to_route('farmer.produce.index');
    }

    /**
     * Show the form for editing the specified produce.
     */
    public function edit(Produce $produce)
    {
        // ensure the logged-in farmer owns this item
        $farmer = Auth::user()->farmer;
        if (! $farmer || $produce->farmer_id !== $farmer->id) {
            abort(403);
        }

        return inertia('FarmerProduceForm', [
            'produce' => $produce,
            'categories' => ProduceCategory::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produce $produce)
    {
        $farmer = Auth::user()->farmer;
        if (! $farmer || $produce->farmer_id !== $farmer->id) {
            abort(403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:produce_categories,id',
            'price' => 'required|numeric|min:0',
            'quantity_available' => 'required|integer|min:0',
            'picture' => 'nullable|url',
            'description' => 'nullable|string',
            'weight_size' => 'nullable|string|max:255',
            'unit' => 'nullable|string|max:255',
            'allow_farm_visits' => 'boolean',
        ]);

        $produce->update($data);

        return to_route('farmer.produce.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produce $produce)
    {
        $farmer = Auth::user()->farmer;
        if (! $farmer || $produce->farmer_id !== $farmer->id) {
            abort(403);
        }

        $produce->delete();

        return back();
    }
}
