# Historical Weather Data

The CSV data in this directory is from [Comparative Climatic Data](https://www.ncdc.noaa.gov/ghcn/comparative-climatic-data) by the National Centers for Environmental Information. The files were originally retrieved from [this directory](https://www1.ncdc.noaa.gov/pub/data/ccd-data/csv/), but the formatting has been edited to ease consumption.

## Upload Data to Azure

To make this data accessible to the API, we need to upload the data to an Azure Table.

1. Run `npm i` in this directory
1. Update env.js with an Azure storage account and corresponding connection string
1. Run `npm run upload`
