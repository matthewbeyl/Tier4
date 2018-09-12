// import React, { Component } from 'react';
// import axios from 'axios';


// class TestComponent extends Component {
//     constructor(props){
//         super(props)


//     }

//     componentDidMount(){
//         this.getGHData();
//     //     axios({
//     //         url: 'https://api.github.com/graphql',
//     //         headers: {
//     //             "User-Agent": 'reverended',
//     //             Authorization: 'Bearer 93646e68719f4ca35e728060af4e1e34fe45cf32'
//     //         },
//     //         method: 'POST',
//     //         data: {
//     //             query: `
//     //                 query {user(login: "${github.user}"){
//     //                     repositories(last: 100){
//     //                         nodes{
//     //                             name,
//     //                             pushedAt,
//     //                             description
//     //                         }
//     //                     }
//     //                 }  
//     //             }
//     //             `
//     //           }
//     //     })
//     //     .then((response)=>{
//     //         console.log(response);
//     //     })
//     //     .catch((error)=>{
//     //         console.log(error);
//     //     })
//     }


//     getGHData = ()=>{
//         axios({
//             url: '/api/gh-router/get-gh-data',
//             method: 'GET'
//         })
//         .then((response)=>{
//             console.log(response.data);
//         })
//     }

//     getSortedData = ()=>{
//         axios({
//             url: '/api/gh-router/get-sorted-data',
//             method: 'GET'
//         })
//         .then((response)=>{
//             console.log(response.data);
//         })
//     }

//     render() {
//         return (
//             <main>

//                 <h1>I am the test component. My function is to be used for testing server routes and I have no purpose beyond that.</h1>
//                 <button onClick={()=>this.getSortedData()}>Click me to do thing</button>
//             </main>
//         )
//     }
// }

// export default TestComponent;