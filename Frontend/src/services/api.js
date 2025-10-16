/**
 * Service API pour communiquer avec le backend Laravel
 * 
 * Ce fichier centralise toutes les requêtes HTTP vers l'API Laravel.
 * Il utilise Axios pour envoyer les requêtes GET, POST, PUT, DELETE.
 */

import axios from 'axios';

/**
 * URL de base de l'API Laravel
 * C'est l'adresse où tourne votre backend Laravel
 */
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Instance Axios configurée
 * On configure une fois pour toutes les requêtes
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',  // On envoie du JSON
    'Accept': 'application/json',        // On attend du JSON en réponse
  },
});

/**
 * Service PostService
 * Contient toutes les fonctions pour gérer les articles (CRUD)
 */
const PostService = {
  
  /**
   * Récupère tous les articles
   * @returns {Promise} - Promesse contenant la liste des articles
   */
  getAllPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;  // Retourne les données de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw error;  // Relance l'erreur pour la gérer dans le composant
    }
  },

  /**
   * Récupère un article spécifique par son ID
   * @param {number} id - L'ID de l'article à récupérer
   * @returns {Promise} - Promesse contenant l'article
   */
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crée un nouvel article
   * @param {Object} postData - Les données de l'article à créer
   * @param {string} postData.title - Le titre de l'article
   * @param {string} postData.content - Le contenu de l'article
   * @param {string} postData.author - L'auteur de l'article
   * @param {boolean} postData.is_published - Statut de publication
   * @returns {Promise} - Promesse contenant l'article créé
   */
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw error;
    }
  },

  /**
   * Met à jour un article existant
   * @param {number} id - L'ID de l'article à mettre à jour
   * @param {Object} postData - Les nouvelles données de l'article
   * @returns {Promise} - Promesse contenant l'article mis à jour
   */
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'article ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprime un article
   * @param {number} id - L'ID de l'article à supprimer
   * @returns {Promise} - Promesse contenant la confirmation de suppression
   */
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'article ${id}:`, error);
      throw error;
    }
  },

  /**
   * Teste la connexion à l'API
   * @returns {Promise} - Promesse contenant la réponse du test
   */
  testConnection: async () => {
    try {
      const response = await api.get('/test');
      return response.data;
    } catch (error) {
      console.error('Erreur lors du test de connexion:', error);
      throw error;
    }
  }
};

// Exporte le service pour l'utiliser dans les composants
export default PostService;