Game = {
	map_grid : {
		width : 24,
		height : 16,
		tile : {
			width : 32,
			height : 32
		}
	},
	width : function(x) {
		x = typeof x === 'number' ? x : this.map_grid.width
		return x * this.map_grid.tile.width;
	},
	height : function(y) {
		y = typeof y === 'number' ? y : this.map_grid.height
		return y * this.map_grid.tile.height;
	},
	start : function() {
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(249,223,125)');

		Crafty.scene('Game');
	}
}
