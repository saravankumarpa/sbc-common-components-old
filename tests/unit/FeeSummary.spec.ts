import { shallowMount, mount } from '@vue/test-utils'
import SbcFeeSummary from '@/components/SbcFeeSummary.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
Vue.use(Vuetify)
Vue.use(VueRouter)

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve([{ 'filing_type': 'Change of Director', 'filing_type_code': 'OTADD', 'filing_fees': 55, 'service_fees': 0, 'processing_fees': 0, 'tax': { 'gst': 0, 'pst': 0 } }])),
  all: jest.fn(() => Promise.resolve([{ 'filing_type': 'Change of Director', 'filing_type_code': 'OTADD', 'filing_fees': 55, 'service_fees': 0, 'processing_fees': 0, 'tax': { 'gst': 0, 'pst': 0 } }])),
  spread: jest.fn()
}))

describe('SbcFeeSummary.vue', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('renders props.msg when passed', () => {
    const feeData = {
      filingTypeCode: 'OTANN',
      entityType: 'CP',
      filingDescription: ''
    }
    const wrapper = mount(SbcFeeSummary, {
      propsData: { feeData }
    })
    console.log('wrapper.classes()LLLL--'+ wrapper.text())
    expect(wrapper.findAll('header').exists()).toBe(true)
    expect(wrapper.contains('div')).toBe(true)
    expect(wrapper.text()).toContain('Fee Summary')
    expect(wrapper.text()).toContain('Total Fees')
  })
})
