import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import { useSelector, useDispatch } from 'react-redux';
import { setShowDetails } from './mainPageSlice';

const useStyles = makeStyles(theme => ({
  title: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary.contrastText
  },
  drawerContent: {
    width: 300,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  paper: {
    backgroundColor: theme.palette.primary.main
  },
  userInfoItem: {
    display: 'flex'
  },
  userInfoText: {
    flex: 1
  }
}));

const UserInfoItem = ({ name, value }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.userInfoItem}>
      <Typography variant='body1' className={classes.userInfoText}>
        {name}
      </Typography>
      <Typography variant='body1' className={classes.userInfoText}>
        {value}
      </Typography>
    </ListItem>
  );
};

export default function SideDrawer({ drawerOpen, handleCloseSideDrawer }) {
  const classes = useStyles();
  const user = useSelector(state => state.user.user);
  const showDetails = useSelector(state => state.mainPage.showDetails);
  const dispatch = useDispatch();

  const handleChange = name => event => {
    dispatch(setShowDetails({ ...showDetails, [name]: event.target.checked }));
  };

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={drawerOpen} onClose={handleCloseSideDrawer}
    >
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseSideDrawer}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>Settings</Typography>
      <div className={classes.drawerContent}>

        {user.email && (
          <Paper elevation={2} className={classes.root} >
            <Typography variant='h6'>User info:</Typography>
            <List>
              <UserInfoItem name='Email' value={user.email} />
              <UserInfoItem name='Name' value={user.name} />
              <UserInfoItem name='Height' value={user.height + 'cm'} />
              <UserInfoItem name='Weight' value={user.weight + 'kg'} />
            </List>
          </Paper>
        )}
        <Paper elevation={2} className={classes.root}  >
          <FormControl component="fieldset">
            <FormLabel component="legend">Show details of:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={showDetails.plan} onChange={handleChange('plan')} value="plan" />}
                label="Plan"
              />
              <FormControlLabel
                control={<Switch checked={showDetails.meal} onChange={handleChange('meal')} value="meal" />}
                label="Meal"
              />
              <FormControlLabel
                control={
                  <Switch checked={showDetails.nutrient} onChange={handleChange('nutrient')} value="nutrient" />
                }
                label="Nutrient"
              />
            </FormGroup>
          </FormControl>
        </Paper>
      </div>
    </Drawer>
  )
}
