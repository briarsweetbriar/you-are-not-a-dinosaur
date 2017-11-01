export default {
  component: {
    stage: {
      direction: {
        prompt: {
          attrs: {
            classNames: {
              decorative: ['ae-paper']
            }
          }
        },
        text: {
          attrs: {
            lxlAnimation: {
              effect: {
                translateZ: [0, -3],
                opacity: [0.999, 1]
              },
              duration: 3
            }
          }
        }
      }
    }
  }
};
