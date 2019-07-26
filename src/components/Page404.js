import React, { Component } from 'react';


const Page404 = ({location}) =>{
    return(
        <div>
            <h3>No match for <code>{location.pathname}</code></h3>
        </div>
    )
}

export default Page404;