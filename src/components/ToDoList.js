import { Button, TextField, InputAdornment, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import {getData, postData, markAsComplete} from "../service/APIService"

class ToDoList extends React.Component {
    state = {
        todoInput: "",
        todoList: [],
    };

    async componentDidMount(){
        const tasks = await getData();
        this.setState({
            todoList : tasks
        });
    }

    handleInputText = (event) => {
        this.setState({
            todoInput: event.target.value
        });
    };

    addTask = async () => {
        const { todoInput, todoList } = this.state;
        const newTask = {
            name: todoInput,
            isComplete: false
        };
        if (todoInput.trim() !== "") {
            await postData(newTask);
            this.setState({
                todoInput: "",
                todoList: [
                    newTask,
                    ...todoList,
                ],
            });
        }
    };

    markAsComplete = async (id) => {
        await markAsComplete(id);
        const updatedList = this.state.todoList.map((task, idx) => {
            if (task.id === id) {
                return { ...task, isComplete: true };
            }
            return task;
        });

        this.setState({ todoList: updatedList });
    };

    render() {
        return (
            <Box sx={{ width: "60%", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <Typography variant="h4" gutterBottom>
                    To Do List App
                </Typography>
                <TextField
                    id="filled-basic"
                    label="Add a task"
                    variant="filled"
                    value={this.state.todoInput}
                    onChange={(event) => this.handleInputText(event)}
                    sx={{ width: '100%', marginBottom: "20px" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button variant="outlined" onClick={this.addTask}>
                                    Add
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography variant="h5" gutterBottom>
                    Your Tasks:
                </Typography>
                {this.state.todoList.length > 0 ? (
                    <List>
                        {this.state.todoList.map((task, index) => (
                            <ListItem
                                key={task.id}
                                sx={{
                                    backgroundColor: task.isComplete ? "#d4edda" : "#f9f9f9",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    marginBottom: "10px",
                                }}
                                secondaryAction={
                                    !task.isComplete && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => this.markAsComplete(task.id)}
                                        >
                                            Complete
                                        </Button>
                                    )
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            color={task.isComplete ? "textSecondary" : "textPrimary"}
                                            sx={{
                                                textDecoration: task.isComplete ? "line-through" : "none",
                                            }}
                                        >
                                            {index + 1}. {task.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No tasks available. Start adding some!
                    </Typography>
                )}
            </Box>
        );
    }
}

export default ToDoList;
