<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modèle Post
 * 
 * Ce modèle représente un article dans notre application.
 * Il permet d'interagir facilement avec la table 'posts' dans la base de données.
 */
class Post extends Model
{
    use HasFactory;

    /**
     * Le nom de la table associée au modèle
     * Laravel devine automatiquement "posts" mais on peut le spécifier explicitement
     */
    protected $table = 'posts';

    /**
     * Les attributs qui peuvent être assignés en masse
     * 
     * C'est une sécurité Laravel : on définit quels champs peuvent être remplis
     * directement via Post::create() ou $post->fill()
     * 
     * Sans cela, Laravel bloquera l'assignation pour des raisons de sécurité
     */
    protected $fillable = [
        'title',        // Le titre de l'article
        'content',      // Le contenu de l'article
        'author',       // L'auteur de l'article
        'is_published'  // Statut de publication
    ];

    /**
     * Les attributs qui doivent être castés (convertis) en types natifs
     * 
     * Ici, on dit à Laravel de convertir automatiquement :
     * - is_published en boolean (true/false au lieu de 1/0)
     * - created_at et updated_at en objets Carbon (pour manipuler les dates facilement)
     */
    protected $casts = [
        'is_published' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}