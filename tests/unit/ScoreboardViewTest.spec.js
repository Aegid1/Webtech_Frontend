import { shallowMount } from '@vue/test-utils'
import ScoreboardView from '@/views/ScoreboardView.vue'
import HomeView from '@/views/HomeView.vue'

describe('Testing ScoreboardView Vue', () => {
  it('should render the scoreboard', () => {
    const wrapper = shallowMount(HomeView)

    const scoreboard = wrapper.findComponent(ScoreboardView)
    expect(scoreboard.exists()).toBeTruthy()
  })
})
