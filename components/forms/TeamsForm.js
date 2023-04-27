import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
// eslint-disable-next-line import/extensions
import { updateTeams, createTeams } from '../../api/teamsData';

const initialState = {
  teamName: '',
  image: '',
  group: '',
  description: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeams(formInput)
        .then(() => router.push(`/teams/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeams(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Teams</h2>

        {/* TEAM NAME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="teamName"
            value={formInput.teamName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* IMAGE INPUT  */}
        <FloatingLabel controlId="floatingInput2" label="Team Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* GROUP INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Group" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Saxon or Dane"
            name="group"
            value={formInput.group}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* DESCRIPTION TEXTAREA  */}
        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />

        </FloatingLabel>
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} </Button>
      </Form>

    </>
  );
}

// eslint-disable-next-line react/no-typos
TeamForm.propTypes = {
  obj: PropTypes.shape({
    teamName: PropTypes.string,
    image: PropTypes.string,
    group: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
