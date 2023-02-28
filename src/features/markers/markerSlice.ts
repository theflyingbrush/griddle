import { createSlice } from '@reduxjs/toolkit'
import { MarkerProps, Position } from '@types';

type ClearAction = {
  type: string;
}

type AddMarkerAction = {
  payload: MarkerProps;
  type: string;
}

type EditMarkerAction = {
  payload: {
    index: number;
    position: Position;
  }
  type: string;
}

const markerSlice = createSlice({
  name: 'marker',
  initialState: {
    value: [] as MarkerProps[]
  },
  reducers: {
    addNewMarker: (state, action: AddMarkerAction) => {
      state.value.push(action.payload)
    },
    editMarker: (state, action: EditMarkerAction) => {
      const { 
        index,
        position 
      } = action.payload
      if (state.value[index]) {
        const existingMarker = state.value[index]
        existingMarker.x = position.x;
        existingMarker.y = position.y
      }
    },
    clearAllMarkers: (state, _action: ClearAction) => {
      state.value = []
    }
  }
})

export const { addNewMarker, editMarker, clearAllMarkers } = markerSlice.actions
export default markerSlice.reducer