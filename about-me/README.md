# reedsy-challenge-node-backend
## About me


### Introduction
The project that I'm going to talk about is a billing feature that I co-developed with one of my colleagues.
This was a serverless system that aggregated incoming consumption events in order to later be sent to an invoice creation api.

### High level architecture

The module consisted of a couple of lambda functions stored on the AWS server and had different responsibilities:

- lambdas responsible with the consumption of events from a queue and aggregation in the database for later;
- lambdas that ran on a con schedule to process the aggregated data into ready-to-send packages for invoice api;
- the ones that send the packages to the invoice API;
- functions that checked the status of the packages sent and marked those that were not processed by the invoice API accordingly to be sent again;

### Database

For database, we used DynamoDB to store our aggregated data. We kept a daily granularity for our records, which meant that all the consumption events for a give day were processed on the same record ( actually there is a secondary granularity, but there is much more to talk about on that one).
Data integrity was kept using global secondary index constructor from `client ID` and daily `date type`, which helped with the fast aggregation and queries. 

### Problems and solutions
We faced the following problems in the development cycle:

#### 1. Data volume
* Problem: The system was fed a large number of events that needed quickly processed and aggregated.
* Solution: Use warm start for lambdas so that the process was quick. Create DB indexes based on our development need and business requirements.

### 2. AWS limitations
* Problem: Packaging the aggregated data meant processing a volume of records that was too much for a single lambda to handle.
* Solution: Create a worker function. Benchmark, test and calculate how much a worker can handle in volume. Split the records in chunks of data an assign to the worker. this is possible because the results are independent of each other. 

### 3. Invoice api limitations
* Problem: Invoice api is slow and cannot handle being sent too frequently.
* Solution: Send consumption information in by-monthly client packages. This is possible by creating data packages per client per half of month. There are easier to manage (send and monitor).
