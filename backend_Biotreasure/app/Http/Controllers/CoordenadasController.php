<?php

namespace App\Http\Controllers;
use App\Models\Coordenadas;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCoordenadasRequest;

class CoordenadasController extends Controller
{
    public function listar(){
        $coordenadas = Coordenadas::all();
        return response()->json($coordenadas);
    }

    public function show($id)  //Função para criar os animais
    {
        try {
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

    public function criar(request $request)  //Função para criar os animais
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

    public function editar(Request $request, $id) //Função para atualizar
    {
        try {
            $coordenada= Coordenadas::findOrfail($id);

            $coordenada->update($request->all());
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

    public function deletar(Request $request, $id) //Função para atualizar
    {
        try {
            $coordenada= Coordenadas::findOrfail($id);

            $coordenada->delete($request->all());
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
