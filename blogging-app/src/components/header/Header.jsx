import React from 'react'
import { AppBar, Toolbar, Typography, styled, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #ffffff;
    color: #1e293b;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-bottom: 1px solid #e2e8f0;
    position: fixed;
    top: 0;
    z-index: 1200;
`

const Container = styled(Toolbar)`
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    min-height: 80px;
    
    @media (max-width: 768px) {
        padding: 0 1rem;
        min-height: 70px;
    }
`;

const Logo = styled(Typography)`
    font-size: 1.75rem;
    font-weight: 700;
    color: #2563eb;
    text-decoration: none;
    letter-spacing: -0.025em;
    
    &:hover {
        color: #1d4ed8;
    }
`;

const NavLinks = styled(Box)`
    display: flex;
    align-items: center;
    gap: 2rem;
    
    @media (max-width: 768px) {
        gap: 1rem;
    }
`;

const NavLink = styled(Link)`
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
        color: #2563eb;
        background-color: #f8fafc;
    }
    
    &:active,
    &.active {
        color: #2563eb;
        background-color: #eff6ff;
    }
    
    @media (max-width: 768px) {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
    }
`;

const Header = () => {
  return (
    <Component>
        <Container>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Logo variant="h5">
                    BlogApp
                </Logo>
            </Link>
            
            <NavLinks>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About</NavLink>
                <NavLink to={'/contact'}>Contact</NavLink>
                <NavLink to={'/login'}>Logout</NavLink>
            </NavLinks>
        </Container>
    </Component>
  )
}

export default Header;