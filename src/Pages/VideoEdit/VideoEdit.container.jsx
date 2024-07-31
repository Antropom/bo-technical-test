import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useTranslate from '../../utils/hooks/useTranslate';
import { useHistory } from 'react-router-dom';

import VideoEditView from './VideoEdit.view';
import NotAvailable from '../NotAvailable';
import VIDEOSSAMPLE from '../../constants/videosSamples.json';

import text from './videoEdit.texts';

const usersVideos = VIDEOSSAMPLE;

function VideoEditContainer() {
  const { videoId } = useParams();
  const { t } = useTranslate(text);
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const video = usersVideos.find((video) => video.id === videoId);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }
    if (!values.description) {
      errors.description = t('required');
    }
    return errors;
  };

  const formatPayload = (values) => {
    const { title, description } = values;

    const payload = {
      ...video,
      title,
      description,
    };

    return payload;
  };

  const handleSubmit = (values) => {
    const formattedPayload = formatPayload(values);
    setPayload(JSON.stringify(formattedPayload, null, 2));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPayload(null);
    backToVideos();
  };

  const backToVideos = () => {
    history.push('/videos');
  };

  if (!video) {
    return <NotAvailable />;
  }

  return (
    <div>
      <VideoEditView
        video={video}
        onSubmit={handleSubmit}
        validate={validate}
        t={t}
        isModalOpen={isModalOpen}
        onModalClose={handleCloseModal}
        payload={payload}
        handleBackClick={backToVideos}
      />
    </div>
  );
}

export default VideoEditContainer;
