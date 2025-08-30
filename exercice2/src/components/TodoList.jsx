import React, { useState } from 'react';

function TodoList() {
  // État initial avec 3 tâches dont une terminée
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
    <div>
      <h1>Liste de tâches</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Nouvelle tâche"
          maxLength={50}
        />
        <button type="submit">Ajouter</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {allTasksCompleted ? (
        <p>Toutes les tâches sont terminées !</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ 
                textDecoration: task.completed ? 'line-through' : 'none' 
              }}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;