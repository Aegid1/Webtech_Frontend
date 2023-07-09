import { shallowMount } from '@vue/test-utils'
import RegistrationView from '@/components/RegistrationView.vue'

describe('RegistrationView', () => {
  it('should register a new user when all fields are filled correctly', () => {
    const wrapper = shallowMount(RegistrationView)

    // Mock the fetch API response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            ok: true
          })
      })
    )

    // Fill in the input fields
    wrapper.find('#examplefirstName').setValue('John')
    wrapper.find('#exampleLastname').setValue('Doe')
    wrapper.find('#exampleInputEmail1').setValue('john.doe@example.com')
    wrapper.find('#confirmEmail').setValue('john.doe@example.com')
    wrapper.find('#exampleInputPassword1').setValue('password')
    wrapper.find('#confirmPassword').setValue('password')
    // Trigger the register form submit
    wrapper.find('form').trigger('submit')

    // Check if the fetch API is called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'john.doe@example.com',
        password: 'password',
        firstname: 'John',
        lastname: 'Doe'
      })
    })

    // Check if the user is redirected to the login view
    expect(wrapper.vm.$route.path).toBe('/')
  })

  it('should show an error message when fields are not filled correctly', () => {
    const wrapper = shallowMount(RegistrationView)
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    // Trigger the register form submit without filling the fields
    wrapper.find('form').trigger('submit')

    // Check if an error message is shown
    expect(alertMock).toHaveBeenCalledWith('Bitte füllen Sie alle Felder aus')
  })

  it('should show an error message when email addresses do not match', () => {
    const wrapper = shallowMount(RegistrationView)
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    // Fill in the input fields
    wrapper.find('#examplefirstName').setValue('John')
    wrapper.find('#exampleLastname').setValue('Doe')
    wrapper.find('#exampleInputEmail1').setValue('john.doe@example.com')
    wrapper.find('#confirmEmail').setValue('jane.doe@example.com')
    wrapper.find('#exampleInputPassword1').setValue('password')
    wrapper.find('#confirmPassword').setValue('password')

    // Trigger the register form submit
    wrapper.find('form').trigger('submit')

    // Check if an error message is shown
    expect(alertMock).toHaveBeenCalledWith('Die E-Mail-Adressen stimmen nicht überein')
  })

  it('should show an error message when passwords do not match', () => {
    const wrapper = shallowMount(RegistrationView)
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    // Fill in the input fields
    wrapper.find('#examplefirstName').setValue('John')
    wrapper.find('#exampleLastname').setValue('Doe')
    wrapper.find('#exampleInputEmail1').setValue('john.doe@example.com')
    wrapper.find('#confirmEmail').setValue('john.doe@example.com')
    wrapper.find('#exampleInputPassword1').setValue('password')
    wrapper.find('#confirmPassword').setValue('wrongpassword')

    // Trigger the register form submit
    wrapper.find('form').trigger('submit')

    // Check if an error message is shown
    expect(alertMock).toHaveBeenCalledWith('Die Passwörter stimmen nicht überein')
  })

  // Add more tests as needed
})
