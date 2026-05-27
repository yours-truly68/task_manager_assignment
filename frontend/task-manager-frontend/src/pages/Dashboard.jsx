import { useEffect, useState } from "react";

import { getTasks } from "../services/taskServices";
import { createTask } from "../services/taskServices";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status: "todo",
      priority: "medium",
    };

    try {
      await createTask(taskData);

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <form
          onSubmit={handleCreateTask}
          className="bg-white p-6 rounded-xl shadow-sm mb-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">Create Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Create Task
          </button>
        </form>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <p className="text-gray-500">No tasks yet.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="border p-4 rounded-lg bg-white shadow-sm"
              >
                <h2 className="font-semibold">{task.title}</h2>

                <p className="text-gray-600">{task.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
