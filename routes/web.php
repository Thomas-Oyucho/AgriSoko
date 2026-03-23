<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// custom registration flows
use App\Http\Controllers\Auth\FarmerRegisterController;
use App\Http\Controllers\Auth\ConsumerRegisterController;

Route::get('/register/farmer', [FarmerRegisterController::class, 'show'])
    ->name('register.farmer');
Route::post('/register/farmer', [FarmerRegisterController::class, 'store'])
    ->name('register.farmer.store');

Route::get('/register/consumer', [ConsumerRegisterController::class, 'show'])
    ->name('register.consumer');
Route::post('/register/consumer', [ConsumerRegisterController::class, 'store'])
    ->name('register.consumer.store');

Route::get('dashboard', function () {
    // generic dashboard could redirect based on role
    $user = auth()->user();
    if ($user->farmer) {
        return redirect()->route('farmer.dashboard');
    }
    if ($user->consumer) {
        return redirect()->route('consumer.dashboard');
    }
    if ($user->admin) {
        return redirect()->route('admin.dashboard');
    }

    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('farmer/dashboard', function () {
    return Inertia::render('FarmerDashboard');
})->middleware(['auth', 'verified'])->name('farmer.dashboard');

Route::get('consumer/dashboard', function () {
    return Inertia::render('ConsumerDashboard');
})->middleware(['auth', 'verified'])->name('consumer.dashboard');

Route::get('admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified'])->name('admin.dashboard');

// farmer produce management
Route::middleware(['auth', 'verified'])
    ->prefix('farmer')
    ->name('farmer.')
    ->group(function () {
        Route::resource('produce', \App\Http\Controllers\ProduceController::class);
    });

// consumer produce and ordering
Route::middleware(['auth', 'verified'])
    ->prefix('consumer')
    ->name('consumer.')
    ->group(function () {
        Route::get('/produce', [\App\Http\Controllers\ConsumerProduceController::class, 'index'])->name('produce.index');
        Route::get('/produce/{produce}', [\App\Http\Controllers\ConsumerProduceController::class, 'show'])->name('produce.show');
        Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
    });

require __DIR__.'/settings.php';
