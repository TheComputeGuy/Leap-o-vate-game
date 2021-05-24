class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'endScene' });
    }

    preload() {
        this.load.image('grey', 'assets/commons/grey.jpg');
        this.load.image('bar', 'assets/commons/black.png');
        this.load.image('libraryButton', 'assets/commons/library.png');
        this.load.image('replayButton', 'assets/commons/replay.png');
        this.load.image('exitButton', 'assets/commons/exit.png');
        this.load.image('logo', 'assets/commons/logo.png');
    }

    create() {
        this.add.image(0, 0, 'grey').setOrigin(0, 0).setScale(0.6);
        this.add.image(this.sys.game.config.width - 70, this.sys.game.config.height - 20, 'logo').setScale(0.12);

        var replayButton = this.add.image(400, 250, 'replayButton');
        var replayBox = this.add.image(400, 370, 'bar').setDisplaySize(100, 60).setAlpha(0.7);
        var replayText = this.add.text(360, 350, 'Replay this\nscenario', { fontSize: '16px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' }).setWordWrapWidth(230, true);
        var libraryButton = this.add.image(600, 250, 'libraryButton');
        var libraryBox = this.add.image(600, 370, 'bar').setDisplaySize(200, 60).setAlpha(0.7);
        var libraryText = this.add.text(545, 350, 'Go back to the\nscenario library', { fontSize: '16px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' }).setWordWrapWidth(230, true);
        var exitButton = this.add.image(800, 250, 'exitButton');
        var exitBox = this.add.image(800, 370, 'bar').setDisplaySize(100, 60).setAlpha(0.7);
        var exitText = this.add.text(775, 350, 'Exit the\ngame', { fontSize: '16px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' }).setWordWrapWidth(230, true);

        replayButton.setInteractive({ useHandCursor: true });
        replayButton.on('pointerdown', () => {
            this.#switchScene(0);
        });

        libraryButton.setInteractive({ useHandCursor: true });
        libraryButton.on('pointerdown', () => {
            this.#switchScene(-1);
        });

        exitButton.setInteractive({ useHandCursor: true });
        exitButton.on('pointerdown', () => {
            this.#switchScene(1);
        });
    }

    #switchScene(data) {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        if (data < 0) {
            this.scene.start('scenarioScene');
        }
        if(data == 0) {
            this.scene.start('livingScene');
        }
        if (data > 0) {
            this.scene.start('exit');
        }

    }
}

export default EndScene;