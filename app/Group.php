<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'group';

    public function User()
    {
        return $this->hasOne('App\User');
    }
}
