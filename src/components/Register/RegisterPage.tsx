import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { OverlayEventDetail } from '@ionic/core/components';
import { alarmSharp } from 'ionicons/icons';
import '../../theme/App.css';

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

//firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


interface User {
    email: string,
    password: string,
}

const RegisterPage = () => {

    const writeUserDataMessage = () => {
        console.log(database);
        set(ref(database, 'users/stringTesting'), {
            message: 'testing333',
        });
    }
    const writeUserData = () => {
        console.log(database);
        set(ref(database, 'users/newUsers'), {
            users: users,
        })
    }


    const modal = useRef<HTMLIonModalElement>(null);
    const inputEmail = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);
    const inputPasswordConfirm = useRef<HTMLIonInputElement>(null);

    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({} as User);
    const [errors, setErrors] = useState<string[]>([] as string[]);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }

    useEffect(() => {
        if (users?.length !== 0) {
            writeUserData();
        }
    }, [users])

    function handleConfirm() {
        if (inputEmail.current?.value === "") {
            setErrors(['Please enter a email.']);
            return;
        }

        if (inputPassword.current?.value === "") {
            setErrors(['Please enter a password.']);
            return;
        }

        if (inputPassword.current?.value !== inputPasswordConfirm.current?.value) {
            setErrors(['Passwords do not match.']);
            return;
        }

        const newUser = {
            email: String(inputEmail.current?.value),
            password: String(inputPassword.current?.value),
        };

        setUser(newUser);
        if (users?.length) {
            setUsers([...users, newUser]);
        } else {
            setUsers([newUser]);
        }


        console.log(newUser);
        console.log(users);

        // Clear inputs
        inputEmail.current!.value = '';
        inputPassword.current!.value = '';
        inputPasswordConfirm.current!.value = '';

        // Dismiss modal
        modal.current?.dismiss();
    }

    const getUserLog = async () => {
        console.log('initialized!')
        const userLogRef = ref(database, 'users/newUsers/users')

        await get(userLogRef).then((snapshot) => {
            const userLog = snapshot.val();
            console.log('successfully get User log!');
            setUsers(userLog);
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
            <IonButton onClick={getUserLog} className='primary-blue' id='register-modal' expand="full">
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
                            <IonButton className='light-body-text ' onClick={() => handleConfirm()}>Confirm</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className='ion-padding background'>
                    <IonCard className='card-background'>
                        <form>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Email</IonLabel>
                                <IonInput ref={inputEmail} type='text' placeholder='username' />
                            </IonItem>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Password</IonLabel>
                                <IonInput ref={inputPassword} type='password' placeholder='password' />
                            </IonItem>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Password Confirm</IonLabel>
                                <IonInput ref={inputPasswordConfirm} type='password' placeholder='confirm password' />
                            </IonItem>
                            {/* <IonButton onClick={writeUserData}></IonButton> */}
                        </form>
                    </IonCard>
                    {errors.length ?
                        <IonCard className='background'>
                            <IonItem className='background'>
                                <p style={{ 'color': 'red' }}>{errors.join('\n')}</p>
                            </IonItem>
                        </IonCard> : null
                    }
                    {/* <IonButton onClick={writeUserDataMessage}>testAddMessage</IonButton> */}
                </IonContent>
            </IonModal>
        </>
    );

}






// import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
// import React, { useRef, useState } from 'react'
// import { OverlayEventDetail } from '@ionic/core/components';
// import { alarmSharp } from 'ionicons/icons';

// interface User {
//     userName: string,
//     password: string,
// }

// const RegisterPage = () => {
//     const modal = useRef<HTMLIonModalElement>(null);
//     const inputUserName = useRef<HTMLIonInputElement>(null);
//     const inputPassword = useRef<HTMLIonInputElement>(null);
//     const inputPasswordConfirm = useRef<HTMLIonInputElement>(null);

//     const [user, setUser] = useState<User>({} as User);
//     const [errors, setErrors] = useState<string[]>([] as string[]);

//     function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
//         if (ev.detail.role === 'confirm') {
//             console.log('Confirmed')
//         }
//     }

//     function handleConfirm(userName: string, password: string) {
//         console.log('confirmed!!!')

//         if (inputUserName.current?.value !== "" && inputPassword.current?.value !== "") {
//             setUser({ ...user, userName: userName, password: password });
//             console.log(user);
//         }
//     }
//     const handleSubmit = () => {
//         console.log('confirmed!');
//     }

//     return (
//         <>
//             <IonButton id='register-modal' expand="full" color={'medium'} >
//                 <p>Register</p>
//             </IonButton>
//             <IonModal ref={modal} trigger='register-modal' onWillDismiss={(ev) => onWillDismiss(ev)}>
//                 <IonHeader>
//                     <IonToolbar>

//                         <IonButtons slot="start">
//                             <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
//                         </IonButtons>

//                         <IonContent fullscreen>
//                             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//                                 <h1>Welcome</h1>
//                             </div>
//                         </IonContent>

//                         <IonButtons slot="end">
//                             <IonButton onClick={() => handleConfirm(inputUserName.current?.value?.toString() || "", inputPassword.current?.value?.toString() || "")}>
//                                 Confirm
//                             </IonButton>

//                         </IonButtons>

//                     </IonToolbar>
//                 </IonHeader>

//                 <IonContent className='ion-padding'>
//                     <form onSubmit={handleSubmit}>
//                         <IonItem>
//                             <IonLabel position='floating'>Username</IonLabel>
//                             <IonInput ref={inputUserName} type='text' placeholder='username' />
//                         </IonItem>
//                         <IonItem>
//                             <IonLabel position='floating'>Password</IonLabel>
//                             <IonInput ref={inputPassword} type='password' placeholder='password' />
//                         </IonItem>
//                         <IonItem>
//                             <IonLabel position='floating'>Password Confirm</IonLabel>
//                             <IonInput ref={inputPasswordConfirm} type='password' placeholder='confirm password' />
//                         </IonItem>
//                         <IonButton expand='block' type='submit'>
//                             Register
//                         </IonButton>
//                     </form>
//                     <p style={{ color: 'red' }}>{errors}</p>
//                     <IonButton color='secondary' fill='clear' routerLink='/login'>
//                         Already have an account? Sign in.
//                     </IonButton>
//                 </IonContent>

//                 {/* <IonContent className='ion-padding'>
//                     <form>
//                         <IonItem>
//                             <IonLabel position="floating">Username</IonLabel>
//                             <IonInput ref={inputUserName} type="text" placeholder='userName'></IonInput>
//                         </IonItem>
//                         <IonItem>
//                             <IonLabel position="floating">Password</IonLabel>
//                             <IonInput ref={inputPassword} type="password" placeholder='password'></IonInput>
//                         </IonItem>
//                         <IonItem>
//                             <IonLabel position="floating">PasswordConfirm</IonLabel>
//                             <IonInput ref={inputPasswordConfirm} type="text" placeholder='password Confirmed'></IonInput>
//                         </IonItem>
//                         <IonButton type='link'>
//                             Already have account? Sign In.
//                         </IonButton>

//                         <p color='red'>{errors}</p>

//                     </form>
//                 </IonContent> */}
//             </IonModal>




//         </>
//     )
// }

export default RegisterPage;