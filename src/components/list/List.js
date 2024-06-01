import { React, useEffect, useState } from 'react';
import Video from '../video/Video';
import { methodGet, methodPost } from '../../services';
import { notification } from 'antd';
import Snackbar from 'sweetalert2'

const List = ({dataListVideos, like}) => {
 
     const [dataListVideosFavorites, setDataListVideosFavorites] = useState([])
     const [api, contextHolder] = notification.useNotification();
   
    const getListFavorites = async () => {
       try {

        const response = await methodGet(`api/v1/videos/listFavorites?idUser=${localStorage.getItem('idUser')}`, localStorage.getItem("token"))
         
        if (response.status === 200) {
            console.log("nueva lista de favoritos")
           setDataListVideosFavorites(response.json.json.rows)
        } else {
          setDataListVideosFavorites([])
        }
    
    
       } catch (error) {
        setDataListVideosFavorites([])
       }
    }

    const onClickRemoveFavoritos = async (videoId, title) => {

        try {
            const response = await methodPost(`api/v1/videos/removeFavoriteVideo`, {
                idUser: localStorage.getItem("idUser"),
                idVideo: videoId
            }, localStorage.getItem("token"))

            if (response.status === 200) {
                api.success({
                    message: "Desmarcado correctamente" ,
                    description: `El video ${title} se ha desmarcado a favoritos`,
                })            
                
                getListFavorites();

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

    useEffect(() => {
          getListFavorites();
    }, [])

    return (
        
        <div className='list-videos'>
            { contextHolder }
        {
        !like && dataListVideos.length > 0 ? (
          dataListVideos.map((video) => {
              return <Video key={video.id} title={video.snippet.title} videoId={video.id} like={like}/> 
          })
         ) : like && dataListVideosFavorites.length > 0 ? (
            dataListVideosFavorites.map((favorite) => {
                return <Video 
                   key={favorite.id} 
                   title={favorite.title} 
                   videoId={favorite.id} 
                   like={like}
                   onClickRemoveFavoritos={onClickRemoveFavoritos}
                   /> 
            })
         ) : <span>Sin videos disponibles</span>

        }
         
        </div>
    )
}
export default List;