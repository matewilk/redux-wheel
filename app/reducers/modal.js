export default function modal (state = {}, action) {
  let new_state;
  switch (action.type) {
    case 'modal.modalDeleteToggle':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.open = !new_state.open;
      return new_state;
    default:
      return state;
  }
}
