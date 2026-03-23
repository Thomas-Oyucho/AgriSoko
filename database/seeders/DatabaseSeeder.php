<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Farmer;
use App\Models\Consumer;
use App\Models\Produce;
use App\Models\ProduceCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // predefined produce categories
        $this->call(ProduceCategorySeeder::class);

        // Create Admin
        $adminUser = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
        ]);
        $adminUser->admin()->create();

        // Create Farmer
        $farmerUser = User::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Farmer',
            'email' => 'farmer@example.com',
        ]);
        $farmer = Farmer::create([
            'user_id' => $farmerUser->id,
            'location' => 'Nairobi',
            'is_verified' => true,
        ]);

        // Create Consumer
        $consumerUser = User::factory()->create([
            'first_name' => 'Jane',
            'last_name' => 'Consumer',
            'email' => 'consumer@example.com',
        ]);
        Consumer::create([
            'user_id' => $consumerUser->id,
            'location' => 'Nairobi',
        ]);

        // Create Produce for the Farmer
        $category = ProduceCategory::first();
        if ($category) {
            Produce::create([
                'farmer_id' => $farmer->id,
                'category_id' => $category->id,
                'name' => 'Organic Tomatoes',
                'description' => 'Freshly harvested organic tomatoes from the farm.',
                'price' => 150.00,
                'quantity_available' => 50,
            ]);
        }
    }
}
