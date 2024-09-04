<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\CoordenadasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('teste', function (Request $request) {
    return "Teste";
});

Route::get('/criarA', [AnimalController::class,'criar']);
Route::get('/editarA', [AnimalController::class,'editar']);
Route::get('/animais', [AnimalController::class,'listar']);
Route::get('/criarC', [CoordenadasController::class,'criar']);
Route::get('/editarC', [CoordenadasController::class,'editar']);
Route::get('/coordenadas', [CoordenadasController::class,'listar']);
