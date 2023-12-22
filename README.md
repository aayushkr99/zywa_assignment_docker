# zywa_assignment_docker

Tech Stack used : Node JS, Mysql ( Sequelize as ORM)

I followed the steps written in the assignment

Firstly I planned the designed the structure of the Table "Card Status", 
For table Design : I have gone through the excel formats and the column which customer sends.

For Database: I decided to use Mysql with sequelize as ORM because i am familier with it.

Project Flow : All the CSV file are present in data folder, Cron ( scheduler) will run in every 2 minutes,
               It will parse all the CSV file present in the data folder and insert or update the data in the Card Status table.

               One additional API i have made here, whose end point is '/zywa/upload/file', so that customer can able to upload CSV file in our data directory directly by calling this API and cron will run in two minutes and it will get processed.

Finally, I uploaded and hosted my application to docker Container, using doker files...
