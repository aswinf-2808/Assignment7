var BASE = "http://localhost:3000";

function getMovies()
{
    fetch(BASE + "/movies")
    .then((res)=> res.json())
    .then((movies)=>{

        var data = "";

        movies.map((movie)=>{

            data += `
            
            <li>
                <div class="movie-card">

                    <img src="${movie.posterPath}" alt="movie">

                    <div class="card-body">

                        <div class="card-title">
                            ${movie.title}
                        </div>

                        <button class="add-btn" onclick="addFavourite('${movie.id}')">
                            Add Favourite
                        </button>

                    </div>

                </div>
            </li>
            
            `;
        })

        document.getElementById("moviesList").innerHTML = data;

    })
}

function getFavourites()
{
    fetch(BASE + "/favourites")
    .then((res)=> res.json())
    .then((movies)=>{

        var data = "";

        movies.map((movie)=>{

            data += `
            
            <li>
                <div class="movie-card">

                    <img src="${movie.posterPath}" alt="movie">

                    <div class="card-body">

                        <div class="card-title">
                            ${movie.title}
                        </div>

                        <button class="delete-btn" onclick="deleteFavourite('${movie.id}')">
                            Delete
                        </button>

                    </div>

                </div>
            </li>
            
            `;
        })

        document.getElementById("favouritesList").innerHTML = data;

    })
}

function addFavourite(id)
{
    fetch(BASE + "/favourites")
    .then((res)=> res.json())
    .then((favs)=>{

        var alreadyExists = favs.some((movie)=>{
            return movie.id == id;
        })

        if(alreadyExists)
        {
            alert("This movie is already in Favourite!");
            return;
        }

        fetch(BASE + "/movies/" + id)
        .then((res)=> res.json())
        .then((movie)=>{

            fetch(BASE + "/favourites",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(movie)
            })
            .then(()=>{

                getFavourites();

            })

        })

    })
}

function deleteFavourite(id)
{
    fetch(BASE + "/favourites/" + id,{
        method : "DELETE"
    })
    .then(()=>{

        getFavourites();

    })
}