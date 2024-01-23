import { CharacterLimit } from "@/components/shared/CharacterLimit";
import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/querysAndMutations"
import { formatDateAgo } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";


const PostDetails = () => {
  const {id} = useParams();
  const {data: post, isLoading } = useGetPostById(id || '');
  const {user} = useUserContext()

  const handleDeletePost = () => {}

  return (
    <div className="post_details-container">
      {isLoading
        ? <Loader />
        : <div className="post_details-card">
            <img src={post?.imageUrl} alt="post" className="post_details-img" />
            <div className="post_details-info overflow-y-auto custom-scrollbar">
              <div className="flex-between w-full flex-wrap gap-x-2 gap-y-1">

              <Link to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                      src={post?.creator?.imageUrl 
                          || "/assets/icons/profile-placeholder.svg"}
                      alt="creator"
                      className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
                />
                <div className="flex flex-col">
                <p className='base-medium lg:body-semibold text-dark-3 dark:text-light-1'>
                    {post?.creator.name}
                </p>
                <div className="items-center flex flex-wrap sm:flex-nowrap  gap-2 text-primary-600 dark:text-light-3">
                    <p className='subtle-semibold lg:small-regular text-nowrap'>
                        {formatDateAgo(post?.$createdAt || 'no-date')}
                    </p>
                    -
                    <p className='subtle-semibold lg-small-regular text-wrap max-w-[calc(100%-50px)] truncate'>
                        {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link to={`/update-post/${post?.$id}`} 
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghos_deteils-delete-btn ${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>
            <hr className="border w-full dark:border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p className="text-dark-1 dark:text-light-1">
                  {post?.caption}
              </p>
              <ul className='flex gap-1 mt-2 flex-wrap'>
                {post?.tags.map((tag:string) => (
                    <li className='text-primary-600 limit-characters dark:text-light-3 truncate' key={tag}>
                        #<CharacterLimit text={tag} limit={30}/>
                    </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id}/>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default PostDetails