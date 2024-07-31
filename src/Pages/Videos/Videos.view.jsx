import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';

import styles from './videos.module.scss';

import noThumbnailPlaceholder from '../../assets/images/no-thumbnail.png';

function VideosView({ usersVideos, t, onVideoClick }) {
  return (
    <div className={styles.userVideosWrapper}>
      <h2 className={styles.title}>{t('myVideos')}</h2>

      <Grid container spacing={2}>
        {usersVideos.map((video) => (
          <Grid item xs={12} sm={6} lg={4} key={video.id}>
            <Card className={styles.videoCard} onClick={() => onVideoClick(video.id)}>
              <CardMedia
                component="img"
                height="250"
                image={video.thumbnail || noThumbnailPlaceholder}
                alt={video.title || t('noTitle')}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {video.title || t('noTitle')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default VideosView;
