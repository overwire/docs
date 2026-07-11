// ASCII text hero effect, ported from ReactBits' ASCIIText React component
// (https://reactbits.dev/text-animations/ascii-text, which credits
// https://codepen.io/JuanFuentes/pen/eYEeoyE). Divergences from upstream:
//  - React wrapper replaced by createAsciiText(container, options) → cleanup fn.
//  - IBM Plex Mono (Google Fonts) → self-hosted Geist Mono, weight 600 → 500.
//  - Rainbow gradient / mix-blend-mode / mouse hue-rotate removed; character
//    color and the low-res sampling <canvas> backdrop are styled by the
//    caller's CSS instead (theme-aware, "blue is the only accent").
//  - Mouse/touch tilt removed: the wordmark stays put; the only motion is
//    the time-driven shader wobble.

import * as THREE from 'three';

const MONO_FAMILY = '"Geist Mono", monospace';
// Texture wordmark: Geist Sans bold matches the brand wordmark, and its
// thicker strokes survive the coarse ASCII sampling grid.
const TEXT_FAMILY = '"Geist Sans", sans-serif';
const TEXT_WEIGHT = 700;

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;

    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;

interface AsciiFilterOptions {
  fontSize?: number;
  fontFamily?: string;
  charset?: string;
  invert?: boolean;
}

class AsciiFilter {
  renderer!: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width: number = 0;
  height: number = 0;
  cols: number = 0;
  rows: number = 0;

  constructor(renderer: THREE.WebGLRenderer, { fontSize, fontFamily, charset, invert }: AsciiFilterOptions = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });
    this.domElement.appendChild(this.canvas);

    this.invert = invert ?? true;
    this.fontSize = fontSize ?? 12;
    this.fontFamily = fontFamily ?? "'Courier New', monospace";
    this.charset = charset ?? ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

    if (this.context) {
      // Upstream disables smoothing, but at hero scale the glyph strokes are
      // thinner than the cell pitch — nearest sampling drops them. Area
      // averaging keeps every stroke-crossing cell inked.
      this.context.imageSmoothingEnabled = true;
    }
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();
  }

  reset() {
    if (this.context) {
      this.context.font = `${this.fontSize}px ${this.fontFamily}`;
      const charWidth = this.context.measureText('A').width;

      this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));
      this.rows = Math.floor(this.height / this.fontSize);

      this.canvas.width = this.cols;
      this.canvas.height = this.rows;
      this.pre.style.fontFamily = this.fontFamily;
      this.pre.style.fontSize = `${this.fontSize}px`;
      this.pre.style.margin = '0';
      this.pre.style.padding = '0';
      this.pre.style.lineHeight = '1em';
      this.pre.style.position = 'absolute';
      this.pre.style.left = '50%';
      this.pre.style.top = '50%';
      this.pre.style.transform = 'translate(-50%, -50%)';
      this.pre.style.zIndex = '9';
    }
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);

    const w = this.canvas.width;
    const h = this.canvas.height;
    if (this.context) {
      this.context.clearRect(0, 0, w, h);
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
      this.asciify(this.context, w, h);
    }
  }

  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const imgData = ctx.getImageData(0, 0, w, h).data;
    let str = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = x * 4 + y * 4 * w;
        const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];

        if (a === 0) {
          str += ' ';
          continue;
        }

        const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        let idx = Math.floor((1 - gray) * (this.charset.length - 1));
        if (this.invert) idx = this.charset.length - idx - 1;
        str += this.charset[idx];
      }
      str += '\n';
    }
    this.pre.textContent = str;
  }

  dispose() {}
}

interface CanvasTxtOptions {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  font: string;

  constructor(txt: string, { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' }: CanvasTxtOptions = {}) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.txt = txt;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;

    this.font = `${TEXT_WEIGHT} ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    if (this.context) {
      this.context.font = this.font;
      const metrics = this.context.measureText(this.txt);

      const textWidth = Math.ceil(metrics.width) + 20;
      const textHeight = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;

      this.canvas.width = textWidth;
      this.canvas.height = textHeight;
    }
  }

  render() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = this.color;
      this.context.font = this.font;

      const metrics = this.context.measureText(this.txt);
      const yPos = 10 + metrics.actualBoundingBoxAscent;

      this.context.fillText(this.txt, 10, yPos);
    }
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get texture() {
    return this.canvas;
  }
}

interface CanvAsciiOptions {
  text: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  /** Plane height in world units, or 'fit' to size from the container's aspect ratio. */
  planeBaseHeight: number | 'fit';
  enableWaves: boolean;
  /** 'start' pins the word's left edge to the container's left edge. */
  alignX: 'center' | 'start';
}

// Visible world height at z=0 for the fixed camera (fov 45°, z=30).
const VISIBLE_HEIGHT = 2 * 30 * Math.tan((45 * Math.PI) / 360);

// 'fit' targets 85% of the container width, capped at 60% of its height.
function fitBaseHeight(containerAspect: number, textAspect: number) {
  return Math.min(0.6 * VISIBLE_HEIGHT, (0.85 * VISIBLE_HEIGHT * containerAspect) / textAspect);
}

class CanvAscii {
  textString: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number | 'fit';
  alignX: 'center' | 'start';
  initialBaseH: number = 0;
  planeW: number = 0;
  container: HTMLElement;
  width: number;
  height: number;
  enableWaves: boolean;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  textCanvas!: CanvasTxt;
  texture!: THREE.CanvasTexture;
  geometry: THREE.PlaneGeometry | undefined;
  material: THREE.ShaderMaterial | undefined;
  mesh!: THREE.Mesh;
  renderer!: THREE.WebGLRenderer;
  filter!: AsciiFilter;
  animationFrameId: number = 0;

  constructor(
    { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves, alignX }: CanvAsciiOptions,
    containerElem: HTMLElement,
    width: number,
    height: number
  ) {
    this.textString = text;
    this.asciiFontSize = asciiFontSize;
    this.textFontSize = textFontSize;
    this.textColor = textColor;
    this.planeBaseHeight = planeBaseHeight;
    this.alignX = alignX;
    this.container = containerElem;
    this.width = width;
    this.height = height;
    this.enableWaves = enableWaves;

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();
  }

  async init() {
    try {
      await document.fonts.load(`${TEXT_WEIGHT} 200px "Geist Sans"`);
      await document.fonts.load('400 12px "Geist Mono"');
    } catch {
      /* fall back to whatever monospace the canvas resolves */
    }
    await document.fonts.ready;
    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, {
      fontSize: this.textFontSize,
      fontFamily: TEXT_FAMILY,
      color: this.textColor
    });
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.NearestFilter;

    const textAspect = this.textCanvas.width / this.textCanvas.height;
    const baseH =
      this.planeBaseHeight === 'fit'
        ? fitBaseHeight(this.width / this.height, textAspect)
        : this.planeBaseHeight;
    this.initialBaseH = baseH;
    const planeW = baseH * textAspect;
    const planeH = baseH;
    this.planeW = planeW;

    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        mouse: { value: 1.0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 }
      }
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: MONO_FAMILY,
      fontSize: this.asciiFontSize,
      invert: true
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    // The plane geometry is built once; in 'fit' mode rescale it so the
    // word keeps its target proportions when the container aspect changes.
    if (this.planeBaseHeight === 'fit' && this.mesh && this.textCanvas && this.initialBaseH > 0) {
      const textAspect = this.textCanvas.width / this.textCanvas.height;
      this.mesh.scale.setScalar(fitBaseHeight(w / h, textAspect) / this.initialBaseH);
    }

    if (this.mesh && this.alignX === 'start') {
      // Shift the plane so its left edge sits at the view's left edge.
      const visibleW = VISIBLE_HEIGHT * (w / h);
      this.mesh.position.x = -(visibleW - this.planeW * this.mesh.scale.x) / 2;
    }

    this.filter.setSize(w, h);
  }

  load() {
    this.animate();
  }

  animate() {
    const animateFrame = () => {
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    animateFrame();
  }

  render() {
    const time = new Date().getTime() * 0.001;

    this.textCanvas.render();
    this.texture.needsUpdate = true;

    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = Math.sin(time);

    this.filter.render(this.scene, this.camera);
  }

  clear() {
    this.scene.traverse(object => {
      const obj = object as unknown as THREE.Mesh;
      if (!obj.isMesh) return;
      [obj.material].flat().forEach(material => {
        material.dispose();
        Object.keys(material).forEach(key => {
          const matProp = material[key as keyof typeof material];
          if (matProp && typeof matProp === 'object' && 'dispose' in matProp && typeof matProp.dispose === 'function') {
            matProp.dispose();
          }
        });
      });
      obj.geometry.dispose();
    });
    this.scene.clear();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.filter) {
      this.filter.dispose();
      if (this.filter.domElement.parentNode) {
        this.container.removeChild(this.filter.domElement);
      }
    }
    this.clear();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}

export interface AsciiTextOptions {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number | 'fit';
  enableWaves?: boolean;
  alignX?: 'center' | 'start';
  /** Called once the effect is initialized and rendering. */
  onMounted?: () => void;
}

/**
 * Mounts the ASCII text effect into `container` (which must be positioned;
 * the effect fills it absolutely). Returns a cleanup function. Mirrors the
 * upstream React component's effect: waits for a non-zero-sized container
 * via IntersectionObserver, then tracks resizes with a ResizeObserver.
 */
export function createAsciiText(container: HTMLElement, options: AsciiTextOptions = {}): () => void {
  const {
    text = 'overwire',
    asciiFontSize = 8,
    textFontSize = 200,
    textColor = '#fdf9f3',
    planeBaseHeight = 8,
    enableWaves = true,
    alignX = 'center',
    onMounted
  } = options;

  let cancelled = false;
  let observer: IntersectionObserver | null = null;
  let ro: ResizeObserver | null = null;
  let ascii: CanvAscii | null = null;

  const createAndInit = async (w: number, h: number) => {
    const instance = new CanvAscii(
      { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves, alignX },
      container,
      w,
      h
    );
    await instance.init();
    return instance;
  };

  const setup = async () => {
    const { width, height } = container.getBoundingClientRect();

    if (width === 0 || height === 0) {
      observer = new IntersectionObserver(
        async ([entry]) => {
          if (cancelled) return;
          if (entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0) {
            const { width: w, height: h } = entry.boundingClientRect;
            observer?.disconnect();
            observer = null;

            if (!cancelled) {
              ascii = await createAndInit(w, h);
              if (!cancelled && ascii) {
                ascii.load();
                onMounted?.();
              }
            }
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(container);
      return;
    }

    ascii = await createAndInit(width, height);
    if (!cancelled && ascii) {
      ascii.load();
      onMounted?.();

      ro = new ResizeObserver(entries => {
        if (!entries[0] || !ascii) return;
        const { width: w, height: h } = entries[0].contentRect;
        if (w > 0 && h > 0) {
          ascii.setSize(w, h);
        }
      });
      ro.observe(container);
    }
  };

  void setup();

  return () => {
    cancelled = true;
    if (observer) observer.disconnect();
    if (ro) ro.disconnect();
    if (ascii) {
      ascii.dispose();
      ascii = null;
    }
  };
}
