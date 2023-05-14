import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonModal, IonTitle, IonToolbar, useIonViewDidLeave } from '@ionic/react';
import React, { useRef } from 'react';
import { arrowBack, arrowBackCircle, exitOutline, leafOutline, settingsSharp } from 'ionicons/icons';
import LoginPage from '../Login/LoginPage';
// import '../../App.css';
import { exit } from 'process';

const handleClick = () => {
    console.log('setting clicked!');
}

const Setting = () => {
    const modalSetting = useRef<HTMLIonModalElement>(null);
    const handleExitSetting = () => {
        modalSetting.current?.dismiss();
    }

    return (
        <>
            <IonIcon id='setting-modal' onClick={handleClick} style={{ paddingRight: '10px' }} className='light-body-text' icon={settingsSharp} />
            <IonModal ref={modalSetting} trigger='setting-modal'>


                <IonContent className='background'>
                    <IonHeader>
                        <>
                            {/* <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons> */}
                            <IonToolbar className="bar-background">
                                <IonItem className="bar-background">
                                    <IonIcon className='bar-icon' icon={arrowBackCircle} onClick={handleExitSetting}></IonIcon>
                                    <IonTitle className="ion-text-center light-body-text">Setting</IonTitle>
                                </IonItem>
                            </IonToolbar>
                        </>
                    </IonHeader>
                    <IonButton className='card-background bar-icon' expand='full'>
                        account
                    </IonButton>
                </IonContent>
            </IonModal>
        </>

    );
};

export default Setting;
