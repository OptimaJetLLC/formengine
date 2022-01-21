import { define } from '../../features/annotation/define';

export interface SearchProps {

}

export const Search = (props: SearchProps) => {
    // todo implement
    return (<>Search</>)
}

export const search = define('Search', Search, {}, []);
