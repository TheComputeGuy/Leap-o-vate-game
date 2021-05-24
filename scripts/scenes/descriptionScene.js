class DescriptionScene extends Phaser.Scene {

    #data = `Options are a flexible investment tool that can help you take advantage of any market condition. With the ability to generate income, help limit risk, or take advantage of your bullish or bearish forecast, options can help you achieve your investment goals. 
    The buyer of call options has the right, but not the obligation, to buy an underlying security at a specified strike price. That may seem like a lot of stock market jargon, but all it means is that if you were to buy call options on XYZ stock, for example, you would have the right to buy XYZ stock at an agreed-upon price before a specific date.
    Thus, call options can help you reduce your losses in the market while giving you control over your investment.`;

    constructor() {
        super({ key: 'descriptionScene' });
    }

    preload() {
        this.load.image('sky', 'assets/options/sky.jpg');
        this.load.image('box', 'assets/options/box.png');
        this.load.image('nextButton', 'assets/commons/next.png');
        this.load.image('bar', 'assets/commons/black.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2 - 35, 'box').setDisplaySize(800, 400).setAlpha(0.7);
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 50, 'bar').setDisplaySize(650, 40).setAlpha(0.75);
        var linkText = this.add.text(198, this.sys.game.config.height - 67, 'Click here to learn more about Options on Fidelity.com', { fontSize: '24px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });

        this.add.text(375, 85, 'Call Options', { fontSize: '40px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        this.add.text(150, 160, this.#data, { fontSize: '20px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'justify' }).setWordWrapWidth(700, true);

        var backButton = this.add.image(50, this.sys.game.config.height - 50, 'nextButton').setScale(0.75).setVisible(true).setFlipX(true);
        var nextButton = this.add.image(this.sys.game.config.width - 50, this.sys.game.config.height - 50, 'nextButton').setScale(0.75).setVisible(true);

        linkText.setInteractive({ useHandCursor: true });
        linkText.on('pointerdown', () => {
            window.open("https://www.fidelity.com/learning-center/investment-products/options/options-overview", "_blank");
        });

        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerdown', () => {
            this.#switchScene(-1);
        });

        nextButton.setInteractive({ useHandCursor: true });
        nextButton.on('pointerdown', () => {
            this.#switchScene(1);
        });
    }

    #switchScene(data) {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        if (data < 0) {
            this.scene.start('optionScene');
        }
        if (data > 0) {
            this.scene.start('endScene');
        }

    }
}

export default DescriptionScene;
