import Axios from 'axios'

const FEE_RESOURCE_NAME = '/token'
const API_URL = 'https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1';
// sample microcks url https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1/api/v1/fees/CP/OTANN
//https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1/api/v1/fees/CP/OTADD

export default {
    getFee(entityType: string, feeCodes: string[]) {

        let promises = [];


        for (const feecode of feeCodes) {
            var url = `${API_URL}/api/v1/fees/${entityType}/${feecode}`;
            promises.push(Axios.get(url));
        }

        return Axios.all(promises)
            .then(Axios.spread((...args) => {
                // flatten the response here
                return args.map(fee => fee.data)
            }))

    }

}
