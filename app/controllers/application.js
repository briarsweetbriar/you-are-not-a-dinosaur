import Ember from 'ember';
import config from '../affinity-engine/config';
import fixtures from '../affinity-engine/fixtures';

export default Ember.Controller.extend({
  config,
  fixtures,
  progressBarOptions: {
    color: 'rgb(250, 250, 250)',
    trailColor: 'rgba(250, 250, 250, 0.62)',
    strokeWidth: 1,
    trailWidth: 0.62,
    text: {
      style: {
        position: 'absolute',
        left: '50%',
        bottom: '15px',
        transform: {
          prefix: true,
          value: 'translateX(-50%)'
        }
      },
      autoStyleContainer: false
    }
  }
});
