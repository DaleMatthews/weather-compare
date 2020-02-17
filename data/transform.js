const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const OUTPUT_FILE = '../weather-compare-app/src/data/weather-data.json';

const files = [
    { title: 'Average Snowfall', fileName: 'avgsnf15.csv', units: 'Inches' },
    { title: 'Hottest', fileName: 'hghtmp15.csv', units: '°F' },
    { title: 'Coldest', fileName: 'lowtmp15.csv', units: '°F' },
    { title: 'Max Wind', fileName: 'maxwnd15.csv', units: 'MPH' },
    { title: '# Days < 32°', fileName: 'mnls3215.csv', units: 'Days' },
    { title: '# Days > 90°', fileName: 'mxge9015.csv', units: 'Days' },
    { title: 'Normal Average', fileName: 'nrmavg.csv', units: '°F' },
    { title: 'Normal Cooling Degree Days', fileName: 'nrmcdd.csv', units: '°F' },
    { title: 'Normal Heating Degree Days', fileName: 'nrmhdd.csv', units: '°F' },
    { title: 'Normal Hottest', fileName: 'nrmmax.csv', units: '°F' },
    { title: 'Normal Coldest', fileName: 'nrmmin.csv', units: '°F' },
    { title: 'Normal Precipitation', fileName: 'nrmpcp.csv', units: 'Inches' },
    // Don't need both average snowfall and normal snowfall
    // Plus it seems later versions of the data don't even contain the normal snowfall
    // { title: 'Normal Snowfall', fileName: 'nrmsnw.csv', units: 'Inches' },
    { title: 'Max Possible Sunshine', fileName: 'pctpos15.csv', units: '%' },
    { title: '# Days > 0.01" of Rain', fileName: 'prge0115.csv', units: 'Days' },
    { title: 'Relative Humidity', fileName: 'relhum15.csv', units: '%' },
    { title: 'Average Wind', fileName: 'wndspd15.csv', units: 'MPH' },
];

const parseDataPoint = (value, context) => {
    if (context.index < 2) return value; // skip city & state columns
    const parsedValue = parseFloat(value);
    return isFinite(parsedValue) ? parsedValue : value;
};

const results = {};
files.forEach(file => {
    const input = fs.readFileSync(file.fileName).toString();
    const records = parse(input, {
        ltrim: true,
        rtrim: true,
        cast: parseDataPoint,
    });
    records.forEach(record => {
        const cityAndState = `${record[0]}, ${record[1]}`;
        if (!results[cityAndState]) results[cityAndState] = {};

        if (file.title === 'Normal Heating Degree Days') {
          // this dataset goes from jul-jun so fix it to jan-dec like every other dataset instead
          results[cityAndState][file.title] = [record[8], record[9], record[10], record[11], record[12], record[13], record[2], record[3], record[4], record[5], record[6], record[7], /*annual*/ record[14]];
        } else {
          results[cityAndState][file.title] = record.slice(2);
        }
    });
});

fs.writeFile (OUTPUT_FILE, JSON.stringify(results), err => {
    if (err) throw err;
    console.log('Complete');
});
