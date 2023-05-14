import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { bluetooth } from 'ionicons/icons';
import { useState } from 'react';
import '../theme/App.css'

const Tab2: React.FC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [devices, setDevices] = useState<string[]>([]);

  const handleInitialize = async () => {
    await BleClient.initialize();
    console.log('Bluetooth initialized');
  };

  const handleClick = async () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      await BleClient.requestLEScan({}, scanResult => {
        console.log('Found device:', scanResult);
        if (scanResult.device.name) {
          setDevices([...devices, scanResult.device.name]);
        }
      });
      console.log('Scanning started');
    } else {
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
            {isScanning ? 'Scanning...' : 'Scan for devices'}
          </div>
        </IonButton>
        {devices.length > 0 && (
          <IonCard>
            <IonList>
              {devices.map((device, index) => (
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


// import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
// import './Tab2.css';

// // Import the wrapper class directly
// import { BleClient } from '@capacitor-community/bluetooth-le';
// import { bluetooth } from 'ionicons/icons';
// import { useState } from 'react';

// const Tab2: React.FC = () => {

//   const [isScanning, setIsScanning] = useState<Boolean>(false);
//   const [devices, setDevides] = useState<string[]>([] as string[]);
//   const [scanRes, setscanRes] = useState<any[]>([]);
//   const color = isScanning ? "gray" : "white"

//   const handleInitialize = () => {
//     console.log('handleInitialize Clicked');
//     BleClient.initialize();

//     // on mobile devices:::!!!
//     // BleClient.enable(); 
//   }

//   const handleClick = () => {
//     console.log('clicked');
//     setIsScanning(!isScanning);
//     scanForDevices();
//     console.log(isScanning);
//   }

//   const scanForDevices = () => {
//     if (typeof BleClient.requestLEScan === 'function') {
//       BleClient.requestLEScan({}, scanResult => {
//         console.log('Found device:', scanResult);
//         if (scanResult.device.name !== undefined) {
//           setDevides([...devices, scanResult.device.name]);
//         }
//       });
//     } else {
//       console.log('Bluetooth LE scan is not available on this platform.');
//     }
//   };


//   const scanForDevices3 = () => {
//     if (typeof navigator.bluetooth.requestLEScan === 'function') {
//       BleClient.requestLEScan({}, scanResult => {
//         console.log('Found device:', scanResult);
//         if (scanResult.device.name !== undefined) {
//           setDevides([...devices, scanResult.device.name]);
//         }
//       });
//     } else {
//       console.log('Not available on web browser!');
//     }
//   };


//   const scanForDevices2 = () => {
//     BleClient.requestLEScan({}, scanResult => {
//       console.log('Found device:', scanResult.device.name);
//     });
//   };

//   const scanForUUIDs = () => {
//     const uuids: Array<string> = []; // Array to store discovered UUIDs
//     BleClient.requestLEScan({}, scanResult => {
//       const device = scanResult.device;
//       if (device.uuids) {
//         device.uuids.forEach(uuid => {
//           if (!uuids.includes(uuid)) {
//             uuids.push(uuid);
//             console.log(`Discovered UUID: ${uuid}`);
//           }
//         });
//       }
//     });
//   };


//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>BlueToothScanning</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <IonButton onClick={handleInitialize}>Initialize</IonButton>
//         <IonButton onClick={handleClick}>
//           <div style={{ color: color }} >
//             <IonIcon icon={bluetooth}></IonIcon>
//             Enabled
//           </div>
//         </IonButton>
//         <IonButton onClick={scanForDevices}>Scan for devices</IonButton>
//         {devices.length ?
//           <IonCard>
//             <IonList>
//               {/* {devices.map(device => {
//                 return <IonItem>{device}</IonItem>;
//               })} */}
//               {devices.map((device, index) => (
//                 <IonItem key={index}>{device}</IonItem>
//               ))}
//             </IonList>
//           </IonCard> : null}
//       </IonContent>



//     </IonPage >
//   );
// };

// export default Tab2;










  // const handleClick = () => {
  //   console.log('enabçled');
  //   BleClient.initialize();
  //   console.log(BleClient.isEnabled());
  //   // BleClient.disable();
  //   console.log(BleClient.isEnabled());
  // }
