<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

/**
 * Contrôleur PostController
 * 
 * Ce contrôleur gère toutes les opérations CRUD pour les articles :
 * - Create (Créer)
 * - Read (Lire)
 * - Update (Mettre à jour)
 * - Delete (Supprimer)
 */
class PostController extends Controller
{
    /**
     * READ - Afficher tous les articles
     * 
     * Route : GET /api/posts
     * Retourne la liste de tous les articles avec pagination
     */
    public function index(): JsonResponse
    {
        try {
            // Récupère tous les articles, triés du plus récent au plus ancien
            // paginate(10) crée une pagination de 10 articles par page
            $posts = Post::orderBy('created_at', 'desc')->paginate(10);

            // Retourne une réponse JSON avec succès
            return response()->json([
                'success' => true,
                'message' => 'Liste des articles récupérée avec succès',
                'data' => $posts
            ], 200);

        } catch (\Exception $e) {
            // En cas d'erreur, retourne un message d'erreur
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des articles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * CREATE - Créer un nouvel article
     * 
     * Route : POST /api/posts
     * Données attendues : title, content, author, is_published (optionnel)
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validation des données reçues
            // On vérifie que les données sont conformes avant de les enregistrer
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',      // Titre obligatoire, texte, max 255 caractères
                'content' => 'required|string',             // Contenu obligatoire, texte
                'author' => 'required|string|max:255',      // Auteur obligatoire, texte, max 255 caractères
                'is_published' => 'boolean'                 // is_published optionnel, doit être true ou false
            ]);

            // Si la validation échoue, retourne les erreurs
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Création de l'article dans la base de données
            // Post::create() utilise les champs définis dans $fillable du modèle
            $post = Post::create($request->all());

            // Retourne une réponse de succès avec l'article créé
            return response()->json([
                'success' => true,
                'message' => 'Article créé avec succès',
                'data' => $post
            ], 201);

        } catch (\Exception $e) {
            // En cas d'erreur, retourne un message d'erreur
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * READ - Afficher un article spécifique
     * 
     * Route : GET /api/posts/{id}
     * Retourne un article selon son ID
     */
    public function show(string $id): JsonResponse
    {
        try {
            // Recherche l'article par son ID
            $post = Post::find($id);

            // Si l'article n'existe pas, retourne une erreur 404
            if (!$post) {
                return response()->json([
                    'success' => false,
                    'message' => 'Article non trouvé'
                ], 404);
            }

            // Retourne l'article trouvé
            return response()->json([
                'success' => true,
                'message' => 'Article récupéré avec succès',
                'data' => $post
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de l\'article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * UPDATE - Mettre à jour un article
     * 
     * Route : PUT/PATCH /api/posts/{id}
     * Données attendues : title, content, author, is_published (tous optionnels)
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            // Recherche l'article à modifier
            $post = Post::find($id);

            // Si l'article n'existe pas, retourne une erreur 404
            if (!$post) {
                return response()->json([
                    'success' => false,
                    'message' => 'Article non trouvé'
                ], 404);
            }

            // Validation des données (tous les champs sont optionnels pour la mise à jour)
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',    // sometimes = uniquement si présent
                'content' => 'sometimes|required|string',
                'author' => 'sometimes|required|string|max:255',
                'is_published' => 'boolean'
            ]);

            // Si la validation échoue, retourne les erreurs
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Met à jour l'article avec les nouvelles données
            // update() modifie uniquement les champs fournis
            $post->update($request->all());

            // Recharge l'article depuis la base de données pour avoir les données à jour
            $post->refresh();

            // Retourne l'article mis à jour
            return response()->json([
                'success' => true,
                'message' => 'Article mis à jour avec succès',
                'data' => $post
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de l\'article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE - Supprimer un article
     * 
     * Route : DELETE /api/posts/{id}
     * Supprime définitivement un article de la base de données
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            // Recherche l'article à supprimer
            $post = Post::find($id);

            // Si l'article n'existe pas, retourne une erreur 404
            if (!$post) {
                return response()->json([
                    'success' => false,
                    'message' => 'Article non trouvé'
                ], 404);
            }

            // Supprime l'article de la base de données
            $post->delete();

            // Retourne un message de confirmation
            return response()->json([
                'success' => true,
                'message' => 'Article supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'article',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}