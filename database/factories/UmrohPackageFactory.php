<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UmrohPackage>
 */
class UmrohPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hotels_mecca = [
            'Hotel Dar Al Tawhid InterContinental Makkah',
            'Makkah Clock Royal Tower',
            'Conrad Makkah',
            'Pullman ZamZam Makkah',
            'Swissotel Makkah',
            'Hilton Suites Makkah',
            'Le Meridien Makkah',
        ];

        $hotels_medina = [
            'Madinah Hilton Hotel',
            'Pullman Zamzam Madina',
            'Crowne Plaza Madinah',
            'Shaza Al Madina',
            'Taiba Madinah Hotel',
            'Al Aqeeq Madinah Hotel',
            'Anwar Al Madinah Movenpick Hotel',
        ];

        $packages = [
            'Paket Umroh Ekonomi',
            'Paket Umroh Premium',
            'Paket Umroh VIP',
            'Paket Umroh Plus Dubai',
            'Paket Umroh Express',
            'Paket Umroh Keluarga',
            'Paket Umroh Haji Plus',
        ];

        return [
            'name' => fake()->randomElement($packages),
            'description' => 'Paket umroh lengkap dengan pelayanan terbaik, akomodasi nyaman, dan bimbingan ibadah yang komprehensif. Nikmati perjalanan spiritual yang tak terlupakan bersama tim profesional kami.',
            'price' => fake()->randomFloat(2, 15000000, 45000000),
            'duration_days' => fake()->randomElement([9, 12, 14, 16]),
            'departure_date' => fake()->dateTimeBetween('+1 month', '+6 months'),
            'hotel_mecca' => fake()->randomElement($hotels_mecca),
            'hotel_medina' => fake()->randomElement($hotels_medina),
            'inclusions' => implode("\n", [
                '• Tiket pesawat PP Jakarta-Jeddah/Madinah',
                '• Visa Umroh',
                '• Hotel bintang 4-5 di Makkah dan Madinah',
                '• Makan 3x sehari selama di Arab Saudi',
                '• Transportasi AC selama di Arab Saudi',
                '• Bimbingan ibadah oleh pembimbing berpengalaman',
                '• Ziarah ke tempat-tempat bersejarah',
                '• Perlengkapan umroh (koper, tas, mukena)',
                '• Asuransi perjalanan',
                '• Manasik umroh'
            ]),
            'exclusions' => implode("\n", [
                '• Pengeluaran pribadi',
                '• Laundry',
                '• Telepon dan internet',
                '• Tips guide dan driver',
                '• Excess baggage',
                '• Biaya perpanjangan visa (jika diperlukan)'
            ]),
            'available_slots' => fake()->numberBetween(5, 40),
            'is_featured' => fake()->boolean(30),
            'image_url' => null,
        ];
    }

    /**
     * Indicate that the package is featured.
     *
     * @return static
     */
    public function featured()
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the package is fully booked.
     *
     * @return static
     */
    public function fullyBooked()
    {
        return $this->state(fn (array $attributes) => [
            'available_slots' => 0,
        ]);
    }
}