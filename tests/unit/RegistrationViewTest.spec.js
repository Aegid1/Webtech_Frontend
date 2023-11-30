// import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import RegistrationView from '@/views/RegistrationView.vue'
import RegistrationQuestionView from '@/views/RegistrationQuestionView.vue'

describe('RegistrationView', () => {
  it('should render RegistratioQuestion when navigateToRegistrationQuestions() is called', () => {
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

    expect(mockRouter.push).toHaveBeenCalledWith({"name": "RegistrationQuestionView", "params": {"id": undefined}})
    expect(wrapper.findComponent(RegistrationQuestionView).exists())
    
  })
})
