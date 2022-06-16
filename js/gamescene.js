var weapons = ['paper', 'rock', 'scissors'];

var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gamescene' });
		},
	
	preload: function () {
	},

	create: function () {
		var opponetSelectText, userSelectText, weaponText;
		var userWeapon = '';
		var player_result_code = '';

		this.sfx_draw = this.sound.add('draw');
		this.sfx_lose = this.sound.add('lose');
		this.sfx_win = this.sound.add('win');
		var sfx_choice = this.sound.add('choice');

		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);
		image.alpha = .65;

		this.up_text = this.add.bitmapText(config.width / 2, 165, 'fontwhite', "Select your weapon");
		this.up_text.setFontSize(55).setOrigin(0.5).setCenterAlign();

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
			weapon.alpha = .75;

			weapon.on('pointerdown', function () {
				userWeapon = weapon.frame.name;
			});

			weapon.on('pointerover', function () {
				if (player_result_code === '') {
					weapon.alpha = 1;
					weaponText.setPosition(this.x, 540);
					weaponText.setText(weapon.frame.name);
					sfx_choice.play();
					console.log(sfx_choice);
				}
			});
			weapon.on('pointerout', function () {
				weapon.alpha = .75;
				weaponText.setText('');
			});
		}

		this.btn_quit = this.addButton(config.width - 35, 35, 'sprites', this.doBack, this, 'btn_close_act', 'btn_close_act').setDisplaySize(25, 25);

		userSelectText = this.add.bitmapText(config.width / 2, 610, 'fontwhite', '').setOrigin(0.5).setCenterAlign();
		opponetSelectText = this.add.bitmapText(config.width / 2, 680, 'fontwhite', '').setOrigin(0.5).setCenterAlign();

		function doWinner() {
			if (player_result_code === '') {
				this.up_text.destroy();
				let opponentWeapon = weapons[Math.floor(Math.random() * 3)];

				if (userWeapon === opponentWeapon) {
					player_result_code = 0;
				}
				else {
					if (userWeapon === weapons[0]) {
						if (opponentWeapon === weapons[2]) {
							player_result_code = -1;
						}
						else {
							player_result_code = 1;
						}
					}
					else if (userWeapon === weapons[1]) {
						if (opponentWeapon === weapons[0]) {
							player_result_code = -1;
						}
						else {
							player_result_code = 1;
						}
					}
					else if (userWeapon === weapons[2]) {
						if (opponentWeapon === weapons[1]) {
							player_result_code = -1;
						}
						else {
							player_result_code = 1;
						}
					}
				}

				let text_result = '';
				if (player_result_code === 1) {
					text_result = "You win!";
					this.sfx_win.play();
				}
				else if (player_result_code === -1) {
					text_result = "You lose!";
					this.sfx_lose.play();
				}
				else if (player_result_code === 0) {
					text_result = "It's draw";
					this.sfx_draw.play();
				}
				var gameResult = this.add.bitmapText(config.width / 2, 50, 'fontwhite', text_result);
				gameResult.setOrigin(0.5).setCenterAlign();
				gameResult.setAlpha(0.0);
				gameResult.setAngle(540);
				gameResult.setScale(6, 6);
				
				this.tweens.add(
					{
						targets: gameResult,
						scaleX: 2,
						scaleY: 2,
						alpha: 1.0,
						angle: 0,
						ease: 'Power3',
						duration: 1250,
						delay: 250
					}
				);

				userSelectText.setText('your select: ' + userWeapon);
				opponetSelectText.setText('opponent select: ' + opponentWeapon);

				let hands_scale = 1.85;
				let hands_y = 320;

				var left_hand = this.add.sprite(0, hands_y, 'sprites', `hand_${userWeapon}`).setOrigin(1, 0.5).setScale(hands_scale);
				var right_hand = this.add.sprite(config.width, hands_y, 'sprites', `hand_${opponentWeapon}`).setOrigin(0, 0.5).setScale(hands_scale);
				right_hand.flipX=true;

				let anim_step = 8.5;

				var anim = setInterval(()=>{
					left_hand.setPosition(left_hand.x += anim_step, left_hand.y);
					right_hand.setPosition(right_hand.x -= anim_step, right_hand.y);
					if (left_hand.x >= left_hand.width * 1.15 || right_hand.x <= right_hand.width / 1.15) {
						clearTimeout(anim);
						console.log(this.scene);
					}
				},1000/60);
			}
		}
	},
	doBack: function () {
		this.scene.start('mainmenu');
	}

});
