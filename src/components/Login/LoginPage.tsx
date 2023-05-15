import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { OverlayEventDetail } from '@ionic/core/components';
import { alarmSharp } from 'ionicons/icons';
import '../../theme/App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from 'firebase/database'


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


interface User {
    userName: string;
    password: string;
}

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {

    //firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);


    const modal = useRef<HTMLIonModalElement>(null);
    const inputUserName = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);

    const [user, setUser] = useState<User>({} as User);
    const [errors, setErrors] = useState<string[]>([] as string[]);
    const [userLog, setUserLog] = useState<User[]>([]);
    const [loginFeedback, setLoginFeedBack] = useState('');

    // const userRef = database.ref('users/stringTesting');

    const getUserDataMessage = async () => {
        const messageRef = ref(database, 'users/stringTesting');

        await get(messageRef).then((snapshot) => {
            const data = snapshot.val();
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }

    // useEffect(() => {
    //     if (user.userName && user.password) {
    //         console.log(user);
    //         onLogin();
    //     }
    // }, [user]);

    useEffect(() => {
        checkExist()
    }, [user]);

    async function handleConfirm(userName: string, password: string) {
        console.log('confirmed clicked!!!')
        await getUserLog();

        if (inputUserName.current?.value === "") {
            setErrors(['Please enter a username.']);
            return;
        }

        if (inputPassword.current?.value === "") {
            setErrors(['Please enter a password.']);
            return;
        }

        if (inputUserName.current?.value !== "" && inputPassword.current?.value !== "") {
            const newUser = { userName: userName, password: password };
            setUser(newUser);

            checkExist();
        }
    }


    async function handleConfirm2(userName: string, password: string) {
        console.log('confirmed clicked!!!')

        if (inputUserName.current?.value === "") {
            setErrors(['Please enter a username.']);
            return;
        }

        if (inputPassword.current?.value === "") {
            setErrors(['Please enter a password.']);
            return;
        }

        if (inputUserName.current?.value !== "" && inputPassword.current?.value !== "") {
            // const newUser = { userName: userName, password: password };
            await setUser({ ...user, userName: userName, password: password });
            // .then(() => { });

            checkExist();
            // setUser({ ...user, userName: userName, password: password });
        }

    }

    const getUserLog = async () => {
        const userLogRef = ref(database, 'users/newUsers/users')

        await get(userLogRef).then((snapshot) => {
            const userLog = snapshot.val();
            console.log('successfully get User log!');
            setUserLog(userLog);
        }).catch((error) => {
            console.error(error);
        })
    }

    const checkExist = async () => {
        await getUserLog();
        console.log('checkExist clicked');
        console.log(userLog);
        let found = false;
        if (userLog) {
            userLog.map(log => {
                if (log.userName === user.userName && log.password === user.password) {
                    found = true;
                    console.log('find user!');
                    setLoginFeedBack('login Successfully');
                    console.log(user);
                }
            })
        }

        if (!found) {
            console.log(user);
            console.log('cannot found');
            setLoginFeedBack('some information is error!');
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
                            <h1 className='light-body-text '>Login</h1>
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

                    <IonButton onClick={getUserDataMessage}>testGetMessage</IonButton>
                    <IonButton onClick={getUserLog}>testGetUserLog</IonButton>
                    <IonButton onClick={checkExist}>checkExist</IonButton>
                    <IonTitle color={'warning'}>{loginFeedback}</IonTitle>
                </IonContent>

            </IonModal>
        </>
    )
}

export default LoginPage;

