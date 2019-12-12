# Historical Weather Data

The CSV data in this directory is from [Comparative Climatic Data](https://www.ncdc.noaa.gov/ghcn/comparative-climatic-data) by the National Centers for Environmental Information. The files were originally retrieved from [this directory](https://www1.ncdc.noaa.gov/pub/data/ccd-data/csv/), but the formatting has been edited to ease consumption.

## Output data to the web app

To simplify the responsibilities of the web app, the data is combined and output into a single JSON file in the React app's directory. To duplicate this process, simply:

1. Run `npm ci` in this directory
1. Run `npm run transform`
