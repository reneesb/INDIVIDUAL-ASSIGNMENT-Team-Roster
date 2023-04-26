import React from 'react';
import User from '../components/user';
import { useAuth } from '../utils/context/authContext';
import SignOut from '../components/Signout';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <User userObj={user} />
      <SignOut />
    </>

  );
}
