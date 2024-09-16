import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Importiere PropTypes

/* 

Ich verwende die Popups um die Daten, dier der benutzer eingint zu verwalten und weiterführen 
mit Event-Handler werde ich die Öffung und Scliesung Operationen handelen

*/

function Content() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    text: "",
    status: "",
    assignedUsers: [], // Mehrere Benutzer
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  // Für die Anzeige des vollständigen Texts
  const [expandedTaskId, setExpandedTaskId] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const maxTitleLength = 20;

  useEffect(() => {
    // code wird nur ein Mal ausgeführt
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/projektarbeits/documents"
        );
        // konvertiert die Antwort in ein JSON-Objekt
        const data = await response.json();
        // aktualisiert den Zustand der Komponente
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Users abrufen
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/documents");
        const data = await response.json();
        /* console.log(data);  */
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    

    fetchUsers();
  }, []);

  
  const fetchUsersByIds = async (userIds) => {
    try {
      const response = await fetch("http://localhost:8080/users/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds }),
      });
  
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
  
      const usersData = await response.json();
      return usersData.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };
  

  const addTask = async (task) => {
    try {
      const response = await fetch(
        "http://localhost:8080/projektarbeits/documents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: task }),
        }
      );
            
      if (!response.ok) {
        throw new Error("Error adding task");
      }
      // konvertiert den Antwortinhalt in ein JavaScript-Objekt
      const newTask = await response.json();
      // aktualisiert den Zustand der Komponente mit dem neuen Array, das die vorhandenen Aufgaben plus die neu hinzugefügte Aufgabe enthält
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/projektarbeits/documents/${taskId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        console.log("Task deleted successfully");
      } else {
        throw new Error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
  /* Snippet für Verwaltung popups und Edit Funktion */
  const handlePopupSubmit = () => {
    // Überprüfung auf Fehler (z. B. Titel zu lang)
    if (popupData.title.length > maxTitleLength) {
      setErrorMessage(`Der Titel darf ${maxTitleLength} Zeichen nicht überschreiten.`);
      return;
    }
    setErrorMessage("");
  
    if (selectedTaskId) {
      const updatedTask = { 
        id: selectedTaskId,
        content: { 
          title: popupData.title, 
          text: popupData.text, 
          status: popupData.status 
        }
      };
  
      fetch(`http://localhost:8080/projektarbeits/documents/${selectedTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      })
        .then((response) => response.json())
        .then((data) => {
          // Aktualisiere die Aufgabenliste im State
          const updatedTasks = tasks.map((task) =>
            task.id === selectedTaskId
              ? { ...task, content: updatedTask.content } 
              : task
          );
          setTasks(updatedTasks);
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      // Füge neuen Task hinzu, wenn keine ID ausgewählt ist
      addTask(popupData);
    }
  
    // Popup zurücksetzen
    setShowPopup(false);
    setPopupData({ title: "", text: "", status: "", assignedUsers: [] });
    setSelectedTaskId(null);
  };

  /* Snippet für User Zuwesiung und Filtering */
  const handleAssignUsers = async (taskId, userIds) => {
    try {
      const response = await fetch(`http://localhost:8080/taskAssignments/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: { taskId, userIds } }),
      });
  
      if (!response.ok) {
        throw new Error("Error assigning users");
      }
  
      // Aktualisiere die Aufgabenliste, nachdem die Zuweisungen gespeichert wurden
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, content: { ...task.content, assignedUsers: userIds } }
          : task
      );
      setTasks(updatedTasks);
      setShowAssignPopup(false); // Schließe das Zuweisungs-Popup
    } catch (error) {
      console.error("Error assigning users:", error);
    }
  };
  
  const handleViewAssignedUsers = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/taskAssignments/documents${taskId}`);
      const text = await response.text(); 
      console.log('Raw response:', text); 
  
      const taskAssignment = JSON.parse(text); 
      const users = await fetchUsersByIds(taskAssignment.content.userIds);
      setAssignedUsers(users);
    } catch (error) {
      console.error("Error viewing assigned users:", error);
    }
  };
  
  

  const AssignedUsersList = ({ users }) => (
    <div>
      <h3>Zugewiesene Benutzer:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}> {user.firstName} {user.lastName} ({user.role})</li>
        ))}
      </ul>
    </div>
  );
  
  AssignedUsersList.propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  


  const handleUserSelection = (userId) => {
    if (popupData.assignedUsers.includes(userId)) {
      setPopupData({
        ...popupData,
        assignedUsers: popupData.assignedUsers.filter((id) => id !== userId),
      });
    } else {
      setPopupData({
        ...popupData,
        assignedUsers: [...popupData.assignedUsers, userId],
      });
    }
  };








  /* Snippet für text checking und Expantion */
  const getPreviewText = (text) => {
    const previewText = text.length > 40 ? text.slice(0, 40) + "..." : text;
    
    if (text.length > 40) return previewText;
    
    return text;
  };

  const handleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };



  return (
    <>
      <div className="dashboard">
        <div className="column">
          <h2>To Do</h2>
          {/* ----------------------------------- */}
          {tasks
            .filter(
              (task) =>
                task.content &&
                task.content.title &&
                task.content.status === "To Do"
            )
            .map((task) => (
              <div className="ticket" key={task.id}>
                <h3>{task.content.title || "No Title"}</h3>
                <p>
                  {expandedTaskId === task.id
                    ? task.content.text || "No Description"
                    : getPreviewText(task.content.text || "No Description", task.content.title || "No Title")}
                </p>
                {task.content.text && task.content.text.length > 30 && (
                  <button onClick={() => handleExpand(task.id)}>
                    {expandedTaskId === task.id ? "Collapse" : "Expand"}
                  </button>
                )}
                {/* ----------------------------------- */}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                {/* ----------------------------------- */}
                <div className="two-buttons">
                <button
                    onClick={() => {
                      setPopupData({ ...popupData, assignedUsers: task.content.assignedUsers || [] });
                      setSelectedTaskId(task.id);
                      setShowAssignPopup(true);
                    }}
                  >
                    Assign Users
                  </button>
                    {/* ----------------------------------- */}
                <button
                  onClick={() => {
                    setPopupData(task.content);
                    setSelectedTaskId(task.id);
                    setShowPopup(true);
                  }}
                >
                  Edit
                </button>
                
                </div>
                <div>
                <button onClick={() => handleViewAssignedUsers(task.id)}>View Assigned Users</button>
            <AssignedUsersList users={assignedUsers} />
           </div>
              </div>
            ))}
            {/* ----------------------------------- */}
          <button
            onClick={() => {
              setPopupData({ title: "", text: "", status: "To Do" });
              setShowPopup(true);
            }}
          >
            Add Task
          </button>
        </div>

        <div className="column">
          <h2>In Progress</h2>
          {tasks
            .filter(
              (task) => task.content && task.content.status === "In Progress"
            )
            .map((task) => (
              <div className="ticket" key={task.id}>
                <h3>{task.content.title || "No Title"}</h3>
                <p>
                  {expandedTaskId === task.id
                    ? task.content.text || "No Description"
                    : getPreviewText(task.content.text || "No Description", task.content.title || "No Title")}
                </p>
                {task.content.text && task.content.text.length > 30 && (
                  <button onClick={() => handleExpand(task.id)}>
                    {expandedTaskId === task.id ? "Collapse" : "Expand"}
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <div className="two-buttons">
                  <button>Assign</button>
                <button
                  onClick={() => {
                    setPopupData(task.content);
                    setSelectedTaskId(task.id);
                    setShowPopup(true);
                  }}
                >
                  Edit
                </button>
                </div> 
              </div>
            ))}
          <button
            onClick={() => {
              setPopupData({ title: "", text: "", status: "In Progress" });
              setShowPopup(true);
            }}
          >
            Add Task
          </button> 
        </div>

        <div className="column">
          <h2>Done</h2>
          {tasks
            .filter((task) => task.content && task.content.status === "Done")
            .map((task) => (
              <div className="ticket" key={task.id}>
                <h3>{task.content.title || "No Title"}</h3>
                <p>
                  {expandedTaskId === task.id
                    ? task.content.text || "No Description"
                    : getPreviewText(task.content.text || "No Description", task.content.title || "No Title")}
                </p>
                {task.content.text && task.content.text.length > 30 && (
                  <button onClick={() => handleExpand(task.id)}>
                    {expandedTaskId === task.id ? "Collapse" : "Expand"}
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <div className="two-buttons">
                  <button>Assign</button>
                <button
                  onClick={() => {
                    setPopupData(task.content);
                    setSelectedTaskId(task.id);
                    setShowPopup(true);
                  }}
                >
                  Edit
                </button>
                </div> 
              </div>
            ))}
          <button
            onClick={() => {
              setPopupData({ title: "", text: "", status: "Done" });
              setShowPopup(true);
            }}
          >
            Add Task
          </button>
        </div>

        {/* Popup zum Hinzufügen/Bearbeiten von Aufgaben */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>{selectedTaskId ? "Edit Task" : "Add New Task"}</h3>
              <input
                type="text"
                placeholder="Title"
                value={popupData.title}
                onChange={(e) =>
                  setPopupData({ ...popupData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={popupData.text}
                onChange={(e) =>
                  setPopupData({ ...popupData, text: e.target.value })
                }
              />
              <select
                value={popupData.status}
                onChange={(e) =>
                  setPopupData({ ...popupData, status: e.target.value })
                }
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              {errorMessage && <div style={{color: 'red', marginTop: '10px', fontSize: '14px', fontWeight: 'bold'}}>{errorMessage}</div>}
              <button onClick={handlePopupSubmit}>
                {selectedTaskId ? "Save Changes" : "Add Task"}
              </button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Popup zum Zuweisen von Benutzern */}
        {showAssignPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Assign Users to Task</h3>
              <select
                value={popupData.assignedUsers}
                onChange={(e) => handleUserSelection(e.target.value)}
                multiple
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.content.firstName} {user.content.lastName} - {user.content.role}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAssignUsers(selectedTaskId, popupData.assignedUsers)}
              >
                Save Assignments
              </button>
              <button onClick={() => setShowAssignPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
