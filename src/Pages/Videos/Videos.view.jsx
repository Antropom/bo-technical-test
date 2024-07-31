import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';

import styles from './videos.module.scss';

function VideosView({ usersVideos, t }) {
  return (
    <div className={styles.userVideosWrapper}>
      <Typography className={styles.title} variant="div">
        {t('myVideos')}
      </Typography>

      <Grid container spacing={2}>
        {usersVideos.map((video) => (
          <Grid item xs={12} sm={6} lg={4} key={video.id}>
            <Card className={styles.videoCard}>
              <CardMedia component="img" height="250" image={video.thumbnail} alt={video.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {!!video.title ? video.title : t('noTitle')}
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
