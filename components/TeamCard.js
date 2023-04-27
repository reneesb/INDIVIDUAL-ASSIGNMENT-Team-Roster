import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeams } from '../api/teamsData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team}?`)) {
      deleteTeams(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '20rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.image} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.teamName}</Card.Title>
        <Link href="/members" passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE

        </Button>

      </Card.Body>

    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    image: PropTypes.string,
    teamName: PropTypes.string,
    team: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
