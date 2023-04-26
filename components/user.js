import React from 'react';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function User() {
  const { user } = useAuth();

  return (
    <>
      <div className="text-light text-center">
        <Image
          src={user.photoUrl}
          alt="Profile"
        />
        <h1>{user.displayName}</h1>
        <p>{user.email}</p>
        <p>{user.metadata.lastSignInTime}</p>
        <button type="button">{signOut}</button>
      </div>
    </>
  );
}
