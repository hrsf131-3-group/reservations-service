const axios = require('axios')

it('get request to calendar to successfully ping with response', () => {
  axios.get('http://localhost:3000/api/homes/calendar', {data: {"id": 1}})
    .then((res) => expect(res).not.toBeNull())
})

// it('1 + 1 = 2', () => {
//   const value = 1 + 1;
//   expect(1 + 1).toBe(2);
// })