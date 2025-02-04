import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FooterContacts() {
  return (
    <>
      <h3 className="page-footer__header">Contact Us</h3>
      <p className="page-footer__icon-w-link">
        <span className="icon">
          <FontAwesomeIcon icon={faWhatsapp as IconProp} />
        </span>
        <a className="link" href="tel:+18001234567">
          +1 (800) 123-45-67
        </a>
      </p>
      <p className="page-footer__icon-w-link">
        <span className="icon">
          <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} />
        </span>
        <a className="link" href="#">
          1 infinite loop, Cupertino, CA 95014
        </a>
      </p>
      <p className="page-footer__icon-w-link">
        <span className="icon">
          <FontAwesomeIcon icon={faClock as IconProp} />
        </span>
        9:00am &mdash; 6:00pm
      </p>
    </>
  );
}
