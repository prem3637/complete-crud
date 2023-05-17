import React,{useEffect, useState} from 'react';
import { json, useNavigate } from 'react-router-dom';

function Login() {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();
  const[data,setData]=useState([])
  useEffect(()=>{
    fetch('http://localhost:8000/register').then((result)=>{
      result.json().then((res)=>{
        setData(res)
      })
    })
  },[])
  const onLoginPress = (e) => {
    //e.preventDefault();
    const data = { email, password };

    fetch('http://localhost:8000/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .then((result) => {
        //console.log(result);
        if (result.status === true && result.code === 200) {
          console.log(result.data);
          window.localStorage.setItem("user", JSON.stringify(result.data._id));
          window.localStorage.setItem("userid", JSON.stringify(result.data));
alert(result.message)
          navigate("/");

          //console.log("After Navigation");
        } else {
          alert(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  // const login=async()=>{
  //  let result =await fetch('http://localhost:8000/register',{
  //   method:"post",
  //   headers:{"Content-Type":"application/json"},
  //   body:JSON.stringify({email,password})
  //  })
  //  result = await result.json()
  //  if(result.name){
  //   localStorage.setItem('user',JSON.stringify(result))
  //   navigate('/')
  //  }else{
  //   // alert('galat hai')
  //  }

  // }



  return (
    <div className='container-fluid'>
    <div className="row">
      <div className="col-sm-6"></div>
      <div className="col-sm-6">
        <div className="row w-75 login-user" style={{marginTop:"100px"}} >
          <div className="col-sm-12">
            <h2 style={{textAlign:"center"}}>Login Here</h2>
          <input type="email" className='form-control' placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/>
        <input type="password" className='form-control' placeholder='Enter Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  /><br/>
       <button className='btn btn-success w-100' onClick={onLoginPress} >Login</button><br/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;