<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->smallInteger('edited_id')->unsigned()->nullable();
            $table->string('name', 128);
            $table->string('alias', 8);
            $table->string('code', 12);
            $table->string('scheme', 5);
            $table->tinyInteger('credit')->unsigned();
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
        Schema::dropIfExists('course');
    }
}
