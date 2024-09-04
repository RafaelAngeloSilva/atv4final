import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";

const Home = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // ID da tarefa em edição
  const [editingTaskText, setEditingTaskText] = useState(""); // Texto da tarefa em edição

  const tasksCollectionRef = collection(db, "tasks");

  // Carrega as tarefas do Firestore em tempo real
  useEffect(() => {
    const q = query(tasksCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksData);
    });
    return unsubscribe;
  }, []);

  // Adiciona uma nova tarefa
  const addTask = async () => {
    if (newTask.trim()) {
      await addDoc(tasksCollectionRef, { text: newTask, uid: user.uid });
      setNewTask("");
    }
  };

  // Deleta uma tarefa
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // Inicia o modo de edição para uma tarefa
  const startEditingTask = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  // Cancela a edição e limpa o estado
  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  // Salva as alterações feitas na tarefa
  const saveEditedTask = async (id) => {
    const taskDocRef = doc(db, "tasks", id);
    await updateDoc(taskDocRef, { text: editingTaskText });
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Tarefas
      </Typography>
      <TextField
        fullWidth
        label="Nova Tarefa"
        variant="outlined"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={addTask}
        style={{ marginBottom: 20 }}
      >
        Adicionar Tarefa
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} style={{ marginBottom: 10 }}>
            {editingTaskId === task.id ? (
              <>
                <TextField
                  fullWidth
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveEditedTask(task.id)}
                  style={{ marginLeft: 10 }}
                >
                  Salvar Alterações
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={cancelEditingTask}
                  style={{ marginLeft: 10 }}
                >
                  Cancelar alterações
                </Button>
              </>
            ) : (
              <>
                <ListItemText primary={task.text} />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => startEditingTask(task.id, task.text)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Home;