export default function modal (state = {}, action) {
  let newState;
  switch (action.type) {
    case 'spinning.spinLocal':
      newState = JSON.parse(JSON.stringify(state));
      newState.inMotion = true;
      newState.speed = action.speed;

      return newState;
    default:
      return state;
  }
}