const consul = require('consul');
const consulClient = consul({
    host: '127.0.0.1',
    port: 8500
});
 
const {ConsulKvMonitor, Errors} = require('consul-kv-monitor');
 
const monitorConfig = {
    keysPrefix: 'cluster/server-1',
    timeoutMsec: 1000,
    json: false
};
 
const monitor = new ConsulKvMonitor(monitorConfig, consulClient);
 
function printData(consulKvData) {
    const keys = consulKvData.getKeys();
    keys.forEach(key => {
        let value = consulKvData.getValue(key);
        if (value === Object(value)) {
            // we received json decoded data, so just stringifying to pretty output in this example
            value = JSON.stringify(value);
        }
 
        const metadata = consulKvData.getMetadata(key);
        console.log(`key ${key} updated to  ${value}`);
        // console.log(`${key} => ${value}, metadata: ${JSON.stringify(metadata)}`);
    });
}
 
monitor.on('changed', (kvData) => {
    console.log('Key update');
    // console.log('Response headers:', JSON.stringify(monitor.getConsulHeaders()));
    printData(kvData);
    console.log();
});
 
monitor.on('error', (error) => {
    if (error instanceof Errors.InvalidDataError) {
        console.log(`Oh, key "${error.extra.key}" value can not be decoded as JSON, actual value is "${error.extra.value}"`);
        console.log('And here is a raw error');
        console.log(error);
    } else {
        console.log(`Error occured, class: ${error.name}`);
        console.log('And here is a raw error');
        console.log(error);
    }
});
 
monitor.start()
    .then(initialData => {
        console.log('Keys discovered on start:');
        console.log('Response headers:', JSON.stringify(monitor.getConsulHeaders()));
        printData(initialData);
        console.log();
    })
    .catch(err => {
        console.log(err instanceof Errors.WatchTimeoutError);
        console.error(err);
        process.exit(1);
    });