import { message } from "antd";
import { useCallback } from "react";
import useLocalStorage from "use-local-storage-state";

export const useFavorites = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [favorites, setFavorites] = useLocalStorage<
    Record<string, { tableLookupKey: string; url: string }>
  >("mooshy.app.favourites", { defaultValue: {} });

  const updateFavorites = useCallback(
    (table: string, url: string) => {
      setFavorites((state) => {
        const key = `${table}/${url}`;
        if (state) {
          if (state[key] === undefined) {
            messageApi.success("Added to favorites!");
            return {
              ...state,
              [key]: { tableLookupKey: table, url },
            };
          } else {
            messageApi.info("Removed from favorites!");
            const mutable = { ...state };

            delete mutable[key];

            return mutable;
          }
        }
        return {
          [key]: { tableLookupKey: table, url },
        };
      });
    },
    [messageApi, setFavorites]
  );

  return {
    favorites,
    updateFavorites,
    contextHolder,
  };
};
