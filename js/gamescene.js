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
		var opponetSelectText, weaponText, gameScore, left_hand, right_hand;
		var userWeapon = '';
		var player_result_code = '';

		this.sfx_draw = this.sound.add('draw');
		this.sfx_lose = this.sound.add('lose');
		this.sfx_win = this.sound.add('win');
		this.sfx_drums = this.sound.add('drums');
		let sfx_choice = this.sound.add('choice');

		this.userScore = 0;
		this.opponentScore = 0;

		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);
		image.alpha = .65;

		var gameResult = this.add.bitmapText(config.width / 2, 50, 'fontwhite', '');
		gameScore = this.add.bitmapText(config.width / 2, 125, 'fontwhite', '');
		gameScore.setOrigin(0.5).setCenterAlign();

		let hands_scale = 1.8;
		let hands_y = 285;

		left_hand = this.add.sprite(0, hands_y, 'sprites', 'hand_rock');
		left_hand.x = -left_hand.width;
		left_hand.setOrigin(0.5);
		left_hand.setScale(hands_scale);
		left_hand.setAngle(0);

		right_hand = this.add.sprite(config.width, hands_y, 'sprites', 'hand_rock');
		right_hand.x = config.width + right_hand.width;
		right_hand.setOrigin(0.5);
		right_hand.setScale(hands_scale);
		right_hand.setAngle(0);
		right_hand.flipX=true;

		this.up_text = this.add.bitmapText(config.width / 2, 125, 'fontwhite', "Select your weapon");
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

			let weapon = this.addButton((position), 490, 'sprites', doWinner, this, weapons[i], weapons[i]).setDisplaySize(135, 135);
			weapon.alpha = .75;

			weapon.on('pointerdown', function () {
				if (player_result_code === '') {
					opponetSelectText.setText('');
					gameScore.setText('');
					userWeapon = weapon.frame.name;
					weapon.alpha = 1;
				}
			});

			weapon.on('pointerover', function () {
				if (!player_result_code) {
					weapon.alpha = 1;
					weaponText.setPosition(this.x, 585);
					weaponText.setText(weapon.frame.name);
					sfx_choice.play();
				}
			});
			weapon.on('pointerout', function () {
				weapon.alpha = .75;
				weaponText.setText('');
			});
		}

		this.btn_quit = this.addButton(config.width - 35, 35, 'sprites', this.doBack, this, 'btn_close_act', 'btn_close_act').setDisplaySize(45, 45);

		userSelectText = this.add.bitmapText(config.width / 2, 625, 'fontwhite', '').setOrigin(0.5).setCenterAlign();
		opponetSelectText = this.add.bitmapText(config.width / 2, 680, 'fontwhite', '').setOrigin(0.5).setCenterAlign();

		function doWinner() {
			if (player_result_code === '') {
				gameResult.setText('');
				gameScore.setText('');
				this.sfx_win.stop();
				this.sfx_lose.stop();
				this.sfx_draw.stop();
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

				let frames = 6;
				let frame_duration = 260;

				var timeline_left = this.tweens.createTimeline();
				var timeline_right = this.tweens.createTimeline();

				for (let i = 0; i <= frames; i++) {
					(i % 2 === 1) ? cof = -1 : cof = 1;
					if (i === 0) {
						left_hand.setTexture('sprites', 'hand_rock');
						right_hand.setTexture('sprites', 'hand_rock');
						timeline_left.add({
							targets: left_hand,
							x: -225,
							ease: 'Linear',
							duration: frame_duration,
						});
						timeline_right.add({
							targets: right_hand,
							x: config.width + 225,
							ease: 'Linear',
							duration: frame_duration,
						});
					}
					else {
						if (i < frames) {
							timeline_left.add({
								targets: left_hand,
								angle: 25 * cof,
								ease: 'Power2',
								duration: frame_duration,
							});
							timeline_right.add({
								targets: right_hand,
								angle: -25 * cof,
								ease: 'Power2',
								duration: frame_duration,
							});
						}
						else {
							timeline_left.add({
								targets: left_hand,
								angle: 0,
								x: 110,
								ease: 'Linear',
								duration: frame_duration,
							});
							timeline_right.add({
								targets: right_hand,
								angle: 0,
								x: config.width - 110,
								ease: 'Linear',
								duration: frame_duration,
							});
						}
					}
				}
				timeline_left.play();
				timeline_right.play();
				this.sfx_drums.play();

				setTimeout(()=>{
					left_hand.setTexture('sprites', `hand_${userWeapon}`);
					right_hand.setTexture('sprites', `hand_${opponentWeapon}`);

					let text_result = '';
					if (player_result_code === 1) {
						text_result = "You win!";
						this.sfx_win.play();
						this.userScore++;
					}
					else if (player_result_code === -1) {
						text_result = "You lose!";
						this.sfx_lose.play();
						this.opponentScore++;
					}
					else if (player_result_code === 0) {
						text_result = "It's a draw";
						this.sfx_draw.play();
					}

					gameResult.setText(text_result);
					gameResult.setOrigin(0.5).setCenterAlign();
					gameResult.setAlpha(0.0);
					gameResult.setAngle(540);
					gameResult.setScale(.1, .1);
					gameResult.setFontSize(60);

					gameScore.setText(this.userScore + ' : ' + this.opponentScore);

					this.tweens.add(
						{
							targets: gameResult,
							scaleX: 1,
							scaleY: 1,
							alpha: 1.0,
							angle: 0,
							ease: 'Power3',
							duration: 1000
						}
					);

					opponetSelectText.setText('opponent select: ' + opponentWeapon);
					setTimeout(()=>{player_result_code = ''}, 1000);

				}, frames * frame_duration);
			}
		}
	},
	doBack: function () {
		this.scene.start('mainmenu');
	}

});
