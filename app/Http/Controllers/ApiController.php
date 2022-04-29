<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class ApiController extends Controller
{
    public function getUserTest() {
        return $users = User::all();
    }
}
