const fs = require("fs");
const csv = require("csv-parser");

function countryToFile(country, file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }

  const writeStream = fs.createWriteStream(file);

  writeStream.write(`country,year,population\n`);

  fs.createReadStream("input_countries.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.country.toLowerCase() === country.toLowerCase()) {
        writeStream.write(`${row.country},${row.year},${row.population}\n`);
      }
    });
}

countryToFile("Canada", "canada.txt");
countryToFile("United States", "usa.txt");
