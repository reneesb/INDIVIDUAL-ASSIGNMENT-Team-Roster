import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleMember } from '../../../api/memberData';
import MemberForm from '../../../components/MemberForm';

export default function ViewMember() {
  const [memberTeam, setMemberTeam] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberTeam);
  }, [firebaseKey]);
  return (
    <MemberForm obj={memberTeam} />
  );
}
