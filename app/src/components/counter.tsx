import { useState } from 'react'

let Counter = ()=> {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>{count}</h3>
      <button onClick={()=> setCount(count + 1)}>Press me</button>
    </>
  )
}

export default Counter
