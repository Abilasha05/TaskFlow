import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] =
  useState("Newest");
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Study");
  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 const addTask = () => {
  if (!title.trim()) return;

 if (!dueDate) {
  alert("Please select a due date");
  return;
}

const today = new Date().toISOString().split("T")[0];

if (dueDate < today) {
  alert("Past dates are not allowed");
  return;
}

  

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        priority,
        dueDate,
        category,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTasks();
        setTitle("");
      });
  };

  const completeTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => fetchTasks());
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchTasks());
  };

  const saveTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editText,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTasks();
        setEditId(null);
        setEditText("");
      });
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
      <h1>TaskFlow Dashboard</h1>
      
      <h3>
  Welcome,{" "}
  {JSON.parse(localStorage.getItem("user"))
    ?.name}
  👋
</h3>
     <button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }}
>
  Logout
</button>
      <div className="progress-section">
  <h3>Progress</h3>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: `${
          totalTasks
            ? (completedTasks / totalTasks) * 100
            : 0
        }%`,
      }}
    ></div>
  </div>

  <p>
    {totalTasks
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0}
    % Completed
  </p>
</div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="suggestions">
            {tasks
              .filter((task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, 5)
              .map((task) => (
                <div
                  key={task.id}
                  className="suggestion-item"
                  onClick={() => setSearch(task.title)}
                >
                  {task.title}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="input-section">
  <input
    type="text"
    placeholder="Enter task..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
        />
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Study">📚 Study</option>
  <option value="Work">💼 Work</option>
  <option value="Personal">🏠 Personal</option>
</select>
      

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="High">🔴 High</option>
    <option value="Medium">🟡 Medium</option>
    <option value="Low">🟢 Low</option>
     </select>
    <input
  type="date"
  value={dueDate}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setDueDate(e.target.value)}
/>

  <button className="add-btn" onClick={addTask}>
    Add Task
  </button>
</div>
     <h3>Filter by Status</h3>

<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="All">All</option>
  <option value="Pending">Pending</option>
  <option value="Completed">Completed</option>
</select>
      <h3>Filter by Category</h3>

<select
  value={categoryFilter}
  onChange={(e) =>
    setCategoryFilter(e.target.value)
  }
>
  <option value="All">All</option>
  <option value="Study">Study</option>
  <option value="Work">Work</option>
  <option value="Personal">Personal</option>
      </select>
      
    <h3>Sort By</h3>
      <select
        
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
>
  <option value="Newest">
    Newest
  </option>

  <option value="Oldest">
    Oldest
  </option>

  <option value="High Priority">
    High Priority
  </option>

  <option value="Low Priority">
    Low Priority
  </option>
</select>
      <h2>My Tasks</h2>

      {tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((task) =>
    filter === "All"
      ? true
      : task.status === filter
  )
  .filter((task) =>
    categoryFilter === "All"
      ? true
      : task.category === categoryFilter
  )
  .map((task) => (
          <div className="task-card" key={task.id}>
            {editId === task.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <>
  <div className="task-title">{task.title}</div>

  <p
    className={`priority-${(
      task.priority || "medium"
    ).toLowerCase()}`}
  >
    {task.priority || "Medium"} Priority
  </p>
 <p className="due-date">
  📅 {task.dueDate || "No Due Date"}
</p>
<p className="category">
  {task.category || "Study"}
</p>
{task.dueDate &&
 new Date(task.dueDate) < new Date() &&
 task.status !== "Completed" && (
  <p className="overdue">
    ⚠️ Overdue
  </p>
)}
</>
            )}

            <p
              className={
                task.status === "Completed"
                  ? "completed"
                  : "pending"
              }
            >
              {task.status}
            </p>

            <div className="btn-group">
              {editId === task.id ? (
                <button
                  className="save-btn"
                  onClick={() => saveTask(task.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditId(task.id);
                    setEditText(task.title);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="complete-btn"
                onClick={() => completeTask(task.id)}
              >
                Complete
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;