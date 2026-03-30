<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $is_admin = $user->admin()->exists();

        if ($is_admin) {
            $conversations = Conversation::with(['userOne', 'userTwo', 'lastMessage'])
                ->orderBy('last_message_at', 'desc')
                ->paginate(10);
        } else {
            $conversations = Conversation::where('user_one_id', $user->id)
                ->orWhere('user_two_id', $user->id)
                ->with(['userOne', 'userTwo', 'lastMessage'])
                ->orderBy('last_message_at', 'desc')
                ->get();
        }

        return Inertia::render('Messages/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation)
    {
        $user = Auth::user();
        $is_admin = $user->admin()->exists();

        if (!$is_admin && $conversation->user_one_id !== $user->id && $conversation->user_two_id !== $user->id) {
            abort(403);
        }

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at', 'asc')
            ->get();

        // Mark messages as read
        if (!$is_admin) {
            $conversation->messages()
                ->where('sender_id', '!=', $user->id)
                ->where('is_read', false)
                ->update(['is_read' => true]);
        }

        $otherUser = $conversation->getOtherUser($is_admin ? $conversation->userOne : $user);

        // Find relevant orders between these two users
        $userIds = [$conversation->user_one_id, $conversation->user_two_id];
        $orders = Order::where(function ($query) use ($userIds) {
            $query->whereHas('consumer', function ($q) use ($userIds) {
                $q->whereIn('user_id', $userIds);
            })->whereHas('produce.farmer', function ($q) use ($userIds) {
                $q->whereIn('user_id', $userIds);
            });
        })->with(['produce.category'])
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render('Messages/Show', [
            'conversation' => $conversation->load(['userOne', 'userTwo']),
            'messages' => $messages,
            'otherUser' => $otherUser,
            'orders' => $orders,
        ]);
    }
}
