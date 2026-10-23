import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos';
import PhotoCard from './components/PhotoCard';

const STORAGE_KEY = 'photo_gallery_favorites';

function getInitialFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read favorites from localStorage:', err);
    return [];
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter((item) => item !== id);
      }
      return [...state, id];
    }
    default:
      return state;
  }
}

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, dispatch] = useReducer(favoritesReducer, [], getInitialFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(term)
    );
  }, [photos, searchQuery]);

  const handleToggleFavorite = (id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-600 mt-2">Explore photos and save your favorites</p>
        </header>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by author name..."
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-gray-600">Loading photos...</p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-700 text-sm">
            <p className="font-medium">Failed to load photos</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base font-medium">No photos found</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favorites.includes(photo.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
