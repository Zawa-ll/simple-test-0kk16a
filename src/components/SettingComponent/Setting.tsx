import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonModal, IonRow, IonTitle, IonToolbar, useIonViewDidLeave } from '@ionic/react';
import React, { useRef } from 'react';
import { arrowBack, arrowBackCircle, exitOutline, leafOutline, settingsSharp } from 'ionicons/icons';
import LoginPage from '../Login/LoginPage';
// import '../../App.css';

import '../../theme/App.css';

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
                        <IonToolbar className="border-color" style={{ paddingLeft: '15px' }}>
                            <IonIcon
                                className="subheading-title"
                                style={{ height: "25px", width: "25px" }}
                                icon={arrowBackCircle}
                                onClick={handleExitSetting}
                                slot="start"
                            />
                            <IonTitle className="subheading-title" style={{ textAlign: "center" }}>Setting</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonButton className='card-background' expand='full'>
                        account
                    </IonButton>
                </IonContent>
            </IonModal>
        </>

    );
};

export default Setting;
