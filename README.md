## Instalacion automatica

```
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
# meter el composer/bin en bashrc o zshrc o fish.config

d compose up -d

composer install
npm install && npm run build
composer run dev
```

## Instalación

- sudo apt install php8.3-cli
- composer steps to install

inside > ~/.config/fish/config.fish

```
set -gx PATH $PATH $HOME/.config/composer/vendor/bin
```

rource config.fish

```
sudo apt-get update
sudo apt-get install php-mbstring
sudo apt install php-xml
sudo apt-get install php-pgsql

npm i && npm run build

```

Para ejecutar el entorno

```
cp .env.example .env
d compose up -d

composer run dev


```
