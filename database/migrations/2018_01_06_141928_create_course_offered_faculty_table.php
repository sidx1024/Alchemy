<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCourseOfferedFacultyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_offered_faculty', function (Blueprint $table) {
            $table->smallInteger('profile_id')->unsigned();
            $table->foreign('profile_id')->references('id')->on('profile');

            $table->integer('course_offered_id')->unsigned();
            $table->foreign('course_offered_id')->references('id')->on('course_offered');

            $table->smallInteger('faculty_id')->unsigned();
            $table->foreign('faculty_id')->references('id')->on('faculty');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_offered_faculty');
    }
}
