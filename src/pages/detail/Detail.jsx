import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import themoviedbApi from '../../api/themoviedbApi'
import apiConfig from '../../api/apiConfig'
import './detail.scss'
import CastList from './CastList'
import Videos from './Videos'
import MovieList from '../../components/movie-list/MovieList'
const Detail = () => {

    const { category, id } = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        const getDetail = async () => {
            const response = await themoviedbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>
                        </div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__informate">
                                <div className="title">
                                    {item.title || item.name}

                                    {console.log(item.genres)}
                                </div>
                                <div className="genres">
                                    {
                                        item.genres.map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))

                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id} />
                                </div>

                                <div className="other">
                                    <div className="other__release"><p>Release date:</p>{item.release_date}</div>
                                    <div className="other__voteaverage">{item.vote_average}</div>
                                </div>
                            </div>
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{
                                    backgroundImage:
                                        `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`
                                }}></div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <Videos id={item.id} />
                            </div>
                        </div>
                        <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h3>Similar</h3>
                            </div>
                            <MovieList category={category} type="similar" id={item.id} />
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Detail