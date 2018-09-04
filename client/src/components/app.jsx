import MovieList from './movielist.jsx';
import Search from './search.jsx';
import AddMovie from './addMovie.jsx';

import $ from 'jQuery';
var apikey = '39232620c84da7b4233ac4bf73bf77a6'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      displayMovies: [
        {title: 'Shawshank Redemption',
        watched: true,
        popularity: null},
        {title: 'The Godfather: Part II',
        watched: true,
        popularity: null},
        {title: 'The Dark Knight',
        watched: true,
        popularity: null},
      ],
      allMovies: [
        {title: 'Shawshank Redemption',
        watched: true,
        popularity: null},
        {title: 'The Godfather: Part II',
        watched: true,
        popularity: null},
        {title: 'The Dark Knight',
        watched: true,
        popularity: null},
      ],
      searchField: "",
      addMovieField: "",
      noMoviesToDisplay: false,
    })




    this.handleAddToDatabase= this.handleAddToDatabase.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.toggleWatched= this.toggleWatched.bind(this);
    this.addMovieChange = this.addMovieChange.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.handleAddMovieClick = this.handleAddMovieClick.bind(this);
    this.showWatched = this.showWatched.bind(this);
    this.showToWatch = this.showToWatch.bind(this);
    this.getDetailFromAPI = this.getDetailFromAPI.bind(this);
  }

  searchChange(e){
    this.setState({
      searchField: e.target.value
    })
  }

  addMovieChange(e){
    this.setState({
      addMovieField: e.target.value
    })
  }

  handleAddMovieClick(){
    let allMovies = this.state.allMovies;
    allMovies.push(
      {title: this.state.addMovieField,
      watched: false,
      popularity: null}
    );
    this.setState({
      displayMovies: allMovies,
      allMovies: allMovies
    })
  }

  handleSearchClick(){
    let allMovies = this.state.allMovies;
    let filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(this.state.searchField.toLowerCase()));
    this.setState({
      displayMovies: filteredMovies
    })
    if (filteredMovies.length === 0){
      this.setState({
        noMoviesToDisplay: true
      })
    } else {
      this.setState({
        noMoviesToDisplay: false
      })
    }
  }

  toggleWatched(index){
    let allMovies = this.state.allMovies
    allMovies[index].watched = !allMovies[index].watched

    // for now, it displays all movies on toggle
    this.setState({
      displayMovies: allMovies,
      allMovies: allMovies
    })
  }

  showWatched(){
    let watchedMovies = this.state.allMovies;
    watchedMovies = watchedMovies.filter(movie => movie.watched === true)
    console.log(watchedMovies);
    this.setState({
      displayMovies: watchedMovies
    });
  }

  showToWatch(){
    let moviesToWatch = this.state.allMovies;
    moviesToWatch = moviesToWatch.filter(movie => movie.watched === false)
    this.setState({
      displayMovies: moviesToWatch
    });
  }

  handleAddToDatabase(){
    console.log('hello');
    $.ajax({
      url: "http://127.0.0.1:3000/movies",
      type: "POST",
      data: {mydata: this.state.allMovies},
      success: (data) => {
        console.log("Post request succesfully made", data)
      }
    })
  }

  getDetailFromAPI(movie, index){
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apikey}`,
      data: {
        query: movie.title
      }, 
      success: (data) => {
        console.log('data retrieved from API: ', data);
        console.log('movie popularity: ', data.results[0].popularity);
        let popularityFromAPI = data.results[0].popularity
        let allMovies = this.state.allMovies
        allMovies[index].popularity = popularityFromAPI;

        this.setState({
          allMovies: allMovies,
          displayMovies: allMovies,
        })

      }
    })
  }

  render() {

    return (
      <div className="container border border-dark">
        <h1>Movie List</h1> 
        <button type="button" className="btn btn-primary" onClick={() => this.handleAddToDatabase()}>Add all to database</button>
        <AddMovie addMovieChange={this.addMovieChange} handleAddMovieClick={this.handleAddMovieClick}/>
        <Search searchChange={this.searchChange} handleSearchClick={this.handleSearchClick}/>
        <MovieList props={this.state} getDetailFromAPI={this.getDetailFromAPI} showWatched={this.showWatched} showToWatch={this.showToWatch} toggleWatched={this.toggleWatched}/>
      </div>
    )
  }
}

export default App;