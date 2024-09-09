<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_animais', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cientifico');
            $table->timestamps();
        });
        Schema::create('tb_coordenadas', function (Blueprint $table) {
            $table->id();
            $table->string('latitude');
            $table->string('longitude');
            $table->foreignId('animal_id')->constrained('tb_animais');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_biotreasure');
        Schema::dropIfExists('tb_coordenadas');
    }
};
