import { useEffect, useReducer } from 'react'

const checkPermission = () => {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    return DeviceMotionEvent.requestPermission()
  }
}

const reducer = (current: number, value: number | 'reset') => {
  if(value === 'reset') return 0;
  return Math.max(current, value);
}

const useAccelerometer = () => {
  const [max, setIfMax] = useReducer(reducer, 0);
  
  useEffect(() => {
    window.addEventListener('devicemotion', ({acceleration}) => {
      const { x, y, z } = acceleration ?? {};
      setIfMax(Math.ceil(Math.abs(x ?? 0) + Math.abs(y ?? 0) + Math.abs(z ?? 0)));
    });
  }, []);
  
  const resetMax = () => setIfMax('reset');

  return { max, resetMax, checkPermission }
}

export { useAccelerometer }