import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  start: task(function * (script) {
    yield script.pause(500);
    yield script.text("Please be advised that this game is about insistent misrecognition. It's shitty enough in real life, so you might not want to play this gamified version of it.");
    yield script.text("Also, this game has ♭♩♪♬, so you might want to mute your speakers if you're at work or something.")

    script.scene('main');
  })
});
