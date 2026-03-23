<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Farmer;
use App\Models\Consumer;
use App\Models\Produce;
use App\Models\ProduceCategory;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ConsumerOrderTest extends TestCase
{
    use RefreshDatabase;

    protected $farmerUser;
    protected $farmer;
    protected $consumerUser;
    protected $consumer;
    protected $produce;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();

        $this->farmerUser = User::factory()->create();
        $this->farmer = Farmer::create([
            'user_id' => $this->farmerUser->id,
            'location' => 'Test Location',
        ]);

        $this->consumerUser = User::factory()->create();
        $this->consumer = Consumer::create([
            'user_id' => $this->consumerUser->id,
            'location' => 'Test Location',
        ]);

        $this->category = ProduceCategory::create([
            'category_name' => 'Fruits',
            'description' => 'Fresh fruits',
        ]);

        $this->produce = Produce::create([
            'farmer_id' => $this->farmer->id,
            'category_id' => $this->category->id,
            'name' => 'Apple',
            'description' => 'Fresh apples',
            'quantity_available' => 10,
            'price' => 2.50,
        ]);
    }

    public function test_consumer_can_view_produces_index()
    {
        $response = $this->actingAs($this->consumerUser)
            ->get(route('consumer.produce.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('ConsumerProduce')
            ->has('produces', 1)
        );
    }

    public function test_consumer_can_view_produce_details()
    {
        $response = $this->actingAs($this->consumerUser)
            ->get(route('consumer.produce.show', $this->produce));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('ConsumerProduceShow')
            ->has('produce')
        );
    }

    public function test_consumer_can_place_order_within_available_quantity()
    {
        $response = $this->actingAs($this->consumerUser)
            ->post(route('consumer.orders.store'), [
                'produce_id' => $this->produce->id,
                'quantity' => 4,
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Order placed successfully!');

        $this->assertDatabaseHas('orders', [
            'consumer_id' => $this->consumer->id,
            'produce_id' => $this->produce->id,
            'quantity' => 4,
            'unit_price' => 2.50,
            'total_price' => 10.00,
        ]);

        $this->produce->refresh();
        $this->assertEquals(6, $this->produce->quantity_available);
    }

    public function test_consumer_cannot_order_more_than_available_quantity()
    {
        $response = $this->actingAs($this->consumerUser)
            ->post(route('consumer.orders.store'), [
                'produce_id' => $this->produce->id,
                'quantity' => 11,
            ]);

        $response->assertSessionHas('error', 'The requested quantity exceeds available stock.');
        $this->assertDatabaseCount('orders', 0);

        $this->produce->refresh();
        $this->assertEquals(10, $this->produce->quantity_available);
    }

    public function test_farmer_cannot_place_order()
    {
        $response = $this->actingAs($this->farmerUser)
            ->post(route('consumer.orders.store'), [
                'produce_id' => $this->produce->id,
                'quantity' => 1,
            ]);

        $response->assertStatus(403);
    }
}
