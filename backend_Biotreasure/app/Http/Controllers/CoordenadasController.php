<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCoordenadasRequest;
use Illuminate\Http\Request;
use App\Models\Coordenadas;
use App\Models\Animal;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CoordenadasController extends Controller
{
    public function listar() //Função para visualizar
    {
        $coordenadas = Coordenadas::all();
        return response()->json($coordenadas);
    }

    public function show($id)  //Função para criar os animais
    {
        try {
            $animal = Animal::all();
            $coordenada = Coordenadas::find($id);
            return response()->json([
                'success' => true,
                'coordenada' => $coordenada,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);

        }
    }

    public function criar(StoreCoordenadasRequest $request)  //Função para criar os animais
    {
        try {
            $coordenada = Coordenadas::create($request->all());
            return response()->json([
                'success' => true,
                'coordenada' => $coordenada,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);

        }
    }

    public function editar(StoreCoordenadasRequest $request, $id) //Função para atualizar
    {
        try {
            $coordenada= Coordenadas::findOrfail($id);

            $coordenada->update($request->all());
            return response()->json([
                'success' => true,
                'data' => $coordenada,
            ],201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => "Coordenada não encontrada",
            ], 404);
        }

    }

    public function deletar($id) //Função para atualizar
    {
        try{
            $coordenada = Coordenadas::destroy($id);
            return response()->json([
                'sucess' => true,
                'coordenada' => $coordenada
            ], status: 201);
        }catch (\Exception $e){
            return response()->json([
                'sucess' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }


}
