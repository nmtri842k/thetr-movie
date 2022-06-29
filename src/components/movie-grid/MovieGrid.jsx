import React, { useCallback, useEffect, useState } from 'react'
import './movie-grid.scss'
import MovieCard from '../movie-card/MovieCard'
import { useHistory, useParams } from 'react-router-dom'
import Button, { OutlineButton } from '../button/Button'
import SearchInput from '../search-input/SearchInput'
import themoviedbApi, { category, movieType, tvType } from '../../api/themoviedbApi'

const MovieGrid = props => {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const { keyword } = useParams()

    useEffect(() => {
        const getList = async () => {
            let response = null

            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await themoviedbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await themoviedbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await themoviedbApi.search(props.category, { params })
            }
            setItems(response.results)
            setTotalPage(response.total_pages)
        }
        getList()
    }, [props.category, keyword])

    const loadMore = async () => {
        let response = null

        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await themoviedbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await themoviedbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await themoviedbApi.search(props.category, { params })
        }
        setItems([...items, ...response.results])
        setPage(page + 1)
    }
    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) =>
                        <MovieCard category={props.category} item={item} key={i} />)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

const MovieSearch = (props) => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]


    );
    // const search = () => {
    //     console.log(`/${category[props.category]}/search/${keyword}`)
    // }
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch()
                // search()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [keyword, goToSearch])
    return (
        <div className="movie-search">
            <SearchInput
                type="Text"
                placeholder="Search...."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            // onfocusOut={focusOut}
            />
            <Button className="btn-small" onClick={goToSearch} >Search</Button>
        </div>
    )
}

export default MovieGrid