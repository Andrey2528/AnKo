import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadHomeSections } from '../api/firestore/homeSections';
import { getProjects } from '../api/firestore/projects';
import { getPages } from '../api/firestore/pages';

const DataContext = createContext();

// Кеш для даних
let cachedData = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 хвилин

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    homeSections: null,
    projects: null,
    pages: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      // Перевіряємо кеш
      const now = Date.now();
      if (cachedData && cacheTime && (now - cacheTime) < CACHE_DURATION) {
        setData({ ...cachedData, loading: false });
        return;
      }

      try {
        setData(prev => ({ ...prev, loading: true, error: null }));

        // Завантажуємо всі дані одночасно
        const [homeSections, projects, pages] = await Promise.all([
          loadHomeSections(),
          getProjects(),
          getPages()
        ]);

        const newData = {
          homeSections,
          projects,
          pages,
          loading: false,
          error: null
        };

        // Зберігаємо в кеш
        cachedData = newData;
        cacheTime = now;

        setData(newData);
      } catch (error) {
        console.error('Error loading data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    cachedData = null;
    cacheTime = null;
    
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const [homeSections, projects, pages] = await Promise.all([
        loadHomeSections(),
        getProjects(),
        getPages()
      ]);

      const newData = {
        homeSections,
        projects,
        pages,
        loading: false,
        error: null
      };

      cachedData = newData;
      cacheTime = Date.now();

      setData(newData);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  return (
    <DataContext.Provider value={{ ...data, refreshData }}>
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
