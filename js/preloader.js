var Preloader = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function Preloader ()
	{
		Phaser.Scene.call(this, {
			key: 'preloader',
			pack: {
				files: [
					{ type: 'image', key: 'loadingbar_bg', url: 'img/loadingbar_bg.png' },
					{ type: 'image', key: 'loadingbar_fill', url: 'img/loadingbar_fill.png' }
				]
			}
		});
	},
	
	setPreloadSprite: function (sprite)
	{
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height };
		sprite.visible = true;
		this.load.on('progress', this.onProgress, this );
		this.load.on('fileprogress', this.onFileProgress, this );
	},
	
	onProgress: function (value) {

		if (this.preloadSprite)
		{
			var w = Math.floor(this.preloadSprite.width * value);	
			this.preloadSprite.sprite.frame.width    = (w <= 0 ? 1 : w);
			this.preloadSprite.sprite.frame.cutWidth = w;
			this.preloadSprite.sprite.frame.updateUVs();
		}
	},
	
	onFileProgress: function (file) {
		console.log('onFileProgress: file.key=' + file.key);
	},

	preload: function ()
	{
		this.loadingbar_bg   = this.add.sprite(config.width/2, 300, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(config.width/2, 300, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);
		this.load.atlas('sprites', 'img/spritearray.png', 'img/spritearray.json');
		this.load.bitmapFont('fontwhite', 'img/fontwhite.png', 'img/fontwhite.xml');
		this.load.image('bg', 'img/bg.jpg');
		this.load.audio('win', ['snd/applause.mp3', 'snd/applause.ogg']);
		this.load.audio('lose', ['snd/uh-oh.mp3', 'snd/uh-oh.ogg']);
		this.load.audio('draw', ['snd/what.mp3', 'snd/what.ogg']);
		this.load.audio('choice', ['snd/choice.mp3', 'snd/choice.ogg']);
		this.load.audio('drums', ['snd/drums.mp3', 'snd/drums.ogg']);
	},

	create: function ()
	{
		this.anims.create({
			frames: [
				{ key: 'sprites', frame: 'bg' },
				{ key: 'sprites', frame: 'logo' },
				{ key: 'sprites', frame: 'btn_return' },
				{ key: 'sprites', frame: 'btn_return_act' },
				{ key: 'sprites', frame: 'btn_faq' },
				{ key: 'sprites', frame: 'btn_faq_act' },
				{ key: 'sprites', frame: 'btn_play' },
				{ key: 'sprites', frame: 'btn_play_act' },
				{ key: 'sprites', frame: 'btn_close' },
				{ key: 'sprites', frame: 'hand_paper' },
				{ key: 'sprites', frame: 'hand_scissors' },
				{ key: 'sprites', frame: 'hand_rock' },
				{ key: 'sprites', frame: 'paper' },
				{ key: 'sprites', frame: 'scissors' },
				{ key: 'sprites', frame: 'rock' }
			],
		});
		this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;

		this.scene.start('mainmenu');
	}
});
