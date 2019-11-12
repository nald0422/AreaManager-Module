import Vue from 'vue'
import axios from 'axios'

const axiosJS = axios

Vue.prototype.$axios = axios

export { axiosJS }
