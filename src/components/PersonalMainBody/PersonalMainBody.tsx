import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/react';
import { card, colorFill } from 'ionicons/icons';
import React from 'react'
import LoginPage from '../Login/LoginPage';
import RegisterPage from '../Register/RegisterPage';
import './PersonalMainBody.css'


interface Props {
    name: string;
}

const PersonalCenter = ({ name }: Props) => {
    const handleLogin = () => {
        console.log('OnLog Clicked');
    }
    return (
        <div>
            <IonCard color={'dark'}>
                <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '2.5rem' }}>Hi, {name}</IonCardTitle>
                    <IonCardSubtitle>Welcome</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <h1>Welcome to {name} 's Space</h1>
                </IonCardContent>
            </IonCard >

            <IonList className="lst-color">
                <LoginPage onLogin={handleLogin} />
                {/* <IonButton expand="full" color={'medium'} >
                    <p>Login In</p>
                </IonButton> */}
                <RegisterPage />
                <IonButton expand="full" color={'medium'}>
                    <p>Log Out</p>
                </IonButton>
                <IonButton expand='full' color={'medium'}>Setting</IonButton>

            </IonList>

            {/* <IonCard>
            <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <h1>Welcome to {name} 's Space</h1>        
            </IonCardContent>
        </IonCard> */}
        </div >
    )
}

export default PersonalCenter