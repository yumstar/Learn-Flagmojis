import { configureStore } from '@reduxjs/toolkit'
import gridReducer from '../features/GridSlice'
export default configureStore({
  reducer: {
    grid: gridReducer
  },
})