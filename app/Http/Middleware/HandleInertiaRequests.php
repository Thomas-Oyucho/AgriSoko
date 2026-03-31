<?php

namespace App\Http\Middleware;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? [
                    ...$request->user()->toArray(),
                    'is_farmer' => $request->user()->farmer()->exists(),
                    'is_consumer' => $request->user()->consumer()->exists(),
                    'is_admin' => $request->user()->admin()->exists(),
                    'unread_count' => Message::whereHas('conversation', function ($query) use ($request) {
                        $query->where('user_one_id', $request->user()->id)
                              ->orWhere('user_two_id', $request->user()->id);
                    })->where('sender_id', '!=', $request->user()->id)
                      ->where('is_read', false)
                      ->count(),
                ] : null,
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'showPaymentModal' => session('showPaymentModal'),
                'orderIds' => session('orderIds'),
                'phoneNumber' => session('phoneNumber'),
                'totalAmount' => session('totalAmount'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
