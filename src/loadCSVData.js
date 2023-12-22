const csv = require("csv-parser");
const fs = require("fs");
const path = require('path');
const CardStatus = require('./database/model');

 const loadCSVData = async () =>  {
  const files = ["Pickup", "Delivery exceptions", "Delivered", "Returned"];

  for (const file of files) {
    const fileName = `Sample Card Status Info - ${file}.csv`;

    const filePath = path.join(__dirname, "..", "data", fileName);
    console.log(`Attempting to read file: ${filePath}`);

    fs.createReadStream(filePath)
      .pipe(csv({ delimiter: "\t" }))
      .on("data", async (row) => {
        try {
          console.log(`Processing data for ${file}:`, row);

          await CardStatus.upsert({
            card_id: row["Card ID"],
            phone_number: row["User contact"] || row["User Mobile"],
            status: file,
            timestamp: row["Timestamp"],
            comment: row["Comment"] || "",
          });

          console.log(`Data for ${file} successfully processed:`, row);
        } catch (error) {
          console.error(
            `Error inserting/updating data for file ${file}:`,
            error.message
          );
        }
      })
      .on("end", () => {
        console.log(`CSV file ${file} successfully processed.`);
      });
  }
}

module.exports =  { loadCSVData }


