COPY companies FROM '/var/home/fcabello/git/BloomAlertHomework/01data/interim/mydb.db/companies.csv' (FORMAT 'csv', quote '"', delimiter ',', header 1);
COPY timeseries_dataset FROM '/var/home/fcabello/git/BloomAlertHomework/01data/interim/mydb.db/timeseries_dataset.csv' (FORMAT 'csv', quote '"', delimiter ',', header 1);
