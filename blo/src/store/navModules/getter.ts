export default {
  showNav(state){
    return state.navList
  },
  showActive(state){
    return  state.menuActive=state.menuList[0].id
  }
}