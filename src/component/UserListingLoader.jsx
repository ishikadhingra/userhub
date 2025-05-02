import React from 'react';
import './UserListingLoader.css';

const UserListingLoader = ({ progress }) => {
  return (
    <div className="upload-loader-container">
      <div className="upload-loader">
        <div className="loader-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="upload-status">
        Uploading... {progress}%
      </div>
    </div>
  );
};

export default UserListingLoader; 