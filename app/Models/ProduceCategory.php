<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduceCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
        'description',
    ];

    public function produce()
    {
        return $this->hasMany(Produce::class, 'category_id');
    }
}
