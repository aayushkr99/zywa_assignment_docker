const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const CardStatus = require("../database/model");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'data'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    },
  });
  
  const upload = multer({ storage: storage });


router.get('/get_card_status', async (req, res) => {
    const { phone_number, card_id } = req.query;
  
    try {
      const whereClause = {};
      if (phone_number) {
        whereClause.phone_number = phone_number;
      }
      if (card_id) {
        whereClause.card_id = card_id;
      }
  
      const row = await CardStatus.findOne({
        where: whereClause,
        order: [["timestamp", "DESC"]],
      });
  
      if (!row) {
        res.status(404).json({ error: "Card not found" });
      } else {
        res.json({
          card_id: row.card_id,
          phone_number: row.phone_number,
          status: row.status,
          timestamp: row.timestamp,
          comment: row.comment,
        });
      }
    } catch (err) {
      console.error("Error querying the database:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })


router.post("/upload/file", upload.single('csvFile'), (req, res) => {
    try{
        res.json({ message: 'File uploaded successfully' });
    }catch(err){
        console.log(err)
        return res.status(400).send(`Bad request: ${err.message}`);
    }
})


module.exports = router