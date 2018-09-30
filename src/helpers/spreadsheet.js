import config from "../config";
/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.spreadsheetId,
                range: "Class Data!A2:A10"
            })
            .then(
            response => {
                console.log(response)
                callback({
                    response
                });
            },
            response => {
                callback(false, response.result.error);
            }
            );
    });
}