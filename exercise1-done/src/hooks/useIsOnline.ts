import { useEffect, useState } from 'react'

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true); // TODO Exercise 2 set correct initial state

  useEffect(() => {
    // TODO Exercise 2
    // Add event listeners for online & offline and call setIsOnline
  }, []);

  return { isOnline }
}

export { useIsOnline }