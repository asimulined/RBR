const axios = require("axios");

module.exports = {

    check: (ip) => {
        return new Promise((resolve, reject) => {
            if (!ip) return reject(new TypeError("No ip specified"));

            try {

                axios.get(`http://ip-api.com/json/${ip}`)
                .then(res => {

                    // Check for org
                    if (!res.data.org) return reject(new Error("Unknown error"));

                    // Convert to lower case
                    var org = res.data.org.toLowerCase();

                    // Get match
                    var match = org.match("roblox");

                    // Check for match
                    if (!match) return reject(new Error("Not a roblox server"));

                    return resolve();
                })
				.catch(err => {
					return reject(err);
				});

            } catch (err) {
                return reject(err);
            }

        })
    }

}