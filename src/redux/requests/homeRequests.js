import axios from 'axios';

export function getChallengeDate() {
    return axios.get('/api/challenge/date')
    .then(response => {
        console.log(response.data);
        return response.data})
    .catch((error) => { throw error; });
}

export function getLeaders() {
    return axios.get('/api/leaderboard')
    .then(response => {
        console.log(response.data);
        return response.data});
};