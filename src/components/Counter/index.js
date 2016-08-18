import React, { PropTypes } from 'react';

export default function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <h2>{ count }</h2>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  )
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
}
