import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstname: '',
    lastname: '',
    mobile_no: '',
    email: '',
    department: '',
    dob: '',
    address: {
      address1: '',
      city: '',
      state: '',
      zipcode: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Fetch the student details by ID
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost/training/assignments/backend/api.php?id=${id}`);
        if (response.data && response.data.student) {
          setStudent({
            firstname: response.data.student.firstname,
            lastname: response.data.student.lastname,
            mobile_no: response.data.student.mobile_no,
            email: response.data.student.email,
            department: response.data.student.department,
            dob: response.data.student.dob,
            address: response.data.addresses && response.data.addresses.length > 0 ? {
              address1: response.data.addresses[0].address1,
              city: response.data.addresses[0].city,
              state: response.data.addresses[0].state,
              zipcode: response.data.addresses[0].zipcode,
            } : {
              address1: '',
              city: '',
              state: '',
              zipcode: ''
            }
          });
        }
      } catch (err) {
        setError('Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!student.firstname || !student.lastname || !student.email || !student.mobile_no) {
      setFormError('All fields are required!');
      return;
    }

    setFormError('');

    try {
      // Send the updated data to the API
      const response = await axios.put(`http://localhost/training/assignments/backend/api.php?id=${id}`, student);
      if (response.status === 200) {
        alert('Student updated successfully!');
        navigate('/studentList'); // Navigate to the student list page after successful update
      }
    } catch (err) {
      alert('Failed to update student: ' + err.message);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Student</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Error message */}
        {formError && <div className="text-red-600 text-center mb-4">{formError}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={student.firstname || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={student.lastname || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="mobile_no">Mobile Number:</label>
          <input
            type="text"
            name="mobile_no"
            value={student.mobile_no || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter mobile number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={student.email || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="department">Department:</label>
          <input
            type="text"
            name="department"
            value={student.department || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter department"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={student.dob || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="address1">Address 1:</label>
          <input
            type="text"
            name="address1"
            value={student.address.address1 || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter address line 1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={student.address.city || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter city"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            value={student.address.state || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter state"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="zipcode">Zip Code:</label>
          <input
            type="text"
            name="zipcode"
            value={student.address.zipcode || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
            placeholder="Enter zip code"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/studentList')}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
