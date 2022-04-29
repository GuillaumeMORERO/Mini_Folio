<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use GuzzleHttp\Promise\Promise;
use GuzzleHttp\Promise\PromiseInterface;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|between:2,15|alpha',
            'email' => 'bail|required|unique:users|email',
            'password' => 'bail|required|string|max:250',
            'num_tel' => 'bail|nullable|string|max:13'
        ]);
 
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'status' => 'error',
                'messages' => $errors->all(),
            ]);
        }
        else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'num_tel' => isset($request->num_tel) ? $request->num_tel : '',
                'avatar_url' => isset($request->avatar_url) ? $request->avatar_url : '' 
            ]);
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'status' => 'success',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'userData' => $user,
            ]);
        }
    }

    public function postUserData(Request $request)
    {
        $user = Auth::user();
        $user->update($request->all());
        $user->save();

        return response()->json([
            'status' => 'success',
            'userData' => $user,
        ]);
    }

    public function getApiDataNews(Request $request) {
        $user = Auth::user();

        // newsapi
        $apiKey = 'd3a795801b8c47b29cf5de0944d5f104';
        $APIURL = 'https://newsapi.org/v2/top-headlines?country=fr&pageSize=10&page=1&apiKey='.$apiKey;

        // si probleme dans les données reçues, à gérer, y'aura peut-être des request de filtre
        // if( ($type == null) || ($apiKey == '') || ($APIURL == '') ){
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => "Il y a eu un problème, veuillez contacter l'administrateur.",
        //     ]);
        // };

        // on envoie la requete api uniquement si y'a un user
        if($user) {
            $client = new \GuzzleHttp\Client();
            $result = $client->get($APIURL, [
                'headers'=> [
                    'Authorization' => 'Bearer ' . $apiKey,        
                    'Accept'        => 'application/json',
                ]
            ]);
            $response = json_decode($result->getBody()->getContents(), true);

            $response = [
                'status' => 'success',
                'arrayData' => $response,
            ];
        }
        else {
            $response = [
                'status' => 'error',
                'message' => "t'es pas connecté !!",
            ];
        }

            // $response = [
            //     'status' => 'test',
            //     'message' => "ça marche ?",
            // ];

        return response()->json($response);
    }

    public function getApiData(Request $request, $type=null)
    {
        $user = Auth::user();

        // on définit les key & url en fonction du param de la route
        $apiKey = '';
        $APIURL = '';
        if($type == 'news'){
            $apiKey = '8db6a14a5412d89743234a0616c4cc3d';
            $APIURL = 'http://api.mediastack.com/v1/news?access_key='.$apiKey.'&languages=fr';
        }
        elseif($type == 'jv') {
            $apiKey = 'C73D1CFD9D2C849AB08D1C5EADC2A3AB'; //pour le domaine guimor.fr
            $APIURL = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/';
            // $APIURL = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json';
        }

        // si probleme dans les données reçues
        if( ($type == null) || ($apiKey == '') || ($APIURL == '') ){
            return response()->json([
                'status' => 'error',
                'message' => "Il y a eu un problème, veuillez contacter l'administrateur.",
            ]);
        };

        // on envoie la requete api uniquement si y'a un user
        if($user) {
            $client = new \GuzzleHttp\Client(['base_uri' => $APIURL]);
            $result = $client->get('?appid=440&count=3&maxlength=300&format=json', [
                'headers'=> [
                    'Authorization' => 'Bearer ' . $apiKey,        
                    'Accept'        => 'application/json',
                ]
            ]);
            $response = json_decode($result->getBody()->getContents(), true);

            $response = [
                'status' => 'success',
                'arrayData' => $response,
            ];
        }
        else {
            $response = [
                'status' => 'error',
                'message' => "t'es pas connecté !!",
            ];
        }

        return response()->json($response);
    }
}
