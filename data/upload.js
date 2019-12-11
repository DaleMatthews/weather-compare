const fs = require('fs');
const parse = require('csv-parse/lib/sync');

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
    { title: 'Normal Snowfall', fileName: 'nrmsnw.csv', units: 'Inches' },
    { title: 'Max Possible Sunshine', fileName: 'pctpos15.csv', units: '%' },
    { title: '# Days > 0.01" of Rain', fileName: 'prge0115.csv', units: 'Days' },
    { title: 'Relative Humidity', fileName: 'relhum15.csv', units: '%' },
    { title: 'Average Wind', fileName: 'wndspd15.csv', units: 'MPH' },
];

var results = {}; // map city ==> { primaryKey (state), rowKey (city), Hottest, Coldest, Max Wind, etc. }
files.forEach(file => {
    const input = fs.readFileSync(file.fileName).toString();
    const records = parse(input, {
        ltrim: true,
        rtrim: true,
    });
    records.forEach(record => {
        const cityAndState = record[0] + record[1];
        if (!results[cityAndState]) {
            results[cityAndState] = {
                PartitionKey: record[0],
                RowKey: record[1],
            };
        }
        results[cityAndState][file.title] = JSON.stringify(record.slice(2));
    });
});
results = Object.values(results); // convert to array w/o keys

// create output.json for validation purposes
fs.writeFile ('output.json', JSON.stringify(results), err => {
    if (err) throw err;
    console.log('complete');
});

// TODO upload to storage acct
