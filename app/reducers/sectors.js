export default function sectors (state = {}, action) {
  switch (action.type) {
    case 'sector.selectSector':
      return state.map((sector) => {
        sector = Object.assign({}, sector);
        if (sector.id === action.id) {
          sector.selected = !sector.selected;
        } else {
          sector.selected = false;
        }
        return sector;
      });
    case 'sectors.removeSector':
      return state.filter((sector) => {
        if (!sector.selected) {
          return sector;
        }
      });
    case 'sectors.addSector':
      let newState = JSON.parse(JSON.stringify(state));
      let newSector = {id: action.sectors.length + 1, name: action.value, selected: false};
      newState.push(newSector);

      return newState;
    default:
      return state;
  }
}
