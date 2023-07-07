interface getProduct {
  [AppName: string]: string;
}

interface ExtendScript {
  minify: boolean;
  includes: string[];
  application: string;
  getProduct: {
    exec: getProduct
    execSync: getProduct
  };

  (script: string): Promise<any>;
}

declare const ExtendScript: ExtendScript;

export = ExtendScript;
