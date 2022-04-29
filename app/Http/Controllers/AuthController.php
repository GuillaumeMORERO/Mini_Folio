<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'status' => 'error',
                'messages' => $errors->all(),
            ]);
        }
        else {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Les données saisies ne sont pas reconnues'
                ], 401);
            }
    
            $user = User::where('email', $request->email)->first();
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'status' => 'success',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'userData' => $user,
            ]);
        }


    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'loggedout'
        ];
    }


}
