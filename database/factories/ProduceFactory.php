<?php

namespace Database\Factories;

use App\Models\Produce;
use App\Models\ProduceCategory;
use App\Models\Farmer;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduceFactory extends Factory
{
    protected $model = Produce::class;

    public function definition()
    {
        return [
            'farmer_id' => Farmer::factory(),
            'category_id' => ProduceCategory::factory(),
            'name' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 1, 100),
            'quantity_available' => $this->faker->numberBetween(1, 50),
            'picture' => null,
            'description' => $this->faker->sentence,
            'date_listed' => now(),
        ];
    }
}
