import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContex';
const Nav = () => {

    const { setIsAuthenticated } = useContext(AuthContext);


    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    useEffect(() => {
        axios
            .get('/user-info', { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => {
                console.error('Failed to fetch user data:', err);
                setUser({ username: 'Guest' });
            });
    }, []);

    const handleLogout = () => {
        window.location.href = process.env.REACT_APP_API_BASE_URL + "/logout";
        setIsAuthenticated(false)
    }



    return (
        <div
            style={{
                ...styles.navContainer,
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            }}
        >
            <h1 style={styles.title}>Poll Web Application</h1>

            <div style={styles.userContainer}>
                {user ? (
                    <>
                        <span style={styles.userName}>
                            {user.name || 'Guest'}
                        </span>
                        <img
                            style={styles.userImage}
                            src={user.picture || user.avatar_url || 'https://via.placeholder.com/35'}
                            alt="User"
                        />
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </>
                ) : (
                    <p style={styles.loadingText}>Loading...</p>
                )}
            </div>
        </div>
    );

};

const styles = {
    navContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#6200ea',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        zIndex: 1000,
    },
    title: {
        margin: 0,
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        marginRight: '10px',
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#fff',
    },
    userImage: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #fff',
    },
    logoutButton: {
        marginLeft: '10px',
        backgroundColor: '#ff5733',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    loadingText: {
        color: '#ffffff',
        fontStyle: 'italic',
    },
};

export default Nav;
