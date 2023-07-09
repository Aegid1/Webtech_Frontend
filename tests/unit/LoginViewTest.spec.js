import { shallowMount } from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'

describe('Testing LoginView.vue', () => {
  it('soll den titel der Seite zeigen', () => {
    const wrapper = shallowMount(LoginView)

    expect(wrapper.text()).toMatch('Login into your Home')
  })
})
