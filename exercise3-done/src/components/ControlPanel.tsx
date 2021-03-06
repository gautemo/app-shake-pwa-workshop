import React, { useEffect, useState } from 'react';
import styles from '../style/ControlPanel.module.css';
import iosInstallInfo from '../images/iosInstallInfo.png';
import { Alert } from './Alert';
import { hasSubscribed, subscribe } from '../services/notifications';

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}
const isInStandaloneMode = () => window.navigator.standalone;

const ControlPanel = () => {
  const [showInstall, setShowInstall] = useState(isIos() && !isInStandaloneMode());
  const [showInstallIOSInfo, setShowInstallIOSInfo] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      setShowInstall(true);
    });
  }, []);

  const install = async () => {
    setShowInstall(false);
    if(deferredPrompt){
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    }else{
      setShowInstallIOSInfo(true);
    }
  }

  const [isSubscribed, setIsSubscribed] = useState(false);
  useEffect(() => {
    hasSubscribed().then(res => setIsSubscribed(res));
  }, []);
  const subscribeClick = () => {
    subscribe();
    setIsSubscribed(true);
  }

  return (
    <section className={styles.panel}>
      { !isSubscribed && <button onClick={subscribeClick}>Notify me</button> }
      { showInstall && <button onClick={install}>Install</button> }
      { showInstallIOSInfo && 
        <Alert 
          type="info" 
          toast={true}
          closeAlert={() => setShowInstallIOSInfo(false)}
        >
          <img src={iosInstallInfo} alt="ios install info" className={styles.iosInfo}/>
        </Alert> 
      }
    </section>
  )
}

export { ControlPanel }