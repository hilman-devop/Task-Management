<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'position',
        'user_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'position' => 'integer',
        ];
    }

    /**
     * Get the user that owns the column.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the tasks for the column.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('position');
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically set position when creating
        static::creating(function ($column) {
            if (!isset($column->position)) {
                $maxPosition = static::where('user_id', $column->user_id)->max('position');
                $column->position = $maxPosition !== null ? $maxPosition + 1 : 0;
            }
        });
    }
}
