<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'consumer_id',
        'produce_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    public function consumer()
    {
        return $this->belongsTo(Consumer::class);
    }

    public function produce()
    {
        return $this->belongsTo(Produce::class);
    }
}
