import { Form, Field } from 'react-final-form';
import { PrimaryButton } from '../../widgets/Buttons/Buttons';
import RenderTextInput from '../../Renderers/RenderTextInput';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import getYoutubeEmbedUrl from '../../utils/getYoutubeEmbed';

import styles from './videoEdit.module.scss';

function VideoEditView({
  video,
  onSubmit,
  validate,
  t,
  isModalOpen,
  onModalClose,
  payload,
  handleBackClick,
}) {
  return (
    <div className={styles.videoEditWrapper}>
      <Modal open={isModalOpen} onClose={onModalClose}>
        <div className={styles.modal}>
          <div>
            <Typography variant="h2">{t('modalTitle')}</Typography>
            <Typography className={styles.payload} variant="body1">
              {payload ? payload : ''}
            </Typography>
          </div>
          <PrimaryButton className={styles.modalBtn} label="Close" onClick={onModalClose} />
        </div>
      </Modal>

      <IconButton className={styles.backButton} onClick={handleBackClick}>
        <ArrowBack />
      </IconButton>

      <h2>{video.title}</h2>
      <iframe
        width="560"
        height="315"
        src={getYoutubeEmbedUrl(video.url)}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ title: video.title, description: video.description }}
        render={({ handleSubmit, invalid, pristine }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field name="title" label={t('title')} type="text" component={RenderTextInput} />

            <Field name="description" label={t('description')} component={RenderTextInput} />

            <PrimaryButton
              label={t('update')}
              type="submit"
              disabled={invalid || pristine}
              className={styles.btn}
            />
          </form>
        )}
      />
    </div>
  );
}

export default VideoEditView;
