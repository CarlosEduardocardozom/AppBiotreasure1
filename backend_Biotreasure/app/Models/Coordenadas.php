<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coordenadas extends Model
{
    use HasFactory;
    protected $table = 'coordenadas';
    protected $fillable = ['latitude', 'longitude', 'animal_id'];
    protected $with = ['animais'];

    public function animais()
    {
        // puxando animais dentro das cordenadas
        return $this->belongsTo(Animal::class);
    }
}