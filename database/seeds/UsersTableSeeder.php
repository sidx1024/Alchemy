<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->create([
            'name' => 'Administrator',
            'email' => 'admin',
            'password' => password_hash('admin', PASSWORD_BCRYPT)
        ]);
        factory(App\User::class)->create([
            'name' => 'Limited User',
            'email' => 'user',
            'password' => password_hash('user', PASSWORD_BCRYPT)
        ]);
    }
}
