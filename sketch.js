
var input = 0


$(document).ready(function(){
	$('.button-input').click(function(){
		console.log($(this).data())
	});
	function setInput(gridSize){
		var input = gridSize;
		console.log(input);
	}
})

var start = function(option) {

	$('#container').html(" ");
	var input = prompt("Choose how many squares across you would like:",
				"Enter a number between 1 and 100!");

	function getColor() {
		var red = Math.floor((Math.random()*255)+1);
		var green = Math.floor((Math.random()*255)+1);
		var blue = Math.floor((Math.random()*255)+1);
		return "rgb(" + red + "," + green + "," + blue + ")";
	}




	if (input>=1 && input<=100) {

		var square_size = $('#container').width()/input - 2;

		for(var i = 1; i <= input; i++) {
			for(var j = 1; j <= input; j++) {
				$('#container').append('<div class="grid_square"></div>');
			}
			$('#container').append('<div class="new_row"></div>');
		}
		$('.grid_square').css('width',square_size);
		$('.grid_square').css('height',square_size);

		$('.grid_square').mouseenter(function() {
			switch(option) {

				case 1:
					$(this).addClass('highlighted');
					$('.grid_square').mouseenter(function(){
						$(this).css({'background-color':"blue"});
					});
					break;

				case 2:
					$(this).stop(true);
					$(this).fadeTo(0,0);
					$(this).mouseleave(function(){
						$(this).fadeTo(600,1)
					});

					$(this).click(function(){
						var array = []
						for(var p = 1; p<input/3; p++){
							array.push(  eval('$(this)' + '.next()'.repeat(p)) );
							array.push(  eval('$(this)' + '.prev()'.repeat(p)) );
							//array.push(  $('#container').find('.grid_square').eq( $(this).index() - (input*p-3) ) );
							//array.push(  $('#container').find('.grid_square').eq( $(this).index() + (input*p-3) ) );
						}

						for(var i in array){

							array[i].stop(true).delay(25 * i).fadeTo(0,0).fadeTo(600,1);


						}

					});
					break;

				case 3:
					var currentOpacity = $(this).css('opacity');
					if(currentOpacity > 0){
						$(this).css('opacity', currentOpacity - 0.1);
					};
					break;

				case 4:
					$(this).css("background-color",getColor());
					break;


			}
		});

	}
	else {
		if(input != null){
			alert("Were the instructions not clear enough? I mean, come on...")
		}
	}
}

var clearGrid = function() {
	$('.grid_square').css({
		"background-color": "black",
		"opacity":"1"
	})
}



var trailGame = function(){
	$('#container').html(" ");
	var input = 20;
	var square_size = $('#container').width()/input - 2;
	var rowArray = []
	for(var i = 1; i <= input; i++) {
		rowArray['row' + String(i)] = [];
		for(var j = 1; j <= input; j++) {
			$('#container').append('<div class="grid_square"></div>');
		}

		$('#container').append('<div class="new_row"></div>');
	}

	$('.grid_square').css('width',square_size);
	$('.grid_square').css('height',square_size);
	//console.log($('#container').children());
	var children = $("#container").children();
	var count = 1;
	var rowCount = 0;
	console.log(rowArray);
	for(var i in children){
		if(children.eq(i).hasClass('grid_square')){

			rowArray["row" + String(count)].push(children.eq(i));
			rowCount += 1;

		}
		else{
			count += 1;
			rowCount = 0
		}
	}

	var rowObject = {}
	for(var i in rowArray){
		rowObject[i] = rowArray[i];
	}

	var row = 1
	var column = 0

	$(rowObject["row" + String(1)][0]).addClass('highlighted');


	function highlight(newRow, newColumn){
		$(rowObject["row" + String(row)][column]).removeClass('highlighted');
		$(rowObject["row" + String(newRow)][newColumn]).addClass('highlighted');
		column = newColumn
		row = newRow

	}
	$(document).on("keydown", function(event){
		switch(event.which){
			case 65: //left
				if(column > 0){
					var newColumn = column - 1
					highlight(row, newColumn);
				}
				break;
			case 87: //up
				if(row > 1){
					var newRow = row - 1
					highlight(newRow, column);

				}
				break;
			case 68: //right
				if (column < 19){
					var newColumn = column + 1
					highlight(row, newColumn);
				}
				break;

			case 83: //down
				if(row < 20){
					var newRow = row + 1
					highlight(newRow, column);
				}
				break;
		}
	});

}
