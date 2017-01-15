module.exports = function sectors (state = {}, action) {
  switch (action.type) {
    case 'sectors.selectSector':
      return state.map((sector) => {
        sector = Object.assign({}, sector);
        if (sector.id === action.id) {
          sector.selected = !sector.selected;
        } else {
          sector.selected = false;
        }
        return sector;
      });
    case 'sectors.addSector':
      let newState = JSON.parse(JSON.stringify(state));
      let newSector = {
        id: action.id,
        name: action.value,
        selected: false,
        count: 10
      };
      newState.push(newSector);

      return newState;
    case 'sectors.editSector':
      let sectors = state.map((sector) => {
        if (sector.selected) {
          sector.name = action.value;
        }
        return sector;
      });
      return sectors;
    case 'sectors.removeSector':
      return state.filter((sector) => {
        if (!sector.selected) {
          return sector;
        }
      });
    default:
      return state;
  }
};
