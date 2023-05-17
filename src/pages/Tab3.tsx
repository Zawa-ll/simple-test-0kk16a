import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AuthLogin from '../components/AuthLogin/AuthLogin';
import ExploreContainer from '../components/ExploreContainer/ExploreContainer';
import LoginPageCopy from '../components/Login/LoginPage copy';
import RegisterPageCopy from '../components/Register/RegisterPage copy';
import RegisterPage from '../components/Register/RegisterPage copy';
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
        {/* <RegisterPageCopy /> */}
        {/* <LoginPageCopy /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
