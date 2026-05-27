import { useEffect, useState } from "react";

import { getTasks } from "../services/taskServices";
import { createTask, deleteTask, updateTask } from "../services/taskServices";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import EditTaskModal from "../components/EditTaskModal";
import toast from "react-hot-toast";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");

  const [order, setOrder] = useState("desc");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;

  useEffect(() => {
    fetchTasks();
  }, [sortBy, order]);

  async function fetchTasks() {
    try {
      setLoading(true);

      const data = await getTasks(sortBy, order);

      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      priority,
    };

    try {
      await createTask(taskData);

      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      showCreateForm(false);

      fetchTasks();
      toast.success("Task created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task: " + error.response.data.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task: " + error.response.data.message);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      await updateTask(taskId, updatedData);

      setEditingTask(null);

      fetchTasks();
      toast.success("Task updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task: " + error.response.data.message);
    }
  };
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastTask = currentPage * tasksPerPage;

  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8f5ff] to-[#fdf2f8]">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading tasks...
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8f5ff] to-[#fdf2f8]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Create and manage your tasks efficiently
          </p>
        </div>

        {/* CREATE TASK TOGGLE */}

        <div className="mb-8">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-medium shadow-lg shadow-purple-300/40 hover:scale-[1.02] transition-all duration-200 "
          >
            {showCreateForm ? "Close Form" : "Create Task"}
          </button>
        </div>

        {/* CREATE TASK CARD */}
        {showCreateForm && (
          <form
            onSubmit={handleCreateTask}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-purple-100/40 mb-8 border border-white/40"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl">
                +
              </div>

              <h2 className="text-3xl font-semibold text-gray-900">
                Create Task
              </h2>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white/70 p-4 outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />

              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full rounded-2xl border border-gray-200 bg-white/70 p-4 outline-none resize-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* STATUS */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white/70 p-4 outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                  >
                    <option value="todo">Todo</option>

                    <option value="in-progress">In Progress</option>

                    <option value="done">Done</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white/70 p-4 outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                  >
                    <option value="low">Low</option>

                    <option value="medium">Medium</option>

                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-purple-300/40 hover:scale-[1.02] transition-all duration-200"
              >
                Create Task
              </button>
            </div>
          </form>
        )}

        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg mb-8 border border-white/40">
          <div className="flex flex-col md:flex-row gap-4">
            {/* SORT BY */}

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Sort By
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-4 outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="created_at">Created Time</option>

                <option value="priority">Priority</option>

                <option value="status">Status</option>

                <option value="title">Title</option>
              </select>
            </div>

            {/* ORDER */}
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Order
              </label>

              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-4 outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="desc">Descending</option>

                <option value="asc">Ascending</option>
              </select>
            </div>

            {/* SEARCH */}

            <div className="mb-6 flex-1">
              <label className="w-full block mb-2 text-sm font-medium text-gray-700">
                Search Tasks
              </label>

              <input
                type="text"
                placeholder="Search by task title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-4 outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>

        {/* PAGINATION */}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* PREVIOUS */}

            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-3 rounded-2xl bg-white shadow-md disabled:opacity-40"
            >
              Prev
            </button>

            {/* PAGE INFO */}

            <div className="px-5 py-3 rounded-2xl bg-white shadow-md font-medium">
              {currentPage} / {totalPages}
            </div>

            {/* NEXT */}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-3 rounded-2xl bg-white shadow-md disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* TASK LIST */}
        <div className="space-y-6">
          {currentTasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
              <p className="text-gray-500 text-lg">No tasks yet.</p>
            </div>
          ) : (
            currentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onEdit={setEditingTask}
              />
            ))
          )}
        </div>
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onUpdate={handleUpdateTask}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
