import { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import TaskItem from '../components/TaskItem';
import Loader from '../components/Loader';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTasks();
      setTasks(res.data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  );
};

export default TaskList;