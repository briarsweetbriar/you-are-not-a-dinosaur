import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  start: task(function * (script) {
    yield script.text("Please be advised that this game features insistent misrecognition. It's upsetting enough in real life, so you might not want to play this gamified version of it.");

    script.scene('main');
  })
});
