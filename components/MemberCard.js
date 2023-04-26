import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';

function MemberCard({ memberObj, onUpdate }) {
  const deleteSingleMember = () => {
    if (window.confirm('Delete Member?')) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={memberObj.memberImage} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{memberObj.memberName}</Card.Title>
        {/* DYNAMIC LINK TO EDIT THE Member DETAILS  */}
        <Link href={`/members/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteSingleMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    memberImage: PropTypes.string,
    memberName: PropTypes.string,
    role: PropTypes.string,
    team: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
