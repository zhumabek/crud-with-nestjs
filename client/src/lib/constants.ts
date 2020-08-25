const constants = {
    apiURL: 'http://localhost:8000'
};

switch(process.env.REACT_APP_ENV) {
    case 'development':
        constants.apiURL = 'http://localhost:8000';
        break;
    case 'production':
        constants.apiURL = 'https://crud-with-nestjs.herokuapp.com/';
        break;
}

export default constants;