/**
 * Composant PostManager
 * 
 * Ce composant gère l'affichage et les opérations CRUD sur les articles.
 * Il communique avec le backend Laravel via le service API.
 */

import { useState, useEffect } from 'react';
import PostService from '../services/api';
import './PostManager.css';

const PostManager = () => {
  // ========== ÉTATS (State) ==========
  // Liste de tous les articles récupérés depuis l'API
  const [posts, setPosts] = useState([]);
  
  // Indicateur de chargement (loading)
  const [loading, setLoading] = useState(false);
  
  // Messages d'erreur
  const [error, setError] = useState(null);
  
  // Messages de succès
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Formulaire pour créer/modifier un article
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    is_published: false
  });
  
  // Mode édition : null si on crée, sinon contient l'ID de l'article à modifier
  const [editingId, setEditingId] = useState(null);

  // ========== CHARGEMENT INITIAL ==========
  /**
   * useEffect se déclenche au montage du composant
   * Il charge tous les articles dès que la page s'affiche
   */
  useEffect(() => {
    fetchPosts();
  }, []); // [] = se déclenche une seule fois au montage

  // ========== FONCTIONS CRUD ==========

  /**
   * Récupère tous les articles depuis l'API
   */
  const fetchPosts = async () => {
    setLoading(true);  // Affiche le loader
    setError(null);    // Efface les erreurs précédentes
    
    try {
      const response = await PostService.getAllPosts();
      
      // Si la réponse contient des données paginées
      if (response.data && response.data.data) {
        setPosts(response.data.data);  // Liste des articles
      } else {
        setPosts([]);
      }
    } catch (err) {
      setError('Erreur lors du chargement des articles. Vérifiez que le backend est démarré.');
      console.error(err);
    } finally {
      setLoading(false);  // Cache le loader
    }
  };

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Event} e - L'événement de changement
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Pour les checkbox, on utilise 'checked', sinon 'value'
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  /**
   * Soumet le formulaire (création ou modification)
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Empêche le rechargement de la page
    
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (editingId) {
        // MODE ÉDITION : Mise à jour d'un article existant
        await PostService.updatePost(editingId, formData);
        setSuccessMessage('Article mis à jour avec succès !');
      } else {
        // MODE CRÉATION : Création d'un nouvel article
        await PostService.createPost(formData);
        setSuccessMessage('Article créé avec succès !');
      }

      // Réinitialise le formulaire
      resetForm();
      
      // Recharge la liste des articles
      fetchPosts();

      // Efface le message de succès après 3 secondes
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de l\'article.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Prépare le formulaire pour modifier un article
   * @param {Object} post - L'article à modifier
   */
  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      is_published: post.is_published
    });
    setEditingId(post.id);  // Active le mode édition
    
    // Scroll vers le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Supprime un article après confirmation
   * @param {number} id - L'ID de l'article à supprimer
   */
  const handleDelete = async (id) => {
    // Demande une confirmation avant de supprimer
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await PostService.deletePost(id);
      setSuccessMessage('Article supprimé avec succès !');
      
      // Recharge la liste
      fetchPosts();

      // Efface le message après 3 secondes
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (err) {
      setError('Erreur lors de la suppression de l\'article.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Réinitialise le formulaire
   */
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      is_published: false
    });
    setEditingId(null);  // Désactive le mode édition
  };

  // ========== RENDU (JSX) ==========
  return (
    <div className="post-manager">
      <h1>📝 Gestion des Articles</h1>

      {/* Messages de succès et d'erreur */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {/* FORMULAIRE DE CRÉATION/MODIFICATION */}
      <div className="form-container">
        <h2>{editingId ? '✏️ Modifier l\'article' : '➕ Créer un nouvel article'}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Champ Titre */}
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Entrez le titre de l'article"
            />
          </div>

          {/* Champ Contenu */}
          <div className="form-group">
            <label htmlFor="content">Contenu *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows="5"
              placeholder="Entrez le contenu de l'article"
            />
          </div>

          {/* Champ Auteur */}
          <div className="form-group">
            <label htmlFor="author">Auteur *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              placeholder="Nom de l'auteur"
            />
          </div>

          {/* Checkbox Publié */}
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleInputChange}
              />
              <span>Publier l'article</span>
            </label>
          </div>

          {/* Boutons d'action */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Chargement...' : editingId ? '💾 Mettre à jour' : '➕ Créer'}
            </button>
            
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                ❌ Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LISTE DES ARTICLES */}
      <div className="posts-container">
        <h2>📚 Liste des articles ({posts.length})</h2>

        {/* Indicateur de chargement */}
        {loading && <div className="loading">Chargement...</div>}

        {/* Si aucun article */}
        {!loading && posts.length === 0 && (
          <div className="no-posts">
            <p>Aucun article pour le moment. Créez-en un !</p>
          </div>
        )}

        {/* Liste des articles */}
        {!loading && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                {/* Badge de statut */}
                <span className={`badge ${post.is_published ? 'badge-published' : 'badge-draft'}`}>
                  {post.is_published ? '✅ Publié' : '📝 Brouillon'}
                </span>

                {/* Contenu de l'article */}
                <h3>{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <p className="post-author">👤 Par {post.author}</p>
                <p className="post-date">
                  📅 Créé le {new Date(post.created_at).toLocaleDateString('fr-FR')}
                </p>

                {/* Boutons d'action */}
                <div className="post-actions">
                  <button 
                    className="btn btn-edit" 
                    onClick={() => handleEdit(post)}
                    disabled={loading}
                  >
                    ✏️ Modifier
                  </button>
                  <button 
                    className="btn btn-delete" 
                    onClick={() => handleDelete(post.id)}
                    disabled={loading}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostManager;