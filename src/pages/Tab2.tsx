import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { bluetooth } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import '../theme/App.css'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database'



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpQoMMzOGkJ-n3H0A5nRYGeto7ubNkKF8",
  authDomain: "backend-e12d1.firebaseapp.com",
  databaseURL: "https://backend-e12d1-default-rtdb.firebaseio.com",
  projectId: "backend-e12d1",
  storageBucket: "backend-e12d1.appspot.com",
  messagingSenderId: "730317868996",
  appId: "1:730317868996:web:68359d31c1ab5a9a369e91",
  measurementId: "G-158MT6TRS3"
};


const Tab2: React.FC = () => {

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const writeUserData = () => {
    console.log(database);
    set(ref(database, 'users/bluetoothDevices'), {
      devicesNameList: devices
    })
  }

  const writeUserDataUUID = () => {
    console.log(database);
    set(ref(database, 'users/bluetoothDevicesUUIDS'), {
      devicesUUIDList: devicesUUID,
    })


    console.log('here are the devicesUUID we get:', devicesUUID);
  }

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanningUUID, setIsScanningUUID] = useState<boolean>(false);
  const [devices, setDevices] = useState<string[]>([]);
  const [singleUUID, setSingleUUID] = useState("");
  const [devicesUUID, setDevicesUUID] = useState<string[]>([]);
  const [singleDeviceName, setSingleDeviceName] = useState("");

  const handleInitialize = async () => {
    await BleClient.initialize();
    console.log('Bluetooth initialized');
  };

  // useEffect(() => {
  //   setDevicesUUID([...devicesUUID, singleUUID]);
  //   console.log('devicesUUID changed:', devicesUUID)
  // }, [singleUUID]);

  useEffect(() => {
    setDevicesUUID(prevDevicesUUID => [...prevDevicesUUID, singleUUID]);
  }, [singleUUID]);


  const handleClickUUID = async () => {
    setIsScanningUUID(!isScanningUUID);
    if (!isScanningUUID) {
      await BleClient.requestLEScan({}, scanResult => {
        console.log('Found device:', scanResult);
        if (scanResult.device !== undefined && scanResult.device.deviceId !== undefined) {
          setSingleUUID(scanResult.device.deviceId);
          // setDevicesUUID([...devicesUUID, scanResult.device.deviceId]);
        }
      });
      console.log('Scanning started');

      // Set isScanningUUID to false after 5 seconds
      setTimeout(() => {
        setIsScanningUUID(false);
        console.log('Scanning stopped after 5 seconds');
        BleClient.stopLEScan();
      }, 3000);
    } else {
      setIsScanningUUID(false);
      await BleClient.stopLEScan();
      console.log('Scanning stopped');
    }
  };



  // const handleClickUUID2 = async () => {
  //   setIsScanningUUID(!isScanningUUID);
  //   if (!isScanningUUID) {
  //     await BleClient.requestLEScan({}, scanResult => {
  //       console.log('Found device:', scanResult);
  //       if (scanResult.device !== undefined && scanResult.device.uuids !== undefined) {
  //         setDevicesUUID([...devicesUUID, ...scanResult.device.uuids]);
  //       }
  //     });
  //     console.log('Scanning started');

  //   } else {
  //     await BleClient.stopLEScan();
  //     console.log('Scanning stopped');
  //   }
  // };
  useEffect(() => {
    setDevices(prevDevices => [...prevDevices, singleDeviceName]);
  }, [singleDeviceName]);


  const handleClick = async () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      await BleClient.requestLEScan({}, scanResult => {
        console.log('Found device:', scanResult);
        if (scanResult.device.name) {
          // setDevices([...devices, scanResult.device.name]);
          setSingleDeviceName(scanResult.device.name);
        }
      });
      console.log('Scanning started');

      // Set isScanning to false after 5 seconds
      setTimeout(() => {
        setIsScanning(false);
        console.log('Scanning stopped after 5 seconds');
        BleClient.stopLEScan();
      }, 5000);
    } else {
      setIsScanning(false);
      await BleClient.stopLEScan();
      console.log('Scanning stopped');
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='border-color'>
          <IonTitle className='heading-title'>BlueToothScanning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='background' fullscreen>
        <IonButton className='primary-blue btn-text' onClick={handleInitialize}>Initialize</IonButton>
        <IonButton className='primary-blue btn-text' onClick={handleClick}>
          <div style={{ color: isScanning ? 'gray' : 'white' }}>
            <IonIcon icon={bluetooth}></IonIcon>
            {isScanning ? 'ScanningName...' : 'Scan for devicesName'}
          </div>
        </IonButton>

        <IonButton className='primary-blue btn-text' onClick={handleClickUUID}>
          <div style={{ color: isScanningUUID ? 'gray' : 'white' }}>
            <IonIcon icon={bluetooth}></IonIcon>
            {isScanningUUID ? 'ScanningUUID...' : 'Scan for devicesUUID'}
          </div>
        </IonButton>

        <IonButton className='primary-blue btn-text' onClick={writeUserData}>test WritingUserData</IonButton>
        <IonButton className='primary-blue btn-text' onClick={writeUserDataUUID}>test WritingUserDataUUID</IonButton>
        {devices.length > 0 && (
          <IonCard>
            <IonList>
              {devices.map((device, index) => (
                <IonItem key={index}>{device}</IonItem>
              ))}
            </IonList>
          </IonCard>
        )}

        {(devicesUUID !== undefined) && (
          <IonCard>
            <IonList>
              {devicesUUID.map((device, index) => (
                <IonItem key={index}>{device}</IonItem>
              ))}
            </IonList>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

