const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

test("NormalizeURL protocol", () => {
  const input = "https://facebook.com/home";
  const actual = normalizeURL(input);
  const expected = "facebook.com/home";
  expect(actual).toBe(expected);
});

test("NormalizeURL http", () => {
  const input = "http://facebook.com/home";
  const actual = normalizeURL(input);
  const expected = "facebook.com/home";
  expect(actual).toBe(expected);
});

test("NormalizeURL CAPTALS", () => {
  const input = "https://FaceBOOk.com/home";
  const actual = normalizeURL(input);
  const expected = "facebook.com/home";
  expect(actual).toBe(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTML =
    '<html><body><a href="https://blog.boot.dev"><span>Elvis Boot Dev</span></a></body></html>';
  const input = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTML, input);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTML =
    '<html><body><a href="/path/one"><span>Elvis Boot Dev</span></a></body></html>';
  const input = "https://bLOG.boot.dev";
  const actual = getURLsFromHTML(inputHTML, input);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});
