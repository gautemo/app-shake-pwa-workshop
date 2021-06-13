const hasSubscribed = async () => {
  const sw = await navigator.serviceWorker.ready;
  const sub = await sw.pushManager.getSubscription();
  return Boolean(sub);
}

const subscribe = async () => {
  const permission = await requestPermission();
  if(permission){
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(import.meta.env.VITE_PUSH_KEY)
    });
    fetch('http://localhost:8080/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription),
    });
  }
}

const requestPermission = async () => {
  const result = await Notification.requestPermission();
  return result === 'granted';
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