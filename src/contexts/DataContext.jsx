import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadHomeSections } from '../api/firestore/homeSections';
import { getProjects } from '../api/firestore/projects';
import { getPages } from '../api/firestore/pages';

const DataContext = createContext();

// Кеш для даних
let cachedData = null;
let cacheTime = null;
let loadingPromise = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 хвилин

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    homeSections: null,
    projects: null,
    pages: null,
    loading: false,
    error: null
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Функція для ледачого завантаження даних
  const loadData = async () => {
    const now = Date.now();
    
    // Якщо є свіжий кеш - повертаємо його
    if (cachedData && cacheTime && (now - cacheTime) < CACHE_DURATION) {
      if (!isInitialized) {
        setData({ ...cachedData, loading: false });
        setIsInitialized(true);
      }
      return cachedData;
    }

    // Якщо вже йде завантаження - чекаємо його
    if (loadingPromise) {
      return loadingPromise;
    }

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Зберігаємо promise щоб уникнути дублювання запитів
      loadingPromise = Promise.all([
        loadHomeSections(),
        getProjects(),
        getPages()
      ]).then(([homeSections, projects, pages]) => {
        const newData = {
          homeSections,
          projects,
          pages,
        };

        // Зберігаємо в кеш
        cachedData = newData;
        cacheTime = now;
        loadingPromise = null;

        setData({
          ...newData,
          loading: false,
          error: null
        });
        setIsInitialized(true);

        return newData;
      });

      return await loadingPromise;
    } catch (error) {
      console.error('Error loading data:', error);
      loadingPromise = null;
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  // Автоматичне завантаження при першому рендері (з невеликою затримкою)
  useEffect(() => {
    // Затримка 100мс для пріоритетного рендерінгу UI
    const timer = setTimeout(() => {
      loadData();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const refreshData = async () => {
    cachedData = null;
    cacheTime = null;
    loadingPromise = null;
    return loadData();
  };

  return (
    <DataContext.Provider value={{ ...data, refreshData, loadData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
