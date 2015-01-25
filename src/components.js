Crafty.c('Grid', {
	init : function() {
		this.attr({
			w : Game.map_grid.tile.width,
			h : Game.map_grid.tile.height
		})
	},
	at : function(x, y) {
		if (x === void(0) && y === void(0)) {
			return {
				x : this.x / Game.map_grid.tile.width,
				y : this.y / Game.map_grid.tile.height
			}
		} else {
			return this.attr({
				x : x * Game.map_grid.tile.width,
				y : y * Game.map_grid.tile.height
			})
		}
	}
});

Crafty.c('Implement', {
	init : function() {
		this.requires('2D, Canvas, Grid');
	}
});

Crafty.c('Tree', {
	init : function() {
		this.requires('Implement, Solid, Color')
			.color('rgb(20,125,40)');
	}
});

Crafty.c('Bush', {
	init : function() {
		this.requires('Implement, Solid, Color')
			.color('rgb(20,185,40)');
	}
});

Crafty.c('Player', {
	init : function() {
		this.requires('Implement, Fourway, Color, Collision')
			.fourway(4)
			.color('rgb(20,75,40)')
			.onHit('Solid', this.stopMovement)
			.onHit('Village', this.visitVillage);
	},
	stopMovement : function() {
		this._speed = 0;
		var mov = this._movement;
		if (mov) {
			this.x -= mov.x;
			this.y -= mov.y;
		}
	},
	visitVillage : function(data) {
		var village = data[0].obj;
		village.collect();
	}
});

Crafty.c('Village', {
	init : function() {
		this.requires('Implement, Color')
			.color('rgb(170,125,40)');
	},
	collect : function() {
		this.destroy();
		Crafty.trigger('Village.visited');
	}
});
