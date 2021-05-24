class OptionScene extends Phaser.Scene {

    #options = [
        `Pay an extra fee to get the option to buy later at today's price or to call the deal off later`,
        `Buy today even though land is not needed today, prices might increase or decrease later`
    ];

    constructor() {
        super({ key: 'optionScene' });
    }

    preload() {
        this.load.image('sky', 'assets/options/sky.jpg');
        this.load.image('box', 'assets/options/box.png');
        this.load.image('bar', 'assets/commons/black.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.add.image(500, 100, 'bar').setScale(0.5).setAlpha(0.6);
        this.add.text(275, 80, 'What should Alexandra do?', { fontSize: '35px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        var box1 = this.add.image(250, 400, 'box').setScale(0.2).setAlpha(0.6);
        this.add.text(120, 340, this.#options[0], { fontSize: '23px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'justify' }).setWordWrapWidth(278, true);
        var box2 = this.add.image(750, 400, 'box').setScale(0.2).setAlpha(0.6);
        this.add.text(620, 340, this.#options[1], { fontSize: '23px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'justify' }).setWordWrapWidth(278, true);

        box1.setInteractive({ useHandCursor: true });
        box1.on('pointerdown', () => {
            this.#switchScene(1);
        });

        box2.setInteractive({ useHandCursor: true });
        box2.on('pointerdown', () => {
            this.#switchScene(2);
        });
    }

    #switchScene(data) {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        this.scene.start('simulationScene', data);
    }

}

export default OptionScene;
