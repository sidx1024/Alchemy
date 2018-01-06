<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profile', function (Blueprint $table) {
            $table->smallInteger('id')->unsigned()->increments();
            $table->primary('id');
            $table->string('name', 32);
            $table->string('description', 64)->nullable();
            $table->smallInteger('year')->unsigned();
            $table->tinyInteger('semester')->unsigned();
            $table->timestamp('created_at');
            $table->boolean('is_archived')->default(0);
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
        Schema::dropIfExists('profile');
    }
}
