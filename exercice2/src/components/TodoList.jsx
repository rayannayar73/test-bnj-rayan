import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "test1", completed: false },
    { id: 2, text: "test2", completed: true },
    { id: 3, text: "test3", completed: false }
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérification tâche vide
    if (!newTaskText.trim()) {
      setError("La tâche ne peut pas être vide");
      return;
    }

    // Vérification longueur
    if (newTaskText.length > 50) {
      setError("La tâche ne peut pas dépasser 50 caractères");
      return;
    }

    // Vérification doublon
    if (tasks.some(task => task.text.toLowerCase() === newTaskText.trim().toLowerCase())) {
      setError("Cette tâche existe déjà");
      return;
    }

    // Ajout de la nouvelle tâche
    setTasks([...tasks, {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false
    }]);

    // Réinitialisation
    setNewTaskText("");
    setError("");
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  return (
    <div className="todo-container">
      <h1 className="todo-header">Ma Liste de Tâches</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Ajouter une nouvelle tâche..."
          maxLength={50}
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Ajouter
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {allTasksCompleted ? (
        <div className="completion-message">
          Toutes les tâches sont terminées ! 🎉
        </div>
      ) : (
        <ul className="todo-list">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`todo-item ${task.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{task.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;