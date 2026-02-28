<?php

use App\Models\User;

it('shows the consumer registration form', function () {
    $response = $this->get(route('register.consumer'));

    $response->assertOk();
});

it('registers a new consumer and redirects to dashboard', function () {
    $response = $this->post(route('register.consumer.store'), [
        'first_name' => 'Alex',
        'middle_name' => null,
        'last_name' => 'Buyer',
        'email' => 'consumer@example.com',
        'phone' => '9876543210',
        'password' => 'password',
        'password_confirmation' => 'password',
        'location' => 'Cityville',
    ]);

    $this->assertAuthenticated();
    $this->assertDatabaseHas('consumers', [
        'location' => 'Cityville',
    ]);
    $response->assertRedirect(route('consumer.dashboard', absolute: false));
});

it('does not allow duplicate email', function () {
    User::factory()->create(['email' => 'duplicate2@example.com']);

    $response = $this->post(route('register.consumer.store'), [
        'first_name' => 'Jess',
        'middle_name' => null,
        'last_name' => 'Smith',
        'email' => 'duplicate2@example.com',
        'phone' => null,
        'password' => 'password',
        'password_confirmation' => 'password',
        'location' => 'Elsewhere',
    ]);

    $response->assertSessionHasErrors('email');
});
