declare module 'mdast' {
  // This empty declaration prevents TypeScript from trying to find mdast types
}

declare module 'mdast-util-*' {
  // This prevents TypeScript from trying to find mdast-util types
}

declare module 'gif.js' {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    dither?: boolean | string;
    transparent?: string | null;
    background?: string;
    repeat?: number;
  }

  interface FrameOptions {
    delay?: number;
    copy?: boolean;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(canvas: HTMLCanvasElement, options?: FrameOptions): void;
    on(event: string, callback: (data: any) => void): void;
    render(): void;
  }

  export default GIF;
}
