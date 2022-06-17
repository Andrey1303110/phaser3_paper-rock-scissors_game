var FaqScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function FaqScene() {
            Phaser.Scene.call(this, { key: 'FaqScene' });
        },

    create: function () {
        var logo = this.add.sprite(config.width / 2, 125, 'sprites', 'logo');

        var main_text = this.add.bitmapText(config.width / 2, 375, 'fontwhite', "The winner is determined by the following rules:\n\nPaper beats rock (paper wraps rock)\nRock beats scissors (rock breaks scissors)\nScissors beats paper (scissors cut paper)");
        main_text.setOrigin(0.5).setLeftAlign();

        var down_text = this.add.bitmapText(config.width / 2, 540, 'fontwhite', "To start the game simply select your weapon");
        down_text.setOrigin(0.5).setCenterAlign();

        this.btn_back = this.addButton(config.width / 2, 640, 'sprites', this.doBack, this, 'btn_return_act', 'btn_return');
    },

    doBack: function () {
        this.scene.start('mainmenu');
    }

});
