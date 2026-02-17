import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onAddTask, onEditTask, onDeleteTask, onDeleteColumn }) => {
    return (
        <div className="flex-shrink-0 w-80">
            <div className="glass-panel p-4 h-full flex flex-col max-h-[calc(100vh-220px)]">
                <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-800 tracking-tight">{column.name}</h2>
                        <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {tasks.length}
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => onAddTask(column.id)}
                            className="p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Add task"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDeleteColumn(column.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete column"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <Droppable droppableId={column.id.toString()}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-primary-50/50 rounded-lg' : ''
                                } transition-colors pr-1 custom-scrollbar`}
                            style={{ minHeight: '100px' }}
                        >
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onEdit={onEditTask}
                                    onDelete={onDeleteTask}
                                />
                            ))}
                            {provided.placeholder}

                            {tasks.length === 0 && !snapshot.isDraggingOver && (
                                <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl m-2">
                                    <p>No tasks yet</p>
                                    <p className="text-xs mt-1">Drop tasks here</p>
                                </div>
                            )}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

export default Column;
