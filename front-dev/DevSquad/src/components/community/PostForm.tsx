import style from './styles/PostForm.module.css';

// interface Post {
//   title: string,
//   content: string
// };

export default function PostForm() {
  // const [post, setPost] = useState<Post>();

  const handleSavePost = () => {
    
  };
  // 제목, 내용, 카테고리 필요
  return (
    <div className={style.container}>
      <h4>글 작성 페이지</h4>
      <div className={style.InputContainer}>
        <textarea name="title" className={style.titleInput} placeholder='제목을 입력하세요' required></textarea>
        <hr />
        <textarea name="content" className={style.contentInput} placeholder='내용을 입력하세요' required></textarea>
        <div>
          <button onClick={handleSavePost}>글 게시</button>
        </div>
      </div>
    </div>
  );
};