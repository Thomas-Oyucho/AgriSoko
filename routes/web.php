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

use App\Http\Controllers\FarmerDashboardController;
use App\Http\Controllers\ConsumerDashboardController;

Route::get('farmer/awaiting-approval', function () {
    return Inertia::render('auth/AwaitingApproval');
})->middleware(['auth'])->name('farmer.awaiting-approval');

Route::get('farmer/dashboard', [FarmerDashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'farmer.verified'])
    ->name('farmer.dashboard');

Route::get('consumer/dashboard', [ConsumerDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('consumer.dashboard');

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminFarmerController;
use App\Http\Controllers\Admin\AdminProduceController;
use App\Http\Controllers\Admin\AdminProduceCategoryController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminReportController;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');

    Route::get('/farmers', [AdminFarmerController::class, 'index'])->name('farmers.index');
    Route::patch('/farmers/{farmer}/toggle-verification', [AdminFarmerController::class, 'toggleVerification'])->name('farmers.toggle-verification');

    Route::get('/produce', [AdminProduceController::class, 'index'])->name('produce.index');

    Route::get('/categories', [AdminProduceCategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [AdminProduceCategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{category}', [AdminProduceCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminProduceCategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/transactions', [AdminOrderController::class, 'transactions'])->name('transactions.index');

    Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
});

// messages
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/messages', [ConversationController::class, 'index'])->name('messages.index');
    Route::get('/messages/{conversation}', [ConversationController::class, 'show'])->name('messages.show');
    Route::post('/messages/{conversation}', [MessageController::class, 'store'])->name('messages.store');
});

// farmer produce management
Route::middleware(['auth', 'verified', 'farmer.verified'])
    ->prefix('farmer')
    ->name('farmer.')
    ->group(function () {
        Route::resource('produce', \App\Http\Controllers\ProduceController::class);
        Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'farmerIndex'])->name('orders.index');
    });

// consumer produce and ordering
Route::middleware(['auth', 'verified'])
    ->prefix('consumer')
    ->name('consumer.')
    ->group(function () {
        Route::get('/produce', [\App\Http\Controllers\ConsumerProduceController::class, 'index'])->name('produce.index');
        Route::get('/produce/{produce}', [\App\Http\Controllers\ConsumerProduceController::class, 'show'])->name('produce.show');

        Route::get('/cart', function () {
            return Inertia::render('Cart');
        })->name('cart');

        Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'consumerIndex'])->name('orders.index');
        Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
        Route::post('/orders/bulk', [\App\Http\Controllers\OrderController::class, 'storeBulk'])->name('orders.bulk');
        Route::post('/orders/simulate-payment', [\App\Http\Controllers\OrderController::class, 'simulatePayment'])->name('orders.simulatePayment');
        Route::patch('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'update'])->name('orders.update');
        Route::delete('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'destroy'])->name('orders.destroy');
    });

require __DIR__.'/settings.php';
