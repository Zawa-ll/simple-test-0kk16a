


import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { useRef, useState } from 'react'
import { OverlayEventDetail } from '@ionic/core/components';
import { alarmSharp } from 'ionicons/icons';

interface User {
    userName: string,
    password: string,
}

interface LoginPageProps {
    onLogin: () => void;
}

const RegisterPage = () => {
    const modal = useRef<HTMLIonModalElement>(null);
    const inputUserName = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);
    const inputPasswordConfirm = useRef<HTMLIonInputElement>(null);

    const [user, setUser] = useState<User>({} as User);
    const [errors, setErrors] = useState<string[]>([] as string[]);

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log('Confirmed')
        }
    }

    function handleConfirm() {
        if (inputUserName.current?.value === "") {
            setErrors(['Please enter a username.']);
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
        setUser({ ...user, userName: String(inputUserName.current?.value), password: String(inputPassword.current?.value) });

        console.log(user);

        // Clear inputs
        inputUserName.current!.value = '';
        inputPassword.current!.value = '';
        inputPasswordConfirm.current!.value = '';

        // Dismiss modal
        modal.current?.dismiss();
    }

    return (
        <>
            <IonButton id='register-modal' expand="full" color={'medium'} >
                <p>Register</p>
            </IonButton>
            <IonModal ref={modal} trigger='register-modal' onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader >
                    <IonToolbar className='bar-background'>
                        <IonButtons slot="start">
                            <IonButton className='light-body-text ' onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>

                        <IonContent fullscreen className='bar-background'>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <h1 className='light-body-text '>Register</h1>
                            </div>
                        </IonContent>

                        <IonButtons slot="end">
                            <IonButton className='light-body-text ' onClick={() => handleConfirm()}>
                                Confirm
                            </IonButton>

                        </IonButtons>

                    </IonToolbar>
                </IonHeader>

                <IonContent className='ion-padding background'>
                    <IonCard className='card-background'>
                        <form>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Username</IonLabel>
                                <IonInput className='light-body-text' ref={inputUserName} type='text' placeholder='username' />
                            </IonItem>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Password</IonLabel>
                                <IonInput className='light-body-text' ref={inputPassword} type='password' placeholder='password' />
                            </IonItem>
                            <IonItem>
                                <IonLabel className='light-body-text' position='floating'>Password Confirm</IonLabel>
                                <IonInput className='light-body-text' ref={inputPasswordConfirm} type='password' placeholder='confirm password' />
                            </IonItem>
                        </form>
                        <IonItem className='background'>
                            <p style={{ 'color': 'red' }} >{errors.join('\n')}</p>
                        </IonItem>

                    </IonCard>
                </IonContent>

            </IonModal>
        </>
    )
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