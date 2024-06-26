import { ethers } from 'ethers';
import React, { useContext, useEffect } from 'react'
import  { useState } from 'react';
import Loader from '../../../Shared/Loader';
import {VscPreview} from 'react-icons/vsc';
import { HiFolderAdd } from "react-icons/hi";
import { AiOutlineAppstoreAdd } from  "react-icons/ai";


import { useTable } from 'react-table';
import swal from 'sweetalert';
import abi from '../../../../utils/abi.json';
import { FeedbackContext } from '../../../Context/Context';
const CourseEnroll = () => {
  const { ethereum } = window;
  const [isLoading, setIsLoading] = useState(false);
  const { getCourses, allCourses} = useContext(FeedbackContext);

 
  useEffect(()=>{
    getCourses();
  },[])

  //ordering the data
  const data = allCourses.map(course => ({
    to: course.to,
    courseCode: course.courseCode,
    courseTitle: course.courseTitle,
    facultyName: course.facultyName
  }))
 

  const columns = React.useMemo(
    () => [
      {
        Header: 'Faculty Address',
        accessor: 'to'
      },
      {
        Header: 'Course Code',
        accessor: 'courseCode' // accessor is the "key" in the data
      },
      {
        Header: 'Course Title',
        accessor: 'courseTitle'
      },
      {
        Header: 'Faculty',
        accessor: 'facultyName'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  const [selectedRowData, setSelectedRowData] = useState([]);

  const getSelectedRowwValues = selectedRow => {
    setSelectedRowData({ ...selectedRow.values });
    getEnrollToCourse();
    console.log({ ...selectedRow.values })
  };

  const getEnrollToCourse = async () => {
    const to = await selectedRowData.to;
    const courseCode = await selectedRowData.courseCode;
    const courseTitle = await selectedRowData.courseTitle;
    const faculty = await selectedRowData.facultyName;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
  
      const EnrollContract = new ethers.Contract("0xBE17787a2E408736a557a5A83f73A5f9097BE3D5", abi, signer);
      const enrollHash = await EnrollContract.getEnroll(to, courseCode, courseTitle, faculty);
      setIsLoading(true)
      console.log(`Loading - ${enrollHash.hash}`);
      await enrollHash.wait();
      setIsLoading(false)
      console.log(`Success - ${enrollHash.hash}`);
      swal("Successfully Enrolled", "You successfully Enrolled to the course", "success");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
    
  }

  return (
    <div className=''>
      <p className='w-full border pl-12 text-xl text-black mb-8 font-bold bg-[#F8FAFC] h-14 flex items-center'><AiOutlineAppstoreAdd className='ml-5 mr-3 w-6 h-6'/>Course Enrollment</p>
      <p className='w-2/5 text-center text-[#ea3d5a] text-md  py-3 border-l-4 border-[#ea3d5a]  mb-8 bg-white shadow-md rounded-md mx-auto  bg-gradient-to-r from-stone-100 to-blue-50 drop-shadow-md'><b className="font-bold info-size">Info: </b>You have to Click on the course row to get enrolled  into the course. Thank you. </p>
     <div className='inline-block w-4/5 shadow-md rounded-lg overflow-hidden ml-44'>
     <table {...getTableProps()} className="min-w-full leading-normal ">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => getSelectedRowwValues(row)}
                className="cursor-pointer"
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      {cell.render('Cell')}
                    </td>
                    
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      
     </div>
     {
        isLoading && <Loader></Loader>
      }

    </div>
  )
}

export default CourseEnroll;