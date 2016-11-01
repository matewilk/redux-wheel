export default function sectors (state = {}, action) {
  switch (action.type) {
    case 'sectors.selectSectorLocal':
      return state.map((sector) => {
        sector = Object.assign({}, sector);
        if (sector.id === action.id) {
          sector.selected = !sector.selected;
        } else {
          sector.selected = false;
        }
        return sector;
      });
    case 'sectors.addSectorLocal':
      let newState = JSON.parse(JSON.stringify(state));
      let newSector = {
        id: (Math.random() * (9999 - 10) + 10),
        name: action.value,
        selected: false,
        count: 10
      };
      newState.push(newSector);

      return newState;
    case 'sectors.editSectorLocal':
      let sectors = state.map((sector) => {
        if (sector.selected) {
          sector.name = action.value;
        }
        return sector;
      });
      return sectors;
    case 'sectors.removeSectorLocal':
      return state.filter((sector) => {
        if (!sector.selected) {
          return sector;
        }
      });
    default:
      return state;
  }
}
