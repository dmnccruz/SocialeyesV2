import React, { useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModal/ProfileModal';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className='InfoCard'>
      <div className='infoHead'>
        <h4>Your Info</h4>
        <div
          onClick={() => {
            setModalOpened(true);
          }}
        >
          <UilPen width='2rem' height='1.2rem' />
        </div>
        <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
      <div className='info'>
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>
      <div className='info'>
        <span>
          <b>Lives in </b>
        </span>
        <span>Philippines</span>
      </div>
      <div className='info'>
        <span>
          <b>Works at </b>
        </span>
        <span>Company</span>
      </div>
      <button className='button logout-button'>Log out</button>
    </div>
  );
};

export default InfoCard;
