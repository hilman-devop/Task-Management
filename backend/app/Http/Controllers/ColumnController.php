<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreColumnRequest;
use App\Http\Requests\UpdateColumnRequest;
use App\Models\Column;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    /**
     * Display a listing of columns with tasks.
     */
    public function index(Request $request)
    {
        $columns = $request->user()
            ->columns()
            ->with('tasks')
            ->orderBy('position')
            ->get();

        return response()->json($columns);
    }

    /**
     * Store a newly created column.
     */
    public function store(StoreColumnRequest $request)
    {
        $column = Column::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'position' => $request->position,
        ]);

        return response()->json($column, 201);
    }

    /**
     * Update the specified column.
     */
    public function update(UpdateColumnRequest $request, Column $column)
    {
        // Ensure user owns the column
        if ($column->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $column->update($request->validated());

        return response()->json($column);
    }

    /**
     * Remove the specified column.
     */
    public function destroy(Request $request, Column $column)
    {
        // Ensure user owns the column
        if ($column->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Check if column has tasks
        if ($column->tasks()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete column with tasks. Please move or delete tasks first.'
            ], 422);
        }

        $column->delete();

        return response()->json(['message' => 'Column deleted successfully']);
    }
}
