<?php

namespace Tests\Feature;

use App\Models\UmrohPackage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UmrohPackageFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_featured_packages(): void
    {
        // Create some packages
        UmrohPackage::factory()->count(3)->featured()->create();
        UmrohPackage::factory()->count(5)->create();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('welcome')
                 ->has('featuredPackages')
                 ->where('allPackagesCount', 8);
        });
    }

    public function test_packages_index_displays_all_available_packages(): void
    {
        // Create available packages
        UmrohPackage::factory()->count(10)->create();
        // Create fully booked packages (should not appear)
        UmrohPackage::factory()->count(3)->fullyBooked()->create();

        $response = $this->get('/packages');

        $response->assertStatus(200);
        $response->assertInertia(function ($page) {
            $page->component('packages/index')
                 ->has('packages.data', 10);
        });
    }

    public function test_package_show_displays_package_details(): void
    {
        $package = UmrohPackage::factory()->create([
            'name' => 'Test Umroh Package',
            'price' => 25000000,
            'duration_days' => 14,
        ]);

        $response = $this->get("/packages/{$package->id}");

        $response->assertStatus(200);
        $response->assertInertia(function ($page) use ($package) {
            $page->component('packages/show')
                 ->where('package.id', $package->id)
                 ->where('package.name', 'Test Umroh Package')
                 ->where('package.price', '25000000.00')
                 ->where('package.duration_days', 14);
        });
    }

    public function test_featured_packages_are_marked_correctly(): void
    {
        $featuredPackage = UmrohPackage::factory()->featured()->create();
        $regularPackage = UmrohPackage::factory()->create(['is_featured' => false]);

        $this->assertTrue($featuredPackage->is_featured);
        $this->assertFalse($regularPackage->is_featured);
    }

    public function test_available_packages_scope_works(): void
    {
        UmrohPackage::factory()->count(5)->create(['available_slots' => 10]);
        UmrohPackage::factory()->count(3)->create(['available_slots' => 0]);

        $availableCount = UmrohPackage::available()->count();
        $this->assertEquals(5, $availableCount);
    }

    public function test_package_formatted_price_attribute(): void
    {
        $package = UmrohPackage::factory()->create(['price' => 25000000]);
        
        $this->assertEquals('Rp 25.000.000', $package->formatted_price);
    }
}