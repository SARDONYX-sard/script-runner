export type StorageData = {
  [key: string]: any;
  power: boolean;
  scripts: ScriptObj[];
  options: {
    exclude: string;
  };
};

export type ScriptObj = { host: string; enable: boolean; type: "external" | "snippet"; name: boolean };

export type UrlInfo = {
  currentURL: any;
  url: URL;
  hostname: string;
};
