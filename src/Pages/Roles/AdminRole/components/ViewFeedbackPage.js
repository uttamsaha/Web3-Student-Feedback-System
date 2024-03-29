import React, { useContext } from 'react'
import { FeedbackContext } from '../../../Context/Context';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const ViewFeedbackPage = ({feedbackByCourseCode}) => {

  let sum = 0;
  const calculateRating = feedbackByCourseCode?.map(rating => ({rating:rating.rating}));

  for(let rating of calculateRating){
    let numberRating = parseFloat(rating.rating);
    sum+= numberRating;
  }

  let performancePercentage = (sum/calculateRating.length) * 10;
  if(isNaN(performancePercentage)) {
    performancePercentage = 0;
  }

  return (
    <div>
        <p className='text-center text-[#ea3d5a]  text-lg md:text-lg py-3 border-l-4 border-[#ea3d5a]  mt-4 bg-white shadow-md rounded-md w-9/12 md:w-6/12 mx-auto  bg-gradient-to-r from-stone-100 to-blue-50 drop-shadow-md'><b className="font-bold">Info: </b>This table below shows the feedbacks and rating evaluate and send by the students: .</p>
        
        <div>
       <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex justify-center">
      <div
        className="inline-block w-3/4 shadow-md rounded-lg overflow-hidden"
      >
        <table className=" w-full leading-normal">
          <thead>
            <tr>
              <th
                className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Course Codes
              </th>
              <th
                className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Ratings
              </th>
              <th
                className=" text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-200  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {
                feedbackByCourseCode?.map(course => <tr>
                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 w-10 h-10">
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                     {course?.courseCode}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <p className="text-gray-900 whitespace-no-wrap">{course?.rating}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <p className="text-gray-900 whitespace-no-wrap">{course?.comment}</p>
              </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        <div className='flex justify-center items-center pb-24'>
        <div className='h-72 w-96 bg-white shadow-md rounded-xl'>
        <CircularProgressbar className='w-40 h-40 mt-12'
        value={performancePercentage}
        text={`${performancePercentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#F43F5E",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"
        })}
      />
        <p className='text-center font-bold text-xl mt-2'>Performance of the faculty. </p>
        </div>
        </div>
       </div>

    </div>
  )
}

export default ViewFeedbackPage;