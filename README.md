# React + Vite

Sure! Here's a **beautiful, emoji-enhanced step-by-step guide** to building a feature-rich **React + Vite + Tailwind CSS TodoList** app with:

- 🔔 Alarm Setup  
- 📈 Progress Tracking  
- 📅 Yesterday’s Task Summary  
- 🗓️ Tomorrow’s Plan  
- 🌙/☀️ Dark and Light Modes  

---

### 🚀 1. **Project Setup with Vite & Tailwind CSS**
```bash
npm create vite@latest vite-todo --template react
cd vite-todo
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**In `tailwind.config.js`**:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

**In `index.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 🧱 2. **Basic Todo Structure**

Create a `TodoApp.jsx` component:

```jsx
import React, { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, done: false, date: new Date() }]);
      setInput("");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Add your task..."
      />
      <button
        onClick={addTodo}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        ➕ Add Task
      </button>

      <ul className="mt-4 space-y-2">
        {todos.map((todo, idx) => (
          <li key={idx} className="flex justify-between bg-gray-100 p-2 rounded">
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 🔔 3. **Setting Up Alarm for Tasks**

Add a time picker and alarm trigger:
```jsx
<input
  type="time"
  onChange={(e) => setAlarm(e.target.value)}
  className="border p-2 rounded mt-2"
/>
```

Use `useEffect()` to trigger alert:
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    if (currentTime === alarm) {
      alert("⏰ It's time for your task!");
    }
  }, 60000);

  return () => clearInterval(interval);
}, [alarm]);
```

---

### 📈 4. **Track Your Progress**

```jsx
const completedTasks = todos.filter((todo) => todo.done).length;
const totalTasks = todos.length;
const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

<p className="mt-4">📊 Progress: {progress}%</p>
```

Add checkbox for task completion:
```jsx
<input
  type="checkbox"
  checked={todo.done}
  onChange={() => toggleDone(idx)}
/>
```

---

### 📅 5. **Track What You Did Yesterday**

```jsx
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const yTasks = todos.filter(todo => {
  const date = new Date(todo.date);
  return date.toDateString() === yesterday.toDateString();
});

<p className="mt-4">📋 Tasks Done Yesterday: {yTasks.length}</p>
```

---

### 🗓️ 6. **Plan for Tomorrow**

```jsx
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const tomorrowTasks = todos.filter(todo => {
  const date = new Date(todo.date);
  return date.toDateString() === tomorrow.toDateString();
});

<p className="mt-4">📝 Planned for Tomorrow: {tomorrowTasks.length}</p>
```

---

### 🌙 7. **Dark Mode / Light Mode Toggle**

In `App.jsx`:
```jsx
const [darkMode, setDarkMode] = useState(false);

<div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-2 rounded bg-indigo-500 text-white"
  >
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
  <TodoApp />
</div>
```

Tailwind will handle the theme via conditional classes 🎨

---

### ✅ Final Touch

Organize everything in components:
- `TodoApp.jsx`
- `ProgressTracker.jsx`
- `AlarmSetter.jsx`
- `DarkModeToggle.jsx`

You now have a **beautifully responsive**, full-featured **TodoList app** with:
- ⏰ Task Reminders  
- 📊 Live Progress  
- 📅 History and Planning  
- 🌓 Clean Dark/Light Theme  

Let me know if you'd like the full source code zipped or deployed example!
