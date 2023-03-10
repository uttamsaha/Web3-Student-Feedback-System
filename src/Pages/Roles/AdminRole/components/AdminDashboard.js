import React, { useContext, useEffect } from 'react';
import {AiOutlineDashboard} from 'react-icons/ai'
import {FiUsers} from 'react-icons/fi';
import {MdOutlineFeedback} from 'react-icons/md';
import {BiBookReader} from 'react-icons/bi';
import {FaUsers} from "react-icons/fa";
import { FeedbackContext } from '../../../Context/Context';

const Dashboard = () => {
    const {getCourses, allCourses, allUsers, getAllUsers, getAllFeedback, allFeedbacks} = useContext(FeedbackContext);


    const faculties = allUsers?.filter(user => user.role==='faculty');
    const students = allUsers?.filter(user => user.role==='student');
    useEffect(()=>{
        getCourses();
        getAllUsers();
        getAllFeedback();
        console.log("all users: ",allUsers);
    },[])
    return (
        <div className='bg-[#F5F5F5] calc-height rounded-xl'>
            <p className='text-white text-2xl mb-8 font-bold bg-[#039BE5] h-24 flex items-center rounded-t-xl'><AiOutlineDashboard className='ml-5 mr-3 w-6 h-6'/>Administrator Dashboard</p>
            <p className='text-center text-[#16728e]  text-xl md:text-xl py-3 border-l-8 border-[#5bc0de]  mb-8 bg-[#4bc3e41d] rounded-md w-9/12 md:w-6/12 mx-auto'>Hey admin, You are welcome to your dashboard.</p>
            <div className='flex flex-col md:flex-row place-items-center place-content-center gap-5 mb-16 space-x-6 '>
                <div className='rounded-lg  bg-white h-40 shadow-lg w-80 '>
                    <FiUsers className='w-12 h-12 text-[#039BE5] mx-auto mt-3'/>
                    <h1 className='text-4xl font-bold text-center mt-2 text-orange-500'>{students?.length}</h1>
                    <p className='text-xl text-center mt-1'>Total Students</p>
                </div>
                <div className='rounded-lg  bg-white h-40 shadow-lg w-80'>
                    <FaUsers className='w-12 h-12 text-[#039BE5] mx-auto mt-3'/>
                    <h1 className='text-4xl font-bold text-center mt-2 text-orange-500'>{faculties?.length}</h1>
                    <p className='text-xl text-center mt-1'>Total Faculties</p>
                </div>
                <div className='rounded-lg  bg-white h-40 shadow-lg w-80'>
                    <BiBookReader className='w-12 h-12 text-[#039BE5] mx-auto mt-3'/>
                    <h1 className='text-4xl font-bold text-center mt-2 text-orange-500'>{allCourses?.length}</h1>
                    <p className='text-xl text-center mt-1'>Total Courses</p>
                </div>
                <div className='rounded-lg  bg-white h-40 shadow-lg w-80'>
                    <MdOutlineFeedback className='w-12 h-12 text-[#039BE5] mx-auto mt-3'/>
                    <h1 className='text-4xl font-bold text-center mt-2 text-orange-500'>{allFeedbacks?.length}</h1>
                    <p className='text-xl text-center mt-1'>Total Feedbacks</p>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;