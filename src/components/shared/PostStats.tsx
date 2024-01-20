import { useDeleteSavedPost, useGetCurrentUser, useLikedPost, useSavePost } from "@/lib/react-query/querysAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId } : PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikedPost()
    const { mutate: savePost } = useSavePost()
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
        likePost({postId: post.$id, likesArray: newLikes })
    }

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post.$id
    );
    
    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser]);

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (savedPostRecord) {
            console.log("unsaving....");
            
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id)
        } else {
            console.log("saving....");
            console.log(post.$id, userId);
            
            savePost({userId, postId: post.$id})
            setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20 p-5">
            <div className="flex gap-2 mr-5">
                <img 
                    src={checkIsLiked(likes, userId) 
                        ? "/assets/icons/liked.svg" 
                        : "/assets/icons/like.svg"}
                    alt="like"
                    width={20}
                    height={20} 
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                /> 
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>
            <div className="flex gap-2">
            <img 
                src={isSaved ? "/assets/icons/saved.svg" :  "/assets/icons/save.svg"}
                alt="save"
                width={20}
                height={20} 
                onClick={(e) => handleSavePost(e)}
                className="cursor-pointer"
            />
            </div>
        </div>
    )
}

export default PostStats