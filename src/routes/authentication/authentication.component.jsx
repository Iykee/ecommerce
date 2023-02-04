

    import SignupForm from '../../components/sign-up-form/sign-up-form.component';
    
    import'./authentication.styles.scss'

    import SignInForm from '../../components/sign-in-form/sign-in-form.component';


   const Authentication = () =>{
     
    //  useEffect( () => {
       
    //    ( async () => {
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef = await
    //         createUserDocumentFromAuth(response.user)
    //     }
    //    }) ();
        
       

    //  }, []);


   


    return(
        <div className='authentication-container'>

         <SignInForm />
       
         <SignupForm />
    
        </div>

    );
};


export default  Authentication;