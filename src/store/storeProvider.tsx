'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => makeStore());
  const [persistorObj] = useState(() => persistor(store));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorObj}>
        {children}
      </PersistGate>
    </Provider>
  );
}
