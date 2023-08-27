[back](../README.md)
# dotenv-vault
dotenv vault is a tool to store .env values in a secure way accross diffenrent environments such as development, ci, staging or production. These environments can be changed on the dotenv project-site after login/registration. Per default, the main-branch is development. The content of the .env file can be synced to other branches/environments and will be based on development.  
You can either use the cli directly or with predefined commands from package.json:
```bash
# without package.json:
npx dotenv-vault@latest open

# with package.json:
npm run vault:open
```
In the end, both commands will do the same thing: open or syncing your project with the specified environment in your dotenv-vault account. To sync the content with another environment than default development, supply the name after the open.

## initial setup
```bash
# initialize project:
npm run vault:new
```
```bash
# login to dotenv-vault:
npm run vault:login
```
```bash
# open the project in dotenv-vault:
npm run vault:open
```

## add and receive changes, sync content across envs:
```bash
# add changes
npm run vault:push
```
```bash
# retreive changes
npm run vault:pull
```
```bash
# sync with ci:
npm run vault:open:ci
```
  
## setup ci/cd pipelines:
```bash
# add changes
npm run vault:push
```
```bash
# sync with ci environment:
npm run vault:open:ci
```
```bash
# build the env-vault:
npm run vault:build
```
```bash
# create ci-key:
npm run vault:keys:ci
```
Important: After the last command, the ci will output the decryption key for the ci environment. Copy this value and add it to your repository as secret(github-actions) or as a project environment variable (circle ci) unter the key DOTENV_KEY. The .env.vault file will be decrypted automatically.  
For more information, take a look at the [documentation](https://www.dotenv.org/docs)  
  
[back](../README.md)