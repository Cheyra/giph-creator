$("document").ready(function () {
    //defines variables and stores orignal button values
    let topics = ["Dragon Ball Z", "Naruto", "Rouroni Kenshin", "Fruits Basket", "Pokemon", "Avatar the last Airbender", "Gundam", "Full Metal Alchemist", "OHSHC", "Spirited Away", "Nausicaä of the valley of the wind"];
    let favs = [];
    var fav;
    var giphDiv;
    var giphs;
    var giphRating;
    var rating;
    var video;
    var videoStill;
    var play = false
    //hides the favorite button
    $("#fav-heading").hide()
    //a function that populates the buttons into the html
    function showButtons() {
        $(".buttonHolder").empty()
        for (let i = 0; i < topics.length; i++) {

            let buttons = $("<button>");
            buttons.addClass("animeButton");
            buttons.attr("data-name", topics[i]);
            console.log(topics[i]);
            buttons.text(topics[i]);
            $(".buttonHolder").append(buttons);

        }

    }
    //calling function to display buttons
    showButtons();
    //on click that adds new buttons based on the user submission into the form
    $("#giphySearch").on("click", function (event) {

        event.preventDefault();
        var newGiphy = $("#giphySearchText").val().trim();
        topics.push(newGiphy);
        showButtons();
        $("#giphySearchText").val("")
    })
    //on click that starts a search for giphs
    $(document).on("click", ".animeButton", function (e) {
        //hides the quote
        $("#quote").hide()
        //shows the favorites heading
        $("#fav-heading").show()
        //empties the giphs so when a new giph is selected the old giphs will go away
        $("#giphyPlacement").empty()
        var searchTerm = e.target.textContent
        console.log(searchTerm)
        //connection to giphy though AJAX
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=aJ82kKqI2P0SbOLu7Jt08wt4hP5MOf7c&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            //once AJAX is done pulling data it shows the giphs with the attributes selected
            .then(function (response) {

                console.log(searchTerm)
                $("#animeHead").text(searchTerm)
                $("#animeHead").attr("style", "border: 5px; border-style:groove; border-color:navy; background-color:lightcyan;")
                var results = response.data;
                console.log(results)

                for (i = 0; i < results.length; i++) {
                    var fav = $("<button>")
                    fav.text("Favorite")
                    fav.attr("id", "favorite" + i)
                    fav.addClass("favorites")

                    giphDiv = $("<div >");
                    giphDiv.addClass("displayGiph card bg-info")

                    giphs = $("<img style='float:left '>");
                    giphs.addClass("vid card-img-top")
                    giphs.attr("id", "vids" + i)


                    giphRating = $("<p>");
                    giphRating.addClass("rat")
                    rating = results[i].rating;
                    console.log(rating);
                    giphRating.text("Rating: " + rating);

                    video = results[i].images.fixed_width.url
                    giphs.attr("src", video);
                    //adds all the giphs to html                  
                    giphDiv.prepend(fav);
                    giphDiv.prepend(giphs);
                    giphDiv.prepend(giphRating);

                    $("#giphyPlacement").prepend(giphDiv)
                    $("giphyPlacement").addClass("jumbotron")





                }
                //adds users favorites to the favorites section
                $(".favorites").on("click", function () {

                    var newFavorite = $(this).prev("img").clone()
                    newFavorite.addClass("vid jumbotron bg-info")
                    $(".favSection").prepend(newFavorite)



                })


            })

    })


})


