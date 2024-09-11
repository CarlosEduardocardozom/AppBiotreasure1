<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;
    protected $table = 'animais';
    protected $fillable =['nome', 'cientifico'];

    public function coordenadas(){
        return $this->hasMany(Coordenadas::class);
    }
}
