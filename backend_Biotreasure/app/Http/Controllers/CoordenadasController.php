<?php

namespace App\Http\Controllers;
use App\Models\Coordenadas;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCoordenadasRequest;

class CoordenadasController extends Controller
{
    public function listar(){
        $coordenadas = Coordenadas::with('Animal')->get();
        return response()->json($coordenadas);
    }

    public function criar(StoreCoordenadasRequest $request)  //Função para criar os animais
    {
        try {
            $coordenada = Coordenadas::create($request->validated());
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

    public function editar($id) //Função para atualizar
    {
        try {
            $coordenada= Coordenadas::findOrfail($id);
            return response()->json([
                'success' => true,
                'data' => $coordenada,
            ]);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => "Coordenada não encontrada",
            ], 404);
        }

    }


}
