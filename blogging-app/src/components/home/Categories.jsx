
import { Button, Box, Typography, styled, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';

import { categories } from '../../constants/data';

const SidebarContainer = styled(Box)`
    padding: 2rem 1rem;
    background: #ffffff;
    min-height: calc(100vh - 80px);
    border-right: 1px solid #e2e8f0;
    
    @media (max-width: 768px) {
        min-height: auto;
        border-right: none;
        border-bottom: 1px solid #e2e8f0;
        padding: 1.5rem 1rem;
    }
`;

const CreateButton = styled(Button)`
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: none;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    margin-bottom: 2rem;
    
    &:hover {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
    }
    
    @media (max-width: 768px) {
        margin-bottom: 1.5rem;
    }
`;

const CategoriesTitle = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
`;

const CategoryList = styled(List)`
    padding: 0;
`;

const CategoryItem = styled(ListItem)`
    padding: 0;
    margin-bottom: 0.25rem;
`;

const CategoryButton = styled(ListItemButton)`
    border-radius: 12px;
    padding: 0.75rem 1rem;
    color: #64748b;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #f8fafc;
        color: #2563eb;
        transform: translateX(4px);
    }
    
    &.active {
        background-color: #eff6ff;
        color: #2563eb;
        font-weight: 600;
        
        &:hover {
            background-color: #dbeafe;
        }
    }
`;

const CategoryText = styled(ListItemText)`
    margin: 0;
    
    .MuiListItemText-primary {
        font-size: 0.95rem;
        font-weight: inherit;
    }
`;

const AllCategoriesButton = styled(CategoryButton)`
    background-color: #f1f5f9;
    color: #334155;
    margin-bottom: 1rem;
    font-weight: 600;
    
    &:hover {
        background-color: #e2e8f0;
        color: #1e293b;
    }
    
    &.active {
        background-color: #2563eb;
        color: white;
        
        &:hover {
            background-color: #1d4ed8;
        }
    }
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <SidebarContainer>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <CreateButton 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    disableElevation
                >
                    Create New Post
                </CreateButton>
            </Link>
            
            <CategoriesTitle variant="h6">
                Categories
            </CategoriesTitle>
            
            <CategoryList>
                <CategoryItem>
                    <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
                        <AllCategoriesButton className={!category ? 'active' : ''}>
                            <CategoryText primary="All Categories" />
                        </AllCategoriesButton>
                    </Link>
                </CategoryItem>
                
                {categories.map(cat => (
                    <CategoryItem key={cat.id}>
                        <Link 
                            to={`/?category=${cat.type}`} 
                            style={{ textDecoration: 'none', width: '100%' }}
                        >
                            <CategoryButton className={category === cat.type ? 'active' : ''}>
                                <CategoryText primary={cat.type} />
                            </CategoryButton>
                        </Link>
                    </CategoryItem>
                ))}
            </CategoryList>
        </SidebarContainer>
    );
};

export default Categories;