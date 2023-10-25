import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CPButton from "../component/CPbutton";
import CPInput from "../component/CPinput";
import { fbLogin } from "../config/firebasemethods";
import { useDispatch } from "react-redux";
import { user } from "../config/redux/reducers/userslice";

const containerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
};

// const formStyle = {
//   width: '500px',
//   backgroundColor: 'red',
//   padding: '40px',
//   borderRadius: '30px',
//   boxShadow: '0 0 50px #FFBB00',


  
// };

const headingStyle = {
  fontSize: '2.5rem',
  fontWeight: '500',


};

const loginButtonStyle = {
  cursor: 'pointer',
  width: '17%',
  
};


export default function Login() {
  const [model, setModel] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fillModel = (key: string, val: any) => {
    setModel({ ...model, [key]: val });
  };

  const loginUser = () => {

    fbLogin(model)
      .then((res:any) => {
        console.log(res);
        dispatch(user(res))
        navigate(`/`)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const goBackToSignUp = () => {
    navigate(`/signup`);
  };

  return (<div className="mdv">
    <div style={containerStyle} >
      <div className="formStyle ">
        <div style={{ padding: '20px' }} className="hed1">
          <h1 style={headingStyle}>Login</h1>
        </div>

        {/* <div style={{ padding: '20px' ,  color: '#ffffff', }} >
          <CPInput 
            value={model.email}
            onChange={(e: any) => fillModel("email", e.target.value)}
            label="Email"
            style={{ width: '100%' ,  color: '#ffffff',}}
          />
        </div>
        <div style={{ padding: '20px' ,  color: '#ffffff',}} >
          <CPInput
            value={model.password}
            onChange={(e: any) => fillModel("password", e.target.value)}
            label="Password"
            type="password"
            style={{ width: '100%' ,  color: '#ffffff',}}
          />
        </div> */}
        <div className="logbox">
         <div className=' login-input-box'>
            <CPInput label='Email' 
              value={model.email}
              onChange={(e: any) => { fillModel("email", e.target.value) }}
              
            />
          </div><br />
          <div className='login-input-box'>
            <CPInput label='Password'
              type='password'
              value={model.password}
              onChange={(e: any) => { fillModel("password", e.target.value) }}
            />
          </div>
        <div style={{ padding: '16px' }} className="login">
          <CPButton style={{ color: "white", backgroundColor: "#33b249" }} onClick={loginUser} label="Login" /><br />
          <p className="sgnup" onClick={goBackToSignUp}>Don't Have An Account?</p>
          <p onClick={goBackToSignUp} className="sgnup" >Sign Up</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
