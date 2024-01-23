import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/querysAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const {ref, inView} = useInView()
  const {data: posts, fetchNextPage, hasNextPage} = useGetRecentPosts();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView])

  if (!posts) {
    return <div className="flex-center w-full h-full">
      <Loader />
    </div>
  }
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full dark:text-white" >Home page</h2>
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {
                posts?.pages.map((item) => (
                  <div className="flex flex-col flex-1 gap-9 w-full" key={item.id}>
                      {item.documents?.map((post: Models.Document) => (
                          <PostCard key={post.$id} post={post} />
                      ))}
                  </div>
                ))
              }
            </ul>
          </div>
          {hasNextPage ? (
            <div ref={ref} className="mt-10">
              <Loader/>
            </div>
          ) : <div className="flex flex-col items-center">
            <img src="/assets/icons/check.svg" width={100} height={100} alt="ok" />
            <p className="text-primary-500 text-center w-full capitalize">You have viewed all posts </p>
          </div>}
      </div>
    </div>
  )
}

export default Home