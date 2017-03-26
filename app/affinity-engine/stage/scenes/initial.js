import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  start: task(function * (script) {
    yield script.pause(500);
    yield script.text("Heads up, this game is about insistent misrecognition: aka, the shitty experience of having someone insist that you are something you are not.");
    yield script.text("Also, this game has amazing ♭♩♪♬ (!!!?), so you might want to mute your speakers if you're at work or something.")

    script.scene('main');
  })
});
