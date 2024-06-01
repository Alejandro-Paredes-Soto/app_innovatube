import { React, useEffect, useState } from 'react';
import { methodPost } from '../../services';
import { useNavigate } from 'react-router-dom';
import Snackbar from 'sweetalert2'
import { Button, Input, Modal } from 'antd'
import './login.css';

const Login = () => {

    const [dataLogin, setDataLogin] = useState({
      userName: "",
      password: ""
    })
    const [email, setEmail] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState({
      loading: "",
      content: "Entrar"
    })

    const [loadingRecuperarPass, setLoadingRecuperarPass] = useState({
      loading: "",
      content: "Aceptar"
    })


    const onSubmit = async (e) => {
      
        e.preventDefault();

       try {

        const { userName, password } = dataLogin

        setLoading({
          loading: "disabled",
          content: "Entrando..."
        })
           
            const response = await methodPost("api/v1/users/login", {
            nameUser: userName.trim(),
            password: password.trim()
        })

        setLoading({
          loading: "",
          content: "Entrar"
        })

        if (response.status === 200) {
         localStorage.setItem("token", response.json.token)
         localStorage.setItem("nameUser", response.json.nameUser)
         localStorage.setItem("idUser", response.json.idUser)

         navigate("/dashboard")
        } else {
          Snackbar.fire({
            title: "Error",
            text: "Usuario y/o contraseña incorrectos.",
            icon: "error"
          })
        }
        
       } catch (error) {
        Snackbar.fire({
          title: "Error",
          text: "Ha ocurrido un error inesperado, intentalo de nuevo",
          icon: "error"
        })
       }
    }

    const onClickOk = async () => {
        
      try {

        setLoadingRecuperarPass({
          loading: "disabled",
          content: "Recuperando..."
        })

        const response = await methodPost(
          "api/v1/password/forgot-password",
          {
            email: email
          },
          null
        );

        setLoadingRecuperarPass({
          loading: "",
          content: "Aceptar"
        })
           
        if (response.status === 200) {

          Snackbar.fire({
            title: "Correcto",
            text: "Se ha enviado un correo a tu cuenta para recuperar tu contraseña.",
            icon: "success"
          })
            
        //  window.open(response.json.message, "_blank")
          
        } else {
          Snackbar.fire({
            title: "Error",
            text: "El correo no existe o ha ocurrido un error",
            icon: "error"
          })
        }
       
        
      } catch (error) {
        Snackbar.fire({
          title: "Error",
          text: "Ha ocurrido un error inesperado, intentalo de nuevo",
          icon: "error"
        })
      }
    }

    useEffect(() => {
       if ( localStorage.getItem("token") != null  ) {
           navigate('/dashboard')
       }
    }, [])

    return (
        <section>

    <div className="card">
        <div className="title">
            <h2>Iniciar Sesion</h2>
        </div>
        <form>
            <div className="mb-3">
              <label  className="form-label">
                <i className="bi bi-envelope-fill text-white"></i>
              </label>
              <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Correo electronico o Usuario"
                  autoComplete="off"
                  onChange={(e) => {
                    setDataLogin(prevDataLogin => {
                      prevDataLogin.userName = e.target.value;
                      return prevDataLogin
                    })
                  }}
                  />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-key-fill text-white"></i>
              </label>
              <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Contraseña"
                  autoComplete="off"
                  onChange={(e) => {
                    setDataLogin(prevDataLogin => {
                      prevDataLogin.password = e.target.value;
                      return prevDataLogin
                    })
                  }}
                  />
            </div>
            <div className="mb-3" onClick={() => {
              setOpenModal(true)
            }}>
              <a className="button" style={{cursor: "pointer"}}>¿Olvidaste la contraseña? Recuperala aqui</a>
            </div>

            <div className="mb-3">
               <a className="button" 
               style={{cursor: "pointer"}}
               onClick={() => {
                navigate("/registerUser")
               }}
               >¿No tienes cuenta? Registrate aqui</a>
            </div>

            <button 
               type="button" 
               className={`btn btnLogin ${loading.loading}`}
               onClick={onSubmit}
               >{loading.content}</button>
          </form>

    </div>

    <Modal 
        title="Ingresa tu correo electronico" 
        open={openModal} 
        // cancelText="Cancelar"
        // okText={loadingRecuperarPass.loading}
        // onOk={onClickOk} 
        footer={[
          <button 
          className='btn btn-danger mr-3' 
          style={{marginRight: '5px'}}
          onClick={() => setOpenModal(false)}
          >Cancelar</button>,
          
          <button 
             className={`btn btn-primary ${loadingRecuperarPass.loading}`}
             onClick={onClickOk}
             >{loadingRecuperarPass.content}</button>,

        ]}
        onCancel={() => setOpenModal(false)}>
         
         <Input type='email' placeholder='Correo electronico' onChange={(e) => setEmail(e.target.value)}/>
      </Modal>

</section>
    );
}

export default Login;