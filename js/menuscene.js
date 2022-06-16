var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, { key: 'mainmenu' });
        },

    preload: function () {
    },

    create: function () {
        var logo = this.add.sprite(config.width / 2, 175, 'sprites', 'logo');
        this.btn_faq = this.addButton(config.width / 2 + 100, 445, 'sprites', this.doTutor, this, 'btn_faq_act', 'btn_faq');
        this.btn_start = this.addButton(config.width / 2 - 100, 445, 'sprites', this.doStart, this, 'btn_play_act', 'btn_play');
    },

    doTutor: function () {
        this.scene.start('FaqScene');
    },

    doStart: function () {
        this.scene.start('gamescene');
    }

});
