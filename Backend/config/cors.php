<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configuration CORS (Cross-Origin Resource Sharing)
    |--------------------------------------------------------------------------
    |
    | CORS permet à votre API Laravel d'accepter des requêtes venant d'autres
    | domaines (comme votre frontend React qui tourne sur http://localhost:5173)
    |
    */

    // Chemins de l'API qui acceptent les requêtes cross-origin
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Méthodes HTTP autorisées
    'allowed_methods' => ['*'],  // * = toutes les méthodes (GET, POST, PUT, DELETE, etc.)

    // Origines (domaines) autorisées à accéder à l'API
    'allowed_origins' => ['*'],  // * = tous les domaines (pour le développement)
    // En production, remplacez par : ['https://votre-domaine.com']

    // Patterns d'origines autorisées (expressions régulières)
    'allowed_origins_patterns' => [],

    // Headers autorisés dans les requêtes
    'allowed_headers' => ['*'],  // * = tous les headers

    // Headers exposés au client
    'exposed_headers' => [],

    // Durée de mise en cache de la configuration CORS (en secondes)
    'max_age' => 0,

    // Autoriser l'envoi de credentials (cookies, authorization headers)
    'supports_credentials' => false,

];