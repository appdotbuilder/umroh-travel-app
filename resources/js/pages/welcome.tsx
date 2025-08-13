import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface UmrohPackage {
    id: number;
    name: string;
    description: string;
    price: string;
    duration_days: number;
    departure_date: string;
    hotel_mecca: string;
    hotel_medina: string;
    available_slots: number;
    formatted_price: string;
}

interface Props {
    featuredPackages: UmrohPackage[];
    allPackagesCount: number;
    [key: string]: unknown;
}

export default function Welcome({ featuredPackages, allPackagesCount }: Props) {
    const { auth } = usePage<SharedData>().props;

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

    return (
        <>
            <Head title="Travel Umroh - Perjalanan Spiritual Terbaik">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 dark:bg-emerald-900/90 dark:border-emerald-800">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    🕌
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-100">UmrohKu</h1>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-300">Travel Umroh Terpercaya</p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-emerald-700 hover:text-emerald-800 font-medium dark:text-emerald-200 dark:hover:text-emerald-100"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 dark:text-emerald-100 mb-6">
                            🕌 Perjalanan Umroh <br />
                            <span className="text-emerald-600 dark:text-emerald-300">Terpercaya & Nyaman</span>
                        </h1>
                        <p className="text-xl text-emerald-700 dark:text-emerald-200 mb-8 leading-relaxed">
                            Wujudkan impian perjalanan spiritual Anda bersama kami. Nikmati paket umroh lengkap 
                            dengan pelayanan terbaik, akomodasi nyaman, dan bimbingan ibadah yang komprehensif.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/80 dark:bg-emerald-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">✈️</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">Penerbangan Direct</h3>
                                <p className="text-emerald-600 dark:text-emerald-300">Penerbangan langsung Jakarta-Jeddah dengan maskapai terpercaya</p>
                            </div>
                            <div className="bg-white/80 dark:bg-emerald-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">🏨</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">Hotel Bintang 5</h3>
                                <p className="text-emerald-600 dark:text-emerald-300">Akomodasi mewah dekat Masjidil Haram dan Masjid Nabawi</p>
                            </div>
                            <div className="bg-white/80 dark:bg-emerald-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                <div className="text-3xl mb-3">🤲</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">Bimbingan Profesional</h3>
                                <p className="text-emerald-600 dark:text-emerald-300">Pembimbing berpengalaman 15+ tahun dalam ibadah umroh</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href={route('packages.index')}
                                className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                📋 Lihat Semua Paket ({allPackagesCount})
                            </Link>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                💬 Konsultasi WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

                {/* Featured Packages */}
                {featuredPackages.length > 0 && (
                    <section className="container mx-auto px-4 py-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                ⭐ Paket Unggulan
                            </h2>
                            <p className="text-emerald-700 dark:text-emerald-200">
                                Paket-paket terpopuler dengan fasilitas terbaik
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredPackages.map((pkg) => (
                                <div key={pkg.id} className="bg-white dark:bg-emerald-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                                    <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                        <div className="text-6xl text-white">🕌</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100">
                                                {pkg.name}
                                            </h3>
                                            <span className="bg-emerald-100 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full text-xs font-semibold">
                                                ⭐ Featured
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm text-emerald-700 dark:text-emerald-200 mb-4">
                                            <div className="flex items-center">
                                                <span className="w-4">📅</span>
                                                <span>{formatDate(pkg.departure_date)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="w-4">⏰</span>
                                                <span>{pkg.duration_days} hari</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="w-4">👥</span>
                                                <span>{pkg.available_slots} slot tersedia</span>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t dark:border-emerald-700 pt-4">
                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-4">
                                                {formatPrice(pkg.price)}
                                            </div>
                                            <Link
                                                href={route('packages.show', pkg.id)}
                                                className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Why Choose Us */}
                <section className="bg-white/50 dark:bg-emerald-900/50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                                🌟 Mengapa Memilih Kami?
                            </h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🏆</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">
                                    15+ Tahun Pengalaman
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-300">
                                    Melayani ribuan jemaah dengan kepuasan 99%
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">
                                    Legalitas Lengkap
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-300">
                                    Terdaftar resmi di Kementerian Agama RI
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🤝</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">
                                    Pelayanan 24/7
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-300">
                                    Support lengkap sebelum, selama, dan sesudah perjalanan
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">💝</div>
                                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-100 mb-2">
                                    Harga Terjangkau
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-300">
                                    Paket berkualitas dengan harga bersaing
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                            🤲 Siap Memulai Perjalanan Spiritual?
                        </h2>
                        <p className="text-emerald-700 dark:text-emerald-200 mb-8">
                            Jangan tunda impian umroh Anda. Hubungi kami sekarang untuk konsultasi gratis!
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <a
                                href="tel:+6281234567890"
                                className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                <span className="text-xl">📞</span>
                                <span>+62 812-3456-7890</span>
                            </a>
                            <a
                                href="mailto:info@umrohku.com"
                                className="flex items-center justify-center space-x-2 bg-red-600 text-white py-4 px-6 rounded-xl hover:bg-red-700 transition-colors"
                            >
                                <span className="text-xl">📧</span>
                                <span>info@umrohku.com</span>
                            </a>
                        </div>

                        <p className="text-emerald-600 dark:text-emerald-300">
                            📍 Jl. Sudirman No. 123, Jakarta Pusat 10110
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}