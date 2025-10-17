# Utiliser l'image officielle PHP avec FPM
FROM php:8.2-fpm

# Définir le répertoire de travail dans le conteneur
WORKDIR /var/www/html

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev zip unzip git curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip bcmath

# Installer Composer globalement
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Installer les dépendances PHP via Composer
RUN composer install --optimize-autoloader --no-dev

# Donner les permissions sur les répertoires nécessaires
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Expose le port 9000 pour PHP-FPM
EXPOSE 9000

# Commande pour lancer PHP-FPM
CMD ["php-fpm"]
