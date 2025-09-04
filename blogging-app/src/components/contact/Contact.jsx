import { Box, styled, Typography, Link, Container, Paper, TextField, Button } from '@mui/material';
import { GitHub, Instagram, Email, Phone, LocationOn, Send } from '@mui/icons-material';

const ContactContainer = styled(Container)`
    padding: 2rem 1rem;
    max-width: 900px;
    margin-top: 2rem;
`;

const ContactPaper = styled(Paper)`
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

const ContactTitle = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const ContactSubtitle = styled(Typography)`
    font-size: 1.125rem;
    opacity: 0.9;
    font-weight: 400;
`;

const ContactGrid = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`;

const ContactInfo = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const ContactItem = styled(Box)`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
    }
`;

const ContactIcon = styled(Box)`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    flex-shrink: 0;
`;

const ContactDetails = styled(Box)`
    flex: 1;
`;

const ContactLabel = styled(Typography)`
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
`;

const ContactValue = styled(Typography)`
    color: #64748b;
    font-size: 0.95rem;
`;

const ContactForm = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormTitle = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
`;

const StyledTextField = styled(TextField)`
    .MuiOutlinedInput-root {
        border-radius: 12px;
        background-color: #f8fafc;
        
        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: #2563eb;
        }
        
        &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #2563eb;
            border-width: 2px;
        }
    }
    
    .MuiInputLabel-root {
        color: #64748b;
        font-weight: 500;
        
        &.Mui-focused {
            color: #2563eb;
        }
    }
`;

const SendButton = styled(Button)`
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    text-transform: none;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    
    &:hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
    }
`;

const SocialSection = styled(Box)`
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

const Contact = () => {
    return (
        <ContactContainer>
            <ContactPaper elevation={0}>
                <HeroSection>
                    <ContactTitle variant="h2">
                        Get in Touch
                    </ContactTitle>
                    <ContactSubtitle variant="h6">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </ContactSubtitle>
                </HeroSection>

                <ContactGrid>
                    <ContactInfo>
                        <ContactItem>
                            <ContactIcon>
                                <Email />
                            </ContactIcon>
                            <ContactDetails>
                                <ContactLabel>Email</ContactLabel>
                                <ContactValue>contact@blogapp.com</ContactValue>
                            </ContactDetails>
                        </ContactItem>
                        
                        <ContactItem>
                            <ContactIcon>
                                <Phone />
                            </ContactIcon>
                            <ContactDetails>
                                <ContactLabel>Phone</ContactLabel>
                                <ContactValue>+1 (555) 123-4567</ContactValue>
                            </ContactDetails>
                        </ContactItem>
                        
                        <ContactItem>
                            <ContactIcon>
                                <LocationOn />
                            </ContactIcon>
                            <ContactDetails>
                                <ContactLabel>Address</ContactLabel>
                                <ContactValue>123 Blog Street<br />Tech City, TC 12345</ContactValue>
                            </ContactDetails>
                        </ContactItem>
                    </ContactInfo>

                    <ContactForm>
                        <FormTitle>Send us a Message</FormTitle>
                        
                        <StyledTextField
                            fullWidth
                            label="Your Name"
                            variant="outlined"
                            required
                        />
                        
                        <StyledTextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            type="email"
                            required
                        />
                        
                        <StyledTextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            required
                        />
                        
                        <StyledTextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                        />
                        
                        <SendButton
                            variant="contained"
                            startIcon={<Send />}
                            fullWidth
                        >
                            Send Message
                        </SendButton>
                    </ContactForm>
                </ContactGrid>

                <SocialSection>
                    <Typography variant="h6" fontWeight={600} color="#1e293b" gutterBottom>
                        Follow Us
                    </Typography>
                    <Typography variant="body2" color="#64748b" gutterBottom>
                        Stay connected with us on social media
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
                </SocialSection>
            </ContactPaper>
        </ContactContainer>
    );
}

export default Contact;