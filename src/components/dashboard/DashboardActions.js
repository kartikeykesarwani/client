import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
  return (
    <Fragment>
      <div className='dash-buttons'>
        <Link to='/edit-profile' className='btn btn-light'>
          Edit Profile
        </Link>
        <Link to='/add-experience' className='btn btn-light'>
          Add Experience
        </Link>
        <Link to='/add-education' className='btn btn-light'>
          Add Education
        </Link>
      </div>
    </Fragment>
  );
};
