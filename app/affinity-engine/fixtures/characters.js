export default [{
  id: 'martian',
  name: 'Martian',
  namePosition: 'center',
  height: 75,
  defaultState: { pose: 'distracted' },
  layerOrder: ['base'],
  states: [{
    key: { pose: 'neutral' },
    layers: {
      base: 'martian-neutral'
    }
  }, {
    key: { pose: 'annoyed' },
    layers: {
      base: 'martian-annoyed'
    }
  }, {
    key: { pose: 'distracted' },
    layers: {
      base: 'martian-distracted'
    }
  }, {
    key: { pose: 'sad' },
    layers: {
      base: 'martian-sad'
    }
  }, {
    key: { pose: 'worried' },
    layers: {
      base: 'martian-worried'
    }
  }]
}];
