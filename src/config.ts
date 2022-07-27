export interface jsonConfig {
  title: string
  baseURL: string
  appVersion: string
}

export const chAppconfig: jsonConfig = {
  title: "ChDiary",
  baseURL: (window as any)._env_.REACT_APP_BE_URL as string || 'http://localhost:8080',
  appVersion: (window as any)._env_.REACT_APP_GIT_VERSION as string || 'fafa'
}