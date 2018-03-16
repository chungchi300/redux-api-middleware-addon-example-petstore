import API from 'redux-api-middleware-addon';
const rootReducer = function(state = {}, action) {
  return {
    api: API.Reducer.api(state.api, action),
    network: API.Reducer.network(state.network, action),
    domain: API.Reducer.domain(state.domain, action),
  };
};
export default rootReducer;
