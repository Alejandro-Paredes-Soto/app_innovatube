import { React } from 'react'
import YoutubePlayer from "react-youtube-player"
import { methodPost } from "./../../services/index"
import Snackbar from 'sweetalert2'
import { notification } from 'antd'
import './video.css'

const Video = ({title, videoId, like, onClickRemoveFavoritos}) => {
 
    const [api, contextHolder] = notification.useNotification();

    const onClickFavoritos = async () => {
        
            try {
            const response = await methodPost(`api/v1/videos/favorites`, {
                idUser: localStorage.getItem("idUser"),
                idVideo: videoId, 
                title
            }, localStorage.getItem("token"))

            if (response.status == 200) {
                api.success({
                    message: "Agregado correctamente" ,
                    description: `El video ${title} se ha agregado a favoritos`,
                })             
            } else if (response.status == 201){
                  api.info({
                    message: "Advertencia",
                    description: `El video ${title} ya se encuentra en favoritos`,
                  })
            } else {
                Snackbar.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado, intentalo de nuevo",
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

    return <div className='video'>
           { contextHolder }
         <div className='title'>
            <h5>{title}</h5>
         </div>

         <div>
            
         <YoutubePlayer
            
            videoId={videoId}
            height="auto"
            playbackState='unstarted'
            configuration={
                {
                    showinfo: 0,
                    controls: 4
                }
            }
        />
         </div>

        <div className='btn-favorite mt-3'>
           <button 
             className='btn btn-danger' 
             title='Agregar a favoritos'
             onClick={ () => !like ? onClickFavoritos() : onClickRemoveFavoritos(videoId, title)}
             >
           <i className="bi bi-heart-fill text-white"></i>
           </button>
        </div>

        
    </div>
}

export default Video;