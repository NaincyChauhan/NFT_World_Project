// Counter.js
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { incrementCounter1,decrementCounter1 } from './redux/intercations';
// import { incrementCounter1, decrementCounter1 } from './actions/reducer1Actions';


const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counterReducer1.count);
    const handleIncrement = () => {
        incrementCounter1(dispatch);
    };

    const handleDecrement = () => {
        decrementCounter1(dispatch);
    };

    // const handleIncrement = () => {
    //     dispatch(incrementCounter1()); // Dispatch the action
    // };
    
    // const handleDecrement = () => {
    //     dispatch(decrementCounter1()); // Dispatch the action
    // };
    return (
        <div>
            <p>Count: {count ? count : 0}</p>
            <button onClick={handleIncrement}>Increment Counter 1</button>
            <button onClick={handleDecrement}>Decrement Counter 1</button>
        </div>
    );
};
export default Counter;
