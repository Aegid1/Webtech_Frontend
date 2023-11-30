import { shallowMount } from '@vue/test-utils'
import ScoreboardView from '@/views/ScoreboardView.vue'

describe('Testing ScoreboardView.vue', () => {

  it('soll den titel der Seite zeigen', () => {

    const wrapper = shallowMount(ScoreboardView, {
      mocks: {
        $route: {
          params: {
            id: 1
          }
        }
      },
    })

    expect(wrapper.text()).toMatch('Scoreboard')

  })
})
