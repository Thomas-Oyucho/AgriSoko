<?php

namespace Database\Factories;

use App\Models\ProduceCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduceCategoryFactory extends Factory
{
    protected $model = ProduceCategory::class;

    public function definition()
    {
        return [
            'category_name' => ucfirst($this->faker->unique()->word),
            'description' => $this->faker->sentence,
        ];
    }
}
