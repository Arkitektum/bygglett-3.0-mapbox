import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   intersection: null,
   dialog: null   
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
      },
      toggleDialog: (state, action) => {                       
         return {
            ...state,
            dialog: action.payload            
         };
      }
   }
});

export const { setIntersection, toggleDialog } = mapSlice.actions;

export default mapSlice.reducer;