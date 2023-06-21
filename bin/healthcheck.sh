DEFAULT_PORT=3000
api_port=$1 

if [ -z "$api_port" ]
  then
    echo "No argument supplied"
    api_port=$DEFAULT_PORT
fi
response=$(curl -s http://localhost:$api_port/healthcheck)
response=(${response[@]}) # convert to array
if [ -z "$response" ]
then
    echo "http://localhost:$api_port/healthcheck - {"success":false}"
else
    echo "http://localhost:$api_port/healthcheck - $response"
fi

