import { React, useState, useEffect } from 'react';
import './dashboard.css'
import { methodGet, methodPost } from "./../../services/index"
import { useNavigate } from 'react-router-dom';
import Snackbar from 'sweetalert2'
import List from '../../components/list/List';



const Dashboard = () => {

   const [dataListVideos, setDataListVideos] = useState([])
   const [searchVideo, setSearchVideo] = useState("")
   const navigate = useNavigate()

    const getListVideos = async () => {
        
        try {

            const response = await methodGet("api/v1/videos", localStorage.getItem("token"))

            if (response.status === 200) {
               setDataListVideos(response.json.body.items)
            } else {
                setDataListVideos([])
            }
            
        } catch (error) {
            setDataListVideos([])
        }
        
    }


    const onClickLogout = async () => {
       try {

        Snackbar.fire({
            title: "Cierre de sesion",
            text: "¿Estas seguro de cerrar?",
            icon: "question",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showCancelButton: true,
            cancelButtonColor: "red"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await methodPost("api/v1/users/logout", null, localStorage.getItem("token"));
                    
                    if (response.status === 200) {
                      localStorage.clear()

                      setTimeout(() => {
                          navigate("/")
                      }, 1500)
                    }
            } 
          })

       
        
       } catch (error) {
        Snackbar.fire({
            title: "Error",
            text: "Ha ocurrido un error inesperado, intentalo de nuevo",
            icon: "error"
          })
       }
    }

    const onClickSearchVideo = async () => {
        try {

            const response = await methodPost('api/v1/videos/search', {
                searchClientVideo:  searchVideo.trim(),
                token: localStorage.getItem("token")
            }, localStorage.getItem("token"))

            if (response.status === 200) {
               setDataListVideos(response.json.body.items)
            } else {
                setDataListVideos([])
            }

            
        } catch (error) {
            setDataListVideos([])
        }
    }

    useEffect (() => {
      getListVideos()
    }, [])

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate('/')
        }
     }, [])



    return (
        <section>
    
    <div className="content">
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                
               <div className="container-search">
                

        <ul className='options'>
            <li style={{cursor: "pointer"}} onClick={() => {
                        navigate("/dashboard")
                    }}>
                <i className="bi bi-house-door-fill"></i>
                <div>
                    <a className='button'>Pagina principal</a>
                </div>
            </li>

            <li  style={{cursor: "pointer"}} onClick={() => {
                        navigate("/favorites")
                    }}>
                <i className="bi bi-bookmark-heart-fill"></i>
                <div>
                    <a className='button'>Favoritos</a>
                </div>
            </li>
            
            <li style={{cursor: "pointer"}} onClick={onClickLogout}>
                <i className="bi bi-box-arrow-left"></i>
                <div>
                    <a className='button' >Cerrar sesion</a>
                </div>
            </li>
        </ul>
            

                <div className="d-flex" role="search">
                    <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Buscar videos" 
                    aria-label="Search"
                    onChange={(e) => {
                        setSearchVideo((prevSearchVideo) => {
                            prevSearchVideo = e.target.value;
                            return prevSearchVideo
                        })

                    }}
                    />
                    <button 
                       className="btn btn-search" 
                       type="button"
                       onClick={(e) => {
                        e.preventDefault();
                        onClickSearchVideo()

                       }}
                       >Buscar</button>
                  </div>
    
                  <div className="data-user">
                  <span style={{fontWeight: "bold"}}>{localStorage.getItem("nameUser")}</span>
                     <i className="bi bi-person-circle"></i>
                  </div>
               </div>
            </div>
          </nav>

          <div className='section-videos'>

            <h2 style={{fontFamily: 'Poppins', fontWeight: 700, marginLeft: "10px"}}>Pagina principal</h2>

            <hr/>

            <List dataListVideos={dataListVideos} like={false}/>


          </div>

    </div>
</section>
    );
}

export default Dashboard;