<?php

namespace App\Http\Controllers;

use App\Faculty;

class FacultyController extends Controller
{
    public function __invoke()
    {
        return Faculty::all();
    }
}