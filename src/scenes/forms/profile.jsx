import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom"


import Header from "../../components/Header";
import { BASE_URL, Fetcher } from "../../utils"

import 'react-toastify/dist/ReactToastify.css';

const ProfileForm = () => {
  // State for form fields
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [ userList, setUserList ] = useState([])
  const token = localStorage.getItem('token')
  const { profileId } = useParams();
  console.log(profileId)
  useEffect(() => {
    if (profileId) {
        
    } else {
        new Fetcher()
        .readUsers(token)
        .then((data) => {
            setUserList(data.users)
        })
    }
  }, [])
  
  // Function to handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to handle category select change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Create FormData object to send form data
    const formData = new FormData();
    formData.append('picture', file);
    if (profileId) {
      const data = await fetch(`${BASE_URL}/profiles/${profileId}`, {
        method: 'PUT',
        body: formData,
        // You may need to set headers depending on your API requirements
      });
        console.log(data)
        if (data.ok) window.location.href = '/admin/profiles'
        return
    }
    // Send form data to API endpoint using fetch or your preferred HTTP client library
    try {
      const response = await fetch(`${BASE_URL}/profiles/${category}`, {
        method: 'POST',
        body: formData,
        // You may need to set headers depending on your API requirements
      });
      console.log(response)
      if (response.ok) {
        // Handle success (e.g., show success message)
        console.log('Form submitted successfully!');
        window.location.href = '/admin/profiles'
      } else {
        // Handle error (e.g., show error message)
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Header title="CREATE USER" subtitle="Create a New User" />
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* File input for image upload */}
        <input type="file" onChange={handleFileChange} />
        <br />
        {/* Dropdown select for category */}
        {
        !profileId &&
        <select value={category} onChange={handleCategoryChange}>
            {userList.map((user) => 
                <option key={user.id} value={user.id}>{user.userName}</option>
            )}
        </select>
        }
        <br />
        {/* Submit button */}
        <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default ProfileForm;
