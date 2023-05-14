import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import avatarImage from '../assets/avatarImage.png';
import PersonalCenter from '../components/PersonalMainBody/PersonalMainBody';
import Setting from '../components/SettingComponent/Setting';
import './Personal.css';
// import '../App.css';

const Personal: React.FC = () => {
  return (
    <IonPage>
      <IonHeader >
        <IonHeader>
          <IonToolbar style={{ '--background': 'pink' }} className="bar-background">
            <IonTitle className="light-body-text" slot='start'>Personal Center</IonTitle>
            <p className='heading-title' slot='end' >
              <Setting />
            </p>
          </IonToolbar>
        </IonHeader>
        <IonToolbar >
          <div style={{ paddingTop: '15px', paddingLeft: '15px', display: 'flex', alignItems: 'center' }}>
            {/* <img className='circle-pic' src={avatarImage} alt='Avatar' /> */}
            <IonTitle style={{ marginLeft: '10px' }}>
              <div style={{ paddingBottom: '50px' }}>
                <h1>Haydn's Space</h1>
                <div style={{ fontSize: '15px', color: 'grey' }}>ID: 000001</div>
              </div>
            </IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-style">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Personal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PersonalCenter name='Haydn' />
      </IonContent>
    </IonPage >
  );
};

export default Personal;
