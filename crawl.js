const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("node-fetch");

async function crawlPage(currentURL) {
  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return;
    }
    console.log(await resp.text());
  } catch (err) {
    console.log(err.message);
  }
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

function getURLsFromHTML(html, baseUrl) {
  const urls = [];
  const dom = new JSDOM(html);
  const aElements = dom.window.document.querySelectorAll("a");

  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseUrl).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
