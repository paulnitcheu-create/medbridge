import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://ton-backend.onrender.com/users/1/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">🌉 MEDBRIDGE</h1>
      <h2 className="text-xl mt-4">Planificateur de tâches</h2>
      <ul className="mt-4 space-y-2">
        {tasks.map((t, idx) => (
          <li
            key={idx}
            className="p-4 border rounded-lg shadow bg-gray-50 flex justify-between"
          >
            <span>{t.titre}</span>
            <span className="text-sm text-gray-500">{t.statut}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;