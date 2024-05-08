
let unvalidKey = (key: string)=> {

    return(
        key === "Dead"  ||
        key === "Shift" ||
        key === "CapsLock" ||
        key === "Alt"
    ) 

}


export default unvalidKey;