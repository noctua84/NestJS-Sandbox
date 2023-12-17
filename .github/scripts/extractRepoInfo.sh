#!/bin/bash

# Extract package version and name from package.json
PACKAGE_VERSION=$(jq -r '.version' package.json)
PACKAGE_NAME=$(jq -r '.name' package.json | tr '[:upper:]' '[:lower:]')

# Convert the GitHub repository name to lowercase
REPOSITORY_NAME=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# Use GitHub Actions commands to set outputs
echo "PACKAGE_VERSION=$PACKAGE_VERSION" >> "$GITHUB_OUTPUT"
echo "PACKAGE_NAME=$PACKAGE_NAME" >> "$GITHUB_OUTPUT"
echo "REPOSITORY_NAME=$REPOSITORY_NAME" >> "$GITHUB_OUTPUT"
