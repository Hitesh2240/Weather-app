import React from "react"

const ChildComponent = ({number})=>{

    console.log("child Render")
    console.log(number)
    return<>
    <h1>Child Component</h1>
    
    
    </>
}
// export default ChildComponent;
export const MemoizedComponent = React.memo(ChildComponent)