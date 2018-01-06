<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryCourseOfferedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('history_course_offered', function (Blueprint $table) {
            $table->integer('id')->unsigned()->increments();
            $table->primary('id');

            $table->smallInteger('profile_id')->unsigned();
            $table->foreign('profile_id')->references('id')->on('profile');

            $table->tinyInteger('class_id')->unsigned();
            $table->foreign('class_id')->references('id')->on('class');

            $table->tinyInteger('batch')->unsigned();

            $table->smallInteger('course_id')->unsigned();
            $table->foreign('course_id')->references('id')->on('course');

            $table->tinyInteger('course_type')->unsigned();

            $table->smallInteger('location_id')->unsigned();
            $table->foreign('location_id')->references('id')->on('location');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('history_course_offered');
    }
}
