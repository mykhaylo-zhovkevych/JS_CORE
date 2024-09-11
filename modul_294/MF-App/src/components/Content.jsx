import React from 'react';

function Content({title,description,assignedTo}) {
    return ( 

        <>
        
        <div className='preHeader'> 
            <h4>This is the Kanban Tickets Board, where your issues and wished can be hanged and procesed</h4>
        </div>
            
            <div className="dashboard">

                <div className="column">
                    <h2>To Do</h2>
                    <div className="ticket">Task 1: To Do</div>
                    <div className="ticket">Task 2: To Do
                        <button>open task</button>
                    </div>
                    <div className="inprogress">

                        <button>add</button><button>delete</button>
                    </div>
                </div>

                <div className="column">
                    <h2>In Progress</h2>
                    <div className="ticket">Task 3: In Progress</div>
                    <div className="ticket">Task 4: In Progress</div>
                    <div className="inprogress">

                        <button>add</button><button>delete</button>
                    </div>

                </div>

                <div className="column">
                    <h2>Done</h2>

                    <div className="inprogress">

                        <button>add</button><button>delete</button>
                    </div>
                </div>


            </div>
            
            </>

    );
}

export default Content;
