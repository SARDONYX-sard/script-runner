import type { StorageData, UrlInfo } from "../types/popup";

function getUrlInfo(): UrlInfo {
  let urlInfo: UrlInfo | undefined;

  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    (tabs) => {
      const tab = tabs[0];
      const url = new URL(tab.url ?? "");

      urlInfo = {
        currentURL: tab.url,
        url: url,
        hostname: url.hostname,
      };
    },
  );

  if (!urlInfo) {
    throw new Error("Could not find URL Information.");
  }

  return urlInfo;
}

export function openHTML(htmlFile: string): void {
  const fileName = htmlFile;
  const url = chrome.extension.getURL(fileName);
  chrome.tabs.create({
    url: url,
  });
}

export function isMatch(data: StorageData, host: string): boolean {
  if (isExcludeHost(data)) return false;

  if (host === "" || host === "any") return true;

  const { hostname } = getUrlInfo();
  if (host.indexOf(",") !== -1) {
    const hosts = host.split(",");
    return hosts.some((_host) => hostname.indexOf(_host.trim()) !== -1);
  }

  return hostname.indexOf(host) !== -1;
}

export function isExcludeHost({ options }: StorageData): boolean {
  const host = options.exclude;
  if (host === "") return false;

  const { hostname } = getUrlInfo();

  if (host.indexOf(",") !== -1) {
    const hosts = host.split(",");
    return hosts.some((_host: string) => hostname.indexOf(_host.trim()) !== -1);
  }

  return hostname.indexOf(host) !== -1;
}

/** Zero registered JavaScript? */
export function count(data: StorageData): boolean {
  const matched = data.scripts.filter((script) => isMatch(data, script.host));
  return matched.length === 0;
}
