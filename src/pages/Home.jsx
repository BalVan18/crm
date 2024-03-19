// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment, incrementByAmount, decrementByAmount } from '../store/mainSlice'
import React from "react";
import Board from "../components/Board";

export default function Home() {
  // const count = useSelector((state) => state.main.value)
  // const dispatch = useDispatch()

  return (
    // <div>
    //   <div>
    //     <button
    //       aria-label="Increment value"
    //       onClick={() => dispatch(increment())}
    //     >
    //       Increment
    //     </button>
    //     <span>{count}</span>
    //     <button
    //       aria-label="Decrement value"
    //       onClick={() => dispatch(decrement())}
    //     >
    //       Decrement
    //     </button>
    //   </div>

    //   <div>
    //     <button
    //       aria-label="Increment value"
    //       onClick={() => dispatch(incrementByAmount(2))}
    //     >
    //       IncrementByAmount
    //     </button>
    //     <span>{count}</span>
    //     <button
    //       aria-label="Decrement value"
    //       onClick={() => dispatch(decrementByAmount(2))}
    //     >
    //       DecrementByAmount
    //     </button>
    //   </div>
    // </div>
    <Board />
  )
}
