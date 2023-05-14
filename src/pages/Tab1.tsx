import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar className='border-color heading-title'>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='background' fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
