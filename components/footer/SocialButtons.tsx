import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faTiktok } from "@fortawesome/free-brands-svg-icons/faTiktok";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialButtons() {
  return (
    <>
      <h3 className="page-footer__header">Follow us</h3>
      <div className="page-footer__social-buttons">
        <div className="page-footer__social-button">
          <a
            className="page-footer__social-link"
            target="_blank"
            href="https://www.instagram.com/undangankitaofficial/"
          >
            <FontAwesomeIcon
              className="social-icon"
              icon={faInstagram as IconProp}
            />
          </a>
        </div>
        <div className="page-footer__social-button">
          <a
            className="page-footer__social-link"
            target="_blank"
            href="https://www.tiktok.com/@undangankita.official"
          >
            <FontAwesomeIcon
              className="social-icon"
              icon={faTiktok as IconProp}
            />
          </a>
        </div>
      </div>
      <p className="text-muted">All rights reserved. © Undangan Kita</p>
    </>
  );
}
