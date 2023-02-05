export interface jsonConfig {
  title: string
  baseURL: string
  appVersion: string
}

export const chAppconfig: jsonConfig = {
  title: "ChDiary",
  baseURL: process.env.REACT_APP_BE_URL || 'http://localhost:8080',
  appVersion: process.env.REACT_APP_GIT_VERSION || 'fafa'
}
