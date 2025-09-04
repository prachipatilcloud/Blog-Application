import { Box, styled, Typography, Link, Container, Paper } from '@mui/material';
import { GitHub, Instagram, Email, Code, Favorite, Coffee } from '@mui/icons-material';

const AboutContainer = styled(Container)`
    padding: 2rem 1rem;
    max-width: 900px;
    margin-top: 2rem;
`;

const AboutPaper = styled(Paper)`
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    
    @media (max-width: 768px) {
        padding: 2rem;
        margin: 1rem;
    }
`;

const HeroSection = styled(Box)`
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    color: white;
`;

const AppTitle = styled(Typography)`
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
        font-size: 2.25rem;
    }
`;

const AppSubtitle = styled(Typography)`
    font-size: 1.25rem;
    opacity: 0.9;
    font-weight: 400;
    
    @media (max-width: 768px) {
        font-size: 1.125rem;
    }
`;

const FeatureSection = styled(Box)`
    margin-bottom: 3rem;
`;

const SectionTitle = styled(Typography)`
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const FeatureGrid = styled(Box)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const FeatureCard = styled(Box)`
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
        border-color: #cbd5e1;
    }
`;

const FeatureIcon = styled(Box)`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    margin-bottom: 1rem;
`;

const FeatureTitle = styled(Typography)`
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
`;

const FeatureDescription = styled(Typography)`
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
`;

const ContentText = styled(Typography)`
    color: #374151;
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 2rem;
`;

const ContactSection = styled(Box)`
    padding: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 16px;
    text-align: center;
`;

const SocialLinks = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

const SocialLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.2);
    }
`;

const About = () => {
    return (
        <AboutContainer>
            <AboutPaper elevation={0}>
                <HeroSection>
                    <AppTitle variant="h2">
                        BlogApp
                    </AppTitle>
                    <AppSubtitle variant="h5">
                        Where Stories Come to Life
                    </AppSubtitle>
                </HeroSection>

                <FeatureSection>
                    <SectionTitle variant="h4">
                        <Code />
                        What We Offer
                    </SectionTitle>
                    
                    <FeatureGrid>
                        <FeatureCard>
                            <FeatureIcon>
                                ✨
                            </FeatureIcon>
                            <FeatureTitle variant="h6">
                                Beautiful Writing Experience
                            </FeatureTitle>
                            <FeatureDescription>
                                Clean, distraction-free interface designed for writers to focus on what matters most - their content.
                            </FeatureDescription>
                        </FeatureCard>
                        
                        <FeatureCard>
                            <FeatureIcon>
                                📱
                            </FeatureIcon>
                            <FeatureTitle variant="h6">
                                Responsive Design
                            </FeatureTitle>
                            <FeatureDescription>
                                Write and read seamlessly across all devices - desktop, tablet, or mobile.
                            </FeatureDescription>
                        </FeatureCard>
                        
                        <FeatureCard>
                            <FeatureIcon>
                                🤝
                            </FeatureIcon>
                            <FeatureTitle variant="h6">
                                Community Driven
                            </FeatureTitle>
                            <FeatureDescription>
                                Connect with fellow writers, share ideas, and engage through comments and discussions.
                            </FeatureDescription>
                        </FeatureCard>
                    </FeatureGrid>
                </FeatureSection>

                <ContentText variant="body1">
                    BlogApp is a modern, full-stack blogging platform built with React and Node.js. 
                    It provides an intuitive interface for creating, editing, and sharing blog posts 
                    with features like image uploads, categorization, and user authentication. 
                    Our platform emphasizes clean design, excellent user experience, and 
                    seamless content management.
                </ContentText>

                <ContactSection>
                    <SectionTitle variant="h5" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <Favorite sx={{ color: '#ef4444' }} />
                        Let's Connect
                    </SectionTitle>
                    
                    <Typography variant="body1" color="#64748b" style={{ marginBottom: '1rem' }}>
                        Have questions, suggestions, or want to collaborate? We'd love to hear from you!
                    </Typography>
                    
                    <SocialLinks>
                        <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <GitHub />
                        </SocialLink>
                        <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram />
                        </SocialLink>
                        <SocialLink href="mailto:contact@blogapp.com" target="_blank" rel="noopener noreferrer">
                            <Email />
                        </SocialLink>
                    </SocialLinks>
                </ContactSection>
            </AboutPaper>
        </AboutContainer>
    )
}
export default About;