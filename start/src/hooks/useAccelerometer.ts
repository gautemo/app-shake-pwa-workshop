import { useEffect, useReducer } from 'react'

const checkPermission = () => {
  // TODO Exercise 4
  // if (typeof DeviceMotionEvent.requestPermission === 'function') {
  //   return DeviceMotionEvent.requestPermission()
  // }
}

const reducer = (current: number, value: number | 'reset') => {
  if(value === 'reset') return 0;
  return Math.max(current, value);
}

const getScore = (x: number, y: number, z: number) => {
  return Math.ceil(Math.abs(x) + Math.abs(y) + Math.abs(z));
}

const useAccelerometer = () => {
  const [max, setIfMax] = useReducer(reducer, 0);
  
  useEffect(() => {
    // TODO Exercise 4 
    // Add event listener and call setIfMax(getScore(x, y, z));
  }, []);
  
  const resetMax = () => setIfMax('reset');

  return { max, resetMax, checkPermission }
}

export { useAccelerometer }