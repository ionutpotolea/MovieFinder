function getResource(url) {
    return fetch(url, {
        method: "GET"
    })
    .then(function(response) {
        if (response.status === 200){
            return response.json()
        } else {
            throw new Error ("Response not OK")
        }
    }, function (error){
        console.log("Error: " + error);
    });
}

function postResource(url, requestBody) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(requestBody)
    })
    .then(function(response) {
        if (response.status === 200){
            return response.json()
        } else {
            throw new Error ("Response not OK")
        }
    }, function(error){
        console.log("Error: " + error)
    })
}