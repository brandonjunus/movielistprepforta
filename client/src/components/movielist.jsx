
function MovieList(props){
  let movies = props.props.displayMovies; 
  let movieList = movies.map((movie, index) => 
      <li className='list-group-item' key={index}>
        {index + 1}. {movie.title}
        <div>Popularity: {movie.popularity}</div>  
        <span className="badge badge-primary badge-pill m-3" onClick={() => props.toggleWatched(index)}>{movie.watched ? 'watched' : 'to watch'}</span>
        <span className="badge badge-primary badge-pill m-3" onClick={() => props.getDetailFromAPI(movie, index)}>Get Detail?</span>
      </li>
  );
  let noMoviesToDisplay = props.props.noMoviesToDisplay;

  return (        
  <div>
    <div className="btn btn-primary m-3" onClick={() => props.showWatched()}>Watched</div> 
    <div className="btn btn-primary m-3" onClick={() => props.showToWatch()}>To Watch</div>
    <ol className="list-group m-2">
      {noMoviesToDisplay &&
        <h1> There are no movies to display </h1>
      }
      {movieList}
    </ol>
  </div>
  )
}
export default MovieList;