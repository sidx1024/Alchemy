<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'programme';

    public function Institute()
    {
        return $this->belongsTo('App\Institute');
    }

    public function Department()
    {
        return $this->hasMany('App\Department');
    }

    public function Profile()
    {
        return $this->hasMany('App\Profile');
    }

    public function Designation()
    {
        return $this->hasMany('App\Designation');
    }
}
