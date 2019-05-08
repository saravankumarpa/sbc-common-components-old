import Axios from 'axios'

const FEE_RESOURCE_NAME = '/token'
const API_URL = 'https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1'
// sample microcks url https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1/api/v1/fees/CP/OTANN
// https://mock-lear-tools.pathfinder.gov.bc.ca/rest/SBC+Pay+API+Reference/1.0.1/api/v1/fees/CP/OTADD

export default {
  getFee (filingData: { filingDescription: string; filingTypeCode: string; entityType: string; }[]) {
    if (filingData.length < 1) {
      Promise.resolve()
    }
    let promises = []
    for (const filing of filingData) {
      if (!filing.filingTypeCode) {
        Promise.resolve()
      }
      var url = `${API_URL}/api/v1/fees/${filing.entityType}/${filing.filingTypeCode}`
      promises.push(Axios.get(url))
    }
    // total fees is a sum of filing_fees,service_fees,processing_fees , gst , pst
    return Axios.all(promises)
      .then(Axios.spread((...args) => {
        // customise the response here
        return args
          .map(response => response.data)
          .map(data => {
            // @ts-ignore
            let clientPassedDesc = filingData.find(fee => fee.filingTypeCode === data.filing_type_code).filingDescription
            data.filingType = !clientPassedDesc ? data.filing_type : clientPassedDesc// just defaulting the title if client hasnt passed this on
            data.fee = data.filing_fees + data.service_fees + data.processing_fees + data.tax.gst + data.tax.pst
            return data
          })
      }))
  }

}
