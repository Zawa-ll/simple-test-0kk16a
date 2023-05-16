import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonRow } from '@ionic/react';
import React from 'react'
import LoginPage from '../Login/LoginPage';
import RegisterPage from '../Register/RegisterPage';
import './PersonalMainBody.css'
import '../../theme/App.css'


interface Props {
    name: string;
}

const PersonalCenter = ({ name }: Props) => {
    const handleLogin = () => {
        console.log('OnLog Clicked');
    }
    return (
        <div>
            <IonCard className='card-background'>
                <IonCardHeader>
                    <IonCardTitle className='heading-title' style={{ fontSize: '2.5rem' }}>Hi, {name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className='subheading-title'>
                    <h1>Welcome to {name} 's Space!</h1>
                </IonCardContent>
            </IonCard >

            <IonGrid>
                <IonRow>
                    <IonCol>
                        <LoginPage onLogin={handleLogin} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <RegisterPage />
                    </IonCol>
                </IonRow>
            </IonGrid>





            {/* <IonList >
                <LoginPage onLogin={handleLogin} />
                <IonButton expand="full" color={'medium'} >
                    <p>Login In</p>
                </IonButton>
                <RegisterPage />
                <IonButton expand="full" color={'medium'}>
                    <p>Log Out</p>
                </IonButton>
                <IonButton expand='full' color={'medium'}>Setting</IonButton>

            </IonList> */}

        </div >
    )
}

export default PersonalCenter