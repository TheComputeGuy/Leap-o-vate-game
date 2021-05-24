class ScenarioScene extends Phaser.Scene {
    constructor() {
        super({ key: 'scenarioScene' });
    }

    preload() {
        this.load.image('sky', 'assets/options/sky.jpg');
        this.load.image('box', 'assets/options/box.png');
        this.load.image('bar', 'assets/commons/black.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.add.image(500, 100, 'bar').setDisplaySize(500, 100).setAlpha(0.6);
        this.add.text(350, 80, 'Choose a scenario', { fontSize: '35px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        var box1 = this.add.image(500, 400, 'box').setScale(0.17).setAlpha(0.6);
        this.add.text(395, 363, 'The concept of\n\"Call Options\"', { fontSize: '30px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });

        box1.setInteractive({ useHandCursor: true });
        box1.on('pointerdown', () => {
            this.#switchScene('livingScene');
        });
    }

    #switchScene(sceneKey) {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        this.scene.start(sceneKey);
    }

}

export default ScenarioScene;