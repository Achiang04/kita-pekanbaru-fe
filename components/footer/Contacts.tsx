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
        <a className="link" href="https://wa.me/6282289898977" target="_blank">
          +62 822-8989-8977
        </a>
      </p>
      {/* <p className="page-footer__icon-w-link">
        <span className="icon">
          <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} />
        </span>
        <a className="link" href="#">
          1 infinite loop, Cupertino, CA 95014
        </a>
      </p> */}
      <p className="page-footer__icon-w-link">
        <span className="icon">
          <FontAwesomeIcon icon={faClock as IconProp} />
        </span>
        08:00 AM - 17:00 PM
      </p>
    </>
  );
}
