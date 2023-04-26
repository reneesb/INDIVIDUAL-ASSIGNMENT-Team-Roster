import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeams } from '../api/teamsData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function Home() {
  // SET A STATE FOR TEAMS
  const [teams, setTeams] = useState([]);

  // GET USER ID USING AUTH HOOK
  const { user } = useAuth();

  // MAKE API CALL TO GET TEAMS
  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
    console.warn(teams);
  };

  // MAKE CALL TO API TO GET TEAMS ON COMPONENT RENDER
  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/teams/new" passHref>
        <Button>Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over teams here using TeamCard component */}
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>

    </div>
  );
}
export default Home;
