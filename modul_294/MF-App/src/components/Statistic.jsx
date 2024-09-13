import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistic() {
  const [tasks, setTasks] = useState([]);
  
  const [chartData, setChartData] = useState({
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Task Status',
        data: [0, 0, 0], 
      },
    ],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/projektarbeits/documents');
        const tasksData = response.data;
        console.log(tasksData);

        // Berechnung der Statistiken
        const toDoCount = tasksData.filter(task => task.content.status === 'To Do').length;
        const inProgressCount = tasksData.filter(task => task.content.status === 'In Progress').length;
        const doneCount = tasksData.filter(task => task.content.status === 'Done').length;

        // Aktualisiere die Chart-Daten
        setChartData({
          labels: ['To Do', 'In Progress', 'Done'],
          datasets: [
            {
              label: 'Task Status',
              // Aktualisierte Werte
              data: [toDoCount, inProgressCount, doneCount],
              backgroundColor: ['#c0c0c0', '#007bff', '#00000'],
              hoverOffset: 4,
            },
          ],
        });

        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="statistics">
      <h1>Task Statistics</h1>
      <div className="chart-container">
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default Statistic;
