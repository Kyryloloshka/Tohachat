import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/querysAndMutations";
import { useEffect, useState } from "react";
import {useInView} from 'react-intersection-observer'

const Explore = () => {
  const {ref, inView} = useInView()
  const {data: posts, fetchNextPage, hasNextPage} = useGetPosts();

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const {data: searchedPosts, isLoading: isSearchFetching} = useSearchPosts(debouncedValue)

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue])

  if (!posts) {
    return <div className="flex-center w-full h-full">
      <Loader />
    </div>
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item) => item?.documents.length === 0)

  return (
    <div className='explore-container'>
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full dark:text-light-1">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg  bg-light-6 dark:bg-dark-4">
          <img className="invert brightness-150 dark:brightness-75 transition-all" src="/assets/icons/search.svg" alt="search" width={24} height={24} />
          <Input 
            type="text"
            placeholder="Search"
            className="explore-search" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold dark:text-light-1">Popular Today</h3>

        <div className="flex-center gap-3 bg-light-6 dark:bg-dark-4 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-dark-2 dark:text-light-2">
            All
          </p>
          <img 
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter" 
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {
          shouldShowSearchResults
            ? <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
            : shouldShowPosts
            ? <p className="text-dark-4 mt-10 text-center w-full">End of posts</p>
            : posts?.pages.map((item, index) => (
              <GridPostList whiteLikes={true} key={`page-${index}`} posts={item.documents} /> 
            )
          )
        }
      </div>
      {hasNextPage && !searchValue ? (
            <div ref={ref} className="mt-10">
              <Loader/>
            </div>
          ) : !searchValue && <div className="flex flex-col items-center">
            <img src="/assets/icons/check.svg" width={100} height={100} alt="ok" />
            <p className="text-primary-500 text-center w-full capitalize">You have viewed all posts </p>
          </div>}
    </div>
  )
}

export default Explore