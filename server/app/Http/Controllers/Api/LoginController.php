<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;



class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|min:6|exists:users,name',
            'password' => 'required|min:6',
        ], [
            'name.required'=> 'El usuario es necesario.',
            'name.exists'=> 'El usuario es incorrecto.',
            'name.min'=> 'Mínimo 6 caracteres.',
            'name.max'=> 'Máximo 20 caracteres.',
            'password.required'=> 'La contraseña es necesaria.',
            'password.min'=> 'Mínimo 6 caracteres.'
        ]);

        $credentials = request(['name', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Contraseña incorrecta.'], 401);
        }

        return $this->respondWithToken($token);
    }


    public function profile()
    {
        return response()->json(auth()->user());
    }


    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request) {
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users,email',
            'user' => 'required|min:6|max:20|unique:users,name',
            'pass' => 'required|min:6',
        ], [
            'email.required'=> 'El correo electrónico es necesario.',
            'email.email'=> 'Ingrese un correo válido.',
            'email.unique'=> 'El correo electrónico ya está en uso.',
            'user.required'=> 'El usuario es necesario.',
            'user.min'=> 'Mínimo 6 caracteres.',
            'user.max'=> 'Máximo 20 caracteres.',
            'user.unique'=> 'El usuario no está disponible.',
            'pass.required'=> 'La contraseña es necesaria.',
            'pass.min'=> 'Mínimo 6 caracteres.'
        ]);

        $user = new User();

        $user->email = $request->email;
        $user->name = $request->user;
        $user->password = Hash::make($request->pass);

        $user->save();
        return response()->json([$user], 201);
    }


}
