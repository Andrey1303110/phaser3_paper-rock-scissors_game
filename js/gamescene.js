var opponetSelectText, userSelectText, gameResult, weaponText;

var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gamescene' });
		},
	
	preload: function () {
		this.load.image('bg', 'img/bg.jpg');
	},

	create: function () {
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);
		image.alpha = .65;

		var up_text = this.add.bitmapText(config.width / 2, 165, 'fontwhite', "Select your weapon");
		up_text.setFontSize(55).setOrigin(0.5).setCenterAlign();

		weaponText = this.add.bitmapText(0, 540, 'fontwhite', '').setOrigin(0.5).setCenterAlign();

		for (let i = 0; i < weapons.length; i++) {
			let pos_cof = 0;
			if (i < 1) {
				pos_cof = -1;
			}
			else if (i > 1) {
				pos_cof = 1;
			}

			let position = config.width / 2 + (360 * pos_cof);

			let weapon = this.addButton((position), 400, 'sprites', doWinner, this, weapons[i], weapons[i]).setDisplaySize(135, 135);
			weapon.alpha = .5;

			weapon.on('pointerdown', function () {
				userWeapon = weapon.frame.name;
			});

			weapon.on('pointerover', function () {
				weapon.alpha = 1;
				weaponText.setPosition(this.x, 540);
				weaponText.setText(weapon.frame.name);
			});
			weapon.on('pointerout', function () {
				weapon.alpha = .5;
				weaponText.setText('');
			});
		}

		this.btn_quit = this.addButton(config.width - 35, 35, 'sprites', this.doBack, this, 'btn_close_act', 'btn_close_act').setDisplaySize(25, 25);

		userSelectText = this.add.bitmapText(config.width / 2, 610, 'fontwhite', '').setOrigin(0.5).setCenterAlign();
		opponetSelectText = this.add.bitmapText(config.width / 2, 680, 'fontwhite', '').setOrigin(0.5).setCenterAlign();
		gameResult = this.add.bitmapText(config.width / 2, 50, 'fontwhite', '').setOrigin(0.5).setCenterAlign();

		function doWinner() {
			let opponentWeapon = weapons[Math.floor(Math.random() * 3)];

			if (userWeapon === opponentWeapon) {
				gameResult.setText('draw');
			}
			else {
				if (userWeapon === weapons[0]) {
					if (opponentWeapon === weapons[2]) {
						gameResult.setText('You lose!');
					}
					else {
						gameResult.setText('You win!');
					}
				}
				else if (userWeapon === weapons[1]) {
					if (opponentWeapon === weapons[0]) {
						gameResult.setText('You lose!');
					}
					else {
						gameResult.setText('You win!');
					}
				}
				else if (userWeapon === weapons[2]) {
					if (opponentWeapon === weapons[1]) {
						gameResult.setText('You lose!');
					}
					else {
						gameResult.setText('You win!');
					}
				}
			}

			userSelectText.setText('your select: ' + userWeapon);
			opponetSelectText.setText('opponent select: ' + opponentWeapon);

			var left_hand = this.add.sprite(0, 325, 'sprites', `hand_${userWeapon}`).setOrigin(0.5).setScale(1.25);
			var right_hand = this.add.sprite(config.width, 325, 'sprites', `hand_${opponentWeapon}`).setOrigin(0.5).setScale(1.25);
			right_hand.flipX=true;

			let anim_step = 8.5;

			var anim = setInterval(()=>{
				left_hand.setPosition(left_hand.x += anim_step, left_hand.y);
				right_hand.setPosition(right_hand.x -= anim_step, right_hand.y);
				if (left_hand.x >= config.width/4.5 || right_hand.x <= config.width - config.width/4.5) {
					clearTimeout(anim);
				}
			},1000/60);
		}
	},
	doBack: function () {
		this.scene.start('mainmenu');
	}

});
