const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')

const server = express();

server.use(helmet());

server.use(express.json()); 

const projectRouter = require('./projectRouter'); // importing a project module
server.use('/api/projects', projectRouter);

// const actionRouter = require('./actions/actionRouter'); // importing an action module - may not need this
// server.use('/api/actions', actionRouter);

//custom middleware?

// safety first!
server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Bad Panda",
    err
  });
})

module.exports = server;

// refactored from webapi iii project:
    // userDb =s projectModel
    // userRouter =s projectRouter
    // postdb = actionModel
    // postRouter = actionRouter