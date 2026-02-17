import { Draggable } from '@hello-pangea/dnd';

const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
};

const TaskCard = ({ task, index, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date();
    };

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white/80 backdrop-blur-sm p-4 mb-3 rounded-xl border border-white/60 cursor-grab active:cursor-grabbing group
                        ${snapshot.isDragging
                            ? 'shadow-2xl shadow-primary-500/20 ring-2 ring-primary-500 rotate-2'
                            : 'shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-0.5'
                        } transition-all duration-200`}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
                        <div className="flex gap-1 ml-2">
                            <button
                                onClick={() => onEdit(task)}
                                className="text-gray-400 hover:text-primary-600 transition-colors"
                                title="Edit task"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete task"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {task.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>

                        {task.due_date && (
                            <span className={`text-xs ${isOverdue(task.due_date) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                {isOverdue(task.due_date) && '⚠️ '}
                                {formatDate(task.due_date)}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
