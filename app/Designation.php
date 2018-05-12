<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
  //
  public $timestamps = false;
  protected $table = 'designation';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.

  public static $rules = [
    'name' => 'required|max:128',
    'hours' => 'required|max:8',
    'programme_id' => 'required'
  ];

  public function Programme()
  {
    return $this->belongsTo('App\Programme');
  }

  public function Faculty()
  {
    return $this->hasMany('App\Faculty');
  }
  public function usages() {
    $faculty_usages = Faculty::where('designation_id', $this->id)->get()->all();
    return $faculty_usages;
  }
}