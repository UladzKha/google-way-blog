import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="container">
          <nav className="header__elems">
            <Link href="/" passHref>
              <img src="logo.png" alt="" className="header__logo" />
            </Link>
            <div className="header__links">
              <ul className="header__link">
                <Link href="/" passHref>
                  <div className="header__link__text"> Home</div>
                </Link>
              </ul>
              <ul className="header__link">
                <Link href="/blog" passHref>
                  <div className="header__link__text">Blog</div>
                </Link>
              </ul>
              <ul className="header__link">
                <Link href="/about" passHref>
                  <div className="header__link__text">About</div>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
