import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DeleteStudent() {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the student details based on the ID
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/training/assignments/backend/api.php?id=${id}`);
        const data = response.data;

        if (response.status === 200 && data && data.student) {
          setStudent(data.student);
        } else {
          throw new Error('Failed to fetch student details.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      setIsDeleting(true);
      setError(null);
      try {
        const response = await axios.delete(`http://localhost/training/assignments/backend/api.php?id=${id}`);

        if (response.status === 200) {
          alert('Student deleted successfully!');
          navigate('/studentList'); // Redirect to the students list after deletion
        } else {
          throw new Error('Failed to delete the student. Please try again.');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!student) {
    return <div className="text-center text-gray-600">Loading student details...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Delete Student</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <p className="text-center text-gray-700 mb-4">
          Are you sure you want to delete the following student? This action cannot be undone.
        </p>

        <div className="mb-4">
          <p><strong>First Name:</strong> {student.firstname}</p>
          <p><strong>Last Name:</strong> {student.lastname}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Mobile Number:</strong> {student.mobile_no}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Date of Birth:</strong> {student.dob}</p>
          <p><strong>Address:</strong> {student.address1}, {student.city}, {student.state}, {student.zipcode}</p>
        </div>

        {/* Error Message */}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`py-2 px-6 rounded-lg text-white ${isDeleting ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={() => navigate('/studentList')}
            className="py-2 px-6 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteStudent;
