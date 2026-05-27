function TaskCard({ task, onDelete, onEdit }) {
  const statusColors = {
    todo: "bg-yellow-100 text-yellow-700",

    "in-progress": "bg-blue-100 text-blue-700",

    done: "bg-green-100 text-green-700",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-700",

    medium: "bg-orange-100 text-orange-700",

    high: "bg-red-100 text-red-700",
  };
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-white/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:translate-y-[-2px] transition-all duration-200">
      {/* LEFT */}
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl">
          📋
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{task.title}</h2>

          <p className="text-gray-500 mt-1 text-lg">{task.description}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${statusColors[task.status]}`}
        >
          {task.status}
        </span>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        {/* Edit Button*/}
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
