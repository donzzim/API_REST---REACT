<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('current_page') ?? 1;
        $maxPerPage = 3;
        $skip = ($currentPage - 1) * $maxPerPage;

        $users = User::skip($skip)->take($maxPerPage)->orderBy('id', 'asc')->get();

        $skip = ($currentPage - 1) * $maxPerPage;
        return response()->json($users->toResourceCollection(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        try {
            $user = new User();
            $user->fill($data);
            $user->password = bcrypt('default_password');
            $user->save();

            return response()->json($user->toResource(), 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao criar usuário!'
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json($user->toResource(), 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Usuário não encontrado!'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $user = User::findOrFail($id);
            $user->update($data);

            return response()->json($user->toResource(), 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao atualizar usuário!'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $removed = User::delete($id);

            if (!$removed) {
                throw new \Exception('Usuário não encontrado!');
            }

            return response()->json(null, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Falha ao deletar usuário!',
                'message2' => $th->getMessage()
            ], 404);
        }
    }
}
