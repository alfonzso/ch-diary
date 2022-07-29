window._env_ = {}
const diaryEnvs = { ...localEnvs, ...k8sExtraEnvs }
for (let [k, v] of Object.entries(diaryEnvs)) {
  window._env_[k] = v
}