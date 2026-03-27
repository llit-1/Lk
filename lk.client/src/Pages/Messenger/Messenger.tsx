import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import WindowIcon from '@mui/icons-material/Window';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import './Messenger.css';

const messengerLinks = [
    {
        title: 'App Store',
        description: 'Element X для iPhone и iPad',
        href: 'https://apps.apple.com/us/app/element-x-secure-chat-call/id1631335820',
        icon: <AppleIcon fontSize="large" />,
    },
    {
        title: 'Google Play',
        description: 'Element X для Android',
        href: 'https://play.google.com/store/apps/details?id=io.element.android.x',
        icon: <AndroidIcon fontSize="large" />,
    },
    {
        title: 'Windows',
        description: 'Element Desktop для Windows',
        href: 'https://packages.element.io/desktop/install/win32/x64/Element%20Setup.exe',
        icon: <WindowIcon fontSize="large" />,
    },
];

function Messenger() {
    return (
        <section className="messenger-page">
            <div className="messenger-hero">
                <p className="messenger-eyebrow">Мессенджер</p>
                <h1>Скачайте Element X</h1>
                <p className="messenger-lead">
                   <a href="/public/Element.pdf" target="_blank" rel="noreferrer">
                        Инструкция по установке и использованию Element X
                    </a>
                </p>
            </div>

            <div className="messenger-grid">
                {messengerLinks.map((item) => (
                    <a
                        key={item.title}
                        className="messenger-card"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="messenger-card-icon">{item.icon}</div>
                        <div className="messenger-card-content">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                        <OpenInNewIcon className="messenger-card-arrow" />
                    </a>
                ))}
            </div>
        </section>
    );
}

export default Messenger;
