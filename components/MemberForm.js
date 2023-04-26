import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap/';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/memberData';

const initialState = {
  memberImage: '',
  memberName: '',
  role: '',
  team: '',

};

function MemberForm({ obj }) {
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
      updateMember(formInput).then(() => router.push('/pages/members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(() => {
        router.push('/members');
      });
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="memberImage"
          value={formInput.memberImage}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member Name"
          name="memberName"
          value={formInput.memberName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Team" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Saxon or Dane"
          name="team"
          value={formInput.team}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    memberImage: PropTypes.string,
    memberName: PropTypes.string,
    role: PropTypes.string,
    team: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
