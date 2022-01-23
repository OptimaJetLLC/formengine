import React, { Suspense } from 'react';
import { observer } from 'mobx-react';
import { FormBuilder } from './Builder';
import { rsuite } from './views/rsuite';

const App = observer(() => {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <FormBuilder
                getForm={() => []}
                view={rsuite}
            />
        </Suspense>
    )
});

export default App;
