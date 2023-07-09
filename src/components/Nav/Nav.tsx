import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { User } from 'firebase/auth';
import SignOut from '../../views/SignOut/SignOut';
import './Nav.css';

const Nav = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <div className="navbar-brand-container">
            <div className="navbar-brand-text">Free2Play</div>
          </div>
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                </li>
                <li className="nav-item">
                  <SignOut />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
