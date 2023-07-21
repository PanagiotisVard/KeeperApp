//We are importing React library in every file because this library is very important
import React from "react";

//Just getting the year 
function Year(){
    const currentYear = new Date().getFullYear();

    return currentYear
}

// Footer component definition.
function Footer(){

    const currentYear = Year()
    // const currentYear = new Date().getFullYear();

    return (
        <footer>
        {/* --className is used to have access in the .css file functions
            -- style is used to write .css code inside the html code*/}
            <p className ='year'>copyright@{currentYear}</p>
            {/* <p style ={{color: 'red'}}>copyright@{currentYear}</p> */}
        </footer>
    );
}


//EXPORT IS IMPORTANT!!
export default Footer;