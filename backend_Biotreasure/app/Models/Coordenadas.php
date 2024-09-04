<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coordenadas extends Model
{
    use HasFactory;
    protected $fillable =['latitude','longitude','animal_id'];

    public function animal(){
        return $this->belongsTo(Animal::class);
    }
}
