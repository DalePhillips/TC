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
        DB::table('users')->insert([
            'name' => 'Dale',
            'email' => 'dalephillips2@hotmail.com',
            'password' => bcrypt('test'),
            'type' => 'admin',
        ]);
        DB::table('user_stats')->insert([
            'user_id' => 1,
            'money' => 1000000
        ]);
        DB::table('staff_profiles')->insert([
            'user_id' => 1,
            'name' => 'Dale',
            'role' => 'Developer',
            'type' => 'admin'
        ]);

        
        DB::table('users')->insert([
            'name' => 'Mark',
            'email' => 'mark1_321@hotmail.com',
            'password' => bcrypt('test'),
            'type' => 'admin',
        ]);
        DB::table('user_stats')->insert([
            'user_id' => 2,
            'money' => 1000000
        ]);
        DB::table('staff_profiles')->insert([
            'user_id' => 2,
            'name' => 'Mark',
            'role' => 'Community Manager',
            'type' => 'admin'
        ]);
    }
}
