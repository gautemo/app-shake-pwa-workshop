const hasSubscribed = async () => {
  // TODO Exercise 4
  // get service worker and check if it has subscription
  const sub = undefined;
  return Boolean(sub);
}

const subscribe = async () => {
  const permission = await requestPermission();
  if(permission){
    // TODO Exercise 4
    // get service worker and subscribe, then send subscription to backend
  }
}

const requestPermission = async () => {
  // TODO Exercise 4
  // Request permission and return true if granted
  return false;
}

const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export { hasSubscribed, subscribe, requestPermission }