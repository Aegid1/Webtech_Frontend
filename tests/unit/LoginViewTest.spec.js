import { shallowMount } from '@vue/test-utils'
import LoginView from '@/components/LoginView.vue'

describe('LoginView', () => {
  it('should log in the user when all fields are filled correctly', () => {
    const wrapper = shallowMount(LoginView)

    // Mock the fetch API response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: 'example_token'
          })
      })
    )

    // Fill in the input fields
    wrapper.find('#exampleInputEmail1').setValue('john.doe@example.com')
    wrapper.find('#exampleInputPassword1').setValue('password')

    // Trigger the login form submit
    wrapper.find('form').trigger('submit')

    // Check if the fetch API is called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'john.doe@example.com',
        password: 'password'
      })
    })

    // Check if the user is redirected to the home view
    expect(wrapper.vm.$route.path).toBe('/home')
    expect(wrapper.vm.$route.params.id).toBe('example_user_id')
  })

  it('should show an error message when fields are not filled correctly', () => {
    const wrapper = shallowMount(LoginView)
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    // Trigger the login form submit without filling the fields
    wrapper.find('form').trigger('submit')

    // Check if an error message is shown
    expect(alertMock).toHaveBeenCalledWith('Bitte füllen Sie alle Felder aus')
  })

  it('should show an error message when login fails', () => {
    const wrapper = shallowMount(LoginView)
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    // Mock the fetch API response with a failed login
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            error: 'Login failed'
          })
      })
    )

    // Fill in the input fields
    wrapper.find('#exampleInputEmail1').setValue('john.doe@example.com')
    wrapper.find('#exampleInputPassword1').setValue('password')

    // Trigger the login form submit
    wrapper.find('form').trigger('submit')

    // Check if an error message is shown
    expect(alertMock).toHaveBeenCalledWith('Login fehlgeschlagen')
  })

  it('should navigate to the registration view when the "Registrieren" link is clicked', () => {
    const wrapper = shallowMount(LoginView)
    const routerPushMock = jest.fn()
    wrapper.vm.$router.push = routerPushMock

    // Trigger the "Registrieren" link click
    wrapper.find('a').trigger('click')

    // Check if the router push method is called with the correct argument
    expect(routerPushMock).toHaveBeenCalledWith('/registration')
  })
})
