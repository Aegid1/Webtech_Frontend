import { shallowMount, mount } from '@vue/test-utils'
import ScoreboardView from '@/views/ScoreboardView.vue'
import HomeView from '@/views/HomeView.vue'

describe('Testing ScoreboardView Vue', () => {
  it('should render the scoreboard', () => {

    const mockedRoute = {
      params : { id : 1 }

    }

    const wrapper = mount(HomeView, {
      mocks: { $route: mockedRoute },

    })

    const scoreboard = wrapper.findComponent(ScoreboardView)
    expect(scoreboard.exists()).toBeTruthy()
  })
})
