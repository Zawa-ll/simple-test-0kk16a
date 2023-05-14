import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab2.css';

// Import the wrapper class directly
import { BleClient } from '@capacitor-community/bluetooth-le';

const Tab2: React.FC = () => {


  const handleClick = () => {
    console.log('enabçled');
    BleClient.initialize();
    console.log(BleClient.isEnabled());
    BleClient.disable();
    console.log(BleClient.isEnabled());
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={handleClick}>
          Enabled
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
