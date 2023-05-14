import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab2.css';

// Import the wrapper class directly
import { BleClient } from '@capacitor-community/bluetooth-le';
import { bluetooth } from 'ionicons/icons';
import { useState } from 'react';

const Tab2: React.FC = () => {

  const [isScanning, setIsScanning] = useState<Boolean>(false);
  const color = isScanning ? "gray" : "white"

  const handleInitialize = () => {
    console.log('handleInitialize Clicked');
    BleClient.initialize();

    // on mobile devices:::!!!
    // BleClient.enable(); 
  }

  const handleClick = () => {
    console.log('clicked');
    setIsScanning(!isScanning);
    scanForDevices();
    console.log(isScanning);
  }

  const scanForDevices = () => {
    if (typeof navigator.bluetooth.requestLEScan === 'function') {
      // call requestLEScan function
      BleClient.requestLEScan({}, scanResult => {
        console.log('Found device:', scanResult);
      });
    } else {
      // requestLEScan function is not available
      console.log('Not available on web browser!');
    }


  };

  const scanForDevices2 = () => {
    BleClient.requestLEScan({}, scanResult => {
      console.log('Found device:', scanResult.device.name);
    });
  };

  const scanForUUIDs = () => {
    const uuids: Array<string> = []; // Array to store discovered UUIDs
    BleClient.requestLEScan({}, scanResult => {
      const device = scanResult.device;
      if (device.uuids) {
        device.uuids.forEach(uuid => {
          if (!uuids.includes(uuid)) {
            uuids.push(uuid);
            console.log(`Discovered UUID: ${uuid}`);
          }
        });
      }
    });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BlueToothScanning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={handleInitialize}>Initialize</IonButton>
        <IonButton onClick={handleClick}>
          <div style={{ color: color }} >
            <IonIcon icon={bluetooth}></IonIcon>
            Enabled
          </div>
        </IonButton>
        <IonButton onClick={scanForDevices}>Scan for devices</IonButton>
      </IonContent>
    </IonPage >
  );
};

export default Tab2;



  // const handleClick = () => {
  //   console.log('enabçled');
  //   BleClient.initialize();
  //   console.log(BleClient.isEnabled());
  //   // BleClient.disable();
  //   console.log(BleClient.isEnabled());
  // }
