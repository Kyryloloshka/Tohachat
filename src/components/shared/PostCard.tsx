import { useUserContext } from '@/context/AuthContext'
import { formatDateAgo } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'
import { CharacterLimit } from './CharacterLimit'

type PostCardProps = {
    post: Models.Document,
}

const PostCard = ({post}: PostCardProps) => {
    const {user} = useUserContext();
    if (!post.creator) return;
    return (
        <div className='post-card'>
            <div className="flex-between gap-y-2 flex flex-wrap p-3 md:p-5">
                <div className="flex flex-wrap items-center gap-3">
                    <Link className='w-12 h-12' to={`/profile/${post.creator.$id}`}>
                        <img
                            src={post?.creator?.imageUrl 
                                || "/assets/icons/profile-placeholder.svg"}
                            alt="creator"
                            className='rounded-full w-12 h-12'
                        />
                    </Link>
                    <div className="w-[calc(100%-60px)]">
                        
                        <div className="items-center flex flex-wrap gap-x-2 text-primary-600 dark:text-light-3">
                            <div className='subtle-semibold lg:small-regular'>
                                <p className='base-medium lg:body-bold text-dark-1 dark:text-light-1'>
                                    {post.creator.name}
                                </p>
                                {formatDateAgo(post.$createdAt)}
                            </div>
                            -
                            <p className='subtle-semibold lg-small-regular text-wrap max-w-[calc(100%-50px)] truncate'>
                                {post?.location}
                            </p>
                        </div>
                    </div>
                </div>
                
                <Link
                    className={`${user.id !== post.creator.$id && 'hidden'} `}
                    to={`/update-post/${post.$id}`}
                >
                    <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </Link>
            </div>
            <Link to={`/posts/${post.$id}`}>
                <div className="px-3 md:px-5 small-medium lg:base-medium pb-3 md:pb-5">
                    <p className='dark:text-light-2'>
                        {post.caption}
                    </p>
                    <ul className='flex gap-1 mt-2 flex-wrap'>
                        {post.tags.map((tag:string) => (
                            <li className='text-primary-600 dark:text-light-3 trancate' key={tag}>
                                #<CharacterLimit text={tag} limit={30}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <img className='post-card_img' src={post.imageUrl || '/assets/image/alt.png'} alt="post image" />
            </Link>
            <div className="p-3 md:p-5">
                <PostStats post={post} userId={user.id} />
            </div>
        </div>
    )
}

export default PostCard