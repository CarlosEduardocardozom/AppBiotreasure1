<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use Illuminate\Http\Request;
use App\Models\Animal;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AnimalController extends Controller
{
    public function listar(){
        $animais = Animal::all();
        return response()->json($animais);
    }
    public function show($id)  //Função para criar os animais
    {
        try {
            $animal = Animal::find($id);
            return response()->json([
                'success' => true,
                'animal' => $animal,
            ],);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);

        }
    }

//    php artisan make:request StoreMarcaRequest
    public function criar(StoreAnimalRequest $request)  //Função para criar os animais
    {
        try {
            $animal = Animal::create($request->all());
            return response()->json([
                'success' => true,
                'animal' => $animal,
            ],);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);

        }
    }

    
    
    public function deletar($id) //Função para atualizar
    {
        try{
            $animal = Animal::destroy($id);
            return response()->json([
                'sucess' => true,
                'animal' => $animal
            ], status: 201);
        }catch (\Exception $e){
            return response()->json([
                'sucess' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }


    public function editar(StoreAnimalRequest $request, $id) //Função para atualizar
    {
        try {
            $animal= Animal::findOrfail($id);

            $animal->update($request->all());
            return response()->json([
                'success' => true,
                'data' => $animal,
            ],201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => "animal não encontrado",
            ], 404);
        }

    }
}
