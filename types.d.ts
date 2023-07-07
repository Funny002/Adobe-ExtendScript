interface getProduct {
  [AppName: string]: string;
}

interface ExtendScript {
  minify: boolean;
  includes: string[];
  application: string;
  getProduct: {
    execSync(): getProduct;
    exec(): Promise<getProduct>;
  };

  (script: string): Promise<any>;
}

declare const ExtendScript: ExtendScript;

export = ExtendScript;
