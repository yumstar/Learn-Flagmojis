import { configureStore } from '@reduxjs/toolkit'
import gridReducer from '../features/gridSlice'
import quizScoresReducer from "../features/quizScoresSlice"
import countriesReducer from "../features/countriesSlice"
export default configureStore({
  reducer: {
    grid: gridReducer,
    quizScores: quizScoresReducer,
    countries: countriesReducer
  },
})