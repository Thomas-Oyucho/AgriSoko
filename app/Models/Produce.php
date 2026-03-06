<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produce extends Model
{
    use HasFactory;

    protected $table = 'produce';

    protected $fillable = [
        'farmer_id',
        'category_id',
        'name',
        'price',
        'quantity_available',
        'picture',
        'description',
        'date_listed',
    ];

    protected $casts = [
        'date_listed' => 'datetime',
    ];

    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    public function category()
    {
        return $this->belongsTo(ProduceCategory::class, 'category_id');
    }
}
