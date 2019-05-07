import Axios from 'axios'

const FEE_RESOURCE_NAME = '/token'
const API_URL = 'https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1';
// sample microcks url https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1/api/v1/fees/CP/OTANN
//https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1/api/v1/fees/CP/OTADD

export default {
    getFee(feeData: { feeDescription: any; feeCode: any; entityType: any; }[]) {

        if (feeData.length < 1) {
            Promise.resolve();
        }
        let promises = [];
        for (const fee of feeData) {
            if (!!!fee.feeCode) {
                Promise.resolve();
            }
            var url = `${API_URL}/api/v1/fees/${fee.entityType}/${fee.feeCode}?delay=1000`;
            promises.push(Axios.get(url));
        }
        // total fees is a sum of filing_fees,service_fees,processing_fees , gst , pst
        return Axios.all(promises)
            .then(Axios.spread((...args) => {
                // customise the response here
                return args
                    .map(fee => fee.data)
                    .map(data => {
                        // @ts-ignore
                        var clientPassedDesc = feeData.find(fee => fee.feeCode == data.filing_type_code).feeDescription
                        data.filing_type = !!!clientPassedDesc ? data.filing_type : clientPassedDesc// just defaulting the title if client hasnt passed this on
                        data.fee = data.filing_fees + data.service_fees + data.processing_fees + data.tax.gst + data.tax.pst
                        return data
                    });

            }))


    }

}
