import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Avatar, AvatarImage } from './ui/avatar';


const Job = ({ job }) => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                setIsApplied(true); //update the local state
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob)); //helps to real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) //ensure the state is in sync with fetch data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);
    // const jobId = "ashdahsahwd";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="rounded-full" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>Indonesia</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{job?.salary}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209B7] hover:bg-[5f3ad] cursor-pointer'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

        </div>
    )
}

export default Job
