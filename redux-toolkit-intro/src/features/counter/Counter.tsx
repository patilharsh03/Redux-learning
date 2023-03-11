import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./CounterSlice";
import { RootState, AppDispatch } from "../../app/store";
import { ChangeEvent, useState } from "react";


const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();

  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  const addValue: number = Number(incrementAmount) || 0;

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type="text"
        value={incrementAmount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIncrementAmount(Number(e.target.value))
        }
      />

        <div>
            <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
            <button onClick={() => {
            dispatch(reset()); 
            setIncrementAmount(0)} // RESET to 0
        }
        >Reset</button>
        </div>

    </section>
  );
};

export default Counter;
