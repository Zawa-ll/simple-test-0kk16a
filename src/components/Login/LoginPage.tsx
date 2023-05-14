import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useRef, useState } from 'react'
import { OverlayEventDetail } from '@ionic/core/components';
import { alarmSharp } from 'ionicons/icons';
import '../../theme/App.css'

interface User {
    userName: string;
    password: string;
}

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const inputUserName = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);

    const [user, setUser] = useState<User>({} as User);
    const [errors, setErrors] = useState<string[]>([] as string[]);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }

    function handleConfirm(userName: string, password: string) {
        console.log('confirmed!!!')

        if (inputUserName.current?.value !== "" && inputPassword.current?.value !== "") {
            setUser({ ...user, userName: userName, password: password });
            console.log(user);
            onLogin();
        }
    }

    return (
        <>
            <IonButton className='primary-blue' id='login-modal' expand="full"  >
                <p className='btn-text'>Login</p>
            </IonButton>
            <IonModal ref={modal} trigger='login-modal' onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>

                        <IonContent fullscreen>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <h1>Welcome</h1>
                            </div>
                        </IonContent>

                        <IonButtons slot="end">
                            <IonButton onClick={() => handleConfirm(inputUserName.current?.value?.toString() || "", inputPassword.current?.value?.toString() || "")}>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className='ion-padding'>
                    <form>
                        <IonItem>
                            <IonLabel position="floating">Username</IonLabel>
                            <IonInput ref={inputUserName} type="text" placeholder='userName'></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput ref={inputPassword} type="password" placeholder='password'></IonInput>
                        </IonItem>

                        <p style={{ color: 'red' }}>{errors}</p>
                    </form>
                </IonContent>
            </IonModal>
        </>
    )
}

export default LoginPage;

