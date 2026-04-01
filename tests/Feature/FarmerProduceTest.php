<?php

namespace Tests\Feature;

use App\Models\Produce;
use App\Models\ProduceCategory;
use App\Models\Farmer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
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
        Storage::fake('public');

        // create farmer user
        $user = User::factory()->create();
        $farmer = Farmer::factory()->create([
            'user_id' => $user->id,
            'is_verified' => true,
        ]);

        $this->actingAs($user);

        // index empty
        $response = $this->get('/farmer/produce');
        $response->assertStatus(200);
        $this->assertEmpty(Produce::all());

        // create produce with image
        $category = ProduceCategory::first();
        $image = UploadedFile::fake()->image('produce.jpg');

        $response = $this->post('/farmer/produce', [
            'name' => 'Test Item',
            'category_id' => $category->id,
            'price' => 10.5,
            'quantity_available' => 5,
            'picture' => $image,
        ]);
        $response->assertRedirect('/farmer/produce');
        $this->assertDatabaseHas('produce', ['name' => 'Test Item']);

        $item = Produce::first();
        $this->assertNotNull($item->picture);
        $this->assertStringContainsString('/storage/produce/', $item->picture);

        $path = str_replace('/storage/', '', $item->picture);
        Storage::disk('public')->assertExists($path);

        // edit view should be accessible
        $this->get("/farmer/produce/{$item->id}/edit")->assertStatus(200);

        // update with new image
        $newImage = UploadedFile::fake()->image('new_produce.jpg');
        $this->put("/farmer/produce/{$item->id}", [
            'name' => 'Updated',
            'category_id' => $category->id,
            'price' => 12.0,
            'quantity_available' => 3,
            'picture' => $newImage,
        ])->assertRedirect('/farmer/produce');

        $this->assertDatabaseHas('produce', ['name' => 'Updated']);

        $updatedItem = $item->fresh();
        $this->assertNotEquals($item->picture, $updatedItem->picture);

        Storage::disk('public')->assertMissing($path);
        $newPath = str_replace('/storage/', '', $updatedItem->picture);
        Storage::disk('public')->assertExists($newPath);

        // delete
        $this->delete("/farmer/produce/{$item->id}")->assertRedirect();
        $this->assertDatabaseCount('produce', 0);
        Storage::disk('public')->assertMissing($newPath);
    }
}
