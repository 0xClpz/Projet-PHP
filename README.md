# Projet PHP 
## 1. Lancer le projet
```bash
docker-compose up -d # Lance les conteneur php mysql et nginx
docker exec -i -t projetantonio_php_1 /bin/bash 
composer install # Installe les dépendences dans le conteneur
# Exit le container
cd web-client
yarn start # Démarre le client web
```