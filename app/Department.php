<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'department';

    public function Programme()
    {
        return $this->belongsTo('App\Programme');
    }
}
