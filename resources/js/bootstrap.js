window._ = require('lodash');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;

window.axios.defaults.withCredentials = true;

 window.axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {

    if(error.response.status == 401 || error.response.status == 409){

        window.localStorage.clear()
        //window.location = "/login"
        this.router.push({
            name : 'login'
        })
    }

    return Promise.reject(error);
  });
