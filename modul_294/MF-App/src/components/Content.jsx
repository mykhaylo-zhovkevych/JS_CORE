import React, { useState, useEffect } from 'react';

function Content({}) {

    const [tasks, setTasks] = useState([]);
    const [currentColumn, setCurrentColumn] = useState('To Do');

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch('http://localhost:8080/{projektarbeits}/documents');
            const data = await response.json();
            setTasks(data);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
      
        fetchTasks();
      }, []);

      const addTask = async (task) => {
        try {
            const response = await fetch('http://localhost:8080/{projektarbeits}/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: task })
            });
    
            if (!response.ok) {
                throw new Error('Error adding task');
            }
    
            const newTask = await response.json();
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };


    return ( 
        <>
            <div className="dashboard">
            <div className="column">
                <h2>To Do</h2>
                {tasks.filter((task) => task.content && task.content.title && task.content.status === 'To Do').map((task) => (
                    <div className="ticket" key={task._id}>
                        <h3>{task.content.title || 'No Title'}</h3>
                        <p>{task.content.text || 'No Description'}</p>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </div>
                ))}
                <button onClick={() => addTask({ title: 'Hallo', text: '', status: 'To Do' })}>Add</button>
            </div>

            <div className="column">
                <h2>In Progress</h2>
                {tasks.filter((task) => task.content && task.content.status === 'In Progress').map((task) => (
                    <div className="ticket" key={task._id}>
                        <h3>{task.content.title || 'No Title'}</h3>
                        <p>{task.content.text || 'No Description'}</p>
                    </div>
                ))}
                <button onClick={() => addTask({ title: 'Neue Aufgabe', text: '', status: 'In Progress' })}>Add</button>
            </div>

            <div className="column">
                <h2>Done</h2>
                {tasks.filter((task) => task.content && task.content.status === 'Done').map((task) => (
                    <div className="ticket" key={task._id}>
                        <h3>{task.content.title || 'No Title'}</h3>
                        <p>{task.content.text || 'No Description'}</p>
                    </div>
                ))}
                <button onClick={() => addTask({ title: 'Neue Aufgabe', text: '', status: 'Done' })}>Add</button>
            </div>
            </div>
        </>
    );
}

export default Content;
