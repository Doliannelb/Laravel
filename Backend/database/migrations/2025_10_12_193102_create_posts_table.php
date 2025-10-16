<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécute la migration pour créer la table posts
     * Cette méthode est appelée quand on fait php artisan migrate
     */
    public function up(): void
    {
        // Création de la table 'posts' dans la base de données
        Schema::create('posts', function (Blueprint $table) {
            // Clé primaire auto-incrémentée
            $table->id();
            
            // Colonne pour le titre de l'article (maximum 255 caractères)
            $table->string('title');
            
            // Colonne pour le contenu de l'article (texte long)
            $table->text('content');
            
            // Colonne pour l'auteur de l'article
            $table->string('author');
            
            // Colonne pour savoir si l'article est publié ou non
            // Par défaut, la valeur sera false (0)
            $table->boolean('is_published')->default(false);
            
            // Ajoute automatiquement les colonnes created_at et updated_at
            // Laravel les gère automatiquement lors de la création et modification
            $table->timestamps();
        });
    }

    /**
     * Annule la migration (supprime la table)
     * Cette méthode est appelée quand on fait php artisan migrate:rollback
     */
    public function down(): void
    {
        // Supprime la table 'posts' si elle existe
        Schema::dropIfExists('posts');
    }
};