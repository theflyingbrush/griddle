import { configureStore } from '@reduxjs/toolkit';
import markerReducer from '../features/markers/markerSlice';
import { MarkerProps } from '@types';

export default configureStore({
  reducer: {
    markers: markerReducer
  }
})

export interface RootState {
  markers: {
    value: MarkerProps[]
  }
}