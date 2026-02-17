<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Column;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a demo user
        $user = User::create([
            'name' => 'Demo User',
            'email' => 'demo@taskflow.com',
            'password' => Hash::make('password'),
        ]);

        // Create default columns
        $todoColumn = Column::create([
            'user_id' => $user->id,
            'name' => 'To Do',
            'position' => 0,
        ]);

        $inProgressColumn = Column::create([
            'user_id' => $user->id,
            'name' => 'In Progress',
            'position' => 1,
        ]);

        $doneColumn = Column::create([
            'user_id' => $user->id,
            'name' => 'Done',
            'position' => 2,
        ]);

        // Create sample tasks
        Task::create([
            'user_id' => $user->id,
            'column_id' => $todoColumn->id,
            'title' => 'Design new landing page',
            'description' => 'Create mockups and wireframes for the new landing page',
            'priority' => 'High',
            'due_date' => now()->addDays(7),
            'position' => 0,
        ]);

        Task::create([
            'user_id' => $user->id,
            'column_id' => $todoColumn->id,
            'title' => 'Setup email notifications',
            'description' => 'Configure SMTP and create email templates',
            'priority' => 'Medium',
            'due_date' => now()->addDays(14),
            'position' => 1,
        ]);

        Task::create([
            'user_id' => $user->id,
            'column_id' => $inProgressColumn->id,
            'title' => 'Implement user authentication',
            'description' => 'Add login, register, and password reset functionality',
            'priority' => 'High',
            'due_date' => now()->addDays(3),
            'position' => 0,
        ]);

        Task::create([
            'user_id' => $user->id,
            'column_id' => $doneColumn->id,
            'title' => 'Project initialization',
            'description' => 'Setup Laravel backend and React frontend',
            'priority' => 'High',
            'due_date' => now()->subDays(1),
            'position' => 0,
        ]);
    }
}
