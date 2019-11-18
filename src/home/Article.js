import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default ({author, title, createdAt, body,favorited, favoritesCount}) => (
  <Card>
    <CardHeader
      avatar={
        <Avatar src={author.image} />
      }
      title={author.username}
      subheader={new Date(createdAt).toDateString()}
    />
    <CardContent>
      <Typography variant="body2" color="textPrimary" component="p">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {body}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton color={favorited ? 'primary' : 'default'}>
        <FavoriteIcon />
      </IconButton>
      {`${favoritesCount} ${favoritesCount === 1 ? 'like' : 'likes'}`}
    </CardActions>
  </Card>
);
