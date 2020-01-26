import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ErrorDialog from '../../materialUiComponents/ErrorDialog';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteNutrientFromDb, updateNutrientInDb, addNutrientToDb, setError
} from './nutrientsSlice';
// import Modal from '../../components/Modal';
// import Button from '../../components/Button';
import NutrientItemM from './NutrientItemM';
import AddNutrientToMealM from './AddNutrientToMealM';
// import './nutrients.css';
import { I_NAME, I_FINELLI_ID } from '../finelliData/constants'
import SpinnerModal from '../../components/SpinnerModal';
import { Ring } from 'react-awesome-spinners'

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import SelectFinelliNutrientM from '../finelliData/SelectFinelliNutrientM';

const NutrientListM = withStyles({
  root: {
    // background: 'red',
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  }
})(List);

export default React.memo(function NutrientsM({ mealId }) {
  const nutrients = useSelector(state => state.nutrients.nutrients.filter(nutrient => nutrient.mealId === mealId));
  const finelliData = useSelector(state => state.finelliData.finelliData);
  const error = useSelector(state => state.nutrients.error);
  const isLoadingNutrients = useSelector(state => state.nutrients.isLoading);
  const isLoadingFinelli = useSelector(state => state.finelliData.isLoading);

  const isLoading = isLoadingNutrients || isLoadingFinelli;

  const dispatch = useDispatch();

  const [addMode, setAddMode] = useState(false);

  const editNutrientHandler = (nutrientId, amount, mealId, finelliId) => {
    dispatch(updateNutrientInDb(nutrientId, amount, mealId, finelliId));
  }

  const addNutrientToMealHandler = (finelliId) => {
    console.debug('addNutrientToMealHandler 1', new Date().getSeconds(), new Date().getMilliseconds());
    dispatch(addNutrientToDb(0, mealId, finelliId));
    console.debug('addNutrientToMealHandler 2', new Date().getSeconds(), new Date().getMilliseconds());
    setAddMode(false);
  }

  const removeHandler = (id) => {
    dispatch(deleteNutrientFromDb(id));
  }

  const clearError = () => {
    dispatch(setError(''));
  }

  return (
    <div>
      {error && <ErrorDialog error={error} clearError={clearError} />}
      {isLoadingFinelli ? (
        <SpinnerModal visible={isLoading}>
          <Ring size='100' sizeUnit='px' />
        </SpinnerModal>
      ) : (
          <NutrientListM >
            {nutrients.map(nutrient =>
              <NutrientItemM
                key={nutrient.nutrientId}
                name={finelliData.find(row => {
                  return row[I_FINELLI_ID] === nutrient.finelliId
                })[I_NAME]}
                nutrientData={finelliData.find(row => {
                  return row[I_FINELLI_ID] === nutrient.finelliId
                })}
                nutrient={nutrient}
                removeHandler={removeHandler}
                editNutrientHandler={editNutrientHandler}
              />)}
          </NutrientListM >
        )}
      <div style={{ margin: '4px' }} >
        <Button
          color='primary'
          variant='contained'

          style={{ marginTop: '5px' }}
          onClick={() => setAddMode(true)}
        >
          ADD NEW NUTRIENT
        </Button>
      </div>
      <SelectFinelliNutrientM open={addMode} onClose={() => setAddMode(false)}
        selectDataHandler={addNutrientToMealHandler} />


      <SpinnerModal visible={isLoading}>
        <Ring size='100' sizeUnit='px' />
      </SpinnerModal>
    </div >
  );
});