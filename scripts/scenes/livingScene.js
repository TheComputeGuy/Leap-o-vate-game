class LivingScene extends Phaser.Scene {

    #instruction = "Press E to move next";

    * dialogueGenerator() {
        yield* [
            `"In the news today is the mega infrastructure project...`,
            `... which might come up in Sector 27 soon..."`,
            `Alexandra: Hey, Sector 27 is where Ben owns a plot of land!`,
            `Lucky chap! How about I buy that plot from him?`,
            `Let's look the prices up!`,
            `Hmm, I have $25,000 of savings right now, the price is at $10,000`,
            `But there's a chance that price might increase due to project`,
            `But there's also the chance that price might fall...`,
            `... if the project get's cancelled!`,
            `What do I do?`,
            `Let me call up Ben first!`
        ]
    };

    constructor() {
        super({ key: 'livingScene' });
    }

    preload() {
        this.load.image('room', 'assets/living/room.jpg');
        this.load.image('bar', 'assets/commons/black.png');
        this.load.image('alexandra', 'assets/people/alexandra.png');
        this.load.image('nextButton', 'assets/commons/next.png');
    }

    create() {
        this.add.image(0, 0, 'room').setOrigin(0, 0).setScale(0.55);
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height + 20, 'bar');
        this.add.image(75, this.sys.game.config.height, 'alexandra').setScale(0.5);

        this.add.text(this.sys.game.config.width - 275, 15, this.#instruction, { fontSize: '25px', fontFamily: 'Fidelity Sans', fill: '#fff' });
        var nextButton = this.add.image(this.sys.game.config.width - 50, this.sys.game.config.height - 50, 'nextButton').setVisible(false);

        const dialogue = this.dialogueGenerator();
        var dialogueText = this.add.text(200, this.sys.game.config.height - 55, dialogue.next().value, { fontSize: '25px', fontFamily: 'Fidelity Sans', fill: '#fff' });
        
        var keyObj = this.scene.scene.input.keyboard.addKey('E');
        keyObj.on('down', function (event) {
            var output = dialogue.next();
            dialogueText.setText(output.value);
            if (output.done == true) {
                nextButton.setVisible(true);
            }
        });

        nextButton.setInteractive({ useHandCursor: true });
        nextButton.on('pointerdown', () => {
            this.#switchScene();
        });
    }

    #switchScene() {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        this.scene.start('plotScene');
    }
}

export default LivingScene;