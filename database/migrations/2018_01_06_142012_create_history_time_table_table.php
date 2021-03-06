<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryTimeTableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('history_time_table', function (Blueprint $table) {
            $table->increments('id');

            $table->smallInteger('profile_id')->unsigned();
            $table->foreign('profile_id')->references('id')->on('profile');

            $table->tinyInteger('from')->unsigned()->nullable();
            $table->tinyInteger('to')->unsigned()->nullable();
            $table->enum('day', array('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'))->nullable();

            $table->integer('course_offered_id')->unsigned();
            $table->foreign('course_offered_id')->references('id')->on('history_course_offered');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('history_time_table');
    }
}
