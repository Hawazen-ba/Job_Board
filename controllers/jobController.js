const Job = require('../models/jobModel');


exports.createJob = async (req, res) =>{
    try{
     const job = new Job(req,res);
     await job.save();
     res.status(201).json(job);
    }catch(err){
     res.status(400).json({
        message: 'Error crating job', err
     });
    }
};


//Get jobs' list
exports.findJobs = async (req, res) => {
    try{
       const jobs = await Job.find();
        res.status(201).json(jobs);
    }catch(err){
     res.status(400).json({
        message : "Could not find jobs", err
     })
    }
};

//Get specefic job by id
exports.getJob = async (req, res) => {
    try{
       const job = await Job.findById(req.parms.id);
       if(!job){
        return res.status(404).json({
            message: 'Job not found'
        });
       }
       res.status(200).json(job);
    }catch(err){
        res.status(400).json({
            message: 'Error getting job by id', err
        });
    }
};

//Delete a job 
exports.deleteJob = async (req,res) =>{
    try{
        const job = await Job.findByIdAndDelete(req.params.id);
        if(!job){
            return res.status(404).json({
                message: 'Job not found'
            });
        }
        res.status(200).json({message: 'Job deleted successfully'});
    }
    catch(err){
   res.json({message: 'Error deleting job' , err});
    
}
}; 

//Update job informations 
exports.updateJob = async (req, res) => {
    try{
        const jobUpdate = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            message : "Job updated successfully",
            data :{jobUpdate}
        })
    }
    catch(err){
        res.json({
            message :"Error updating job", 
            err
        })
    }
};

// Filter jobs 
exports.job = async (req, res) => {
    
    try {
        let query= {...  req.query};
        const jobs = await Job.find( query); 
        res.status(203).json({
            message: "Jobs found",
            data:{jobs},
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Jobs not found!",
            err:err,
        });
    }
};