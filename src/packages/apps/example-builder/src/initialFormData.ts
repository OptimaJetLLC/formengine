const initialFormData = {
  title: 'Hello! Hello!',
  login: '1',
  password: 'ok',
  'Template:Test form 1': {login: 'tortuga', password: 'man!', agreeCheckbox: false},
  'Agreement Title': 'Data in agreement template',
  'Input in template': 'Data in template level 1',
  ['last name']: 'Bret',
  agreeCheckbox: true,
  mainRepeater: [
    {
      repeater1: [{}, {rsDatePicker1: new Date()}],
    },
    {rsInput1: 'initial data in repeater'},
  ],
  repeater1: [
    {
      rsDatePicker1: new Date(),
      repeater2: [
        {
          rsToggle1: false,
        },
        {
          rsToggle1: true,
          repeater3: [
            {
              rsDropdown1: ['A'],
            },
            {
              rsDropdown1: ['A'],
              rsNumberFormat1: 1,
            },
          ],
        },
      ],
    },
    {
      rsDatePicker7: new Date(1901, 2, 4),
    },
    {
      rsDatePicker6: new Date(2001, 4, 6),
      repeater2: [
        {
          rsToggle1: false,
        },
      ],
    },
  ],
}

export default initialFormData
