import React from 'react'
import {Badge} from './ui/badge'

const LatestJobsCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>Indonesia</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Tittle</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur qui soluta, mollitia at non placeat molestiae quam suscipit iusto aspernatur aliquid unde expedita maiores, perferendis, illum reiciendis. Ex, culpa tempore.</p>
            </div>
            <div>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">part time</Badge>
                <Badge className={'text-[#7209B7] font-bold'} variant="ghost">24LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobsCards