import TitleScene from './scenes/titleScene.js';
import LivingScene from './scenes/livingScene.js';
import ScenarioScene from './scenes/scenarioScene.js';
import PlotScene from './scenes/plotScene.js';
import OptionScene from './scenes/optionScene.js';
import SimulationScene from './scenes/simulationScene.js';
import DescriptionScene from './scenes/descriptionScene.js';
import EndScene from './scenes/endScene.js';

var titleScene = new TitleScene();
var livingScene = new LivingScene();
var plotScene = new PlotScene();
var optionScene = new OptionScene;
var scenarioScene = new ScenarioScene();
var simulationScene = new SimulationScene();
var descriptionScene = new DescriptionScene();
var endScene = new EndScene();

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 559
};

var game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add('livingScene', livingScene);
game.scene.add('plotScene', plotScene);
game.scene.add('optionScene', optionScene);
game.scene.add('scenarioScene', scenarioScene);
game.scene.add('simulationScene', simulationScene);
game.scene.add('descriptionScene', descriptionScene);
game.scene.add('endScene', endScene);

game.scene.start('titleScene');