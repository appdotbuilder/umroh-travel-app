import { Head, Link } from '@inertiajs/react';

interface UmrohPackage {
    id: number;
    name: string;
    description: string;
    price: string;
    duration_days: number;
    departure_date: string;
    hotel_mecca: string;
    hotel_medina: string;
    inclusions: string;
    exclusions: string | null;
    available_slots: number;
    is_featured: boolean;
}

interface Props {
    package: UmrohPackage;
    [key: string]: unknown;
}

export default function PackageShow({ package: pkg }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPrice = (price: string) => {
        return 'Rp ' + parseFloat(price).toLocaleString('id-ID');
    };

    const formatList = (text: string) => {
        return text.split('\n').filter(item => item.trim().length > 0);
    };

    return (
        <>
            <Head title={`${pkg.name} - UmrohKu`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900">
                {/* Header */}
                <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 dark:bg-emerald-900/90 dark:border-emerald-800">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('home')} className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    🕌
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-100">UmrohKu</h1>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-300">Travel Umroh Terpercaya</p>
                                </div>
                            </Link>
                            <nav className="flex items-center space-x-4">
                                <Link
                                    href={route('packages.index')}
                                    className="text-emerald-700 hover:text-emerald-800 font-medium dark:text-emerald-200 dark:hover:text-emerald-100"
                                >
                                    Semua Paket
                                </Link>
                                <Link
                                    href={route('home')}
                                    className="text-emerald-700 hover:text-emerald-800 font-medium dark:text-emerald-200 dark:hover:text-emerald-100"
                                >
                                    Beranda
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Package Hero */}
                <section className="container mx-auto px-4 py-12">
                    <div className="bg-white dark:bg-emerald-800 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Hero Image */}
                        <div className="h-96 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center relative">
                            <div className="text-8xl text-white">🕌</div>
                            {pkg.is_featured && (
                                <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                                    ⭐ PAKET UNGGULAN
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8">
                                <h1 className="text-4xl font-bold text-white mb-2">{pkg.name}</h1>
                                <div className="flex items-center text-white text-lg">
                                    <span className="mr-4">📅 {formatDate(pkg.departure_date)}</span>
                                    <span className="mr-4">⏰ {pkg.duration_days} hari</span>
                                    <span>👥 {pkg.available_slots > 0 ? `${pkg.available_slots} slot` : 'Penuh'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 p-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Description */}
                                <div>
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                        📋 Deskripsi Paket
                                    </h2>
                                    <p className="text-emerald-700 dark:text-emerald-200 leading-relaxed">
                                        {pkg.description}
                                    </p>
                                </div>

                                {/* Hotels */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-emerald-50 dark:bg-emerald-900 p-6 rounded-xl">
                                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-3 flex items-center">
                                            🕌 Hotel di Makkah
                                        </h3>
                                        <p className="text-emerald-700 dark:text-emerald-200 font-semibold">
                                            {pkg.hotel_mecca}
                                        </p>
                                    </div>
                                    <div className="bg-emerald-50 dark:bg-emerald-900 p-6 rounded-xl">
                                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-3 flex items-center">
                                            🕌 Hotel di Madinah
                                        </h3>
                                        <p className="text-emerald-700 dark:text-emerald-200 font-semibold">
                                            {pkg.hotel_medina}
                                        </p>
                                    </div>
                                </div>

                                {/* Inclusions */}
                                <div>
                                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                        ✅ Sudah Termasuk
                                    </h2>
                                    <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl">
                                        <ul className="space-y-2">
                                            {formatList(pkg.inclusions).map((item, index) => (
                                                <li key={index} className="text-green-700 dark:text-green-200 flex items-start">
                                                    <span className="text-green-500 mr-2 text-lg">✓</span>
                                                    <span>{item.replace('•', '').trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Exclusions */}
                                {pkg.exclusions && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                            ❌ Tidak Termasuk
                                        </h2>
                                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl">
                                            <ul className="space-y-2">
                                                {formatList(pkg.exclusions).map((item, index) => (
                                                    <li key={index} className="text-red-700 dark:text-red-200 flex items-start">
                                                        <span className="text-red-500 mr-2 text-lg">✗</span>
                                                        <span>{item.replace('•', '').trim()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8 space-y-6">
                                    {/* Price Card */}
                                    <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl font-bold mb-2">
                                                {formatPrice(pkg.price)}
                                            </div>
                                            <div className="text-emerald-100">per orang</div>
                                        </div>
                                        
                                        <div className="space-y-3 text-sm mb-6">
                                            <div className="flex justify-between">
                                                <span>Keberangkatan:</span>
                                                <span className="font-semibold">{formatDate(pkg.departure_date)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Durasi:</span>
                                                <span className="font-semibold">{pkg.duration_days} hari</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Slot tersedia:</span>
                                                <span className="font-semibold">
                                                    {pkg.available_slots > 0 ? pkg.available_slots : 'Penuh'}
                                                </span>
                                            </div>
                                        </div>

                                        {pkg.available_slots > 0 ? (
                                            <div className="space-y-3">
                                                <a
                                                    href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket ${pkg.name} (${formatPrice(pkg.price)}). Bisa minta informasi lebih lanjut?`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                                                >
                                                    💬 WhatsApp
                                                </a>
                                                <a
                                                    href="tel:+6281234567890"
                                                    className="block w-full bg-white text-emerald-600 text-center py-3 rounded-lg hover:bg-emerald-50 transition-colors font-semibold"
                                                >
                                                    📞 Telepon
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-500 text-white text-center py-3 rounded-lg font-semibold">
                                                📵 Paket Sudah Penuh
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Info */}
                                    <div className="bg-white dark:bg-emerald-800 p-6 rounded-xl shadow-lg">
                                        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                            ℹ️ Informasi Penting
                                        </h3>
                                        <div className="space-y-3 text-sm text-emerald-700 dark:text-emerald-200">
                                            <p>✓ Pembayaran bisa dicicil</p>
                                            <p>✓ Gratis konsultasi sebelum berangkat</p>
                                            <p>✓ Bimbingan manasik lengkap</p>
                                            <p>✓ Pendampingan 24/7 selama perjalanan</p>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
                                        <h3 className="text-lg font-bold text-blue-800 dark:text-blue-100 mb-4">
                                            📞 Hubungi Kami
                                        </h3>
                                        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                                            <p>📱 WhatsApp: +62 812-3456-7890</p>
                                            <p>☎️ Telepon: +62 812-3456-7890</p>
                                            <p>📧 Email: info@umrohku.com</p>
                                            <p>📍 Jl. Sudirman No. 123, Jakarta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Packages */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                            🔍 Paket Lainnya
                        </h2>
                        <Link
                            href={route('packages.index')}
                            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Lihat Semua Paket →
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}