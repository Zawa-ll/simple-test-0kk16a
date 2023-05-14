import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab2.css';

// Import the wrapper class directly
import { BleClient } from '@capacitor-community/bluetooth-le';
import { bluetooth } from 'ionicons/icons';
import { useState } from 'react';

const Tab2: React.FC = () => {

  const [isScanning, setIsScanning] = useState<Boolean>(false);

  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BlueToothScanning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={handleClick}>
          <>
            <IonIcon icon={bluetooth}></IonIcon>
            Enabled
          </>
        </IonButton>
      </IonContent>
    </IonPage>
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
