import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 350,
  },
  age: {
    fontSize: '19px'
  }
});

const UserList = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.media}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h4">
          User 1<small className={classes.age}> Age: 30</small>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

        <Box mt={2} justifyContent="center" display="flex">
          <Button size="small" color="primary">
            Pass
          </Button>
          <Button size="small" color="secondary">
            Like
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserList;
