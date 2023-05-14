import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
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

        if (inputUserName.current?.value === "") {
            setErrors(['Please enter a username.']);
            return;
        }

        if (inputPassword.current?.value === "") {
            setErrors(['Please enter a password.']);
            return;
        }


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
                    <IonToolbar className='border-color'>
                        <IonButtons slot="start">
                            <IonButton className='light-body-text' onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle style={{ textAlign: "center" }}>
                            <h1 className='light-body-text '>Register</h1>
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton className='light-body-text' onClick={() => handleConfirm(inputUserName.current?.value?.toString() || "", inputPassword.current?.value?.toString() || "")}>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className='background'>
                    <IonCard>
                        <form>
                            <IonItem>
                                <IonLabel position="floating">Username</IonLabel>
                                <IonInput ref={inputUserName} type="text" placeholder='userName'></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput ref={inputPassword} type="password" placeholder='password'></IonInput>
                            </IonItem>
                        </form>
                    </IonCard>
                    {errors.length ?
                        <IonCard className='background'>
                            <p style={{ color: 'red' }}>{errors}</p>
                        </IonCard> : null
                    }
                </IonContent>
            </IonModal>
        </>
    )
}

export default LoginPage;

