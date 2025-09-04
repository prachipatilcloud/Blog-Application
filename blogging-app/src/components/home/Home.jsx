
import { Grid, Box, styled } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const HomeContainer = styled(Box)`
    background-color: #fafafa;
    min-height: 100vh;
`;

const ContentGrid = styled(Grid)`
    margin-top: 0;
`;

const SidebarGrid = styled(Grid)`
    @media (max-width: 768px) {
        order: 2;
    }
`;

const PostsGrid = styled(Grid)`
    @media (max-width: 768px) {
        order: 1;
    }
`;

const Home = () => {
    return (
        <HomeContainer>
            <Banner />
            <ContentGrid container spacing={0}>
                <SidebarGrid item lg={3} md={3} sm={12} xs={12}>
                    <Categories />
                </SidebarGrid>
                <PostsGrid item lg={9} md={9} sm={12} xs={12}>
                    <Posts />
                </PostsGrid>
            </ContentGrid>
        </HomeContainer>
    )
}

export default Home;