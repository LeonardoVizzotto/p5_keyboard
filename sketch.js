var wave;
var waveB;
var started = false;

whiteKeyWidth = 40;
whiteKeyHeight = 120;
blackKeyWidth = whiteKeyWidth / 2;
blackKeyHeight = 0.66 * whiteKeyHeight;

let whiteKeys = [
  {
    key: "a",
    x: whiteKeyWidth,
    y: whiteKeyHeight,
    start: createWave(1046.502),
  },
  {
    key: "s",
    x: whiteKeyWidth * 2,
    y: whiteKeyHeight,
    start: createWave(1174.659),
  },
  {
    key: "d",
    x: whiteKeyWidth * 3,
    y: whiteKeyHeight,
    start: createWave(1318.51),
  },
  {
    key: "f",
    x: whiteKeyWidth * 4,
    y: whiteKeyHeight,
    start: createWave(1396.913),
  },
  {
    key: "g",
    x: whiteKeyWidth * 5,
    y: whiteKeyHeight,
    start: createWave(1567.982),
  },
  {
    key: "h",
    x: whiteKeyWidth * 6,
    y: whiteKeyHeight,
    start: createWave(1760.0),
  },
  {
    key: "j",
    x: whiteKeyWidth * 7,
    y: whiteKeyHeight,
    start: createWave(1975.533),
  },
];

blackKeys = [
  {
    key: "w",
    x: whiteKeyWidth + 30,
    y: whiteKeyHeight - 15,
    start: createWave(1108.731),
  },
  {
    key: "e",
    x: whiteKeyWidth * 2 + 30,
    y: whiteKeyHeight - 15,
    start: createWave(1244.508),
  },
  {
    key: "t",
    x: whiteKeyWidth * 4 + 30,
    y: whiteKeyHeight - 15,
    start: createWave(1479.978),
  },
  {
    key: "y",
    x: whiteKeyWidth * 5 + 30,
    y: whiteKeyHeight - 15,
    start: createWave(1661.219),
  },
  {
    key: "u",
    x: whiteKeyWidth * 6 + 30,
    y: whiteKeyHeight - 15,
    start: createWave(1864.655 ),
  },
];

function setup() {
  createCanvas(500, 350);
  noStroke();
  background(230);
}

function draw() {
  drawKeyboard();
}

function drawKeyboard() {
  stroke(0, 0, 0);

  whiteKeys.forEach(({key, x, y, pressed }) => {
    if (pressed) {
      fill(80, 80, 80);
    } else {
      fill(255, 255, 255);
    }
    rect(x, y, whiteKeyWidth, whiteKeyHeight);
    textSize(32);
    text(key, x + 10, whiteKeyHeight * 2 - 10);
  });

  blackKeys.forEach(({ key, x, y, pressed }) => {
    if (pressed) {
      fill(80, 80, 80);
    } else {
      fill(0, 0, 0);
    }
    rect(x, y, blackKeyWidth, blackKeyHeight);
    fill(255,255,255)
    textSize(15);
    text(key, x + 4, whiteKeyHeight + 50);
  });
}

function keyTyped() {
  if (!started) {
    started = true;
    [...whiteKeys, ...blackKeys].forEach((k) => {
      const { wave, env } = k.start();
      k.wave = wave;
      k.env = env;
    });
  }

  if (key < "a" || key > "z") {
    return;
  }

  [...whiteKeys, ...blackKeys].forEach((k) => {
    if (key === k.key) {
      k.env.triggerAttack();
      k.pressed = true;
    }
  });
}

function keyReleased() {
  if (key < "a" || key > "z") {
    return;
  }

  [...whiteKeys, ...blackKeys].forEach((k) => {
    if (key === k.key) {
      k.env.triggerRelease();
      k.pressed = false;
    }
  });
}

function createWave(freq) {
  return () => {
    env = new p5.Env();
    env.setADSR(0.02, 0.1, 0.4, 0.4);
    env.setRange(0.7, 0);
    wave = new p5.Oscillator();
    wave.setType("sine");
    wave.start();
    wave.freq(freq);
    wave.amp(env);

    return { wave, env };
  };
}
