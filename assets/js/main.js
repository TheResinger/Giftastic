$(document).ready(function(){
    var animalArray = ["Bird", "Cat", "Dog", "Ferret", ];
    function updateList()
    {
        $("#animalButtons").empty();
        for(var i = 0; i < animalArray.length; i++)
        {
            $("#animalButtons").append($("<button>",{"type":"button","id":animalArray[i],"text":animalArray[i],"class":"animalButton"}));
        }
    }
    $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        animalArray.push($("#animal").val());
        updateList();
    });
   
    $(document).on("click",".animalButton", function(){
        console.log($(this).attr("id"));
        var queryAnimal = $(this).attr("id");
        var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + queryAnimal + "&api_key=2II6IkwKhCCu8L1lvmmQUB53I3TFGZpI&limit=50"
        $("#gifGrid").empty();
        $.ajax({
            url : queryURL,
            method : 'GET',
        }).then(function(response){
            var results = response.data;
            for(var i = 0; i < results.length; i++)
            {
                $("#gifGrid").prepend($("<div>",{"class" : "col-md-4","id" : queryAnimal + i}));
                $("#" + queryAnimal + i).append($("<p>",{"text":"Rating : "+ results[i].rating}));
                $("#" + queryAnimal + i).append($("<img>",{"src": results[i].images.fixed_height_still.url,"data-still":results[i].images.fixed_height_still.url,"data-animated": results[i].images.fixed_height.url,"data-state": "still","class" : "gif"}));
            }
        });
    });
    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        if(state === "still")
        {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        }
        else
        {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    updateList();
});