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

    public function Course()
    {
        return $this->hasMany('App\Department');
    }

    public function _Class()
    {
        return $this->hasMany('App\_Class');
    }

    public function Faculty()
    {
        return $this->hasMany('App\Faculty');
    }

    public function Location()
    {
        return $this->hasMany('App\Location');
    }
}
