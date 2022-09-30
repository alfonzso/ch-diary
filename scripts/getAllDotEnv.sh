#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT_DIR=${DIR}/..
SRC_PATH=${ROOT_DIR}/src

dotenvs="$(grep -Po "process.env.REACT_APP.*? " -R $SRC_PATH | cut -d"." -f6-)"

echo "" > ${ROOT_DIR}/.env.local

for env_key in $dotenvs;
do
  echo $env_key="___${env_key}___" >> ${ROOT_DIR}/.env.local
done
