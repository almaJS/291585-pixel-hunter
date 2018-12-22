import assert from 'assert';
import {resize} from './resize';

const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.WIDTH}x${frame.HEIGHT}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.WIDTH, height: frame.HEIGHT});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.WIDTH, height: Math.floor(frame.HEIGHT / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.WIDTH / 2), height: frame.HEIGHT});
    });

  });
};

createTestForFrame({WIDTH: 256, HEIGHT: 256});
createTestForFrame({WIDTH: 256, HEIGHT: 128});

createTestForFrame({WIDTH: 468, HEIGHT: 458});
createTestForFrame({WIDTH: 705, HEIGHT: 455});
createTestForFrame({WIDTH: 304, HEIGHT: 455});
