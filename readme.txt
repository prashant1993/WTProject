Setting up database for WT's Game Website.

to backup database type the following commands:

To backup --> 
mongodump -d game_db -o WT_DB


To Restore -->
mongorestore -d game_db WT_DB/game