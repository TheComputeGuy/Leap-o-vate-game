class SimulationScene extends Phaser.Scene {

    #headers = [
        `Choose the \"call options\"`,
        `   Choose to buy today`
    ];

    #balances = [
        [
            '$25,000',
            '$25,000',
            '$13,000',
            '$15,000'
        ],
        [
            '$25,000',
            '$25,000',
            '$13,000',
            '$10,000'
        ],
        [
            '$25,000',
            '$25,000',
            '$23,000',
            '$15,000'
        ]
    ]

    #simTitles = [
        `Prices remain the same`,
        ` Price of land increases`,
        `Price of land decreases`
    ];

    #simText = [
        [
            [
                `When prices do not change a lot, having a call options leads to extra spending because of the extra fees. So if the fees are set at $2,000 and the option is chosen, the savings look as shown -> `
            ],
            [
                `When price changes to $15,000 six months later when deal is executed, having the call option gives Alexandra the advantage that she can still buy the land at the price decided earlier, i.e. $10,000. The fees ($2,000) are added to the deal for the option.`
            ],
            [
                `When price changes to $7,000 six months later when the deal is executed, having the call option gives Alexandra the flexibility to call the deal off and not buy the land instead of buying it at a price decided earlier which is more than market price.`
            ]
        ],
        [
            [
                `When prices do not change a lot, having a call options leads to extra spending because of the extra fees. So if the fees are set at $2,000 and the option is not chosen, the savings look as shown - `
            ],
            [
                `Since the price of land increases six months later, Alexandra is in a profitable situation because she paid less for the land and has the land with her when she wants it six months later.`
            ],
            [
                `Since the price of land has decreased to $7,000 when she wants it, Alexandra has incurred a loss of $3,000 by buying the land six months earlier for $10,000 since she needs it only now and could've bought it now at a lesser price.`
            ]
        ]
    ];

    simNum = 0;

    todayBal;
    laterBal;
    simHeading;
    simText;
    dataIn;


    constructor() {
        super({ key: 'simulationScene' });
    }

    init(data) {
        this.dataIn = data;
    }

    preload() {
        this.load.image('land', 'assets/sim/land.png');
        this.load.image('square', 'assets/sim/square.png');
        this.load.image('box', 'assets/options/box.png');
        this.load.image('bar', 'assets/commons/black.png');
        this.load.image('lastButton', 'assets/commons/last.png');
        this.load.image('nextButton', 'assets/commons/next.png');
    }

    create(data) {
        this.add.image(0, 0, 'land').setOrigin(0, 0).setScale(0.4);
        this.add.image(500, 80, 'bar').setScale(0.5).setAlpha(0.7);
        this.add.text(300, 60, this.#headers[data - 1], { fontSize: '35px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });

        var balanceSheet = this.add.group();
        var sheetBox = this.add.image(800, 315, 'square').setScale(0.25).setAlpha(0.7);
        var todayText = this.add.text(690, 205, 'Today\'s balance', { fontSize: '30px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        this.todayBal = this.add.text(750, 250, this.#balances[this.simNum][data - 1], { fontSize: '30px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        var laterText = this.add.text(670, 310, 'Balance six months\nlater', { fontSize: '30px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        this.laterBal = this.add.text(750, 385, this.#balances[this.simNum][data + 1], { fontSize: '30px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        balanceSheet.addMultiple([sheetBox, todayText, this.todayBal, laterText, this.laterBal]).setVisible(false);

        var simulationDetails = this.add.group();
        var detailsBox = this.add.image(300, 320, 'box').setScale(0.3).setAlpha(0.7);
        this.simHeading = this.add.text(125, 193, this.#simTitles[this.simNum], { fontSize: '33px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' });
        this.simText = this.add.text(75, 250, this.#simText[data-1][this.simNum][0], { fontSize: '25px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'justify' }).setWordWrapWidth(450, true);
        var lastSim = this.add.image(this.sys.game.config.width - 200, this.sys.game.config.height - 50, 'lastButton').setScale(0.75).setVisible(true);
        simulationDetails.addMultiple([detailsBox, this.simHeading, this.simText, lastSim]).setVisible(false);

        var buttonGroup = this.add.group();
        var backButton = this.add.image(50, this.sys.game.config.height - 40, 'nextButton').setScale(0.75).setVisible(true).setFlipX(true);
        var backBox = this.add.image(254, this.sys.game.config.height - 40, 'bar').setDisplaySize(307, 30).setAlpha(0.7);
        var backText = this.add.text(110, this.sys.game.config.height - 50, 'Replay the scenario with different options', { fontSize: '15px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'left' });
        var nextButton = this.add.image(this.sys.game.config.width - 50, this.sys.game.config.height - 40, 'nextButton').setScale(0.75).setVisible(true);
        var nextBox = this.add.image(this.sys.game.config.width - 210, this.sys.game.config.height - 40, 'bar').setDisplaySize(220, 30).setAlpha(0.7);
        var nextText = this.add.text(this.sys.game.config.width - 310, this.sys.game.config.height - 50, 'Learn what \"call options\" are', { fontSize: '15px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'right' });
        buttonGroup.addMultiple([backButton, backBox, backText, nextButton, nextBox, nextText]);

        var simsGroup = this.add.group();
        var simBox1 = this.add.image(180, 320, 'square').setScale(0.2).setAlpha(0.8);
        var simBox2 = this.add.image(500, 320, 'square').setScale(0.2).setAlpha(0.8);
        var simBox3 = this.add.image(820, 320, 'square').setScale(0.2).setAlpha(0.8);
        var simText1 = this.add.text(75, 275, this.#simTitles[0], { fontSize: '35px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' }).setWordWrapWidth(230, true);
        var simText2 = this.add.text(400, 275, this.#simTitles[1], { fontSize: '35px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' }).setWordWrapWidth(230, true);
        var simText3 = this.add.text(720, 275, this.#simTitles[2], { fontSize: '35px', fontFamily: 'Fidelity Sans', fill: '#fff', align: 'center' }).setWordWrapWidth(230, true);
        simsGroup.addMultiple([simBox1, simBox2, simBox3, simText1, simText2, simText3]);

        simBox1.setInteractive({ useHandCursor: true });
        simBox1.on('pointerdown', () => {
            this.simNum = 0;
            simsGroup.setVisible(false);
            buttonGroup.setVisible(false);
            simulationDetails.setVisible(true);
            balanceSheet.setVisible(true);
        });

        simBox2.setInteractive({ useHandCursor: true });
        simBox2.on('pointerdown', () => {
            this.simNum = 1;
            simsGroup.setVisible(false);
            buttonGroup.setVisible(false);
            simulationDetails.setVisible(true);
            balanceSheet.setVisible(true);
        });

        simBox3.setInteractive({ useHandCursor: true });
        simBox3.on('pointerdown', () => {
            this.simNum = 2;
            simsGroup.setVisible(false);
            buttonGroup.setVisible(false);
            simulationDetails.setVisible(true);
            balanceSheet.setVisible(true);
        });

        lastSim.setInteractive({ useHandCursor: true });
        lastSim.on('pointerdown', () => {
            simsGroup.setVisible(true);
            buttonGroup.setVisible(true);
            simulationDetails.setVisible(false);
            balanceSheet.setVisible(false);
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

    update() {
        this.todayBal.setText(this.#balances[this.simNum][this.dataIn - 1]);
        this.laterBal.setText(this.#balances[this.simNum][this.dataIn + 1]);
        this.simHeading.setText(this.#simTitles[this.simNum]);
        this.simText.setText(this.#simText[this.dataIn-1][this.simNum][0]);
    }

    #switchScene(data) {
        this.time.delayedCall(500, function () {
            this.cameras.main.fade(500);
        }, [], this);
        if (data < 0) {
            this.scene.start('optionScene');
        }
        if (data > 0) {
            this.scene.start('descriptionScene');
        }

    }

}

export default SimulationScene;
