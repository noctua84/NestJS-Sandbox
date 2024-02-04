#!/bin/bash

# This script checks the health of the containers and exits with a non-zero exit code if the containers are not healthy.
# This script is used in the GitHub Actions workflow to check the health of the containers as a test, that the docker compose setup is working as expected.

MAX_RETRIES=10
SLEEP_TIME=10

# Function to check the health of all containers in the compose file
check_containers_health() {
    docker compose --file docker/docker-compose.yml ps -q | xargs docker inspect -f '{{ .State.Health.Status }}' | grep -v healthy
}

# Initial attempt count
attempt=1

echo "Checking container health..."

# Loop to check container health
while [ $attempt -le $MAX_ATTEMPTS ]
do
    if [ -z "$(check_containers_health)" ]; then
        echo "All containers are healthy!"
        exit 0
    else
        echo "Containers are not healthy yet. Attempt $attempt of $MAX_RETRIES."
        attempt=$((attempt+1))
        sleep $SLEEP_TIME
    fi
done

echo "Containers did not become healthy after $MAX_RETRIES attempts."
exit 1
