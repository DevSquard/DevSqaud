import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiClock2 } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import style from './styles/PostDetail.module.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  likes: number;
}

interface Comment {
  id: number;
  username: string,
  content: string,
  date: string,
  likes: number
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>(); // URL 파라미터에서 ID를 가져옴
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // 데이터 가져오기 함수
    const axiosPost = async (postId: number) => {
      // 예시 데이터
      const examplePost: Post = {
        id: postId,
        title: `게시물 제목`,
        content: `여기는 게시물의 내용입니다.`,
        author: '김작가',
        date: '2일 전',
        views: 2258,
        comments: 71,
        likes: 47
      };

      setPost(examplePost);
    };

    if (id) {
      axiosPost(parseInt(id, 10));
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.subtitle}>{post.title}</h2>
        <div className={style.author}>
          <span>{post.author}</span> · <span>u*****</span>
        </div>
        <div className={style.info}>
          <span className={style.date}><CiClock2 /> {post.date}</span>
          <span className={style.views}><IoEyeOutline /> {post.views}</span>
          <span className={style.comments}><LiaCommentSolid /> {post.comments}</span>
        </div>
      </div>
      <div className={style.contentBox}>
        <div className={style.content}>{post.content}</div>
      </div>
      <div className={style.footer}>
        <div className={style.info}>
          <span><BiLike /> {post.likes}</span>
          <span><LiaCommentSolid /> {post.comments}</span>
        </div>
      </div>
      <div className={style.comments}>
        <h3>댓글 {post.comments}</h3>
        <div className={style.commentInput}>
          <input placeholder='댓글 함 써보이소' />
        </div>
        <div className={style.commentsList}>
          댓글들이 보여질 장소
        </div>
      </div>
    </div>
  );
}
