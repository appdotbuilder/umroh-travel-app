<?php

namespace Database\Seeders;

use App\Models\UmrohPackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UmrohPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create featured packages
        UmrohPackage::factory()->count(4)->featured()->create();
        
        // Create regular packages
        UmrohPackage::factory()->count(16)->create();
        
        // Create some fully booked packages to show variety
        UmrohPackage::factory()->count(3)->fullyBooked()->create();
    }
}