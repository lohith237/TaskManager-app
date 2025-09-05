import { View } from 'react-native';
import { HomeTemplate } from '../Templates';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'Low',
    completed: false,
    comment: '',
  });

  const [tasks, setTasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks).map(task => ({
            ...task,
            dueDate: new Date(task.dueDate),
          }));
          setTasks(parsedTasks);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadTasks();
  }, []);

  const handleSaveTask = async () => {
    const newTasks = [...tasks];
    if (editingTaskIndex !== null) {
      newTasks[editingTaskIndex] = taskData;
    } else {
      newTasks.push(taskData);
    }
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (e) {
      console.log(e);
    }
    setModalVisible(false);
    setTaskData({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'Low',
      completed: false,
      comment: '',
    });
    setEditingTaskIndex(null);
  };

  const toggleTaskCompleted = async (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
  };

  return (
    <HomeTemplate
      taskData={taskData}
      setTaskData={setTaskData}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      handleSaveTask={handleSaveTask}
      setShowDatePicker={setShowDatePicker}
      showDatePicker={showDatePicker}
      tasks={tasks}
      setEditingTaskIndex={setEditingTaskIndex}
      toggleTaskCompleted={toggleTaskCompleted}
    />
  );
};

export { Home };
