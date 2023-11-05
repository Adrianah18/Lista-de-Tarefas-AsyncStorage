import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const addTask = () => {
    if (task.trim() !== '') {
      if (editing) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditing(false);
        setEditIndex(null);
        saveTasks(updatedTasks);
      } else {
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        saveTasks(newTasks);
      }
      setTask('');
    }
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditing(true);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nova Tarefa</Text>
        <View style={styles.inputButtonContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a tarefa"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.buttonText}>{editing ? 'Editar' : 'Adicionar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <Text style={styles.taskText}>{task}</Text>
            <FontAwesome
              name="edit"
              onPress={() => editTask(index)}
              style={styles.editIcon}
            />
            <FontAwesome
              name="trash"
              onPress={() => deleteTask(index)}
              style={styles.deleteIcon}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#800080', // Roxo escuro
  },
  inputButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#800080', // Roxo escuro
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#9370DB', // Roxo médio
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#800080', // Roxo escuro
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
  editIcon: {
    fontSize: 24,
    color: '#800080', // Roxo escuro
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 24,
    color: '#800080', // Roxo escuro
    marginLeft: 10,
  },
});

export default TaskList;
