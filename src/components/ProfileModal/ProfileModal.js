import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const params = useParams();
  const profileUserId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      e.target.name === 'profilePicture'
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append('name', filename);
      data.append('file', profileImage);
      UserData.profilePicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append('name', filename);
      data.append('file', coverImage);
      UserData.coverPicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    setModalOpened(false);
    dispatch(updateUser(params.id, UserData));
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={0.3}
      size='55%'
      opened={modalOpened}
      onClose={(e) => {
        e.stopPropagation();
        setModalOpened(false);
      }}
    >
      <form className='infoForm'>
        <h3>Your info</h3>
        <div>
          <input
            className='infoInput'
            type='text'
            name='firstname'
            placeholder='First Name'
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            className='infoInput'
            type='text'
            name='lastname'
            placeholder='Last Name'
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            className='infoInput'
            type='text'
            name='worksAt'
            placeholder='Works at'
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            className='infoInput'
            type='text'
            name='livesIn'
            placeholder='Lives in'
            onChange={handleChange}
            value={formData.livesIn}
          />
          <input
            className='infoInput'
            type='text'
            name='country'
            placeholder='Country'
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            className='infoInput'
            type='text'
            name='relationship'
            placeholder='Relationship Status'
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type='file' name='profilePicture' onChange={onImageChange} />
          Cover Image
          <input type='file' name='coverPicture' onChange={onImageChange} />
        </div>
        <button className='button infoButton' onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
