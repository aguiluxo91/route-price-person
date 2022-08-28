import Link from "next/link"
import Image from "next/image"

export default function Footer () {



    return (
        <footer className="d-flex justify-content-around align-items-center bg-white shadow p-3">
            <div className="d-flex flex-column align-items-center">
                <p className="m-0 text-center">© Alejandro Puerta 2022</p>
                <p className="m-0 text-center">Built with Next.js</p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <Link href="mailto:apuertadelaguila@gmail.com">
                    <a className="icon">
                        <Image src="/mail.svg" alt="mail" width="25" height="25" />
                    </a>
                </Link>
                <Link href="https://www.linkedin.com/in/alejandro-puerta-del-%C3%A1guila-17b404201/" >
                    <a className="icon" target="_blank">
                        <Image src="/linkedin.svg" alt="linkedin" width="25" height="25" />
                    </a>
                </Link>
                <Link href="https://github.com/aguiluxo91">
                    <a className="icon" target="_blank">
                        <Image src="/github.svg" alt="linkedin" width="25" height="25" />
                    </a>
                </Link>
            </div>
        </footer>
    )
}