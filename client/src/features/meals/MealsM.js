import React from 'react';
import ErrorDialog from '../../materialUiComponents/ErrorDialog';
import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';

import {
  deleteMealFromDb, updateMealInDb, addMealToDb, setError
} from './mealsSlice';

import MealM from './MealM';
import './meals.css';
import Button from '@material-ui/core/Button';

// const StyledDialog = withStyles({
//   root: {
//     BackDrop: {
//       root: {
//         backgroundColor: 'red'
//       }
//     }
//   }
// })(Dialog);



const DEFAULT_NEW_MEAL_NAME = "New meal";

export default React.memo(function MealsM({ planId }) {
  const meals = useSelector(state => state.meals.meals).filter(meal => meal.planId === planId);
  const error = useSelector(state => state.meals.error);
  const isLoading = useSelector(state => state.meals.isLoading);
  const dispatch = useDispatch();

  const editMealHandler = (id, name, description, planId) => {
    dispatch(updateMealInDb(id, name, description, planId));
  }

  const addMealHandler = (name, description, planId) => {
    dispatch(addMealToDb(name, description, planId));
  }

  const removeHandler = (id) => {
    dispatch(deleteMealFromDb(id));
  }

  const clearError = () => {
    dispatch(setError(''));
  }

  return (
    <>
      {error && <ErrorDialog error={error} clearError={clearError} />}
      {meals.map(meal => <MealM
        key={meal.mealId}
        meal={meal}
        removeHandler={removeHandler}
        editMealHandler={editMealHandler} />)}
      <div style={{ margin: '4px' }}>
        <Button
          color='primary'
          variant='contained'
          fullWidth
          onClick={() => addMealHandler(DEFAULT_NEW_MEAL_NAME, '', planId)}>
          ADD NEW MEAL
        </Button>
      </div>
      {/* <div>isLoading: {isLoading ? 'Loading ...' : 'No'}</div>
      <div>Error: {error}</div> */}
      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </>
  );
}, (prevMeals, nextMeals) => { return prevMeals.planId === nextMeals.planId });