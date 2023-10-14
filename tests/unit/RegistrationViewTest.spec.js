// import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import RegistrationView from '@/views/RegistrationView.vue'
import LoginView from '@/views/LoginView.vue'

describe('RegistrationView', () => {
  it('should render LoginView when navigateToLoginView() is called', () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(RegistrationView, {
      props: {
        isAuthenticated: true
      },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    wrapper.vm.navigateToRegistrationQuestions()

    expect(mockRouter.push).toHaveBeenCalledWith('/')
    expect(wrapper.findComponent(LoginView).exists()).toBe(true)
  })
})
