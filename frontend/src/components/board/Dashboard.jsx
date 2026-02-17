import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Navbar from '../layout/Navbar';
import Column from './Column';
import TaskModal from '../modals/TaskModal';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [selectedColumnId, setSelectedColumnId] = useState(null);
    const [newColumnName, setNewColumnName] = useState('');
    const [showNewColumnInput, setShowNewColumnInput] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [columnsRes, tasksRes] = await Promise.all([
                api.get('/columns'),
                api.get('/tasks'),
            ]);

            setColumns(columnsRes.data);
            setTasks(tasksRes.data);
        } catch (error) {
            toast.error('Failed to load data');
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const taskId = parseInt(draggableId);
        const sourceColumnId = parseInt(source.droppableId);
        const destColumnId = parseInt(destination.droppableId);

        // Optimistic update
        const updatedTasks = [...tasks];
        const taskIndex = updatedTasks.findIndex((t) => t.id === taskId);
        const task = updatedTasks[taskIndex];

        task.column_id = destColumnId;
        task.position = destination.index;

        setTasks(updatedTasks);

        // Update backend
        try {
            await api.put(`/tasks/${taskId}`, {
                column_id: destColumnId,
                position: destination.index,
            });
        } catch (error) {
            toast.error('Failed to move task');
            fetchData(); // Revert on error
        }
    };

    const handleAddTask = (columnId) => {
        setSelectedColumnId(columnId);
        setEditingTask(null);
        setModalOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setSelectedColumnId(task.column_id);
        setModalOpen(true);
    };

    const handleSaveTask = async (formData) => {
        try {
            if (editingTask) {
                // Update existing task
                const res = await api.put(`/tasks/${editingTask.id}`, formData);
                setTasks(tasks.map((t) => (t.id === editingTask.id ? res.data : t)));
                toast.success('Task updated successfully');
            } else {
                // Create new task
                const taskData = {
                    ...formData,
                    column_id: selectedColumnId || formData.column_id,
                };
                const res = await api.post('/tasks', taskData);
                setTasks([...tasks, res.data]);
                toast.success('Task created successfully');
            }
        } catch (error) {
            toast.error(editingTask ? 'Failed to update task' : 'Failed to create task');
            console.error('Save error:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((t) => t.id !== taskId));
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const handleAddColumn = async () => {
        if (!newColumnName.trim()) {
            toast.error('Column name is required');
            return;
        }

        try {
            const res = await api.post('/columns', { name: newColumnName });
            setColumns([...columns, res.data]);
            setNewColumnName('');
            setShowNewColumnInput(false);
            toast.success('Column created successfully');
        } catch (error) {
            toast.error('Failed to create column');
        }
    };

    const handleDeleteColumn = async (columnId) => {
        const columnTasks = tasks.filter((t) => t.column_id === columnId);

        if (columnTasks.length > 0) {
            toast.error('Cannot delete column with tasks. Please move or delete tasks first.');
            return;
        }

        if (!confirm('Are you sure you want to delete this column?')) return;

        try {
            await api.delete(`/columns/${columnId}`);
            setColumns(columns.filter((c) => c.id !== columnId));
            toast.success('Column deleted successfully');
        } catch (error) {
            toast.error('Failed to delete column');
        }
    };

    const getTasksByColumn = (columnId) => {
        return tasks.filter((task) => task.column_id === columnId).sort((a, b) => a.position - b.position);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-10">
            <Navbar />

            <div className="px-6">
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex items-center justify-between glass-panel p-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage tasks efficiently with your team</p>
                        </div>
                        {!showNewColumnInput ? (
                            <button
                                onClick={() => setShowNewColumnInput(true)}
                                className="btn-primary"
                            >
                                + Add Column
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newColumnName}
                                    onChange={(e) => setNewColumnName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
                                    placeholder="Column name"
                                    className="input-field"
                                    autoFocus
                                />
                                <button onClick={handleAddColumn} className="btn-primary">
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setShowNewColumnInput(false);
                                        setNewColumnName('');
                                    }}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="overflow-x-auto pb-4">
                        <div className="flex gap-6 min-w-max">
                            {columns.map((column) => (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={getTasksByColumn(column.id)}
                                    onAddTask={handleAddTask}
                                    onEditTask={handleEditTask}
                                    onDeleteTask={handleDeleteTask}
                                    onDeleteColumn={handleDeleteColumn}
                                />
                            ))}

                            {columns.length === 0 && (
                                <div className="flex items-center justify-center w-full h-64 text-gray-400">
                                    <div className="text-center">
                                        <p className="text-lg font-medium">No columns yet</p>
                                        <p className="text-sm mt-2">Click "Add Column" to get started</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </DragDropContext>
            </div>

            <TaskModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                    setSelectedColumnId(null);
                }}
                task={editingTask}
                columns={columns}
                onSave={handleSaveTask}
            />
        </div>
    );
};

export default Dashboard;
