<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


// Route::get('/', [App\Http\Controllers\HomeController::class, 'getIndex'])->name('getIndex');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('index');

// spa react/router, donc je redirige toutes les url sur '/' pour eviter une 404
Route::any('{query}', 
  function() { return redirect('/'); })
  ->where('query', '.*');

// ou plus simplement :
// Route::view('/{path?}', 'app');