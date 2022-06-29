
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import themoviedbApi from '../../api/themoviedbApi'
import apiConfig from '../../api/apiConfig'

const Videos = props => {

    const { category } = useParams()
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const getVideos = async () => {
            const response = await themoviedbApi.getVideos(category, props.id)
            setVideos(response.results.slice(0, 4))
        }
        getVideos();
    }, [category, props.id])

    return (
        <>
            {
                videos.map((item, i) => (
                    <Video key={i} item={item} />
                ))
            }
        </>
    )
}
const Video = props => {
    const item = props.item
    const iframeRef = useRef(null)
    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height', height)
    }, [])
    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
                {console.log(item)}
            </div>
            <iframe
                src={`https://youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%" title="video"
                className='video__iframe'>
            </iframe>
        </div>
    )
}

export default Videos