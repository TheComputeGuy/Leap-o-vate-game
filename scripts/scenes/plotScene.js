class PlotScene extends Phaser.Scene {
    #instruction = "Press E to move next";

    * dialogueGenerator() {
        yield* [
            `Ben: Hey Alexandra! How are you?`,
            `Alexandra: Hey Ben! I am great!...`,
            `I was thinking about buying this land,...`,
            `...but not today, a few months later.`,
            `Alexandra: But now I am in a dilemma -`,
            `if prices decrease when I want the land...`,
            `...then I might lose money if I buy today...`,
            `... and if prices increase then I'll be in profit!`,
            `What do I do?`,
            `Ben: I have a deal for you - ...`,
            `Pay some additional money and...`,
            `...I can give you the right to call the deal off...`,
            `...whenever you want in the next six months.`,
            `If you do not call the deal off till then, ...`,
            `...you can buy the land six months later...`,
            `...at a price we decide today...`,
            `...and add the said fees to that price.`
        ]
    };

    constructor() {
        super({ key: 'plotScene' });
    }

    preload() {
        this.load.image('plot', 'assets/plot/plot.jpg');
        this.load.image('bar', 'assets/commons/black.png');
        this.load.image('ben', 'assets/people/ben.png');
        this.load.image('alexandra', 'assets/people/alexandra.png');
        this.load.image('nextButton', 'assets/commons/next.png');
    }

    create() {
        this.add.image(0, 0, 'plot').setOrigin(0, 0).setScale(1.4);
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height + 20, 'bar');
        this.add.image(this.sys.game.config.width - 85, this.sys.game.config.height, 'alexandra').setScale(0.5).setFlipX(true);
        this.add.image(105, this.sys.game.config.height-50, 'ben').setScale(0.5);

        this.add.text(this.sys.game.config.width - 275, 15, this.#instruction, { fontSize: '25px', fontFamily: 'Fidelity Sans', fill: '#fff' });
        var nextButton = this.add.image(this.sys.game.config.width - 50, this.sys.game.config.height - 50, 'nextButton').setVisible(false);

        const dialogue = this.dialogueGenerator();
        var dialogueText = this.add.text(300, this.sys.game.config.height - 55, dialogue.next().value, { fontSize: '25px', fontFamily: 'Fidelity Sans', fill: '#fff' });
        
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
        this.scene.start('optionScene');
    }
}

export default PlotScene;
