<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClassTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class', function (Blueprint $table) {
            $table->tinyInteger('id')->unsigned()->increments();
            $table->primary('id');            
            $table->tinyInteger('level')->unsigned();            
            $table->smallInteger('default_class')->unsigned();
            $table->foreign('default_class')->references('id')->on('location');
            $table->tinyInteger('department_id')->unsigned();
            $table->foreign('department_id')->references('id')->on('department');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('class');
    }
}
