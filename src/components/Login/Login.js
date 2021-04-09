import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn : false,
    name: '',
    email: '',
    photo: '',
    error:'',
    success: false,
  });


  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn =() => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      
        history.replace(from);
    })
  };

  const signOut = () =>{
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  };
  
  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  };

  const handleBlur = (event) =>{
    let isFormValid = true;
    // console.log(event.target.name, event.target.value);
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) =>{
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    e.preventDefault();
  };



  return (
    <div style={{textAlign:"center"}}>
      {
        user.isSignedIn
        ? <button onClick={signOut}>Sign out</button>
        : <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt={user.name}/>
        </div>
      }

      <h1>Our own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Singup</label>
      <form >
        { newUser && <input name='name' type="text" onBlur={handleBlur} placeholder="write your email name!"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="write your email address!" required/><br/>
        <input type="password"  name="password" onBlur={handleBlur} placeholder="Your Password"/><br/>
        <input onClick={handleSubmit} type="submit" value={newUser ? 'SignUp' : 'SignIn'}/>
      </form>
      
      <p style={{color:"red"}}>{user.error}</p>
      {
        user.success && 
        <p style={{color:"green"}}>User {newUser ? 'Created' : 'Logged In'} SuccessFully</p>
      }
    </div>
  );
}

export default Login;
