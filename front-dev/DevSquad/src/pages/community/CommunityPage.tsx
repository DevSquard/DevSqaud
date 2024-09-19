import PostList from "../../components/community/PostList";
import TopPostCard from "../../components/community/TopPostCard";
import style from './styles/Community.module.css';

const CommunityPage = () => {
    return (
        <div className={style.container}>
          <TopPostCard />
          <PostList />
        </div>
    );
};

export default CommunityPage;