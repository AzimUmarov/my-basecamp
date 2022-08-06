const express = require("express");
const route = express.Router();
const authUser = require("../middlewares/fakeAuthUser.middleware");
const {login, logout, register} = require("../controller/auth.controller");
const User = require("../controller/user.controller");
const Project = require("../controller/project.controller");
const Task = require("../controller/task.controller");
const SubTask = require("../controller/sub_task.controller");

// Authorization
route.post("/login", login);
route.post("/register", register);
route.get("/logout", authUser, logout);

//Users
route.get('/user/all', authUser, User.getAll);
route.get('/user/:id', authUser, User.getOne);
route.put('/user/edit/:id', authUser, User.edit);
route.delete('/user/delete/:id', authUser, User.delete);

// Project
route.get('/projects/all', authUser, Project.getAll);
route.get('/projects/:id', authUser, Project.getOne);
route.post('/projects/create', authUser, Project.create);
route.delete('/projects/delete/:id', authUser, Project.delete);
route.put('/projects/update/:id', authUser, Project.update);
route.post('/projects/addUser/:id', authUser, Project.addUser);
route.put('/projects/removeUser/:id', authUser, Project.removeUser);
route.put('/projects/addPermission/:id', authUser, Project.addPermission);

// Task
route.get('/projects/:id/tasks', authUser, Task.getAll);
route.get('tasks/:id', authUser, Task.getOne);
route.post('/projects/:id/tasks/create', authUser, Task.create);
route.delete('tasks/delete/:id', authUser, Task.delete);
route.put('tasks/update/:id', authUser, Task.update);

//Subtask
route.get('/tasks/:id/subtasks', authUser, SubTask.getAll);
route.post('/tasks/:id/subtasks', authUser, SubTask.create);
route.delete('/subtasks/:id', authUser, SubTask.delete);

//Attachment
route.get('/project/:id/attachment', authUser, SubTask.getAll);
route.post('/project/:id/attachment', authUser, SubTask.create);
route.delete('/attachment/:id', authUser, SubTask.delete);

module.exports = route;

