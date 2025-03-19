import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const {updateProfile} = useAuthStore();

  const handleUpdate = () => {
    if (!email && !password) {
      toast.error('Please enter at least one field');
      return;
    }

    // Call your API for updating email and password
    console.log('Updating Email:', email);
    console.log('Updating Password:', password);
    if(email !='' && password != ''){
           alert("hii");
           if (password.length < 6) return toast.error('Password must be of 6 character');
           return updateProfile({password:password, email:email,  change:"both"});
    }
    else if(!email){
        if (password.length < 6) return toast.error('Password must be of 6 character');
         updateProfile({password:password, change:"password"});
    }
    else if(!password){
         updateProfile({email:email, change:"email"});
    }

    // toast.success('Profile updated successfully');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <h1 className="text-3xl font-bold text-center mb-6">Profile Page</h1>

      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <div 
            className="cursor-pointer text-blue-400 mb-2 bg-gray-700 p-4 rounded-lg text-center"
            onClick={() => setShowEmailInput((prev) => !prev)}
          >
            Change Email ID
          </div>
          {showEmailInput && (
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
            />
          )}
        </div>

        <div className="mb-4">
          <div 
            className="cursor-pointer text-blue-400 mb-2 bg-gray-700 p-4 rounded-lg text-center"
            onClick={() => setShowPasswordInput((prev) => !prev)}
          >
            Change Password
          </div>
          {showPasswordInput && (
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          )}
        </div>

        <button
          className="w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 mb-4"
          onClick={handleUpdate}
        >
          Update Profile
        </button>
      </div>

      <button
        className="absolute bottom-4 left-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
  );
};
