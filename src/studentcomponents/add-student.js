import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../studentSlice'; // Import addStudent action
import { Link } from 'react-router-dom';

function AddStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate after form submission

  const [student, setStudent] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile_no: '',
    department: '',
    dob: '',
    address: {
      address1: '',
      city: '',
      state: '',
      zipcode: '',
    },
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in student.address) {
      setStudent({
        ...student,
        address: {
          ...student.address,
          [name]: value,
        },
      });
    } else {
      setStudent({
        ...student,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!student.firstname || !student.lastname || !student.email || !student.mobile_no) {
      setFormError('All fields are required!');
      return;
    }

    setFormError('');

    // API call to add student
    dispatch(addStudent(student))
      .then(() => {
        // On successful addition, redirect to the student list page
        navigate('/studentList');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div className="container mx-auto p-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li>
              <Link to="/studentList" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/studentList" className="text-blue-600 hover:text-blue-800 mr-4">Student List</Link>
            </li>
            <li>
              <span className="text-gray-500">Add Student</span>
            </li>
          </ol>
        </nav>
      </div>

      <h2 className="text-2xl font-bold mb-6">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error message */}
        {formError && <div className="text-red-600 text-center mb-4">{formError}</div>}

        {/* Form fields */}
        <input
          type="text"
          name="firstname"
          value={student.firstname}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="lastname"
          value={student.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="mobile_no"
          value={student.mobile_no}
          onChange={handleChange}
          placeholder="Mobile No"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="department"
          value={student.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="date"
          name="dob"
          value={student.dob}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="address1"
          value={student.address.address1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="city"
          value={student.address.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="state"
          value={student.address.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="zipcode"
          value={student.address.zipcode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
