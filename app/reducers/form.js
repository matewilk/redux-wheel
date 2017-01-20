export default function modal (state = {}, action) {
  let newState;
  switch (action.type) {
    case 'form.valueChange':
      newState = JSON.parse(JSON.stringify(state));
      newState.value = action.value;

      return newState;
    case 'form.valueEdit':
      newState = JSON.parse(JSON.stringify(state));
      newState.value = action.sector;

      return newState;
    case 'form.setBoardId':
      newState = JSON.parse(JSON.stringify(state));
      newState.boardId = action.boardId;

      return newState;
    default:
      return state;
  }
}
