export const utilityConstants = {
    getError: (error) => {
        let type = '';
        if (error.response) {
            type = `Server Error: ${error.response.status}`
        } else if (error.request) {
            type= 'No response received from the server.'
        } else {
            type= 'Error setting up the request.'
        }
        return type
    }
}