export default function modal (state = {}, action) {
  let new_state;
  switch (action.type) {
    case 'form.valueChange':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.value = action.value;
      return new_state;
    case 'form.valueEdit':
      new_state = JSON.parse(JSON.stringify(state));
      new_state.value = action.sector;
      return new_state;
    default:
      return state;
  }
}
