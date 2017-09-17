import fetch from 'isomorphic-fetch';

class SessionApi {
  static login(user) {
    const request = new Request('http://localhost:8000/api/user/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ username: user.username,
        password: user.password, })
    });


    return fetch(request).then((response) => {
      return response.json();
      debugger;
    }).catch((error) => {
      return error;
    });
  }
}

export default SessionApi;
