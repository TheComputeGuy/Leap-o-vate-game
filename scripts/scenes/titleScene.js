class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }

    preload() {
        this.load.image('scenery', 'assets/title/background.png');
        this.load.image('name', 'assets/title/name.png');
        this.load.image('play', 'assets/title/play.png');
        this.load.image('logo', 'assets/commons/logo.png');
    }

    create() {
        this.add.image(0, 0, 'scenery').setOrigin(0, 0).setScale(0.5);
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 45, 'name').setScale(0.6);
        var playButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 125, 'play').setScale(0.5);
        this.add.image(this.sys.game.config.width - 70, this.sys.game.config.height - 20, 'logo').setScale(0.12);

        playButton.setInteractive({ useHandCursor: true });
        playButton.on('pointerdown', () => {
            this.#switchScene();
        });
    }

    #switchScene() {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        this.scene.start('scenarioScene');
    }
}

export default TitleScene;
