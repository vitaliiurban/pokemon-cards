// Import necessary modules for testing
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardView from '../../views/CardView.vue'

describe('CardView', () => {
  it('renders properly', async () => {
    const mockData = {
      info: {
        id: 1,
        name: 'bulbasaur'
      }
    }

    const wrapper = mount(CardView, {
      data() {
        return {
          card: mockData
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.font-bold').text()).toContain(mockData.info.name)
  })
})
