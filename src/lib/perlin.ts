export class Noise {
  private perm: number[] = [];

  constructor(seed = Math.random()) {
    this.seed(seed);
  }

  private seed(seed: number): void {
    const random = this.mulberry32(seed);
    for (let i = 0; i < 256; i++) {
      this.perm[i] = i;
    }

    for (let i = 255; i > 0; i--) {
      const n = Math.floor((i + 1) * random());
      const x = this.perm[i];
      this.perm[i] = this.perm[n];
      this.perm[n] = x;
    }

    for (let i = 0; i < 256; i++) {
      this.perm[i + 256] = this.perm[i];
    }
  }

  private mulberry32(a: number): () => number {
    return () => {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 15;
    const grad_x = 1 + (h & 7);
    const grad_y = grad_x < 8 ? 1 : -1;
    return (grad_x * x + grad_y * y);
  }

  public perlin2(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const A = this.perm[X] + Y;
    const B = this.perm[X + 1] + Y;

    return this.lerp(v,
      this.lerp(u,
        this.grad(this.perm[A], x, y),
        this.grad(this.perm[B], x - 1, y)
      ),
      this.lerp(u,
        this.grad(this.perm[A + 1], x, y - 1),
        this.grad(this.perm[B + 1], x - 1, y - 1)
      )
    );
  }
} 