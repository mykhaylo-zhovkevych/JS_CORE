import { useState, useEffect } from 'react';

/* 

Ich verwende die Popups um die Daten, dier der benutzer eingint zu verwalten und weiterführen 
mit Event-Handler werde ich die Öffung und Scliesung Operationen handelen

*/

function Content() {
    const [tasks, setTasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', text: '', status: '' });
    const [selectedTaskId, setSelectedTaskId] = useState(null);



    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8080/projektarbeits/documents');
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
            const response = await fetch('http://localhost:8080/projektarbeits/documents', {
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

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8080/projektarbeits/documents/${taskId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
    
            if (response.ok) {
                console.log('Task deleted successfully');
                const updatedTasks = tasks.filter((task) => task.id !== taskId);
                
                setTasks(updatedTasks);
            } else {
                throw new Error('Error deleting task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    


    const handlePopupSubmit = () => {
        if (selectedTaskId) {
            // Update existing task
            const updatedTask = { ...popupData };
            // Send update request
            fetch(`http://localhost:8080/projektarbeits/documents/${selectedTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: updatedTask })
            })
            // 'data' is declared but its value is never read.ts(6133) 'data' is defined but never used.
                .then(response => response.json())
                .then(data => {
                    const updatedTasks = tasks.map(task =>
                        task.id === selectedTaskId ? { ...task, content: updatedTask } : task
                    );
                    setTasks(updatedTasks);
                })
                .catch(error => console.error('Error updating task:', error));
        } else {
            // Add new task
            addTask(popupData);
        }

        setShowPopup(false);
        setPopupData({ title: '', text: '', status: '' });
        setSelectedTaskId(null);
    };

    return (
        <>
            <div className="dashboard">
                <div className="column">
                    <h2>To Do</h2>
                    {tasks.filter((task) => task.content && task.content.title && task.content.status === 'To Do').map((task) => (
                        <div className="ticket" key={task.id}>
                            <h3>{task.content.title || 'No Title'}</h3>
                            <p>{task.content.text || 'No Description'}</p>

                            <button onClick={() => deleteTask(task.id)}>Delete</button>

                            <button onClick={() => {
                                setPopupData(task.content);
                                setSelectedTaskId(task.id);
                                setShowPopup(true);
                            }}>Edit</button>
                            
                        </div>
                    ))}
                    <button onClick={() => {
                        setPopupData({ title: '', text: '', status: 'To Do' });
                        setShowPopup(true);
                    }}>Add Task</button>
                </div>

                <div className="column">
                    <h2>In Progress</h2>
                    {tasks.filter((task) => task.content && task.content.status === 'In Progress').map((task) => (
                        <div className="ticket" key={task.id}>
                            <h3>{task.content.title || 'No Title'}</h3>
                            <p>{task.content.text || 'No Description'}</p>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                            <button onClick={() => {
                                setPopupData(task.content);
                                setSelectedTaskId(task.id);
                                setShowPopup(true);
                            }}>Edit</button>
                        </div>
                    ))}
                    <button onClick={() => {
                        setPopupData({ title: '', text: '', status: 'In Progress' });
                        setShowPopup(true);
                    }}>Add Task</button>
                </div>

                <div className="column">
                    <h2>Done</h2>
                    {tasks.filter((task) => task.content && task.content.status === 'Done').map((task) => (
                        <div className="ticket" key={task.id}>
                            <h3>{task.content.title || 'No Title'}</h3>
                            <p>{task.content.text || 'No Description'}</p>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                            <button onClick={() => {
                                setPopupData(task.content);
                                setSelectedTaskId(task.id);
                                setShowPopup(true);
                            }}>Edit</button>
                        </div>
                    ))}
                    <button onClick={() => {
                        setPopupData({ title: '', text: '', status: 'Done' });
                        setShowPopup(true);
                    }}>Add Task</button>
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>{selectedTaskId ? 'Edit Task' : 'Add New Task'}</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={popupData.title}
                            onChange={(e) => setPopupData({ ...popupData, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            value={popupData.text}
                            onChange={(e) => setPopupData({ ...popupData, text: e.target.value })}
                        />
                        <select
                            value={popupData.status}
                            onChange={(e) => setPopupData({ ...popupData, status: e.target.value })}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <button onClick={handlePopupSubmit}>Save</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Content;
