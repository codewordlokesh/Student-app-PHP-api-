import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost/training/assignments/backend/api.php?id=${id}`);
        setAddresses(response.data.addresses || []);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [id]);

  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await axios.delete(`http://localhost/training/assignments/backend/api.php?id=${addressId}`);
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
    } catch (err) {
      alert("Failed to delete the address. Please try again later.");
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li>
              <Link to="/studentList" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Home</Link>
            </li>
            <li>
              <span className="text-gray-500">Student Addresses</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Addresses</h1>

      {/* Address List */}
      {addresses.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Street</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">State</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Zip Code</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{address.address1}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{address.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{address.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{address.zipcode}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 flex space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${address.id}`)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-6">
          <p>No addresses found for this student.</p>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
