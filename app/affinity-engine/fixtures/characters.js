export default [{
  id: 'player',
  name: 'You'
}, {
  id: 'alien',
  name: 'Alien',
  namePosition: 'center',
  height: 75,
  defaultState: { pose: 'distracted' },
  layerOrder: ['base'],
  states: [{
    key: { pose: 'neutral' },
    layers: {
      base: 'alien-neutral'
    }
  }, {
    key: { pose: 'annoyed' },
    layers: {
      base: 'alien-annoyed'
    }
  }, {
    key: { pose: 'distracted' },
    layers: {
      base: 'alien-distracted'
    }
  }, {
    key: { pose: 'sad' },
    layers: {
      base: 'alien-sad'
    }
  }, {
    key: { pose: 'worried' },
    layers: {
      base: 'alien-worried'
    }
  }]
}];
