<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use Illuminate\Http\Request;
use App\Models\Animal;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AnimalController extends Controller
{
    public function listar() //Função para visualizar
    {
        $animais = Animal::with('animais')->get();
        return response()->json($animais);
    }

//    php artisan make:request StoreMarcaRequest
    public function criar(Request $request)  //Função para criar os animais
    {
        try {
            $animal = Animal::create($request->all());
            return response()->json([
                'success' => true,
                'animal' => $animal,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);

        }
    }
    
    public function deletar($id){

    }


    public function editar($id) //Função para atualizar
    {
        try {
            $animal= Animal::findOrfail($id);
            return response()->json([
                'success' => true,
                'data' => $animal,
            ]);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => "animal não encontrado",
            ], 404);
        }

    }
}
