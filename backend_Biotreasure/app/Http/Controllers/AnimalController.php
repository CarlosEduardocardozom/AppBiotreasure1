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
        $animais = Animal::with('coordenadas')->get();
        return response()->json($animais);
    }
    public function show($id)  //Função para criar os animais
    {
        try {
            $animal = Animal::find($id);
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

    
    
    public function deletar(Request $request, $id) //Função para atualizar
    {
        try {
            $animal= Animal::findOrfail($id);

            $animal->delete($request->all());
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


    public function editar(Request $request, $id) //Função para atualizar
    {
        try {
            $animal= Animal::findOrfail($id);

            $animal->update($request->all());
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
