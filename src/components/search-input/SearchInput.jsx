import React from 'react'
import './search-input.scss';


const SearchInput = props => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? (e) => props.onChange(e) : null} />
    )
}

export default SearchInput