import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { LogOut, User2} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const {user} = useSelector(store=>store.auth)
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'><span className='text-[#4B0082]'>Hire</span><span className='text-[#32CD32]'>Quest</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                    {
                        !user? (
                            <div className='flex items-center gap-2'>
                                <Link to ="/login" ><Button variant="outline">Login</Button></Link>
                                <Link to ="/signup"><Button className="bg-[#6A38C2]">Signup</Button></Link>
                                
                            </div>
                        ) : (
                            <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-88">
                                <div className=''>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>Mario full stack</h4>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam ducimus numquam officiis sint fugiat porro optio nisi sunt voluptatem ex. Impedit incidunt suscipit non tenetur ex reiciendis, culpa accusantium ab.</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2/>
                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut/>
                                        <Button variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar