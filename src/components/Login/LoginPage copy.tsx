import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { OverlayEventDetail } from '@ionic/core/components';
import '../../theme/App.css'

// src/firebase.js
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

const LoginPageCopy: React.FC = () => {

    const modal = useRef<HTMLIonModalElement>(null);
    const inputEmail = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [feedBack, setFeedBack] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const userRef = database.ref('users/stringTesting');

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }

    async function handleConfirm() {
        setError('');
        setFeedBack('');
        setIsLoading(true);

        console.log('confirmed clicked!!!')
        console.log(email, password);


        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // if (!email || !password) {
        //     setError('Please fill in all fields');
        //     return;
        // }

        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            setError('Password have to be longer than 6 characters');
            return;
        }

        console.log(isLoading);


        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            setIsLoading(false);
            setFeedBack('Login Successfully!!!')
            setError('');
        } catch (error: any) {
            setIsLoading(false);
            if (!isLoading) {
                setError('Something wrong is happening...');
            }
        }

        console.log(isLoading);

        console.log(email, password);
    }

    const handleEmailChange0 = (e: any) => {
        setEmail(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value.toString());
    };

    // useEffect(() => {
    //     if (inputEmail.current) {
    //         setEmail(String(inputEmail.current.value));
    //     }
    // }, [inputEmail, email]);

    // useEffect(() => {
    //     if (inputPassword.current) {
    //         setPassword(String(inputPassword.current.value));
    //     }
    // }, [inputPassword, password]);


    const handlePasswordChange0 = (e: any) => {
        setPassword(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value.toString());
    };

    useEffect(() => {
        if (inputEmail.current) {
            setEmail(String(inputEmail.current.value));
        }
    }, [inputEmail]);


    useEffect(() => {
        if (inputPassword.current) {
            setPassword(String(inputPassword.current.value));
        }
    }, [inputPassword]);


    return (
        <>
            <IonButton className='primary-blue' id='login-modal' expand="full"  >
                <p className='btn-text'>Login</p>
            </IonButton>
            <IonModal ref={modal} trigger='login-modal' onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader>
                    <IonToolbar className='border-color'>
                        <IonButtons slot="start">
                            <IonButton className='light-body-text' onClick={() => modal.current?.dismiss()}>Finished</IonButton>
                        </IonButtons>
                        <IonTitle style={{ textAlign: "center" }}>
                            <h1 className='light-body-text '>Login</h1>
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton className='light-body-text' onClick={() => handleConfirm()}>
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
                                <IonInput onIonChange={handleEmailChange} type="email" placeholder='email'></IonInput>
                                {/* <IonInput ref={inputEmail} type="email" placeholder='email'></IonInput> */}
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput onIonChange={handlePasswordChange} type="password" placeholder='password'></IonInput>
                                {/* <IonInput ref={inputPassword} type="password" placeholder='password'></IonInput> */}
                            </IonItem>
                        </form>
                    </IonCard>
                    {isLoading && <p style={{ color: 'blue' }}>{isLoading}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {feedBack && <p style={{ color: 'green' }}>{feedBack}</p>}
                </IonContent>

            </IonModal>
        </>
    )
}

export default LoginPageCopy;

