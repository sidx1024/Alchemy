<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgrammeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programme', function (Blueprint $table) {
            $table->smallInteger('id')->unsigned()->increments();
            $table->primary('id');
            $table->string('name', 128);
            $table->string('alias', 8);
            $table->tinyInteger('levels')->unsigned();
            $table->tinyInteger('institute_id')->unsigned();
            $table->foreign('institute_id')->references('id')->on('institute');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programme');
    }
}
