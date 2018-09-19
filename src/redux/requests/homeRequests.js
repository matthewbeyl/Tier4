import axios from 'axios';

//gets the date of the most recent challenge from DB
export function getChallengeDate() {
    return axios.get('/api/challenge/date')
    .then(response => {
        console.log(response.data);
        return response.data})
    .catch((error) => { throw error; });
}

//gets all participants in current challenge
export function getLeaders() {
    return axios.get('/api/leaderboard')
    .then(response => {
        console.log(response.data);
        return response.data});
};