import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultProps = {
    isSearchFetching: boolean,
    searchedPosts: any;
}

const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultProps) => {
    if (isSearchFetching) return <Loader/>
    if (searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList whiteLikes={true} posts={searchedPosts.documents} />
        )
    } 
    return (
    <p className='text-dark-4 mt-10 text-center w-full'>No results found</p>
  )
}

export default SearchResults