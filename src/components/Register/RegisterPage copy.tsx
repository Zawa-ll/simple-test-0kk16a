import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { OverlayEventDetail } from '@ionic/core/components';
import '../../theme/App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from 'firebase/database'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpQoMMzOGkJ-n3H0A5nRYGeto7ubNkKF8",
    authDomain: "backend-e12d1.firebaseapp.com",
    databaseURL: "https://backend-e12d1-default-rtdb.firebaseio.com",
    projectId: "backend-e12d1",
    storageBucket: "backend-e12d1.appspot.com",
    messagingSenderId: "730317868996",
    appId: "1:730317868996:web:68359d31c1ab5a9a369e91",
    measurementId: "G-158MT6TRS3"
};

firebase.initializeApp(firebaseConfig);

interface User {
    email: string,
    password: string,
}

const RegisterPageCopy = () => {

    const modal = useRef<HTMLIonModalElement>(null);
    const inputEmail = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);
    const inputPasswordConfirm = useRef<HTMLIonInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    // const [users, setUsers] = useState<User[]>([]);
    // const [user, setUser] = useState<User>({} as User);
    // const [errors, setErrors] = useState<string[]>([] as string[]);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }
    const handleConfirm = async (event: any) => {
        event.preventDefault();
        setError('');

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // if (!email || !password || !passwordConfirm) {
        //     setError('Please fill in all fields');
        //     return;
        // }
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password have to be longer than 6 characters');
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
        }

        // Dismiss modal
        modal.current?.dismiss();
    };



    const handleConfirm2 = async (event: any) => {
        event.preventDefault();
        console.log('confirm clicked')
        if (inputEmail.current?.value !== undefined && inputEmail.current?.value !== null) {
            await setEmail(String(inputEmail.current.value))
        }

        if (inputPassword.current?.value !== undefined && inputPassword.current?.value !== null
            && inputPasswordConfirm.current?.value !== undefined && inputPasswordConfirm.current?.value !== null) {
            if (inputPasswordConfirm.current.value === inputPassword.current.value) {
                await setPassword(String(inputPassword.current.value));
            }
        }

        console.log('email:', { email }, 'password', { password });

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error);
        }
        // Dismiss modal
        // modal.current?.dismiss();
    }

    const handleEmailChange = (e: any) => {
        const newEmail = (e.target as HTMLInputElement).value;
        setEmail(newEmail);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmedChange = (e: any) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <>
            <IonButton className='primary-blue' id='register-modal' expand="full">
                <p className='btn-text'>Register</p>
            </IonButton>
            <IonModal ref={modal} trigger='register-modal' onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader >
                    <IonToolbar className='border-color'>
                        <IonButtons slot="start">
                            <IonButton className='light-body-text' onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle style={{ textAlign: "center" }}>
                            <h1 className='light-body-text '>Register</h1>
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton className='light-body-text ' onClick={handleConfirm}>Confirm</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className='ion-padding background'>
                    <IonCard className='card-background'>
                        <form>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Email</IonLabel>
                                <IonInput onIonChange={handleEmailChange} type='email' placeholder='username' />
                            </IonItem>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Password</IonLabel>
                                <IonInput onIonChange={handlePasswordChange} type='password' placeholder='password' />
                            </IonItem>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Password Confirm</IonLabel>
                                <IonInput onIonChange={handlePasswordConfirmedChange} type='password' placeholder='confirm password' />
                            </IonItem>
                        </form>
                    </IonCard>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </IonContent>
            </IonModal>
        </>
    );

}


export default RegisterPageCopy;