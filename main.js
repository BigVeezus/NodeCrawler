const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
const fs = require("fs");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
  }
  if (process.argv.length > 3) {
    console.log("too many arguments provided");
  }

  const baseURL = process.argv[2];

  console.log(`starting crawl of: ${baseURL}...`);

  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);

  const textContent = "===============\nREPORT\n===============\n";
  // console.log(textContent);

  // fs.writeFile("report.txt", textContent, function (err) {
  //   if (err) throw err;
  //   console.log("File was created successfully!");
  // });
}

main();
