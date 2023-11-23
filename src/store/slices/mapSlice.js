import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   intersection: null   
};

export const mapSlice = createSlice({
   name: 'map',
   initialState,
   reducers: {
      setIntersection: (state, action) => {
         return {
            ...state,
            intersection: action.payload
         };
      }
   }
});

export const { setIntersection } = mapSlice.actions;

export default mapSlice.reducer;