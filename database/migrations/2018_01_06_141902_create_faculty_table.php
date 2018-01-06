<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFacultyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faculty', function (Blueprint $table) {
            $table->smallInteger('id')->unsigned()->increments();
            $table->primary('id');
            $table->smallInteger('edited_id')->unsigned()->nullable();
            $table->string('name', 128);
            $table->string('alias', 6);
            $table->string('code', 8);
            $table->tinyInteger('designation_id')->unsigned();
            $table->foreign('designation_id')->references('id')->on('designation');
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
        Schema::dropIfExists('faculty');
    }
}
