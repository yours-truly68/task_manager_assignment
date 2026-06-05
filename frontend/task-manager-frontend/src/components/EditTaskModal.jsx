import { useState } from "react";

function EditTaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);

  const [description, setDescription] = useState(task.description);

  const [status, setStatus] = useState(task.status);

  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(task._id, {
      title,
      description,
      status,
      priority,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Edit Task</h2>

          <button onClick={onClose} className="text-gray-400 text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none focus:ring-2 focus:ring-purple-300"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-gray-200 p-4 outline-none"
            >
              <option value="todo">Todo</option>

              <option value="in_progress">In Progress</option>

              <option value="done">Done</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-2xl border border-gray-200 p-4 outline-none"
            >
              <option value="low">Low</option>

              <option value="medium">Medium</option>

              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
