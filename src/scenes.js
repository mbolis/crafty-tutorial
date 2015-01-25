Crafty.scene('Game',
	function() {
		var player = Crafty.e('Player').at(Crafty.math.randomInt(6, 18), Crafty.math.randomInt(4, 12));
		var startPosition = player.at();
		console.log(startPosition)

		var villages = 5;

		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				var at_edge =
					x == 0 || y == 0 ||
					x == Game.map_grid.width - 1 ||
					y == Game.map_grid.height - 1;
				if (x === startPosition.x && y === startPosition.y) {
					continue;
				} else if (at_edge) {
					Crafty.e('Tree').at(x, y);
				} else if (Math.random() < 0.06) {
					Crafty.e('Bush').at(x, y);
				} else if (villages && Math.random() < 0.02) {
					Crafty.e('Village').at(x, y);
					villages--;
				}
			}
		}

		this.showVictory = function() {
			if (!Crafty('Village').length) {
				Crafty.scene('Victory');
			}
		}
		this.bind('Village.visited', this.showVictory);
	},
	function() {
		this.unbind('Village.visited', this.showVictory);
	}
);

Crafty.scene('Victory',
	function() {
		Crafty.e('2D, DOM, Text')
			.attr({
				x : Game.width() / 2,
				y : Game.height() / 2
			})
			.css('margin', '-50%')
			.text('Victory!');

		this.restartGame = function() {
			Crafty.scene('Game');
		}
		this.bind('KeyDown', this.restartGame);
	},
	function() {
		this.unbind('KeyDown', this.restartGame);
	}
);
