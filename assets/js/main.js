$(document).ready(function(){
    console.log("JS loaded.");
    var animalArray = ["Bird", "Cat", "Dog", "Ferret", ];
    function updateList()
    {
        for(var i = 0; i < animalArray.length; i++)
        {
            $("#animalButtons").append($("<button>",{"type":"button","id":animalArray[i],"text":animalArray[i],"class":"animalButton"}));
        }
    }
    $("#addAnimal").on("click", function(event) {
        event.preventDefault();
       console.log($("#animal").val());
    });
   
    $(document).on("click",".animalButton", function(){
        console.log($(this).attr("id"));
        var queryAnimal = $(this).attr("id");
        var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + queryAnimal + "&api_key=2II6IkwKhCCu8L1lvmmQUB53I3TFGZpI&limit=10"

        $.ajax({
            url : queryURL,
            method : 'GET',
        }).then(function(response){
            console.log(response);
            var results = response.data;
            for(var i = 0; i < results.length; i++)
            {
                $("#gifGrid").prepend($("<div>",{"class" : "gif col-md-4","id" : queryAnimal + i}));
                $("#" + queryAnimal + i).append($("<p>",{"text":"Rating : "+ results[i].rating}));
                $("#" + queryAnimal + i).append($("<img>",{"src": results[i].images.fixed_height.url}));
            }
        });
    });
    updateList();
});