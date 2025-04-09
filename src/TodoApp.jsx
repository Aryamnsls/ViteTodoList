import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 🌗 Dark Mode Toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // 🔔 Alarm Checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toISOString().slice(0, 16);

      tasks.forEach((t) => {
        if (t.time === currentTime && !t.notified) {
          alert(`⏰ Reminder: ${t.text}`);
          const audio = new Audio("/alarm.mp3");
          audio.play();

          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === t.id ? { ...task, notified: true } : task
            )
          );
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  // ➕ Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      time: alarmTime,
      done: false,
      notified: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setAlarmTime("");
  };

  // ✅ Toggle Done
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // ❌ Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // 📜 Yesterday's Completed Tasks
  const getYesterdayTasks = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return tasks.filter((t) => {
      const taskDate = new Date(t.time);
      return t.done && taskDate.toDateString() === yesterday.toDateString();
    });
  };

  // 📅 Tomorrow's Tasks
  const getTomorrowTasks = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tasks.filter((t) => {
      const taskDate = new Date(t.time);
      return !t.done && taskDate.toDateString() === tomorrow.toDateString();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontStyle: 'italic', textDecoration: 'underline' }} className="text-3xl font-bold">
  🎯 Aryaman SDE-1 TodoList
</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
          />
          <input
            type="datetime-local"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="px-2 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center p-2 rounded bg-white dark:bg-gray-800 shadow"
            >
              <div className="flex flex-col flex-grow">
                <span className={t.done ? "line-through text-gray-500" : ""}>
                  {t.text}
                </span>
                {t.time && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ⏰{" "}
                    {new Date(t.time).toLocaleString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => toggleComplete(t.id)}
                  className="text-green-500"
                >
                  ✅
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Tomorrow's Tasks */}
        <h2 className="text-xl font-semibold mt-8 mb-2">📅 Tasks for Tomorrow</h2>
        <ul className="space-y-2">
          {getTomorrowTasks().length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400">No tasks scheduled for tomorrow.</li>
          ) : (
            getTomorrowTasks().map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-2 rounded bg-yellow-100 dark:bg-yellow-900"
              >
                <span>{t.text}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ⏰ {new Date(t.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))
          )}
        </ul>

        {/* Yesterday's Completed Tasks */}
        <h2 className="text-xl font-semibold mt-8 mb-2">📜 History (Completed Yesterday)</h2>
        <ul className="space-y-2">
          {getYesterdayTasks().length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400">No tasks completed yesterday.</li>
          ) : (
            getYesterdayTasks().map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-2 rounded bg-green-100 dark:bg-green-900"
              >
                <span className="line-through">{t.text}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ✅ Completed
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

