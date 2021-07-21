/**
 * @format
 */

import 'react-native';
import React, {memo, Suspense} from 'react';

// Note: test renderer must be required after react-native.
import {Text, View} from 'react-native';
import {render} from '@testing-library/react-native';

let done = false;
const promise = new Promise(resolve =>
  setTimeout(() => {
    resolve();
    done = true;
  }, 1000),
);

const SomeComponent = memo(() => {
  if (!done) {
    throw promise;
  }

  return (
    <View>
      <Text />
    </View>
  );
});

it('renders correctly', async () => {
  const result = render(
    <Suspense fallback={'Loading...'}>
      <View>
        <SomeComponent />
        <View testID="hello" />
      </View>
    </Suspense>,
  );

  await result.findByTestId('hello');
});
