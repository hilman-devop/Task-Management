<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks.
     */
    public function index(Request $request)
    {
        $tasks = $request->user()
            ->tasks()
            ->with('column')
            ->orderBy('position')
            ->get();

        return response()->json($tasks);
    }

    /**
     * Store a newly created task.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'column_id' => $request->column_id,
            'due_date' => $request->due_date,
            'priority' => $request->priority ?? 'Medium',
            'position' => $request->position,
        ]);

        // Load the column relationship
        $task->load('column');

        return response()->json($task, 201);
    }

    /**
     * Update the specified task.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // Ensure user owns the task
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->update($request->validated());

        // Load the column relationship
        $task->load('column');

        return response()->json($task);
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Request $request, Task $task)
    {
        // Ensure user owns the task
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
