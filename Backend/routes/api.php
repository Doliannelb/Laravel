<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
|
| Ces routes sont chargées par le RouteServiceProvider avec le préfixe "api"
| Toutes ces routes seront accessibles via : http://localhost:8000/api/...
|
*/

/**
 * Route de test pour vérifier que l'API fonctionne
 * GET http://localhost:8000/api/test
 */
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'L\'API fonctionne correctement !',
        'timestamp' => now()
    ]);
});

/**
 * Routes CRUD pour les articles (Posts)
 * 
 * apiResource() crée automatiquement toutes les routes CRUD :
 * - GET    /api/posts           -> index()   (Liste tous les articles)
 * - POST   /api/posts           -> store()   (Créer un article)
 * - GET    /api/posts/{id}      -> show()    (Afficher un article)
 * - PUT    /api/posts/{id}      -> update()  (Mettre à jour un article)
 * - PATCH  /api/posts/{id}      -> update()  (Mettre à jour partiellement)
 * - DELETE /api/posts/{id}      -> destroy() (Supprimer un article)
 */
Route::apiResource('posts', PostController::class);

/**
 * Route alternative si vous préférez définir les routes manuellement :
 * (Décommentez ci-dessous si vous n'utilisez pas apiResource)
 */
/*
Route::get('/posts', [PostController::class, 'index']);           // Liste
Route::post('/posts', [PostController::class, 'store']);          // Créer
Route::get('/posts/{id}', [PostController::class, 'show']);       // Voir un
Route::put('/posts/{id}', [PostController::class, 'update']);     // Modifier
Route::delete('/posts/{id}', [PostController::class, 'destroy']); // Supprimer
*/