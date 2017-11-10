$(document).ready(function()
{


	var animals = ["Corgi", "Shiba Inu", "Bull Dog", "Dachsund", "Pit Bull", "Pug", "Husky", "German Pinscher", "Akita", "Alaskan Malamute", "Austrailian Cattle Dog", "Border Collie", "Great Dane", "Siberian Husky", "Icelandic Sheepdog", "Pomeranian", "Rottweiler"];


	function renderButtons(){

		for (var i = 0; i<animals.length; i++){
			var btn = $("<button>");
			btn.addClass("dog");
			btn.attr("data-name", animals[i]);
			btn.text(animals[i]);
			$("#animalbuttons").append(btn);
		}//End for loop
	}//End RenderButtons()

	function addAnimal(event){
		event.preventDefault();
		$("#animalbuttons").empty();
		var animal = $("#animal-input").val().trim();
		if(animal){
		animals.push(animal);
		console.log(animal);
		} //End conditional to not have empty button

	renderButtons();
	}//End addMovie()

	//Add button
	$("#addAnimal").on("click", addAnimal);
	//Initial buttons of Corgi, Shiba and Bull Dog
	renderButtons();
	//Clicking the animal buttons will
	$(document).on("click", ".dog", function(){
		$("#animals").empty();
		var name = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		name + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
        })//End Ajax
		.done(function(response){
			console.log(response);
			var results = response.data;

			for (var i = 0; i<results.length; i++){
				var gifDiv = $("<div class='item'>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var image = $("<img>");
				image.attr("src", results[i].images.fixed_height_still.url);
				image.attr("data-state", "animate");
				image.attr("data-still", results[i].images.fixed_height_still.url);
				image.attr("data-animate", results[i].images.fixed_height.url);
				image.addClass("gif");
				gifDiv.append(p);
				gifDiv.append(image);
				$("#animals").prepend(gifDiv);
        	}//End for-loop of ajax response

        	$(".gif").on("click", function(){
        		var state = $(this).attr("data-state");
        		if (state === "still"){
        			$(this).attr("src", $(this).attr("data-animate"));
        			$(this).attr("data-state", "animate");
        		}//End conditional to animate gif
        		if (state==="animate"){
        			$(this).attr("src", $(this).attr("data-still"));
        			$(this).attr("data-state", "still");
        		}//End conditional to make gif still
        	})//End on click for gif
        })//End Function after Ajax called
	})//End on click for all classes of dog
}); //End document ready