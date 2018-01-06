<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDesignationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('designation', function (Blueprint $table) {
            $table->tinyInteger('id')->unsigned()->increments();
            $table->primary('id');
            $table->string('name', 32);
            $table->tinyInteger('hours')->unsigned();
            $table->tinyInteger('programme_id')->unsigned();
            $table->foreign('programme_id')->references('id')->on('programme');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('designation');
    }
}
