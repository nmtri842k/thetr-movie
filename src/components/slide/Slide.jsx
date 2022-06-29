import React from 'react'
import { useState, useEffect, useRef } from 'react'

import themoviedbApi, { category, movieType } from '../../api/themoviedbApi'
import apiConfig from '../../api/apiConfig'

import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, { Autoplay } from 'swiper'

import Button, { OutlineButton } from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal'

import './slide.scss'
import { useHistory } from 'react-router-dom'

const Slide = () => {

    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await themoviedbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 4));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();

    }, []);


    return (
        <div className='slide'>
            <Swiper module={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <SlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }

            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
            }
        </div >
    )
}


const SlideItem = props => {
    let history = useHistory();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await themoviedbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div className={`slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}>
            <div className="slide__item__content container">
                <div className="slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
                <div className="slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="buttons">
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>

            </div>
        </div >
    )
}

const TrailerModal = props => {
    const item = props.item
    const iframeRef = useRef(null)

    const onClose = () => iframeRef.current.setAttribute('src', '')

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default Slide



