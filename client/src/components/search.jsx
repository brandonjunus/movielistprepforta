function Search (props) {
  return (
    <div className="row container">
      <input type="text" onChange={(e) => props.searchChange(e)}/>
      <button className="btn" onClick={props.handleSearchClick}>Search Movies!</button>
    </div>
  )
}

export default Search;