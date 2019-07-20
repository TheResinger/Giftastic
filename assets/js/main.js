$(document).ready(function(){
    var termArray = ["Bird", "Car", "Laughing", "Tablet", ];
    function updateList()
    {
        $("#termButtons").empty();
        for(var i = 0; i < termArray.length; i++)
        {
            $("#termButtons").append($("<button>",{"type":"button","id":termArray[i],"text":termArray[i],"class":"termButton"}));
        }
    }
    $("#addTerm").on("click", function(event) {
        event.preventDefault();
        termArray.push($("#term").val());
        updateList();
    });
   
    $(document).on("click",".termButton", function(){
        console.log($(this).attr("id"));
        var queryterm = $(this).attr("id");
        var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + queryterm + "&api_key=2II6IkwKhCCu8L1lvmmQUB53I3TFGZpI&limit=50"
        $("#gifGrid").empty();
        $.ajax({
            url : queryURL,
            method : 'GET',
        }).then(function(response){
            var results = response.data;
            for(var i = 0; i < results.length; i++)
            {
                var rating = results[i].rating;
                $("#gifGrid").prepend($("<div>",{"class" : "col-md-4 gif","id" : queryterm + i}));
                $("#" + queryterm + i).append($("<img>",{"src": results[i].images.fixed_height_still.url,"data-still":results[i].images.fixed_height_still.url,"data-animated": results[i].images.fixed_height.url,"data-state": "still","class" : "gif"}));
                $("#" + queryterm + i).append($("<p>",{"text":"Rating : "+ rating.toUpperCase(),"align":"center","id" : "rating"}));
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