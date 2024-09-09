<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\CoordenadasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('teste', function (Request $request) {
    return "Teste";
});

Route::get('/animais', [AnimalController::class, 'listar']); // Listar todos os animais
Route::get('/animal/{id}',[AnimalController::class, 'show']);
Route::post('/new-animal', [AnimalController::class, 'criar']); // Criar um novo animal
Route::put('/edit-animal/{id}', [AnimalController::class, 'editar']); // Editar um animal existente
Route::delete('/delete-animal/{id}', [AnimalController::class, 'deletar']); // Deletar um animal

// Rotas para o controlador de Coordenadas
Route::get('/coordenadas', [CoordenadasController::class, 'listar']); // Listar todas as coordenadas
Route::get('/coordenada/{id}', [CoordenadasController::class, 'show']);
Route::post('/new-coordenada', [CoordenadasController::class, 'criar']); // Criar nova coordenada
Route::put('/edit-coordenada/{id}', [CoordenadasController::class, 'editar']); // Editar coordenada existente
Route::delete('/delete-coordenada/{id}', [CoordenadasController::class, 'deletar']); // Deletar uma coordenada