import { useState, useEffect } from "react";

/* 
Ich verwende die Popups um die Daten, dier der benutzer eingint zu verwalten und weiterführen 
mit Event-Handler werde ich die Öffung und Scliesung Operationen handelen
*/

function Content() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [error, setError] = useState(null);
  const [popupData, setPopupData] = useState({
    title: "",
    text: "",
    status: "",
    assignedUsers: [],
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

    /* Für die Users Erscheinung bei der Window */
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/documents");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  // Funktion zum Löschen von Tickts
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/projektarbeits/documents/${taskId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        /* console.log("Task deleted successfully"); */
      } else {
        throw new Error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Funktion zum Bearbeiten von Tickts
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:8080/projektarbeits/documents/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren der Aufgabe");
      }

      const updatedTasks = tasks.map((task) =>
        task.id === selectedTaskId
          ? { ...task, content: updatedTask.content }
          : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("");
    }
  };

  const handleAddTaskClick = (status) => {
    setPopupData({ title: "", text: "", status: status });
    setSelectedTaskId(null);
    setShowPopup(true);
  };

  // Funktion zum Hinzufügen eines Tasks
  const handleAddTask = async () => {
    if (!popupData.title || !popupData.text) {
      setErrorMessage("Titel und Beschreibung sind erforderlich.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/projektarbeits/documents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: popupData }),
        }
      );
      if (!response.ok) {
        throw new Error("Error adding task");
      }

      // Aktualisieren die Tasks
      const newTask = await response.json();
      setTasks([...tasks, newTask]);

      setShowPopup(true);
      setPopupData({ title: "", text: "", status, assignedUsers: [] });
    } catch (error) {
      setErrorMessage("");
    }
  };

  // Funktion zum Bearbeiten eines Tasks
  const handleUpdateTask = async () => {
    if (popupData.title.length > 20) {
      setErrorMessage("Der Titel muss weniger als 20 Zeichen enthalten.");
      return;
    }

    setErrorMessage("");

    const updatedTask = {
      id: selectedTaskId,
      content: {
        title: popupData.title,
        text: popupData.text,
        status: popupData.status,
        assignedUsers: popupData.assignedUsers,
      },
    };

    try {
      const updatedTaskData = await updateTask(selectedTaskId, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTaskId
          ? { ...task, content: updatedTaskData.content }
          : task
      );
      setTasks(updatedTasks);
      setShowPopup(true);
      setPopupData({ title: "", text: "", status, assignedUsers: [] });
      setSelectedTaskId(null);
    } catch (error) {
      setErrorMessage("");
    }
  };

  /* Snippet für User Zuwesing und Filtering */
  const handleAssignUsers = async (taskId, userIds) => {
    try {
      const response = await fetch(
        `http://localhost:8080/taskAssignments/documents`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: { taskId, userIds } }),
        }
      );

      if (!response.ok) throw new Error("Error assigning users");

      /* nicht brauche das */
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, content: { ...task.content, assignedUsers: userIds } }
          : task
      );
      setTasks(updatedTasks);

      setShowAssignPopup(false);
      setPopupData({ title: "", text: "", status, assignedUsers: [] });
      setSelectedTaskId(null);
    } catch (error) {
      console.error("Error assigning users:", error);
    }
  };

  /* Diese Funktion wird verwendet, um Benutzer für eine Aufgabe auszuwählen oder abzuwählen. 
  Wenn ein Benutzer ausgewählt wird, wird seine ID zur Liste der assignedUsers im popupData hinzugefügt */
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

  /* Diese Funktion wird verwendet, um den vollständigen Text einer Aufgabe anzuzeigen oder zu verbergen */
  const handleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  /* ------------------------------------------------------------------ */

  const findTaskAssignmentByTaskId = async (taskId) => {
    try {
      // Schritt 1: Daten abrufen
      const response = await fetch(
        `http://localhost:8080/taskAssignments/documents?taskId=${taskId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      let documents;
      try {
        // Array von Dokumenten
        documents = JSON.parse(text);
      } catch (error) {
        throw new Error("Error parsing JSON response: " + error.message);
      }

      /*   console.log(documents); */

      if (documents.length === 0) {
        setAssignedUsers([]);
        return;
      }

      // Schritt 2: Verarbeite die Daten
      const assignedUserIds = documents.flatMap(
        (doc) => doc.content.userIds || []
      );
      const uniqueAssignedUserIds = [...new Set(assignedUserIds)];

      // Filtere die zugewiesenen Benutzer
      const assignedUsersList = users.filter((user) =>
        uniqueAssignedUserIds.includes(user.id)
      );

      /* console.log("Assigned Users List:", assignedUsersList);  */
      setAssignedUsers(assignedUsersList);

      // Schritt 3: Aktualisiere die Daten
      // Falls zusätzliche Benutzer-IDs hinzugefügt wurden, aktualisiere die Zuweisungen
      const newUserIds = uniqueAssignedUserIds;

      const updateResponse = await fetch(
        `http://localhost:8080/taskAssignments/documents`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: { taskId, userIds: newUserIds } }),
        }
      );

      if (!updateResponse.ok) throw new Error("Error assigning users");

      // Optional: Aktualisiere die Task-Liste
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, content: { ...task.content, assignedUsers: newUserIds } }
          : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      setError("Error handling task assignments: " + error.message);
    }
  };

  // ADD TASK
  const handleAssignUsersPopup = (task) => {
    setPopupData({
      ...popupData,
      assignedUsers: task.content.assignedUsers || [],
    });
    setSelectedTaskId(task.id);
    setShowAssignPopup(true);
  };

  // EDIT TASK
  const handleEditTaskPopup = (task) => {
    setPopupData({
      title: task.content.title,
      text: task.content.text,
      status: task.content.status,
      assignedUsers: task.content.assignedUsers || [],
    });
    setSelectedTaskId(task.id);
    setShowPopup(true);
  };

  // LOOK USER THAT ASSIGNED TO THE TASK
  const handleViewAssignedUsers = async (taskId) => {
    await findTaskAssignmentByTaskId(taskId);
    setSelectedTaskId(taskId);
  };

  /* ------------------------------------------------------------------ */

  return (
    <>
      <div className="dashboard">
        <div className="column">
          <h2>To Do</h2>
          {tasks
            .filter((task) => task.content && task.content.status === "To Do")
            .map((task) => (
              <div className="ticket" key={task.id}>
                <h3>{task.content.title || "No Title"}</h3>
                <p>
                  {expandedTaskId === task.id
                    ? task.content.text || "No Description"
                    : getPreviewText(
                        task.content.text || "No Description",
                        task.content.title || "No Title"
                      )}
                </p>
                {task.content.text && task.content.text.length > 30 && (
                  <button onClick={() => handleExpand(task.id)}>
                    {expandedTaskId === task.id ? "Collapse" : "Expand"}
                  </button>
                )}

                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <div className="two-buttons">
                  <button onClick={() => handleAssignUsersPopup(task)}>
                    Assign Users
                  </button>
                  <button onClick={() => handleEditTaskPopup(task)}>
                    Edit
                  </button>
                </div>

                <div>
                  {/* View Assigned Users Button */}
                  <button onClick={() => handleViewAssignedUsers(task.id)}>
                    View Assigned Users
                  </button>
                  {/* Display Assigned Users */}
                  {selectedTaskId === task.id && assignedUsers.length > 0 && (
                    <div>
                      {assignedUsers.map((user) => (
                        <div key={user.id}>
                          <p>Vorname: {user.content.firstName}</p>
                          <p>Nachnamen: {user.content.lastName}</p>
                          <p>Role: {user.content.role}</p>
                          <br />
                        </div>
                      ))}
                    </div>
                  )}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            ))}
          <button onClick={() => handleAddTaskClick("To Do")}>Add Task</button>
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
                    : getPreviewText(
                        task.content.text || "No Description",
                        task.content.title || "No Title"
                      )}
                </p>
                {task.content.text && task.content.text.length > 30 && (
                  <button onClick={() => handleExpand(task.id)}>
                    {expandedTaskId === task.id ? "Collapse" : "Expand"}
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <div className="two-buttons">
                  <button
                    onClick={() => {
                      setPopupData({
                        ...popupData,
                        assignedUsers: task.content.assignedUsers || [],
                      });
                      setSelectedTaskId(task.id);
                      setShowAssignPopup(true);
                    }}
                  >
                    Assign Users
                  </button>
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
                  {/* View Assigned Users Button */}
                  <button onClick={() => handleViewAssignedUsers(task.id)}>
                    View Assigned Users
                  </button>
                  {/* Display Assigned Users */}
                  {selectedTaskId === task.id && assignedUsers.length > 0 && (
                    <div>
                      {assignedUsers.map((user) => (
                        <div key={user.id}>
                          <p>Vorname: {user.content.firstName}</p>
                          <p>Nachnamen: {user.content.lastName}</p>
                          <p>Role: {user.content.role}</p>
                          <br />
                        </div>
                      ))}
                    </div>
                  )}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            ))}
          <button onClick={() => handleAddTaskClick("In Progress")}>
            Add Task
          </button>
        </div>

        {/* Done Column */}
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
                    : getPreviewText(
                        task.content.text || "No Description",
                        task.content.title || "No Title"
                      )}
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
                <div>
                  {/* View Assigned Users Button */}
                  <button onClick={() => handleViewAssignedUsers(task.id)}>
                    View Assigned Users
                  </button>
                  {/* Display Assigned Users */}
                  {selectedTaskId === task.id && assignedUsers.length > 0 && (
                    <div>
                      {assignedUsers.map((user) => (
                        <div key={user.id}>
                          <p>Vorname: {user.content.firstName}</p>
                          <p>Nachnamen: {user.content.lastName}</p>
                          <p>Role: {user.content.role}</p>
                          <br />
                        </div>
                      ))}
                    </div>
                  )}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            ))}
          <button onClick={() => handleAddTaskClick("Done")}>Add Task</button>
        </div>

        {/* Popup zum Hinzufügen/Bearbeiten von Tickts */}
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
              {errorMessage && (
                <div
                  style={{
                    color: "red",
                    marginTop: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {errorMessage}
                </div>
              )}
              <button
                onClick={selectedTaskId ? handleUpdateTask : handleAddTask}
              >
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
                    {user.content.firstName} {user.content.lastName} -{" "}
                    {user.content.role}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  handleAssignUsers(selectedTaskId, popupData.assignedUsers)
                }
              >
                Save Assignments
              </button>
              <button
                onClick={() =>
                  handleAssignUsers(selectedTaskId, popupData.assignedUsers)
                }
              >
                Cancel
              </button>{" "}
              {/* Updated Cancel Handler */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
