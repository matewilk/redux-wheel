export default function modal (state = {}, action) {
  let newState;
  switch (action.type) {
    case 'spinning.spinLocal':
      newState = JSON.parse(JSON.stringify(state));
      newState.speed = action.speed;
      newState.inMotion = true;

      return newState;
    case 'spinning.stop':
      newState = JSON.parse(JSON.stringify(state));
      newState.inMotion = false;

      return newState;
    case 'spinning.sync':
      newState = JSON.parse(JSON.stringify(state));
      newState.theta = action.theta;

      return newState;
    default:
      return state;
  }
}
