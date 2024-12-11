import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchStudents } from '../studentSlice';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
// import StudentReducerState from '../reducer/studentReducer';
import { updateStudentAction } from './../actions/studentAction'
import { fetchStudents } from './../axios';

function StudentList() {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state);
  const { studentData } = reducer;
  console.log(reducer, "reducer");
  let students = null;
  let loading = false;
  let error = null;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  console.log("inside comp");

  useEffect(() => {
    const login = loginUser();

    login.then((data) => {
      students = data;
      let payload = {
        data: students,
        type: "loginuser"
      }
      dispatch(updateStudentAction(payload))
    });
  }, []);

  const totalPages = students ? Math.ceil(students.length / itemsPerPage) : 0;

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const downloadCSV = () => {
    if (!students || students.length === 0) {
      alert('No students available to download.');
      return;
    }

    const csvData = students.map(student => ({
      Name: `${student.firstname} ${student.lastname}`,
      Email: student.email,
      Mobile: student.mobile_no,
      Department: student.department,
      DOB: student.dob,
      AddressCount: student.addresses ? student.addresses.length : 0,  // Showing address count
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'students.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Home</Link>
            </li>
            <li>
              <span className="text-gray-500">Student List</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Add and Download Buttons */}
      <div className="flex flex-col items-end mb-6">
        <Link to="/addstudent">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6">
            Add Student
          </button>
        </Link>
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Download CSV
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Student List</h1>

      {/* Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mobile No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">DOB</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Address Count</th> {/* Changed to Address Count */}
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData && studentData.length > 0 ? (
              studentData.map(student => (
                console.log('Addresses for student', student.id, student.addresses),
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <Link to={`/view/${student.id}`}>
                      {student.firstname} {student.lastname}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{student.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{student.mobile_no}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{student.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{student.dob}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {studentData.addresses ? studentData.addresses.length : 0} {/* Showing address count */}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <Link to={`/view/${student.id}`} className="text-blue-600 hover:text-blue-800 mr-4">View</Link>
                    <Link to={`/edit/${student.id}`} className="text-yellow-600 hover:text-yellow-800 mr-4">Edit</Link>
                    <Link to={`/delete/${student.id}`} className="text-red-600 hover:text-red-800">Delete</Link>
                  </td>
                </tr>
              ))
            ) : (
              
              <tr>
                <td colSpan="7" className="text-center text-gray-700">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentList;
