function AddMovie (props){
  return (
    <div>
      <input type="text" onChange={(e) => props.addMovieChange(e)} />
      <button className="btn" type="submit" onClick={() => props.handleAddMovieClick()}>Add Movie to List!</button>
    </div>
  )
}

export default AddMovie