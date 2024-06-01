import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from 'sweetalert2'
import { methodPost } from './../../services/index'

import './register.css'

const Register = () => {

    const navigate = useNavigate();

    const [dataUser, setDataUser] = useState({
      name: "", 
      lastName: "",
      nameUser: "",
      email: "",
      password: "", 
      password2: "",
      recaptcha: true
    })

    const [loading, setLoading] = useState({
      loading: "",
      content: "Entrar"
    })


    const onClickRegisterUser = async () => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/;
       console.log(regex.test(dataUser.email))
      if (!regex.test(dataUser.email)) {
        Snackbar.fire({
          title: "Error",
          text: "El formato del correo no es correcto",
          icon: "error",
         })
      }

      if (dataUser.password != dataUser.password2) {
        Snackbar.fire({
          title: "Error",
          text: "Las contraseñas no coinciden",
          icon: "error",
         })
      }

      try {

        setLoading({
          loading: "disabled",
          content: "Registrando..."
        })

        const response = await methodPost("api/v1/users/registerUser", dataUser, localStorage.getItem("token"))
        
        setLoading({
          loading: "",
          content: "Entrar"
        })

        if (response.status === 200) {
          Snackbar.fire({
            title: "Correcto",
            text: "Usuario creado de menera exitosa, ahora inicia sesion con tu cuenta",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            showCancelButton: false
           }).then((result) => {
            if (result.isConfirmed) {
              navigate("/")
            }
           })
        } else if (response.status === 201) {
            Snackbar.fire({
              title: "Advertencia",
              text: "Ya existe un usuario con el nombre " + dataUser.nameUser,
              icon: "warning",
              showConfirmButton: true,
              confirmButtonText: "Ok",
              showCancelButton: false
             })
          
        } else {
          Snackbar.fire({
            title: "Error",
            text:  response.message,
            icon: "error",
           })
        }

      
        
      } catch (error) {
        console.log(error.response)
        Snackbar.fire({
          title: "Error",
          text: "Ha ocurrido un error inesperado",
          icon: "error",
         })
      }

    }


    return (
        <section>

    <div className="card">
        <div className="title">
            <h2>Registrate</h2>
        </div>
        <form>
            <div className="mb-3">
                <div className="row">
                    <div className="col">
                    <label class="form-label text-white">Nombre</label>
                      <input type="text" className="form-control" placeholder="Nombre"
                       onChange={(e) => {
                        setDataUser((prevDataUser) => {
                          prevDataUser.name = e.target.value;
                          return prevDataUser
                        })
                       }}
                      />
                    </div>
                    <div className="col">
                    <label class="form-label text-white">Apellido</label>
                      <input type="text" className="form-control" placeholder="Apellido"
                       onChange={(e) => {
                        setDataUser((prevDataUser) => {
                          prevDataUser.lastName = e.target.value;
                          return prevDataUser
                        })
                       }}
                      />
                    </div>
                </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col">
                <label class="form-label text-white">Usuario</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre de usuario"
                    onChange={(e) => {
                      setDataUser((prevDataUser) => {
                        prevDataUser.nameUser = e.target.value;
                        return prevDataUser
                      })
                     }}
                    />
                </div>

                <div className="col">
                <label class="form-label text-white">Correo electronico</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="exampleInputEmail1" 
                      aria-describedby="emailHelp"
                      placeholder='Correo electronico'
                  onChange={(e) => {
                    setDataUser((prevDataUser) => {
                      prevDataUser.email = e.target.value;
                      return prevDataUser
                    })
                   }}
                  />
                </div>
              </div>
            </div>

            
            <div className="mb-3">
            <label class="form-label text-white">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Contraseña"
                    onChange={(e) => {
                      setDataUser((prevDataUser) => {
                        prevDataUser.password = e.target.value;
                        return prevDataUser
                      })
                     }}
                    />
              </div>
              
              <div className="mb-3">
              <label class="form-label text-white">Confirma tu contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirma tu contraseña"
                    onChange={(e) => {
                      setDataUser((prevDataUser) => {
                        prevDataUser.password2 = e.target.value;
                        return prevDataUser
                      })
                     }}
                    />
              </div>
 
              <div className="mb-3">
                  <a 
                  className="button"
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    navigate("/")
                  }}
                 
                  >¿Ya tienes cuenta? Inicia sesion aqui</a>
              </div>

            <button 
               type="button" className={`btn btnLogin ${loading.loading}`}
               onClick={onClickRegisterUser}
               >{loading.content}</button>
          </form>

    </div>

</section>
    );
}


export default Register;