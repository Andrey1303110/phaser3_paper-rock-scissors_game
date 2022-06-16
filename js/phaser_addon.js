var weapons = ['paper', 'rock', 'scissors'];
var userWeapon = '';

Phaser.Scene.prototype.addButton = function (x, y, key, callback, callbackContext, overFrame, outFrame) {
	var btn = this.add.sprite(x, y, key, outFrame).setInteractive();
	btn.on('pointerover', function (ptr, x, y) { this.setFrame(overFrame) });
	btn.on('pointerout', function (ptr) { this.setFrame(outFrame) });
	if (!(weapons.includes(overFrame) && weapons.includes(overFrame)) && overFrame !== 'btn_close_act') {
		btn.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) });
	}
	btn.on('pointerup', callback.bind(callbackContext));

	return btn;
};
