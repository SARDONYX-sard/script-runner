export type StorageData = {
  [key: string]: any;
  power: boolean;
  scripts: ScriptObj[];
  options: {
    exclude: string;
  };
};

export type ScriptObj = {
  [key: string]: any;
  id: number;
  enable: boolean;
  name: string;
  type: string;
  src: string;
  code: string;
  host: string;
};

export type UrlInfo = {
  currentURL: any;
  url: URL;
  hostname: string;
};
