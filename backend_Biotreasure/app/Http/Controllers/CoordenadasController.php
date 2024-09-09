<?php

namespace App\Http\Controllers;
use App\Models\Coordenadas;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCoordenadasRequest;

class CoordenadasController extends Controller
{
    public function listar() //Função para visualizar
    {
        $coordenadas = Coordenadas::with('animal')->get();
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

    public function deletar(StoreCoordenadasRequest $request, $id) //Função para atualizar
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
