import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAdmin, logout } from '../../services/auth'; // <--- 1. IMPORTE ISTO
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    
    // 2. Verificamos se existe token no localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    
    // 3. Verificamos se é Admin usando nossa função nova
    const [userIsAdmin, setUserIsAdmin] = useState(isAdmin()); 

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função para o botão de Login
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Função para o botão de Adoção
    const handleAdoptClick = () => {
        navigate('/adocao');
    };

    // Função para o botão de Perfil
    const handleProfileClick = () => {
        navigate('/perfil');
    };

    // Função para o botão de Admin (NOVO)
    const handleAdminClick = () => {
        navigate('/admin');
    };

    // Função para o botão de Logout
    const handleLogoutClick = () => {
        logout(); // Usa a função do auth.js
        setIsLoggedIn(false);
        setUserIsAdmin(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">
                        <h2>Anjos Protetores</h2>
                    </Link>
                </div>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Início</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#about" className="nav-link">Sobre</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#dogs" className="nav-link">Cachorros</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#process" className="nav-link">Processo</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#contact" className="nav-link">Contato</Link>
                    </li>
                </ul>

                <div className="nav-buttons">
                    {isLoggedIn ? (
                        <>
                            {/* 4. RENDERIZAÇÃO CONDICIONAL DO BOTÃO ADMIN */}
                            {userIsAdmin && (
                                <button className="admin-btn" onClick={handleAdminClick} style={{backgroundColor: '#d32f2f', color: 'white', marginRight: '10px'}}>
                                    Admin
                                </button>
                            )}
                            
                            <button className="profile-btn" onClick={handleProfileClick}>
                                Ver Perfil
                            </button>
                            <button className="logout-btn" onClick={handleLogoutClick}>
                                Sair
                            </button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={handleLoginClick}>
                            Login
                        </button>
                    )}

                    <button className="adopt-btn" onClick={handleAdoptClick}>
                        Quero Adotar
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;