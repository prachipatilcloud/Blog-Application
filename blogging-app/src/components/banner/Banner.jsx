
import { styled, Box, Typography, Container } from '@mui/material';

const HeroSection = styled(Box)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover;
        opacity: 0.1;
        z-index: 1;
    }
`;

const ContentContainer = styled(Container)`
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 3rem 1rem;
`;

const MainHeading = styled(Typography)`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    letter-spacing: -0.02em;
`;

const SubHeading = styled(Typography)`
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 400;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
`;

const FeatureBox = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
        gap: 1rem;
        margin-top: 1.5rem;
    }
`;

const FeatureItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    opacity: 0.8;
    
    @media (max-width: 768px) {
        font-size: 0.875rem;
    }
`;

const Banner = () => {
    return (
        <HeroSection>
            <ContentContainer maxWidth="lg">
                <MainHeading variant="h1">
                    Welcome to BlogApp
                </MainHeading>
                <SubHeading variant="h5">
                    Discover amazing stories, share your thoughts, and connect with a community of passionate writers and readers.
                </SubHeading>
                <FeatureBox>
                    <FeatureItem>
                        ✨ Beautiful Stories
                    </FeatureItem>
                    <FeatureItem>
                        📝 Easy Writing
                    </FeatureItem>
                    <FeatureItem>
                        🤝 Community Driven
                    </FeatureItem>
                </FeatureBox>
            </ContentContainer>
        </HeroSection>
    )
}

export default Banner;