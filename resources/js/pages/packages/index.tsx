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
    available_slots: number;
    is_featured: boolean;
}

interface PaginatedPackages {
    data: UmrohPackage[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url?: string;
    prev_page_url?: string;
}

interface Props {
    packages: PaginatedPackages;
    [key: string]: unknown;
}

export default function PackagesIndex({ packages }: Props) {
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
            <Head title="Semua Paket Umroh - UmrohKu">
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
                            <nav>
                                <Link
                                    href={route('home')}
                                    className="text-emerald-700 hover:text-emerald-800 font-medium dark:text-emerald-200 dark:hover:text-emerald-100"
                                >
                                    ← Kembali ke Beranda
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Page Header */}
                <section className="container mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-100 mb-4">
                            📋 Semua Paket Umroh
                        </h1>
                        <p className="text-xl text-emerald-700 dark:text-emerald-200">
                            Pilih paket umroh yang sesuai dengan kebutuhan dan budget Anda
                        </p>
                        <div className="mt-6 text-emerald-600 dark:text-emerald-300">
                            Menampilkan {packages.data.length} dari {packages.total} paket tersedia
                        </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {packages.data.map((pkg) => (
                            <div key={pkg.id} className="bg-white dark:bg-emerald-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                                <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center relative">
                                    <div className="text-6xl text-white">🕌</div>
                                    {pkg.is_featured && (
                                        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                                            ⭐ UNGGULAN
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-3">
                                        {pkg.name}
                                    </h3>
                                    
                                    <div className="space-y-2 text-sm text-emerald-700 dark:text-emerald-200 mb-4">
                                        <div className="flex items-center">
                                            <span className="w-5 text-center">📅</span>
                                            <span className="ml-2">{formatDate(pkg.departure_date)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-5 text-center">⏰</span>
                                            <span className="ml-2">{pkg.duration_days} hari</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-5 text-center">🏨</span>
                                            <span className="ml-2 truncate">{pkg.hotel_mecca}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-5 text-center">👥</span>
                                            <span className="ml-2">
                                                {pkg.available_slots > 0 ? `${pkg.available_slots} slot tersedia` : 'Penuh'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-emerald-600 dark:text-emerald-300 text-sm mb-4 line-clamp-3">
                                        {pkg.description}
                                    </p>
                                    
                                    <div className="border-t dark:border-emerald-700 pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                                                {formatPrice(pkg.price)}
                                            </div>
                                            <div className="text-sm text-emerald-500 dark:text-emerald-400">
                                                per orang
                                            </div>
                                        </div>
                                        <Link
                                            href={route('packages.show', pkg.id)}
                                            className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                                                pkg.available_slots > 0
                                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {pkg.available_slots > 0 ? 'Lihat Detail' : 'Sudah Penuh'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {packages.last_page > 1 && (
                        <div className="flex justify-center space-x-4">
                            {packages.prev_page_url && (
                                <Link
                                    href={packages.prev_page_url}
                                    className="px-6 py-3 bg-white dark:bg-emerald-800 text-emerald-600 dark:text-emerald-200 rounded-lg shadow hover:shadow-lg transition-shadow"
                                >
                                    ← Sebelumnya
                                </Link>
                            )}
                            <div className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow">
                                Halaman {packages.current_page} dari {packages.last_page}
                            </div>
                            {packages.next_page_url && (
                                <Link
                                    href={packages.next_page_url}
                                    className="px-6 py-3 bg-white dark:bg-emerald-800 text-emerald-600 dark:text-emerald-200 rounded-lg shadow hover:shadow-lg transition-shadow"
                                >
                                    Selanjutnya →
                                </Link>
                            )}
                        </div>
                    )}
                </section>

                {/* Contact Section */}
                <section className="bg-emerald-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">💬 Butuh Konsultasi?</h2>
                        <p className="text-emerald-100 mb-8">
                            Tim ahli kami siap membantu Anda memilih paket yang tepat
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                            >
                                💬 WhatsApp: +62 812-3456-7890
                            </a>
                            <a
                                href="tel:+6281234567890"
                                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                📞 Telepon Sekarang
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}