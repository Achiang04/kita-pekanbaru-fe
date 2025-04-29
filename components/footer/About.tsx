import Link from "next/link";
import logoImg from "../../assets/logoUkCrop.png";

export default function FooterAbout({
  companyTitle,
}: {
  companyTitle?: string;
}) {
  const title = companyTitle || "Your Company LLC.";
  return (
    <>
      <div className="page-footer__logo">
        <Link href="/">
          <img
            src={logoImg.src}
            width={150}
            height={logoImg.height}
            alt={title}
          />
        </Link>
      </div>
      <div className="page-footer__company-info">
        <p className="title">Undangan Kita</p>
      </div>
      <div className="page-footer__disclaimer">
        <p className="text-muted small">
          Pabrik Percetakan Undangan Dengan Harga Ekonomis, Pengerjaan Cepat, &
          Kualitas Bagus
        </p>
        <p className="text-muted small mt-2">Tersedia Cabang</p>
        <ul className="text-muted small">
          <li>1. Sumatera - Pekanbaru</li>
          <li>2. Jawa - Jakarta</li>
          <li>3. Jawa Timur - Surabaya</li>
          <li>4. Jawa Tengah - Semarang</li>
          <li>5. Jawa Barat - Bandung</li>
        </ul>
      </div>
    </>
  );
}
