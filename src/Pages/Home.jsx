import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Home = () => {


    const googleLogin = () => {
        window.location.href = process.env.REACT_APP_API_BASE_URL + '/oauth2/authorization/google';
    };

    const githubLogin = () => {
        window.location.href = process.env.REACT_APP_API_BASE_URL + '/oauth2/authorization/github';
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Poll Web Application</h2>
            <button
                onClick={googleLogin}
                style={{ ...styles.button, ...styles.googleButton }}
            >
                <FaGoogle style={styles.icon} /> Login with Google
            </button>
            <button
                onClick={githubLogin}
                style={{ ...styles.button, ...styles.githubButton }}
            >
                <FaGithub style={styles.icon} /> Login with GitHub
            </button>
        </div>
    );
};

export default Home;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        height: '100vh', // Ensures it occupies the full viewport height
        background: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)', // Gradient background
        backgroundSize: '300% 300%', // Animation for glowing effect
        animation: 'glow 6s ease infinite', // Infinite glow animation
        color: '#ffffff',
    },
    heading: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '30px',
        textShadow: '0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ff00ff',
        animation: 'glow 2s infinite alternate', // Text glow animation
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#ffffff',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        margin: '15px',
        transition: 'transform 0.2s ease, background-color 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    googleButton: {
        background: 'linear-gradient(90deg, #ff4b2b, #ff416c)',
        boxShadow: '0 4px 20px rgba(255, 65, 108, 0.5)',
    },
    githubButton: {
        background: 'linear-gradient(90deg, #333333, #3a3a3a)',
        boxShadow: '0 4px 20px rgba(51, 51, 51, 0.5)',
    },
    icon: {
        marginRight: '10px',
        fontSize: '20px', // Larger icon size for emphasis
    },
};
// Keyframes for the glowing background animation
const glowAnimation = `
@keyframes glow {
    0% {
        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 60px #ff00ff;
    }
    50% {
        text-shadow: 0 0 10px #ffffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 60px #ff00ff, 0 0 70px #ff00ff;
    }
    100% {
        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 60px #ff00ff;
    }
}
`;

// Injecting keyframes into the DOM
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(glowAnimation, styleSheet.cssRules.length);
