import VIDEOSSAMPLE from '../../constants/videosSamples.json';
import VideosView from './Videos.view';

import useTranslate from '../../utils/hooks/useTranslate';
import texts from './videos.text';

function VideosContainer() {
  const usersVideos = VIDEOSSAMPLE;

  const { t } = useTranslate(texts);

  return <VideosView usersVideos={usersVideos} t={t} />;
}

export default VideosContainer;
