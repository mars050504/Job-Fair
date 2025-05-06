import React from 'react'
import { RadioGroup,RadioGroupItem } from './ui/radio-group'
import {Label} from './ui/label'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["surabaya", "Malang", "Jakarta"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    }, 
    {
        fitlerType: "Salary",
        array: ["1jt-3jt", "3jt-5jt", "5jt-10jt"]
    },
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, index) => {
                                 return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item}/>
                                        <Label>{item}</Label>
                                    </div>
                                 )   
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard