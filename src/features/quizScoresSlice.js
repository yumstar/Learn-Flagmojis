import { getData } from '@/utils/api'
import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from "cookies-next";
export const quizScoresSlice = createSlice({
    name: 'quizScores',
    initialState: {
        userToken: "",
        scoresLoaded: false,
        scores:[],
        errorMessage: ""
    },
    reducers: {
        loadToken: (state) => {
            state.userToken = getCookie("userToken")
        },
        loadScores: (state, action) => {
            if(state.userToken){
                    state.scores = action.payload
                    state.scoresLoaded = true;
            }
            else {
                state.errorMessage = "Error - user is not logged in"
            }
        },
        clearScores: (state) => {
            state = {
                userToken: "",
                scoresLoaded: false,
                scores:[],
                errorMessage: ""
            }
        }
    }
})
export const { loadToken, loadScores, clearScores} = quizScoresSlice.actions

export const selectToken = (state) => state.quizScores.userToken
export const selectLoaded = (state) => state.quizScores.scoresLoaded
export const selectScores = (state) => state.quizScores.scores
export const selectTokenLoaded = (state) => state.quizScores.userToken != null && state.quizScores.userToken.length > 0

export const getScores = () => async (dispatch) => {
    const dbScores = await getData("/api/questions/getCountriesQuestionScores");
    dispatch(loadScores(dbScores))
}

export default quizScoresSlice.reducer