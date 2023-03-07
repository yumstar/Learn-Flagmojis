import { configureStore } from '@reduxjs/toolkit'
import gridReducer from '../features/gridSlice'
import quizScoresReducer from "../features/quizScoresSlice"
export default configureStore({
  reducer: {
    grid: gridReducer,
    quizScores: quizScoresReducer
  },
})