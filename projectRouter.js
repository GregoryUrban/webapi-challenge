const express = require('express'); // importing a CommonJS module

const router = express.Router();
const ProjectModel = require('./data/helpers/projectModel');
const ActionModel = require('./data/helpers/actionModel');


router.use((req,res,next)=> {
  console.log('projectRouter yippee');
  next();
})

// custom middleware
const logger = require('./logger'); 
router.use(logger);


// using ProjectModel
router.get('/:id', validateProjectId, async (req, res) => {
    try {
        const project = await ProjectModel.get(req.params.id);
    
        if (project) {
          res.status(200).json(project);
        } else {
        next(({message: 'project not found'}))
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error retrieving the project'}))
      }
});


// for  ProjectModel
async function validateProjectId (req, res, next) {
    try{
      const { id } = req.params;
      const project = await ProjectModel.get(id);
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({message: 'invalid project id'});
      }
    } catch (err) {
        next(({message: 'failed to process async request'}));
    //   res.status(500).json({message:'failed to process async request'})
    } 
  
  }

module.exports = router;

// refactored from webapi iii project:
    // userDb =s projectModel
    // userRouter =s projectRouter
    // postdb = actionModel
    // postRouter = actionRouter