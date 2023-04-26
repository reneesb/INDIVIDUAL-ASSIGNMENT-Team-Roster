import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

function ListMembers() {
  const [members, setMembers] = useState([]);

  // Get User ID using Auth
  const { user } = useAuth();

  // Api to get all members
  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  // Get members upon component render
  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/members/new" passHref>
        <Button>Add A Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </div>
  );
}

export default ListMembers;
