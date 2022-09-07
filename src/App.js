import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Pages/Login/Login";
import Header from "./component/Layout/Header/Header";
import SignUp from "./component/Pages/SignUp/SignUp";
import WellComePage from "./component/Pages/WellComePage";
import Profile from "./component/Pages/Profile/Profile";
import { useEffect, useState } from "react";

function App() {
  const [displayName,setDisplayName] = useState('');
  const [photoUrl,setPhotoUrl] = useState('')


  useEffect(()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA99thkT2KGxjW0fXTrkbxeP83YIjyXr10',{
      method:'POST',
      body:JSON.stringify({
        idToken:localStorage.getItem('idToken')
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
      if(res.ok){
        return res.json();
      }else{
        return res.json((data)=>{
          throw new Error(data.error.message)
        })
      }
    }).then((data)=>{
      setDisplayName(data.displayName);
      setPhotoUrl(data.photoUrl)
    }).catch((err)=>{
      alert(err)
    })

    
  },[])

 
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/welcome" element={<WellComePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/completeprofile" element={<Profile  inputName={displayName} inputURL={photoUrl}/>} />
      </Routes>
    </>
  );
}

export default App;
