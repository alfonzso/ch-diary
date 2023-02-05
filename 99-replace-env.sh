set -e
WWW_ROOT_DIR=/usr/share/nginx/html

echo "Replacing REACT_APP_ env constants in JavaScript files"
for file in $WWW_ROOT_DIR/static/js/main.*.js $WWW_ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  for env_item in $(env | sort | grep REACT_APP_  )
  do
    env_key="$(echo $env_item | cut -d= -f1)"
    env_value="$(echo $env_item | cut -d= -f2)"

    echo "___${env_key}___ ==> ${env_value}"
    sed -i "s|___${env_key}___|${env_value}|g" $file
  done
done
