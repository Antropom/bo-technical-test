import VIDEOSSAMPLE from '../../constants/videosSamples.json';
import VideosView from './Videos.view';

import useTranslate from '../../utils/hooks/useTranslate';
import { useHistory } from 'react-router-dom';

import texts from './videos.text';

function VideosContainer() {
  const usersVideos = VIDEOSSAMPLE;

  const { t } = useTranslate(texts);
  const history = useHistory();

  const handleVideoClick = (videoId) => {
    if (!videoId) {
      return;
    }

    history.push(`/videos/${videoId}/edit`);
  };

  return <VideosView usersVideos={usersVideos} t={t} onVideoClick={handleVideoClick} />;
}

export default VideosContainer;
