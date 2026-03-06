<?php

namespace Database\Factories;

use App\Models\Farmer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FarmerFactory extends Factory
{
    protected $model = Farmer::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'location' => $this->faker->city,
            'is_verified' => false,
        ];
    }
}
