import { useState, useEffect } from "react";

/* 

Ich verwende die Popups um die Daten, dier der benutzer eingint zu verwalten und weiterführen 
mit Event-Handler werde ich die Öffung und Scliesung Operationen handelen

*/

function Content() {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    text: "",
    status: "",
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  // Für die Anzeige des vollständigen Texts
  const [expandedTaskId, setExpandedTaskId] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");

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
        console.log("Task deleted successfully");

        setTasks(updatedTasks);
      } else {
        throw new Error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handlePopupSubmit = () => {
    if (popupData.title.length > maxTitleLength) {
      setErrorMessage(`Der Titel darf ${maxTitleLength}  Zeichen nicht überschreiten.`);
      return;
    }

    setErrorMessage("");

    if (selectedTaskId) {
      const updatedTask = { ...popupData };
      fetch(`http://localhost:8080/projektarbeits/documents/${selectedTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updatedTask }),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedTasks = tasks.map((task) =>
            task.id === selectedTaskId
              ? { ...task, content: updatedTask }
              : task
          );
          setTasks(updatedTasks);
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      // Add new task
      addTask(popupData);
    }

    setShowPopup(false);
    setPopupData({ title: "", text: "", status: "" });
    setSelectedTaskId(null);
  };

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
      </div>

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
          {errorMessage && <div style={{color: 'red', marginTop: '10px', fontSize: '14px', fontWeight: 'bold',textAlign: 'center',}} >{errorMessage}</div>}
          <br />
          <button onClick={handlePopupSubmit}>Save</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      </div>
      )}
    </>
  );
}

export default Content;
