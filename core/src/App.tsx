import {Suspense} from 'react';
import {observer} from 'mobx-react';
import {FormBuilder} from './Builder';
import {rsuite} from './views/rsuite';
import {getSampleForm} from "./utils/getSampleForm";
import {Loader} from "rsuite";

const App = observer(() => {

    return (
        <Suspense fallback={<Loader size={"md"} content="loading..." center/>}>
            <FormBuilder
                getForm={getSampleForm}
                view={rsuite}
                event={(bus) => {
                    bus.listen((e) => {
                        let a = 4
                    }, {eventName: "onChange", target :"title"})

                    bus.listen((e) => {
                        let a = 4
                    }, {target: "title"})

                    bus.listen((e) => {
                        let a = 4
                    })
                }}
            />
        </Suspense>
    )
});

export default App;
