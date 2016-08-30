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
					$('#clear').click(function(){
						$('.grid_square').css({
							"background-color": "black",
						})
					});
					$('.grid_square').mouseenter(function(){
						$(this).css({'background-color':"blue"});
					})
					break;

				case 2:
					$(this).fadeTo(0,0);
					$(this).mouseleave(function(){
						$(this).fadeTo(600,1)
					});
					$('#clear').click(function(){
						$('.grid_square').css({
							"background-color": "black",
							"opacity":"1"
						})
					});
					break;

				case 3:
					var currentOpacity = $(this).css('opacity');
					if(currentOpacity > 0){
						$(this).css('opacity', currentOpacity - 0.1);
					};
					$('#clear').click(function(){
						$('.grid_square').css({
							"background-color": "black",
							"opacity":"1"
						})
					});
					break;

				case 4:
					$(this).css("background-color",getColor());
					$('#clear').click(function(){
						$('.grid_square').css({
							"background-color": "black",
						})
					});
					break;
			}
		});

	}
	else {
		alert("Were the instructions not clear enough? I mean, come on...")
	}
}