import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {tittle, description, requirements, salary, location, jobType,experience, position, companyId} = req.body;
        const userId = req.id;

        if(!tittle || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
            message:"something is missing.",
            success:false
    });
};
    const job = await Job.create({
        tittle,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId
    });
    return res.status(201).json({
        message:"New job created successfully.",
        job,
        success:true
    });
    } catch (error) {
        console.log(error);
    }
}
export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {tittle:{$regex:keyword, $options:"i"}},
                {description :{$regex:keyword, $options:"i"}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort ({createdAt:-1});
        if(!jobs){
            return res.status(404).json ({
                message:"Jobs not found.",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({job,success:true});
    } catch (error) {
        console.log(error);
    }
}
// admin job create 
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}