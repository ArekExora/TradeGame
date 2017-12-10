'use strict';

const apiCall = (url, method, dataToSend) => {
    const promise = new Promise(function(resolve, reject) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open(method, 'http://localhost:5500/API/' + url, true);
        httpRequest.onreadystatechange = function (e) {
            if (httpRequest.readyState == 4) {
                if(httpRequest.status == 200)
                    resolve(JSON.parse(httpRequest.responseText));
                else if(httpRequest.status == 404)
                    reject('Call not allowed.');
                else
                    reject(e);
            }
        };
        httpRequest.send(dataToSend);
    });
    return promise;
};

const get = (url) => apiCall(url, 'GET', null);

module.exports = {
    get
};
