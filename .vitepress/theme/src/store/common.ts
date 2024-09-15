import { defineStore } from 'pinia'
import {darkTheme,lightTheme} from "naive-ui";

interface CommonState {
  theme : string,
  open_search: boolean
}

export const common_store = defineStore('korostudio_common', {
  state:(): CommonState =>{
    return {
      theme:'dark',
      open_search:false
    }
  },
  getters: {
    naiveTheme:(state)  =>{
      if(state.theme==="light"){
        return lightTheme
      }else{
        return darkTheme
      }
    },
    isDark:(state)=>{
      return state.theme==="dark";
    }
  },
  actions: {

  },
  persist: {
    paths: ['theme'],
  },
})