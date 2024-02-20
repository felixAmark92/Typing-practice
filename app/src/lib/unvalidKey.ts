
let unvalidKey = (key: string)=> {

    return(
        key === "Dead"  ||
        key === "Shift" ||
        key === "CapsLock"
    ) 

}


export default unvalidKey;