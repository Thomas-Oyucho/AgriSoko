<?php

namespace Tests\Feature;

use App\Models\Produce;
use App\Models\ProduceCategory;
use App\Models\Farmer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FarmerProduceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\ProduceCategorySeeder::class);
    }

    public function test_farmer_can_crud_produce()
    {
        // create farmer user
        $user = User::factory()->create();
        $farmer = Farmer::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        // index empty
        $response = $this->get('/farmer/produce');
        $response->assertStatus(200);
        $this->assertEmpty(Produce::all());

        // create produce
        $category = ProduceCategory::first();
        $response = $this->post('/farmer/produce', [
            'name' => 'Test Item',
            'category_id' => $category->id,
            'price' => 10.5,
            'quantity_available' => 5,
        ]);
        $response->assertRedirect('/farmer/produce');
        $this->assertDatabaseHas('produce', ['name' => 'Test Item']);

        $item = Produce::first();

        // edit view should be accessible
        $this->get("/farmer/produce/{$item->id}/edit")->assertStatus(200);

        // update
        $this->put("/farmer/produce/{$item->id}", [
            'name' => 'Updated',
            'category_id' => $category->id,
            'price' => 12.0,
            'quantity_available' => 3,
        ])->assertRedirect('/farmer/produce');

        $this->assertDatabaseHas('produce', ['name' => 'Updated']);

        // delete
        $this->delete("/farmer/produce/{$item->id}")->assertRedirect();
        $this->assertDatabaseCount('produce', 0);
    }
}
