<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\CoordenadasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('', function (Request $request) {
    return "OK";
});

Route::get('/animais', [AnimalController::class, 'listar'])->name('animais-listar');
Route::get('/animais/{id}', [AnimalController::class, 'show'])->name('animais-show');
Route::post('/new-animal', [AnimalController::class, 'criar'])->name('animais-criar');
Route::put('/edit-animal/{id}', [AnimalController::class, 'editar'])->name('animais-editar');
Route::delete('/delete-animal/{id}', [AnimalController::class, 'deletar'])->name('animais-deletar');

Route::get('/coordenadas', [CoordenadasController::class, 'listar'])->name('coordenadas-listar');
Route::get('/coordenadas/{id}',[CoordenadasController::class, 'show'])->name('coordenadas-show');
Route::post('/new-coordenada', [CoordenadasController::class, 'criar'])->name('coordenadas-criar');
Route::put('/edit-coordenada/{id}', [CoordenadasController::class, 'editar'])->name('coordenadas-editar');
Route::delete('/delete-coordenada/{id}', [CoordenadasController::class, 'deletar'])->name('coordenadas-deletar');
