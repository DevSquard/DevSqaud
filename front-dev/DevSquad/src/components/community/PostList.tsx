import React, { useState, useEffect } from 'react';
import style from './styles/PostList.module.css';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../common/SearchBox';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  hits: number;
}

// 개별 게시물 항목 컴포넌트
const PostItem: React.FC<Post> = ({ id, title, author, date, hits }) => (
  <tr className={style.postItem}>
    <td>{id}</td>
    <td>{title}</td>
    <td>{author}</td>
    <td>{date}</td>
    <td>{hits}</td>
  </tr>
);

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  
  const handleCreateForm = () => {
    navigate("/community/write");
  };
  
  useEffect(() => {
    // 데이터를 API에서 가져오는 부분
    const fetchPosts = async () => {
      // 예시 데이터
      const examplePosts: Post[] = [
        { id: 1, title: '첫 번째 게시물', author: '작성자1', date: '2024-09-01', hits: 47 },
        { id: 2, title: '두 번째 게시물', author: '작성자2', date: '2024-09-02', hits: 35 }
      ];
      setPosts(examplePosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className={style.postListContainer}>
      <h4 className={style.title}>게시판</h4>
      <div className={style.SearchAndCreate}>
        <SearchBox />
        <button className={style.createBtn} onClick={handleCreateForm}>
          <div>
            <span>CREATE</span>
          </div>
        </button>
      </div>
      <table className={style.postTable}>
        <thead className={style.headerItem}>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              date={post.date}
              hits={post.hits}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
