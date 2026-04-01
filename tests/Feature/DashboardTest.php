<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});
// additional role-specific checks

test('farmer dashboard redirects guest to login', function () {
    $this->get(route('farmer.dashboard'))
        ->assertRedirect(route('login'));
});

test('consumer dashboard redirects guest to login', function () {
    $this->get(route('consumer.dashboard'))
        ->assertRedirect(route('login'));
});

test('admin dashboard redirects guest to login', function () {
    $this->get(route('admin.dashboard'))
        ->assertRedirect(route('login'));
});

test('farmer can access farmer dashboard with stats', function () {
    $user = User::factory()->create();
    $farmer = \App\Models\Farmer::create([
        'user_id' => $user->id,
        'location' => 'Nairobi',
        'is_verified' => true,
    ]);

    $this->actingAs($user);

    $response = $this->get(route('farmer.dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('FarmerDashboard')
        ->has('stats')
        ->has('recentOrders')
    );
});

test('consumer can access consumer dashboard with stats', function () {
    $user = User::factory()->create();
    $consumer = \App\Models\Consumer::create([
        'user_id' => $user->id,
        'location' => 'Mombasa',
    ]);

    $this->actingAs($user);

    $response = $this->get(route('consumer.dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('ConsumerDashboard')
        ->has('stats')
        ->has('recentOrders')
    );
});
