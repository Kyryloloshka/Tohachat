import { useDeleteSavedPost, useGetCurrentUser, useLikedPost, useSavePost } from "@/lib/react-query/querysAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
    whiteLikes?: boolean;
}

const PostStats = ({ post, userId, whiteLikes } : PostStatsProps) => {
    const likesList = post?.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost, isLoading: isLoadingLike } = useLikedPost()
    const { mutate: savePost, isLoading: isLoadingSave } = useSavePost()
    const { mutate: deleteSavedPost } = useDeleteSavedPost()

    const { data: currentUser } = useGetCurrentUser()

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        let newLikes = [...likes];
        const hasLiked = newLikes.includes(userId);
        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId)
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({postId: post?.$id || "", likesArray: newLikes })
    }

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post?.$id
    );
    
    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser]);

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (savedPostRecord) {
            
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id)
        } else {
            
            savePost({userId, postId: post?.$id || ''})
            setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                {isLoadingLike ? <Loader height={20} /> : <> <img 
                    src={checkIsLiked(likes, userId) 
                        ? "/assets/icons/liked.svg" 
                        : "/assets/icons/like.svg"}
                    alt="like"
                    width={20}
                    height={20} 
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className={`small-medium h-[20px] lg:base-medium dark:text-light-1 ${whiteLikes ? "text-light-1" : ""}`}>{likes.length}</p>
                </>}
            </div>
            <div className="flex gap-2">
                {isLoadingSave ? <Loader height={20}/> : <img 
                    src={isSaved ? "/assets/icons/saved.svg" :  "/assets/icons/save.svg"}
                    alt="save"
                    width={20}
                    height={20} 
                    onClick={(e) => handleSavePost(e)}
                    className="cursor-pointer"
                />}
            </div>
        </div>
    )
}

export default PostStats