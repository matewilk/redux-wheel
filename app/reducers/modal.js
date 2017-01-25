export default function modal (state = {}, action) {
  let newState;
  switch (action.type) {
    case 'modal.modalDeleteToggle':
      newState = JSON.parse(JSON.stringify(state));
      newState.delete.open = !newState.delete.open;

      return newState;
    case 'modal.alertModalToggle':
      newState = JSON.parse(JSON.stringify(state));
      newState.alert.open = !newState.alert.open;
      newState.alert.message = action.message;

      return newState;
    default:
      return state;
  }
}
