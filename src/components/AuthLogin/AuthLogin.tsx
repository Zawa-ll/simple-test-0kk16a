import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import React, { useRef } from "react";

const AuthLogin = () => {

    const modal = useRef<HTMLIonModalElement>(null);
    const inputEmail = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }


    return (
        <>
            <IonButton >
                <p className='btn-text'>Login</p>
            </IonButton>
            <IonModal ref={modal} trigger='login-modal' onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader>
                    <IonToolbar className='border-color'>
                        <IonButtons slot="start">
                            <IonButton className='light-body-text'>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle style={{ textAlign: "center" }}>
                            <h1 className='light-body-text '>Login</h1>
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton className='light-body-text'>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className='background'>
                    <IonCard>
                        <form>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput ref={inputEmail} type="text" placeholder='email'></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput ref={inputPassword} type="password" placeholder='password'></IonInput>
                            </IonItem>
                        </form>
                    </IonCard>
                </IonContent>

            </IonModal>
        </>
    )
}


export default AuthLogin;