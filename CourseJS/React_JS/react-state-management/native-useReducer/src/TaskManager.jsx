import { useReducer } from "react";

const initialState = {
    input: "",
    tasks: [],
    filter: "all",
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_INPUT":
            return {
                ...state,
                input: action.payload,
                error: "",
            };

        case "ADD_TASK": {
            const trimmed = state.input.trim();

            if (trimmed === "") {
                return {
                    ...state,
                    error: "Task cannot be empty",
                };
            }

            const newTask = {
                id: Date.now(),
                text: trimmed,
                done: false,
            };

            return {
                ...state,
                tasks: [...state.tasks, newTask],
                input: "",
                error: "",
            };
        }

        // I can use the {} in a case statement to create a new scope
        case "TOGGLE_TASK": 
            return {
                ...state,
                tasks: state.tasks.map((task) => 
                    task.id === action.payload ? {...task, done: !task.done} : task),
            };
    

        case "DELETE_TASK": 
            return {
                ...state, 
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        
        case "SET_FILTER": 
        return {
            ...state,
            filter: action.payload,
        };
        
        case "CLEAR_DONE":
            return {
                ...state,
                tasks: state.tasks.filter((task) => !task.done),
            };

        default:
            return state;
    }
}


export default function TaskManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "all") return true;
    if (state.filter === "active") return !task.done;
    if (state.filter === "done") return task.done;
    return true;
  });

  return (
    <div style={styles.wrapper}>
      <h2>Task Manager</h2>

      <div style={styles.row}>
        <input style={styles.input} type="text" value={state.input} placeholder="Enter a task" onChange={(e) => dispatch({type: "SET_INPUT", payload: e.target.value})} />
        <button onClick={() => dispatch({type: "ADD_TASK"})}>Add Task</button>
      </div>

      {state.error && <p style={styles.error}>{state.error}</p>}

      <div style={styles.row}>
        <button onClick={() => dispatch({type: "SET_FILTER", payload: "all"})}>ALL</button>
        <button onClick={() => dispatch({type: "SET_FILTER", payload: "active"})}>ACTIVE</button>
        <button onClick={() => dispatch({type: "SET_FILTER", payload: "done"})}>DONE</button>
        <button onClick={() => dispatch({type: "CLEAR_DONE"})}>Clear Done</button>
      </div>

      <div style={{marginTop : "20px"}}>
        {filteredTasks.length === 0 ? (
          <p> No Tasks found.</p> ) : (
            filteredTasks.map((task) => (
              <div key={task.id} style={styles.task}>
                <span style={{...styles.taskText, textDecoration: task.done ? "line-through" : "none", opacity: task.done ? 0.6 : 1, }}>
                    {task.text}
                  </span>

                <div style={styles.row}>
                  <button onClick={() => dispatch({type: "TOGGLE_TASK", payload: task.id})
                  }
                  >
                    {task.done ? "Undo" : "Done"} 
                  </button>

                  <button onClick={() => dispatch({type: "DELETE_TASK", payload: task.id})
                  }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );

}


const styles = {
  wrapper: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    fontFamily: "Arial, sans-serif",
  },
  row: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  error: {
    color: "crimson",
    marginTop: "10px",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  taskText: {
    fontSize: "16px",
  },
};
