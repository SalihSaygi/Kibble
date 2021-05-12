import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AccountPage.css';

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({
    displayName: '',
    image: '',
    apiToken: '',
    hasBots: [],
  });

  useEffect(() => {
    Axios.get(`http://localhost:3050/api/users/profile`).then(response => {
      console.log(response);
      setProfileInfo({
        displayName: response.data[0].displayName,
        image: response.data[0].image,
        apiToken: response.data[0].apiToken,
      });
    });
  }, []);
  return (
    <div>
      <div>
        <div>
          <h1>Profile</h1>
          <hr />
        </div>
        <div>
          <h1>{profileInfo.displayName} </h1>
          <img src={profileInfo.image} />
          <hr />
          <h4> : {profileInfo.apiToken}</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
