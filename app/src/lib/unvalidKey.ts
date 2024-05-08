
let unvalidKey = (key: string)=> {

    return(
        key === "Dead"  ||
        key === "Shift" ||
        key === "CapsLock" ||
        key === "Alt" ||
        key === "AltGraph"
    ) 

}


export default unvalidKey;