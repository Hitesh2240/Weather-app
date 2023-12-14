import { useState } from "react";
import {MemoizedComponent} from "./ChildComponent";

const ParentComponent = () =>{
    const [number, setNumber] = useState(0)
console.log("parent render")

    return(
    <>

    <h1>Parent Component - {number}</h1>

    <button onClick={()=>setNumber(number +1)}>Increase Number</button>
    <MemoizedComponent />
    </>
    )
}
export default ParentComponent;