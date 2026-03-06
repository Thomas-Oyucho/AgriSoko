<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['category_name' => 'Fruits', 'description' => 'Fresh fruits such as apples, bananas, oranges'],
            ['category_name' => 'Vegetables', 'description' => 'Leafy and root vegetables'],
            ['category_name' => 'Grains', 'description' => 'Wheat, rice, maize and other grains'],
            
        ];

        foreach ($categories as $cat) {
            DB::table('produce_categories')->updateOrInsert(
                ['category_name' => $cat['category_name']],
                ['description' => $cat['description'], 'updated_at' => now(), 'created_at' => now()]
            );
        }
    }
}
