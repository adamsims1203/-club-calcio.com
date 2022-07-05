import { useEffect, useState } from "react";

import { config } from "./config";
import SanityEventSource from "@sanity/eventsource";

export function usePreviewSubscription(query, subscriptionOptions) {
  const { params, initialData } = subscriptionOptions;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let sub;
    let store;

    async function createStore() {
      // For more details about configuring groq-store see:
      // https://www.npmjs.com/package/@sanity/groq-store
      const {
        default: { groqStore },
      } = await import("@sanity/groq-store");

      const { projectId, dataset } = config;

      store = groqStore({
        projectId,
        dataset,
        token:
          "skARTTfTd1HhZpgjWar4QZPk3DWiVsEDi15GK7uA2gBqxX07iPslk4O8WotPjRMJkYmrPfH26Q8QqZD0L7C5vvbKCKAfAFCxmyg7z6FwV5awGU2qBThYvtQX2Ai4Z4NlDQCsfdozMCsV4JJdDNG7Q7Azxc5luGDdsDmMclT0XxWjnPKIzSNX",
        listen: true,
        overlayDrafts: true,
        documentLimit: 1000,
        EventSource: SanityEventSource,
      });

      store.subscribe(
        query,
        params ?? {}, // Params
        (err, result) => {
          if (err) {
            console.error("Oh no, an error:", err);
            return;
          }
          setData(result);
        }
      );
    }

    if (!store) {
      createStore();
    }

    return () => {
      if (sub?.unsubscribe()) sub.unsubscribe();
      if (store) store.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
}
