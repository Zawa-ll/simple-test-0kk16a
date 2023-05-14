import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar className='border-color heading-title'>
          <IonTitle>Tab3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='background' fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
