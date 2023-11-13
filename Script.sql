Connect to your instance using the psql client in the Cloud Shell

gcloud sql connect myinstance --user=postgres

#Upload data into the postgres database
  #create table 
CREATE TABLE guestbook (guestName VARCHAR(255), content VARCHAR(255),
                        entryID SERIAL PRIMARY KEY);
#insert data in table

INSERT INTO guestbook (guestName, content) values ('first guest', 'I got here!');
INSERT INTO guestbook (guestName, content) values ('second guest', 'Me too!');
#show data 
SELECT * FROM guestbook;
