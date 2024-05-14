
let unvalidKey = (key: string)=> {

    return(
        key === "Dead"  ||
        key === "Shift" ||
        key === "CapsLock" ||
        key === "Alt" ||
        key === "AltGraph" ||
        key === "Control"
    ) 

}


export default unvalidKey;