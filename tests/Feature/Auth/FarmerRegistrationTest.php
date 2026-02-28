<?php

use App\Models\User;

it('shows the farmer registration form', function () {
    $response = $this->get(route('register.farmer'));

    $response->assertOk();
});

it('registers a new farmer and redirects to dashboard', function () {
    $response = $this->post(route('register.farmer.store'), [
        'first_name' => 'John',
        'middle_name' => 'Q',
        'last_name' => 'Farmer',
        'email' => 'farmer@example.com',
        'phone' => '1234567890',
        'password' => 'password',
        'password_confirmation' => 'password',
        'location' => 'Farmville',
    ]);

    $this->assertAuthenticated();
    $this->assertDatabaseHas('farmers', [
        'location' => 'Farmville',
    ]);
    $response->assertRedirect(route('farmer.dashboard', absolute: false));
});

it('does not allow duplicate email', function () {
    User::factory()->create(['email' => 'duplicate@example.com']);

    $response = $this->post(route('register.farmer.store'), [
        'first_name' => 'Jane',
        'middle_name' => null,
        'last_name' => 'Doe',
        'email' => 'duplicate@example.com',
        'phone' => null,
        'password' => 'password',
        'password_confirmation' => 'password',
        'location' => 'Somewhere',
    ]);

    $response->assertSessionHasErrors('email');
});
