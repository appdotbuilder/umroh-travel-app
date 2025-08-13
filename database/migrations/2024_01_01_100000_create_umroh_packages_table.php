<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('umroh_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Package name');
            $table->text('description')->comment('Package description');
            $table->decimal('price', 12, 2)->comment('Package price in IDR');
            $table->integer('duration_days')->comment('Package duration in days');
            $table->date('departure_date')->comment('Departure date');
            $table->string('hotel_mecca')->comment('Hotel in Mecca');
            $table->string('hotel_medina')->comment('Hotel in Medina');
            $table->text('inclusions')->comment('What is included in the package');
            $table->text('exclusions')->nullable()->comment('What is not included');
            $table->integer('available_slots')->comment('Available slots for booking');
            $table->boolean('is_featured')->default(false)->comment('Featured package flag');
            $table->string('image_url')->nullable()->comment('Package image URL');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('departure_date');
            $table->index('is_featured');
            $table->index(['is_featured', 'departure_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umroh_packages');
    }
};