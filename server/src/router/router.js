const express = require("express");
const route = express.Router();
const authUser = require("../middlewares/fakeAuthUser.middleware");
const {login, logout, register} = require("../controller/auth.controller");
const User = require("../controller/user.controller");
const Project = require("../controller/project.controller");
const Task = require("../controller/task.controller");
const SubTask = require("../controller/sub_task.controller");
const Discussion = require("../controller/discussion.controller");
const Message = require("../controller/message.controller");
const Attachment = require("../controller/attachment.controller");

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
route.get('/projects/all', authUser, Project.getAll);//req.body.user._id
route.get('/projects/:id', authUser, Project.getOne);//req.params.id;req.user
route.post('/projects/create', authUser, Project.create);//{ title, description } = req.body; req.body.user
route.delete('/projects/delete/:id', authUser, Project.delete);// req.params.id;  req.body.user
route.put('/projects/update/:id', authUser, Project.update);//req.params.id;req.user. {title, description } = req.body;
route.post('/projects/addUser/:id', authUser, Project.addUser);//req.params.id; { user } = req.body;  ++user.role user.permissions.create..
route.put('/projects/removeUser/:id', authUser, Project.removeUser);// req.params.id { user } = req.body;
route.put('/projects/addPermission/:id', authUser, Project.addPermission); // req.params.id;  { user } = req.body; ++user.role user.permissions.create..


// Task
route.get('/projects/:id/tasks', authUser, Task.getAll); //project : req.params.id
route.get('/tasks/:id', authUser, Task.getOne); //id = req.params.id;
route.post('/projects/:id/tasks/create', authUser, Task.create); //title: req.body.title, project: req.params.id
route.delete('tasks/delete/:id', authUser, Task.delete);
route.put('/tasks/update/:id', authUser, Task.update); //req.params.id, { title: req.body.title, project: req.params.id}


//Subtask
route.get('/tasks/:id/subtasks', authUser, SubTask.getAll);
route.post('/tasks/:id/subtasks/create', authUser, SubTask.create);// title: req.body.title,  task: req.params.id
route.put('/subtasks/update/:id', authUser, SubTask.update);// { title: req.body.title, isFinished: req.body.isFinished }
route.delete('/subtasks/:id/delete', authUser, SubTask.delete);

// Discussion
route.get('/projects/:id/discussion', authUser, Discussion.getAll);
route.get('/discussion/:id', authUser, Discussion.getOne);//don't need
route.post('/projects/:id/discussion/create', authUser, Discussion.create); //title: req.body.title, project: req.params.id, creator_id: user._id
route.delete('/discussion/delete/:id', authUser, Discussion.delete); // discs id
route.put('/discussion/update/:id', authUser, Discussion.update); // disc's id title: req.body.title

//Message
route.get('/discussion/:id/message', authUser, Message.getAll); //discussion_id: req.params.id
route.get('/message/:id', authUser, Message.getOne);//don't need
route.post('/discussion/:id/message/create', authUser, Message.create); // discussion_id: req.params.id, { user } = req.body; message: req.body.message,
route.delete('/message/delete/:id', authUser, Message.delete);  //message's id
route.put('/message/update/:id', authUser, Message.update); //  req.params.id, { message: req.body.message }

//Attachment
route.get('/project/:id/attachment', authUser, Attachment.getAll); // project: req.params.id
route.get('attachment/:id', authUser, Attachment.getOne); // id = req.params.id;
route.post('/project/:id/attachment/create', authUser, Attachment.create); // type: req.body.type, data: req.body.data  project: req.params.id
route.put('/attachment/update/:id', authUser, Attachment.update); // type: req.body.type, data: req.body.data, project: req.params.id}
route.delete('/attachment/delete/:id', authUser, Attachment.delete);

module.exports = route;

